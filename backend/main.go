package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"ai-democraft-backend/nosql"
)

type Server struct {
	db         nosql.DocumentStore
	dbEngine   string
	deadline   time.Time
	adminUser  string
	adminPass  string
	adminToken string
}

func NewServer(dbPath string) *Server {
	loc, err := time.LoadLocation("Africa/Lagos")
	if err != nil {
		loc = time.UTC
	}
	// Exhibitors deadline: 11th September 2026 23:59:59 WAT
	deadline := time.Date(2026, time.September, 11, 23, 59, 59, 0, loc)

	adminUser := os.Getenv("ADMIN_USER")
	if adminUser == "" {
		adminUser = "admin"
	}
	adminPass := os.Getenv("ADMIN_PASS")
	if adminPass == "" {
		adminPass = "admin2026"
	}

	var store nosql.DocumentStore
	var engineName string

	gcpProjectID := os.Getenv("GCP_PROJECT_ID")
	if gcpProjectID == "" {
		gcpProjectID = os.Getenv("FIRESTORE_PROJECT_ID")
	}

	if gcpProjectID != "" {
		fs, err := nosql.OpenFirestoreDB(gcpProjectID)
		if err != nil {
			log.Printf("⚠️ Could not initialize Google Cloud Firestore (%v). Falling back to local BBolt NoSQL.", err)
			bboltDB, bErr := nosql.OpenDB(dbPath)
			if bErr != nil {
				log.Fatalf("Failed to initialize BBolt NoSQL Database: %v", bErr)
			}
			store = bboltDB
			engineName = fmt.Sprintf("BBolt Local NoSQL (%s)", dbPath)
		} else {
			store = fs
			engineName = fmt.Sprintf("Google Cloud Firestore NoSQL (Project: %s)", gcpProjectID)
		}
	} else {
		bboltDB, err := nosql.OpenDB(dbPath)
		if err != nil {
			log.Fatalf("Failed to initialize BBolt NoSQL Database: %v", err)
		}
		store = bboltDB
		engineName = fmt.Sprintf("BBolt Local NoSQL (%s)", dbPath)
	}

	s := &Server{
		db:         store,
		dbEngine:   engineName,
		deadline:   deadline,
		adminUser:  adminUser,
		adminPass:  adminPass,
		adminToken: "aidf_admin_token_2026_secured",
	}

	return s
}

func enableCORS(w http.ResponseWriter, r *http.Request) bool {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Token")
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return true
	}
	return false
}

func (s *Server) authenticateAdmin(r *http.Request) bool {
	authHeader := r.Header.Get("Authorization")
	if strings.HasPrefix(authHeader, "Bearer ") {
		token := strings.TrimPrefix(authHeader, "Bearer ")
		if token == s.adminToken {
			return true
		}
	}
	if r.Header.Get("X-Admin-Token") == s.adminToken {
		return true
	}
	if r.URL.Query().Get("token") == s.adminToken {
		return true
	}
	return false
}

func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":             "healthy",
		"database":           s.dbEngine,
		"service":            "AIDF 2026 Core API Backend",
		"timestamp":          time.Now(),
		"exhibitorsDeadline": s.deadline.Format("2006-01-02 15:04:05 MST"),
	})
}

// Public Endpoint: Register Participant (NoSQL Document Insert)
func (s *Server) handleRegisterParticipant(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	fullName, _ := req["fullName"].(string)
	email, _ := req["email"].(string)

	if strings.TrimSpace(fullName) == "" || strings.TrimSpace(email) == "" {
		http.Error(w, "Full Name and Email are required", http.StatusBadRequest)
		return
	}

	docID := fmt.Sprintf("part_%d", time.Now().UnixNano())
	req["submittedAt"] = time.Now().Format(time.RFC3339)

	if err := s.db.InsertOne("participants", docID, req); err != nil {
		log.Printf("Error inserting NoSQL participant document: %v", err)
		http.Error(w, "Failed to save registration", http.StatusInternalServerError)
		return
	}

	_ = s.db.InsertOne("admin_logs", fmt.Sprintf("log_%d", time.Now().UnixNano()), nosql.Document{
		"action":    "PARTICIPANT_REGISTERED",
		"targetId":  docID,
		"user":      email,
		"timestamp": time.Now().Format(time.RFC3339),
	})

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Participant registration successfully saved in NoSQL store",
		"id":      docID,
	})
}

