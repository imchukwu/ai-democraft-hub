package nosql

import (
	"context"
	"fmt"
	"log"
	"time"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

type FirestoreStore struct {
	client    *firestore.Client
	projectID string
}

func OpenFirestoreDB(projectID string) (*FirestoreStore, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := firestore.NewClient(ctx, projectID)
	if err != nil {
		return nil, fmt.Errorf("failed to create Google Cloud Firestore client for project %s: %w", projectID, err)
	}

	log.Printf("🔥 Google Cloud Firestore NoSQL client initialized (Project: %s)", projectID)
	return &FirestoreStore{
		client:    client,
		projectID: projectID,
	}, nil
}

func (fs *FirestoreStore) Close() error {
	return fs.client.Close()
}

func (fs *FirestoreStore) InsertOne(collectionName string, docID string, doc Document) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if docID == "" {
		docID = fmt.Sprintf("doc_%d", time.Now().UnixNano())
	}
	doc["_id"] = docID
	if _, hasTime := doc["createdAt"]; !hasTime {
		doc["createdAt"] = time.Now().Format(time.RFC3339)
	}

	docRef := fs.client.Collection(collectionName).Doc(docID)
	_, err := docRef.Set(ctx, map[string]interface{}(doc), firestore.MergeAll)
	return err
}

func (fs *FirestoreStore) FindAll(collectionName string) ([]Document, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	docs := []Document{}
	iter := fs.client.Collection(collectionName).Documents(ctx)
	defer iter.Stop()

	for {
		docSnap, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		var doc Document
		if err := docSnap.DataTo(&doc); err == nil {
			if doc["_id"] == nil {
				doc["_id"] = docSnap.Ref.ID
			}
			docs = append(docs, doc)
		}
	}

	return docs, nil
}

func (fs *FirestoreStore) FindByID(collectionName string, docID string) (Document, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	docSnap, err := fs.client.Collection(collectionName).Doc(docID).Get(ctx)
	if err != nil {
		return nil, err
	}

	var doc Document
	if err := docSnap.DataTo(&doc); err != nil {
		return nil, err
	}
	if doc["_id"] == nil {
		doc["_id"] = docSnap.Ref.ID
	}
	return doc, nil
}

func (fs *FirestoreStore) DeleteOne(collectionName string, docID string) bool {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := fs.client.Collection(collectionName).Doc(docID).Delete(ctx)
	return err == nil
}

func (fs *FirestoreStore) CountDocuments(collectionName string) int {
	docs, err := fs.FindAll(collectionName)
	if err != nil {
		return 0
	}
	return len(docs)
}
