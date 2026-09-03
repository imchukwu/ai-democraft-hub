package nosql

type DocumentStore interface {
	InsertOne(collectionName string, docID string, doc Document) error
	FindAll(collectionName string) ([]Document, error)
	FindByID(collectionName string, docID string) (Document, error)
	DeleteOne(collectionName string, docID string) bool
	CountDocuments(collectionName string) int
	Close() error
}