// Public Endpoint: Register Exhibitor (NoSQL Document Insert)
func (s *Server) handleRegisterExhibitor(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if time.Now().After(s.deadline) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   "Exhibitor registration deadline closed on 11th September 2026",
		})
		return
	}

	var req map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	org, _ := req["organization"].(string)
	email, _ := req["email"].(string)

	if strings.TrimSpace(org) == "" || strings.TrimSpace(email) == "" {
		http.Error(w, "Organization name and contact email are required", http.StatusBadRequest)
		return
	}

	docID := fmt.Sprintf("exh_%d", time.Now().UnixNano())
	req["submittedAt"] = time.Now().Format(time.RFC3339)

	if err := s.db.InsertOne("exhibitors", docID, req); err != nil {
		log.Printf("Error inserting NoSQL exhibitor document: %v", err)
		http.Error(w, "Failed to save application", http.StatusInternalServerError)
		return
	}

	_ = s.db.InsertOne("admin_logs", fmt.Sprintf("log_%d", time.Now().UnixNano()), nosql.Document{
		"action":    "EXHIBITOR_REGISTERED",
		"targetId":  docID,
		"user":      email,
		"timestamp": time.Now().Format(time.RFC3339),
	})

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Exhibitor application successfully saved in NoSQL store",
		"id":      docID,
	})
}

// Admin API: Login
func (s *Server) handleAdminLogin(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest)
		return
	}

	if req.Username != s.adminUser || req.Password != s.adminPass {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   "Invalid admin credentials",
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":  true,
		"token":    s.adminToken,
		"username": s.adminUser,
	})
}

// Admin API: Get Stats
func (s *Server) handleAdminStats(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}
	if !s.authenticateAdmin(r) {
		http.Error(w, "Unauthorized admin access", http.StatusUnauthorized)
		return
	}

	participants, _ := s.db.FindAll("participants")
	exhibitors, _ := s.db.FindAll("exhibitors")

	partCatCount := make(map[string]int)
	for _, p := range participants {
		cat, _ := p["category"].(string)
		if cat == "" {
			cat = "Unspecified"
		}
		partCatCount[cat]++
	}

	exhCatCount := make(map[string]int)
	for _, e := range exhibitors {
		cat, _ := e["category"].(string)
		if cat == "" {
			cat = "Unspecified"
		}
		exhCatCount[cat]++
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"totalParticipants":     len(participants),
		"totalExhibitors":       len(exhibitors),
		"participantCategories": partCatCount,
		"exhibitorCategories":   exhCatCount,
		"deadline":              s.deadline.Format("2006-01-02 15:04:05 MST"),
		"isDeadlinePassed":      time.Now().After(s.deadline),
		"databaseEngine":        s.dbEngine,
	})
}

// Admin API: List All Registrations
func (s *Server) handleAdminRegistrations(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}
	if !s.authenticateAdmin(r) {
		http.Error(w, "Unauthorized admin access", http.StatusUnauthorized)
		return
	}

	participants, _ := s.db.FindAll("participants")
	exhibitors, _ := s.db.FindAll("exhibitors")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":      true,
		"participants": participants,
		"exhibitors":   exhibitors,
	})
}

