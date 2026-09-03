package nosql

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"go.etcd.io/bbolt"
)

type Document map[string]interface{}

type NoSQLDB struct {
	boltDB *bbolt.DB
	path   string
	mu     sync.RWMutex
}

type CollectionStats struct {
	Name          string     `json:"name"`
	DocumentCount int        `json:"documentCount"`
	SampleDocs    []Document `json:"sampleDocs"`
}

type DBTelemetry struct {
	Engine        string            `json:"engine"`
	FilePath      string            `json:"filePath"`
	Status        string            `json:"status"`
	Collections   []CollectionStats `json:"collections"`
	TotalDocCount int               `json:"totalDocCount"`
}

func OpenDB(dbPath string) (*NoSQLDB, error) {
	dir := filepath.Dir(dbPath)
	if dir != "" && dir != "." {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return nil, fmt.Errorf("failed to create db directory: %w", err)
		}
	}

	boltDB, err := bbolt.Open(dbPath, 0600, &bbolt.Options{Timeout: 3 * time.Second})
	if err != nil {
		return nil, fmt.Errorf("failed to open bbolt NoSQL db at %s: %w", dbPath, err)
	}

	db := &NoSQLDB{
		boltDB: boltDB,
		path:   dbPath,
	}

	// Ensure core collections (buckets) exist
	err = boltDB.Update(func(tx *bbolt.Tx) error {
		for _, name := range []string{"participants", "exhibitors", "admin_logs"} {
			if _, err := tx.CreateBucketIfNotExists([]byte(name)); err != nil {
				return err
			}
		}
		return nil
	})

	if err != nil {
		boltDB.Close()
		return nil, fmt.Errorf("failed to initialize NoSQL buckets: %w", err)
	}

	log.Printf("🍃 NoSQL Document Database initialized at %s", dbPath)
	return db, nil
}

func (db *NoSQLDB) Close() error {
	return db.boltDB.Close()
}

// InsertOne inserts a Document into the specified collection bucket
func (db *NoSQLDB) InsertOne(collectionName string, docID string, doc Document) error {
	db.mu.Lock()
	defer db.mu.Unlock()

	if docID == "" {
		docID = fmt.Sprintf("doc_%d", time.Now().UnixNano())
	}
	doc["_id"] = docID
	if _, hasTime := doc["createdAt"]; !hasTime {
		doc["createdAt"] = time.Now().Format(time.RFC3339)
	}

	payload, err := json.Marshal(doc)
	if err != nil {
		return fmt.Errorf("failed to serialize NoSQL document: %w", err)
	}

	return db.boltDB.Update(func(tx *bbolt.Tx) error {
		b := tx.Bucket([]byte(collectionName))
		if b == nil {
			var err error
			b, err = tx.CreateBucket([]byte(collectionName))
			if err != nil {
				return err
			}
		}
		return b.Put([]byte(docID), payload)
	})
}

// FindAll scans and returns all Documents in a collection
func (db *NoSQLDB) FindAll(collectionName string) ([]Document, error) {
	db.mu.RLock()
	defer db.mu.RUnlock()

	docs := []Document{}
	err := db.boltDB.View(func(tx *bbolt.Tx) error {
		b := tx.Bucket([]byte(collectionName))
		if b == nil {
			return nil
		}

		return b.ForEach(func(k, v []byte) error {
			var doc Document
			if err := json.Unmarshal(v, &doc); err == nil {
				docs = append(docs, doc)
			}
			return nil
		})
	})

	return docs, err
}

// FindByID retrieves a single document by its _id key
func (db *NoSQLDB) FindByID(collectionName string, docID string) (Document, error) {
	db.mu.RLock()
	defer db.mu.RUnlock()

	var doc Document
	err := db.boltDB.View(func(tx *bbolt.Tx) error {
		b := tx.Bucket([]byte(collectionName))
		if b == nil {
			return fmt.Errorf("collection %s not found", collectionName)
		}
		v := b.Get([]byte(docID))
		if v == nil {
			return fmt.Errorf("document with _id %s not found", docID)
		}
		return json.Unmarshal(v, &doc)
	})

	return doc, err
}

// DeleteOne removes a Document by its _id key from a collection
func (db *NoSQLDB) DeleteOne(collectionName string, docID string) bool {
	db.mu.Lock()
	defer db.mu.Unlock()

	deleted := false
	_ = db.boltDB.Update(func(tx *bbolt.Tx) error {
		b := tx.Bucket([]byte(collectionName))
		if b == nil {
			return nil
		}
		v := b.Get([]byte(docID))
		if v != nil {
			deleted = true
			return b.Delete([]byte(docID))
		}
		return nil
	})

	return deleted
}

// CountDocuments counts total records in a collection
func (db *NoSQLDB) CountDocuments(collectionName string) int {
	db.mu.RLock()
	defer db.mu.RUnlock()

	count := 0
	_ = db.boltDB.View(func(tx *bbolt.Tx) error {
		b := tx.Bucket([]byte(collectionName))
		if b != nil {
			count = b.Stats().KeyN
		}
		return nil
	})

	return count
}

// Inspect returns NoSQL database telemetry and collection stats
func (db *NoSQLDB) Inspect() DBTelemetry {
	db.mu.RLock()
	defer db.mu.RUnlock()

	telemetry := DBTelemetry{
		Engine:        "BBolt Key-Document NoSQL Store (Go Native)",
		FilePath:      db.path,
		Status:        "CONNECTED",
		Collections:   []CollectionStats{},
		TotalDocCount: 0,
	}

	_ = db.boltDB.View(func(tx *bbolt.Tx) error {
		return tx.ForEach(func(name []byte, b *bbolt.Bucket) error {
			collName := string(name)
			if strings.HasPrefix(collName, "_") {
				return nil
			}

			count := b.Stats().KeyN
			telemetry.TotalDocCount += count

			samples := []Document{}
			sampleLimit := 3
			c := b.Cursor()
			for k, v := c.First(); k != nil && len(samples) < sampleLimit; k, v = c.Next() {
				var doc Document
				if err := json.Unmarshal(v, &doc); err == nil {
					samples = append(samples, doc)
				}
			}

			telemetry.Collections = append(telemetry.Collections, CollectionStats{
				Name:          collName,
				DocumentCount: count,
				SampleDocs:    samples,
			})
			return nil
		})
	})

	return telemetry
}
