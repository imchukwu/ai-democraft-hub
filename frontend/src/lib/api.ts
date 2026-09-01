/**
 * Dynamic API Base URL configuration for AIDF 2026.
 * Automatically targets Cloud Run backend URL in production environments,
 * while supporting local Vite dev proxy for local development.
 */
export const API_BASE_URL =
  import.meta.env['VITE_API_BASE_URL'] ||
  (typeof window !== "undefined" &&
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1"
    ? "https://aidf-backend-934225016182.us-central1.run.app"
    : "");