// Admin API: Delete NoSQL Document
func (s *Server) handleAdminDelete(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}
	if !s.authenticateAdmin(r) {
		http.Error(w, "Unauthorized admin access", http.StatusUnauthorized)
		return
	}
	if r.Method != http.MethodDelete && r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	docID := r.URL.Query().Get("id")
	targetType := r.URL.Query().Get("type") // "participants" or "exhibitors"

	if docID == "" {
		http.Error(w, "Document _id required", http.StatusBadRequest)
		return
	}

	collName := "participants"
	if targetType == "exhibitor" || strings.HasPrefix(docID, "exh_") {
		collName = "exhibitors"
	}

	deleted := s.db.DeleteOne(collName, docID)

	if !deleted {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   fmt.Sprintf("NoSQL Document _id %s not found in %s collection", docID, collName),
		})
		return
	}

	_ = s.db.InsertOne("admin_logs", fmt.Sprintf("log_%d", time.Now().UnixNano()), nosql.Document{
		"action":     "DOCUMENT_DELETED",
		"targetId":   docID,
		"collection": collName,
		"timestamp":  time.Now().Format(time.RFC3339),
	})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": fmt.Sprintf("NoSQL Document %s deleted from %s collection", docID, collName),
	})
}

// Admin API: Export CSV
func (s *Server) handleAdminExportCSV(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}
	if !s.authenticateAdmin(r) {
		http.Error(w, "Unauthorized admin access", http.StatusUnauthorized)
		return
	}

	dataType := r.URL.Query().Get("type")
	w.Header().Set("Content-Type", "text/csv")

	if dataType == "exhibitors" {
		exhibitors, _ := s.db.FindAll("exhibitors")
		w.Header().Set("Content-Disposition", "attachment;filename=aidf2026_exhibitors_nosql.csv")
		writer := csv.NewWriter(w)
		writer.Write([]string{"_id", "Organization", "Contact Name", "Email", "Phone", "Category", "Website", "Description", "Submitted At"})
		for _, e := range exhibitors {
			id, _ := e["_id"].(string)
			org, _ := e["organization"].(string)
			contact, _ := e["contactName"].(string)
			email, _ := e["email"].(string)
			phone, _ := e["phone"].(string)
			cat, _ := e["category"].(string)
			web, _ := e["website"].(string)
			desc, _ := e["description"].(string)
			sub, _ := e["submittedAt"].(string)
			writer.Write([]string{id, org, contact, email, phone, cat, web, desc, sub})
		}
		writer.Flush()
	} else {
		participants, _ := s.db.FindAll("participants")
		w.Header().Set("Content-Disposition", "attachment;filename=aidf2026_participants_nosql.csv")
		writer := csv.NewWriter(w)
		writer.Write([]string{"_id", "Full Name", "Email", "Organization", "Country", "Category", "Submitted At"})
		for _, p := range participants {
			id, _ := p["_id"].(string)
			name, _ := p["fullName"].(string)
			email, _ := p["email"].(string)
			org, _ := p["organization"].(string)
			country, _ := p["country"].(string)
			cat, _ := p["category"].(string)
			sub, _ := p["submittedAt"].(string)
			writer.Write([]string{id, name, email, org, country, cat, sub})
		}
		writer.Flush()
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	dbPath := os.Getenv("NOSQL_DB_PATH")
	if dbPath == "" {
		dbPath = "data/aidf_nosql.db"
	}

	server := NewServer(dbPath)
	defer server.db.Close()

	http.HandleFunc("/api/health", server.handleHealth)
	http.HandleFunc("/api/register/participant", server.handleRegisterParticipant)
	http.HandleFunc("/api/register/exhibitor", server.handleRegisterExhibitor)
	http.HandleFunc("/api/registrations", server.handleAdminRegistrations)

	// Admin Dedicated Endpoints
	http.HandleFunc("/api/admin/login", server.handleAdminLogin)
	http.HandleFunc("/api/admin/stats", server.handleAdminStats)
	http.HandleFunc("/api/admin/registrations", server.handleAdminRegistrations)
	http.HandleFunc("/api/admin/delete", server.handleAdminDelete)
	http.HandleFunc("/api/admin/export/csv", server.handleAdminExportCSV)

	log.Printf("🚀 AIDF 2026 Go Backend active on http://localhost:%s", port)
	log.Printf("🍃 NoSQL Engine: %s", server.dbEngine)
	log.Printf("🔑 Default Admin Credentials: admin / admin2026")
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}
