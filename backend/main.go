package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"
)

type ParticipantRegistration struct {
	ID           string    `json:"id"`
	FullName     string    `json:"fullName"`
	Email        string    `json:"email"`
	Organization string    `json:"organization"`
	Country      string    `json:"country"`
	Category     string    `json:"category"`
	SubmittedAt  time.Time `json:"submittedAt"`
}

type ExhibitorRegistration struct {
	ID           string    `json:"id"`
	Organization string    `json:"organization"`
	ContactName  string    `json:"contactName"`
	Email        string    `json:"email"`
	Phone        string    `json:"phone"`
	Category     string    `json:"category"`
	Description  string    `json:"description"`
	Website      string    `json:"website"`
	SubmittedAt  time.Time `json:"submittedAt"`
}

type StorageData struct {
	Participants []ParticipantRegistration `json:"participants"`
	Exhibitors   []ExhibitorRegistration   `json:"exhibitors"`
}

type Server struct {
	mu          sync.RWMutex
	filePath    string
	data        StorageData
	deadline    time.Time
}

func NewServer(filePath string) *Server {
	// Exhibitors deadline: 11th September 2026 23:59:59 WAT / UTC
	loc, err := time.LoadLocation("Africa/Lagos")
	if err != nil {
		loc = time.UTC
	}
	deadline := time.Date(2026, time.September, 11, 23, 59, 59, 0, loc)

	s := &Server{
		filePath: filePath,
		deadline: deadline,
		data: StorageData{
			Participants: []ParticipantRegistration{},
			Exhibitors:   []ExhibitorRegistration{},
		},
	}
	s.loadFromFile()
	return s
}

func (s *Server) loadFromFile() {
	s.mu.Lock()
	defer s.mu.Unlock()

	file, err := os.ReadFile(s.filePath)
	if err != nil {
		log.Printf("No existing registration store found at %s. Starting fresh.", s.filePath)
		return
	}
	if err := json.Unmarshal(file, &s.data); err != nil {
		log.Printf("Error unmarshaling store file: %v", err)
	}
}

func (s *Server) saveToFile() error {
	bytes, err := json.MarshalIndent(s.data, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(s.filePath, bytes, 0644)
}

func enableCORS(w http.ResponseWriter, r *http.Request) bool {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
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
		"status":    "healthy",
		"service":   "AIDF 2026 Registration Backend",
		"timestamp": time.Now(),
		"exhibitorsDeadline": s.deadline.Format("2006-01-02 15:04:05 MST"),
	})
}

func (s *Server) handleRegisterParticipant(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		FullName     string `json:"fullName"`
		Email        string `json:"email"`
		Organization string `json:"organization"`
		Country      string `json:"country"`
		Category     string `json:"category"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	if req.FullName == "" || req.Email == "" {
		http.Error(w, "Full Name and Email are required", http.StatusBadRequest)
		return
	}

	reg := ParticipantRegistration{
		ID:           fmt.Sprintf("part_%d", time.Now().UnixNano()),
		FullName:     req.FullName,
		Email:        req.Email,
		Organization: req.Organization,
		Country:      req.Country,
		Category:     req.Category,
		SubmittedAt:  time.Now(),
	}

	s.mu.Lock()
	s.data.Participants = append(s.data.Participants, reg)
	err := s.saveToFile()
	s.mu.Unlock()

	if err != nil {
		log.Printf("Failed to save registration: %v", err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":      true,
		"message":      "Participant registration successfully submitted!",
		"registration": reg,
	})
}

func (s *Server) handleRegisterExhibitor(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Check deadline
	if time.Now().After(s.deadline) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": false,
			"error":   "Exhibitor registration deadline closed on 11th September 2026",
		})
		return
	}

	var req struct {
		Organization string `json:"organization"`
		ContactName  string `json:"contactName"`
		Email        string `json:"email"`
		Phone        string `json:"phone"`
		Category     string `json:"category"`
		Description  string `json:"description"`
		Website      string `json:"website"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	if req.Organization == "" || req.ContactName == "" || req.Email == "" {
		http.Error(w, "Organization, Contact Name, and Email are required", http.StatusBadRequest)
		return
	}

	reg := ExhibitorRegistration{
		ID:           fmt.Sprintf("exh_%d", time.Now().UnixNano()),
		Organization: req.Organization,
		ContactName:  req.ContactName,
		Email:        req.Email,
		Phone:        req.Phone,
		Category:     req.Category,
		Description:  req.Description,
		Website:      req.Website,
		SubmittedAt:  time.Now(),
	}

	s.mu.Lock()
	s.data.Exhibitors = append(s.data.Exhibitors, reg)
	err := s.saveToFile()
	s.mu.Unlock()

	if err != nil {
		log.Printf("Failed to save exhibitor application: %v", err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success":      true,
		"message":      "Exhibitor application successfully submitted! Your booth request will be reviewed by the organizing committee.",
		"registration": reg,
		"deadline":     "11th September 2026",
	})
}

func (s *Server) handleListRegistrations(w http.ResponseWriter, r *http.Request) {
	if enableCORS(w, r) {
		return
	}
	s.mu.RLock()
	defer s.mu.RUnlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"participantCount": len(s.data.Participants),
		"exhibitorCount":   len(s.data.Exhibitors),
		"participants":     s.data.Participants,
		"exhibitors":       s.data.Exhibitors,
	})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	storagePath := os.Getenv("STORAGE_PATH")
	if storagePath == "" {
		storagePath = "registrations.json"
	}

	server := NewServer(storagePath)

	http.HandleFunc("/api/health", server.handleHealth)
	http.HandleFunc("/api/register/participant", server.handleRegisterParticipant)
	http.HandleFunc("/api/register/exhibitor", server.handleRegisterExhibitor)
	http.HandleFunc("/api/registrations", server.handleListRegistrations)

	log.Printf("🚀 AIDF 2026 Registration Go Server running on http://localhost:%s", port)
	log.Printf("📅 Exhibitor registration deadline set to: 11th September 2026")
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Server exited with error: %v", err)
	}
}
