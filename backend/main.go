package main

import (
	"crypto/tls"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
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
	// Exhibitors deadline: 18th September 2026 23:59:59 WAT
	deadline := time.Date(2026, time.September, 18, 23, 59, 59, 0, loc)

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
	if gcpProjectID == "" && (os.Getenv("K_SERVICE") != "" || os.Getenv("PORT") != "") {
		gcpProjectID = "yiaga-website"
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
			"error":   "Exhibitor registration deadline closed on 18th September 2026",
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

	contactName, _ := req["contactName"].(string)
	category, _ := req["category"].(string)

	// Asynchronously send automated confirmation email response from info@aianddemocracyforum.org
	go s.sendExhibitorConfirmationEmail(email, contactName, org, category)

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
		"message": "Exhibitor application successfully saved in NoSQL store. Confirmation email dispatched.",
		"id":      docID,
	})
}

// Public Endpoint: Register Sandbox Applicant (NoSQL Document Insert)
func (s *Server) handleRegisterSandbox(w http.ResponseWriter, r *http.Request) {
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

	teamName, _ := req["teamName"].(string)
	email, _ := req["email"].(string)

	if strings.TrimSpace(teamName) == "" || strings.TrimSpace(email) == "" {
		http.Error(w, "Team/Project name and contact email are required", http.StatusBadRequest)
		return
	}

	docID := fmt.Sprintf("sbx_%d", time.Now().UnixNano())
	req["submittedAt"] = time.Now().Format(time.RFC3339)

	if err := s.db.InsertOne("sandbox_applicants", docID, req); err != nil {
		log.Printf("Error inserting NoSQL sandbox document: %v", err)
		http.Error(w, "Failed to save application", http.StatusInternalServerError)
		return
	}

	contactName, _ := req["contactName"].(string)
	focusArea, _ := req["focusArea"].(string)

	go s.sendSandboxConfirmationEmail(email, contactName, teamName, focusArea)

	_ = s.db.InsertOne("admin_logs", fmt.Sprintf("log_%d", time.Now().UnixNano()), nosql.Document{
		"action":    "SANDBOX_REGISTERED",
		"targetId":  docID,
		"user":      email,
		"timestamp": time.Now().Format(time.RFC3339),
	})

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Sandbox application successfully saved. Confirmation email dispatched.",
		"id":      docID,
	})
}

func (s *Server) sendSandboxConfirmationEmail(toEmail, contactName, teamName, focusArea string) {
	if strings.TrimSpace(toEmail) == "" {
		return
	}
	cfg := getEmailConfig()

	if contactName == "" {
		contactName = teamName
	}
	if contactName == "" {
		contactName = "Valued Applicant"
	}

	subject := "Sandbox Application Received - AI & Democracy Forum 2026"
	body := fmt.Sprintf("Dear %s,\n\n"+
		"Thank you for applying to the AI & Democracy Forum Sandbox — the innovation showcase of AIDF 2026, taking place 14–16 October 2026 at Congress Hall, Transcorp Hilton, Abuja, Nigeria.\n\n"+
		"We have successfully received your application:\n"+
		"• Project / Team Name: %s\n"+
		"• Focus Area: %s\n"+
		"• Contact Email: %s\n"+
		"• Date Received: %s\n\n"+
		"WHAT HAPPENS NEXT?\n"+
		"1. Eligibility Screening: Every submission is reviewed for focus-area fit, completeness, and a genuine working proof of concept with an end-to-end demo. Submissions that don't meet these pass/fail criteria are not scored further.\n"+
		"2. Quality Scoring: Eligible submissions are scored by reviewers against a shared rubric. Top submissions per focus area are shortlisted for the jury.\n"+
		"3. Shortlist Notification: Shortlisted teams will be notified by 1 October 2026 and given full details on jury logistics.\n"+
		"4. Live Pitch Finale: Shortlisted teams pitch live at the Forum on 14–16 October 2026 in front of a jury of policy, technology, and civil-society experts.\n\n"+
		"KEY DATES:\n"+
		"• Application Deadline: 24–25 September 2026\n"+
		"• Shortlist Announced: 1 October 2026\n"+
		"• Pitch Finale (Live at the Forum): 14–16 October 2026\n"+
		"• Winners Announced: 14–16 October 2026\n\n"+
		"If you have any questions, please reply to this email or contact us at info@aianddemocracyforum.org.\n\n"+
		"Warm regards,\n\n"+
		"The Sandbox Team\n"+
		"AI & Democracy Forum Secretariat\n"+
		"Yiaga Africa & Strategic Partners\n"+
		"Email: info@aianddemocracyforum.org\n"+
		"Website: https://aianddemocracyforum.org\n",
		contactName, teamName, focusArea, toEmail, time.Now().Format("02 January 2006"))

	if cfg.Host == "" || cfg.Password == "" {
		log.Printf("📧 [Sandbox Email] Sender: %s | Recipient: %s (Team: %s).", cfg.User, toEmail, teamName)
		return
	}

	msg := []byte(fmt.Sprintf("From: %s\r\nTo: %s\r\nReply-To: info@aianddemocracyforum.org\r\nSubject: %s\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n%s",
		cfg.From, toEmail, subject, body))

	if err := sendMailWithTLS(cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.From, toEmail, subject, msg); err != nil {
		log.Printf("⚠️ Failed to send sandbox confirmation email to %s: %v", toEmail, err)
	} else {
		log.Printf("✅ Sandbox confirmation email sent to %s", toEmail)
	}
}

type EmailConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	From     string
}

func getEmailConfig() EmailConfig {
	host := os.Getenv("SMTP_HOST")
	port := os.Getenv("SMTP_PORT")
	if port == "" {
		port = "587"
	}
	user := os.Getenv("SMTP_USER")
	if user == "" {
		user = "info@aianddemocracyforum.org"
	}
	pass := os.Getenv("SMTP_PASS")
	from := os.Getenv("SMTP_FROM")
	if from == "" {
		from = "AI & Democracy Forum <info@aianddemocracyforum.org>"
	}
	return EmailConfig{
		Host:     host,
		Port:     port,
		User:     user,
		Password: pass,
		From:     from,
	}
}

func (s *Server) sendExhibitorConfirmationEmail(toEmail, contactName, organization, boothCategory string) {
	if strings.TrimSpace(toEmail) == "" {
		return
	}
	cfg := getEmailConfig()

	if contactName == "" {
		contactName = organization
	}
	if contactName == "" {
		contactName = "Valued Applicant"
	}

	subject := "Exhibitor Application Received - AI & Democracy Forum 2026"
	body := fmt.Sprintf("Dear %s,\n\n"+
		"Thank you for submitting an Exhibitor Booth application for the AI & Democracy Forum (AIDF 2026), taking place from 14th – 16th October 2026 at Congress Hall, Transcorp Hilton, Abuja, Nigeria.\n\n"+
		"We have successfully received your application details:\n"+
		"• Organization: %s\n"+
		"• Contact Person: %s\n"+
		"• Submission Category: %s\n"+
		"• Date Received: %s\n\n"+
		"WHAT HAPPENS NEXT?\n"+
		"1. Application Review: Our Technical & Exhibition Review Committee is reviewing all booth applications on a rolling basis.\n"+
		"2. Booth Allocation & Specs: Shortlisted exhibitors will receive notification regarding floor placement, booth dimensions, and technical setup guidelines at Congress Hall, Transcorp Hilton, Abuja.\n\n"+
		"PLEASE NOTE: Exhibition booth applications are dedicated exclusively to exhibition floor spaces for tech platforms, GovTech labs, and civic technology showcases. Information regarding the upcoming Innovation Sandbox initiative will be announced separately soon.\n\n"+
		"If you have any questions or additional technical specifications to submit, please reply directly to this email or contact us at info@aianddemocracyforum.org.\n\n"+
		"Warm regards,\n\n"+
		"AI & Democracy Forum Secretariat\n"+
		"Yiaga Africa & Strategic Partners\n"+
		"Email: info@aianddemocracyforum.org\n"+
		"Website: https://aianddemocracyforum.org\n"+
		"Venue: Congress Hall, Transcorp Hilton, Abuja, Nigeria\n",
		contactName, organization, contactName, boothCategory, time.Now().Format("02 January 2006"))

	if cfg.Host == "" || cfg.Password == "" {
		log.Printf("📧 [Automated Email Dispatch] Configured Sender: %s | Recipient: %s (Org: %s). (To send live emails, set SMTP_HOST and SMTP_PASS environment variables).", cfg.User, toEmail, organization)
		return
	}

	msg := []byte(fmt.Sprintf("From: %s\r\n"+
		"To: %s\r\n"+
		"Reply-To: info@aianddemocracyforum.org\r\n"+
		"Subject: %s\r\n"+
		"Content-Type: text/plain; charset=UTF-8\r\n"+
		"\r\n"+
		"%s", cfg.From, toEmail, subject, body))

	err := sendMailWithTLS(cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.From, toEmail, subject, msg)
	if err != nil {
		log.Printf("⚠️ Failed to send automated exhibitor confirmation email to %s via %s:%s (User: %s): %v", toEmail, cfg.Host, cfg.Port, cfg.User, err)
	} else {
		log.Printf("✅ Automated exhibitor confirmation email sent to %s from %s", toEmail, cfg.From)
	}
}

func sendMailWithTLS(host, port, user, pass, fromHeader, toEmail, subject string, msg []byte) error {
	addr := fmt.Sprintf("%s:%s", host, port)
	auth := smtp.PlainAuth("", user, pass, host)

	if port == "465" {
		tlsconfig := &tls.Config{
			InsecureSkipVerify: false,
			ServerName:         host,
		}
		conn, err := tls.Dial("tcp", addr, tlsconfig)
		if err != nil {
			return fmt.Errorf("TLS dial failed on port 465: %w", err)
		}
		client, err := smtp.NewClient(conn, host)
		if err != nil {
			return fmt.Errorf("SMTP client init failed: %w", err)
		}
		defer client.Quit()

		if err = client.Auth(auth); err != nil {
			return fmt.Errorf("SMTP auth failed for user %s: %w", user, err)
		}
		if err = client.Mail(user); err != nil {
			return fmt.Errorf("SMTP MAIL command failed: %w", err)
		}
		if err = client.Rcpt(toEmail); err != nil {
			return fmt.Errorf("SMTP RCPT command failed: %w", err)
		}
		w, err := client.Data()
		if err != nil {
			return fmt.Errorf("SMTP DATA command failed: %w", err)
		}
		_, err = w.Write(msg)
		if err != nil {
			return fmt.Errorf("SMTP write payload failed: %w", err)
		}
		return w.Close()
	}

	return smtp.SendMail(addr, auth, user, []string{toEmail}, msg)
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
	http.HandleFunc("/api/register/sandbox", server.handleRegisterSandbox)
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
