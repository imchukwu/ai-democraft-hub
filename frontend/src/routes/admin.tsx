import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Lock,
  LogOut,
  Users,
  Store,
  Calendar,
  Search,
  Trash2,
  Download,
  RefreshCw,
  Eye,
  ShieldCheck,
  X,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Code2,
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type Participant = {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  organization: string;
  country: string;
  category: string;
  submittedAt: string;
};

type Exhibitor = {
  _id?: string;
  id?: string;
  organization: string;
  contactName: string;
  email: string;
  phone?: string;
  country?: string;
  productTitle?: string;
  category: string;
  description: string;
  website?: string;
  submittedAt?: string;
};

type SandboxApplicant = {
  _id?: string;
  id?: string;
  projectName: string;
  teamName: string;
  contactName: string;
  email: string;
  phone?: string;
  focusArea: string;
  orgType?: string;
  country?: string;
  website?: string;
  repoOrDemo?: string;
  demoType?: string;
  demoLink?: string;
  teamSize?: string;
  description?: string;
  submittedAt?: string;
};

type AdminStats = {
  totalParticipants: number;
  totalExhibitors: number;
  totalSandbox?: number;
  deadline: string;
  isDeadlinePassed: boolean;
};

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(sessionStorage.getItem("aidf_admin_token"));
    }
  }, []);

  const [loginUser, setLoginUser] = useState("admin");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<"participants" | "exhibitors" | "sandbox">("participants");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [sandboxApplicants, setSandboxApplicants] = useState<SandboxApplicant[]>([]);
  const [selectedExhibitor, setSelectedExhibitor] = useState<Exhibitor | null>(null);
  const [selectedSandbox, setSelectedSandbox] = useState<SandboxApplicant | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUser, password: loginPass }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid username or password");
      }

      sessionStorage.setItem("aidf_admin_token", data.token);
      setToken(data.token);
    } catch (err: any) {
      setLoginError(err.message || "Failed to log in");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("aidf_admin_token");
    setToken(null);
  };

  const fetchData = async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);

    try {
      const [statsRes, regsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/api/admin/registrations`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (statsRes.status === 401 || regsRes.status === 401) {
        handleLogout();
        throw new Error("Session expired. Please log in again.");
      }

      const statsData = await statsRes.json();
      const regsData = await regsRes.json();

      setStats(statsData);
      setParticipants(regsData.participants || []);
      setExhibitors(regsData.exhibitors || []);
      setSandboxApplicants(regsData.sandbox || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch admin data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleDelete = async (id: string, type: "participant" | "exhibitor" | "sandbox") => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this registration record?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/delete?id=${id}&type=${type}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Failed to delete record");
      }

      if (type === "participant") {
        setParticipants((prev) => prev.filter((p) => (p._id || p.id) !== id));
      } else if (type === "exhibitor") {
        setExhibitors((prev) => prev.filter((e) => (e._id || e.id) !== id));
      } else {
        setSandboxApplicants((prev) => prev.filter((s) => (s._id || s.id) !== id));
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete record.");
    } finally {
      setDeletingId(null);
    }
  };

  const downloadCSV = (type: "participants" | "exhibitors" | "sandbox") => {
    if (!token) return;
    const url = `${API_BASE_URL}/api/admin/export/csv?type=${type}&token=${encodeURIComponent(token)}`;
    window.open(url, "_blank");
  };

  // Filtered lists
  const filteredParticipants = participants.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.fullName.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.organization.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q)
    );
  });

  const filteredExhibitors = exhibitors.filter((e) => {
    const q = searchQuery.toLowerCase();
    return (
      e.organization.toLowerCase().includes(q) ||
      e.contactName.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
    );
  });

  const filteredSandbox = sandboxApplicants.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      (s.projectName || "").toLowerCase().includes(q) ||
      (s.teamName || "").toLowerCase().includes(q) ||
      (s.contactName || "").toLowerCase().includes(q) ||
      (s.email || "").toLowerCase().includes(q) ||
      (s.focusArea || "").toLowerCase().includes(q) ||
      (s.orgType || "").toLowerCase().includes(q) ||
      (s.country || "").toLowerCase().includes(q)
    );
  });

  // Login Screen
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Lock className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">AIDF Admin Portal</h2>
            <p className="text-xs text-slate-400">
              Sign in to manage delegate registrations and exhibitor submissions.
            </p>
          </div>

          {loginError ? (
            <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{loginError}</span>
            </div>
          ) : null}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300">Username</label>
              <input
                type="text"
                required
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="admin"
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-base text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <input
                type="password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-base text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full rounded-lg bg-cyan-400 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 transition-colors shadow-lg disabled:opacity-50"
            >
              {isLoggingIn ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Clean Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
        <div className="container-forum flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-white">AIDF 2026 Admin</span>
              <span className="text-[10px] text-slate-400 font-mono">Administrative Control Panel</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg bg-red-500/20 px-3.5 py-1.5 text-xs font-bold text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container-forum py-8 px-4 space-y-8">
        {/* Error Notification */}
        {error ? (
          <div className="flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        {/* Summary Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex items-center justify-between shadow-lg">
            <div>
              <span className="eyebrow text-cyan-400">Total Delegates</span>
              <h3 className="mt-2 text-3xl font-black text-white">{participants.length}</h3>
              <p className="mt-1 text-xs text-slate-400">Registered Participants</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex items-center justify-between shadow-lg">
            <div>
              <span className="eyebrow text-amber-400">Exhibitor Applications</span>
              <h3 className="mt-2 text-3xl font-black text-white">{exhibitors.length}</h3>
              <p className="mt-1 text-xs text-slate-400">Exhibitor Submissions</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Store className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex items-center justify-between shadow-lg">
            <div>
              <span className="eyebrow text-[#15B708]">Sandbox Applications</span>
              <h3 className="mt-2 text-3xl font-black text-white">{sandboxApplicants.length}</h3>
              <p className="mt-1 text-xs text-slate-400">Innovator Pitches</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#15B708]/10 text-[#15B708] border border-[#15B708]/30">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex items-center justify-between shadow-lg">
            <div>
              <span className="eyebrow text-slate-400">Deadlines</span>
              <p className="mt-2 text-xs font-bold text-amber-300">Exhibitor: 18th Sept</p>
              <p className="mt-1 text-xs font-bold text-[#15B708]">Sandbox: 24th Sept</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Tab Controls & Search Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("participants")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "participants"
                  ? "bg-cyan-400 text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Participants ({participants.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("exhibitors")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "exhibitors"
                  ? "bg-amber-400 text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Store className="h-4 w-4" />
              <span>Exhibitors ({exhibitors.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("sandbox")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "sandbox"
                  ? "bg-[#15B708] text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Sandbox ({sandboxApplicants.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Export CSV Button */}
            <button
              onClick={() => downloadCSV(activeTab)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors shrink-0"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* TAB 1: PARTICIPANTS TABLE */}
        {activeTab === "participants" ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono uppercase">
                  <tr>
                    <th className="p-4">Full Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Organization</th>
                    <th className="p-4">Country</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredParticipants.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        No participant registrations found.
                      </td>
                    </tr>
                  ) : (
                    filteredParticipants.map((p) => {
                      const id = p._id || p.id || "";
                      return (
                        <tr key={id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-4 font-bold text-white">{p.fullName}</td>
                          <td className="p-4 text-cyan-300">{p.email}</td>
                          <td className="p-4">{p.organization || "—"}</td>
                          <td className="p-4">{p.country || "—"}</td>
                          <td className="p-4">
                            <span className="rounded bg-cyan-400/10 px-2 py-0.5 font-medium text-cyan-300 border border-cyan-400/20">
                              {p.category}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDelete(id, "participant")}
                              disabled={deletingId === id}
                              className="rounded p-1.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {/* TAB 2: EXHIBITORS TABLE */}
        {activeTab === "exhibitors" ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono uppercase">
                  <tr>
                    <th className="p-4">Organization</th>
                    <th className="p-4">Contact Lead</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Abstract</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredExhibitors.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        No exhibitor applications found.
                      </td>
                    </tr>
                  ) : (
                    filteredExhibitors.map((e) => {
                      const id = e._id || e.id || "";
                      return (
                        <tr key={id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-4 font-bold text-white">{e.organization}</td>
                          <td className="p-4">{e.contactName}</td>
                          <td className="p-4">
                            <div className="text-cyan-300">{e.email}</div>
                            <div className="text-[11px] text-slate-400">{e.phone}</div>
                          </td>
                          <td className="p-4">
                            <span className="rounded bg-amber-400/10 px-2 py-0.5 font-medium text-amber-300 border border-amber-400/20">
                              {e.category}
                            </span>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => setSelectedExhibitor(e)}
                              className="inline-flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                            >
                              <Eye className="h-3.5 w-3.5 text-amber-400" />
                              <span>View Description</span>
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDelete(id, "exhibitor")}
                              disabled={deletingId === id}
                              className="rounded p-1.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                              title="Delete Application"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {/* TAB 3: SANDBOX APPLICANTS TABLE */}
        {activeTab === "sandbox" ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono uppercase">
                  <tr>
                    <th className="p-4">Project &amp; Team</th>
                    <th className="p-4">Focus Area</th>
                    <th className="p-4">Contact Lead</th>
                    <th className="p-4">Demo / Prototype</th>
                    <th className="p-4">Submission</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredSandbox.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        No sandbox applications found.
                      </td>
                    </tr>
                  ) : (
                    filteredSandbox.map((sb) => {
                      const id = sb._id || sb.id || "";
                      return (
                        <tr key={id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-white text-sm">{sb.projectName}</div>
                            <div className="text-[11px] text-[#15B708] font-medium">{sb.teamName || "—"}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{sb.orgType || "—"} · {sb.country || "Nigeria"}</div>
                          </td>
                          <td className="p-4">
                            <span className="rounded-full bg-[#15B708]/10 px-2.5 py-1 font-semibold text-[#15B708] border border-[#15B708]/30 inline-block max-w-[180px] truncate" title={sb.focusArea}>
                              {sb.focusArea}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-white">{sb.contactName}</div>
                            <div className="text-cyan-300">{sb.email}</div>
                            <div className="text-[11px] text-slate-400">{sb.phone || "—"}</div>
                          </td>
                          <td className="p-4">
                            {sb.demoLink ? (
                              <a
                                href={sb.demoLink.startsWith("http") ? sb.demoLink : `https://${sb.demoLink}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-cyan-400 hover:underline max-w-[140px] truncate"
                              >
                                <span>{sb.demoType || "Live Demo"}</span>
                                <ExternalLink className="h-3 w-3 shrink-0" />
                              </a>
                            ) : (
                              <span className="text-slate-500">{sb.demoType || "—"}</span>
                            )}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => setSelectedSandbox(sb)}
                              className="inline-flex items-center gap-1 rounded bg-slate-800 px-2.5 py-1 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                            >
                              <Eye className="h-3.5 w-3.5 text-[#15B708]" />
                              <span>View Details</span>
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDelete(id, "sandbox")}
                              disabled={deletingId === id}
                              className="rounded p-1.5 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                              title="Delete Application"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </main>

      {/* Exhibitor Modal */}
      {selectedExhibitor ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8 text-slate-100 shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedExhibitor(null)}
              className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header Info */}
            <div className="border-b border-slate-800 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/20">
                  {selectedExhibitor.category}
                </span>
                {selectedExhibitor.submittedAt ? (
                  <span className="text-[11px] font-mono text-slate-400">
                    Submitted: {new Date(selectedExhibitor.submittedAt).toLocaleDateString()}
                  </span>
                ) : null}
              </div>
              <h3 className="text-2xl font-extrabold text-white mt-2">{selectedExhibitor.organization}</h3>
              {selectedExhibitor.productTitle ? (
                <p className="text-sm font-semibold text-cyan-400 mt-0.5">
                  Product: {selectedExhibitor.productTitle}
                </p>
              ) : null}
            </div>

            {/* Contact Details Grid */}
            <div className="grid gap-3 sm:grid-cols-2 text-xs rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
              <div>
                <span className="text-slate-400 font-medium">Contact Person:</span>
                <p className="font-semibold text-white mt-0.5">{selectedExhibitor.contactName}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Email Address:</span>
                <p className="font-semibold text-white mt-0.5">{selectedExhibitor.email}</p>
              </div>
              {selectedExhibitor.phone ? (
                <div>
                  <span className="text-slate-400 font-medium">Phone Number:</span>
                  <p className="font-semibold text-white mt-0.5">{selectedExhibitor.phone}</p>
                </div>
              ) : null}
              {selectedExhibitor.country ? (
                <div>
                  <span className="text-slate-400 font-medium">Country / Region:</span>
                  <p className="font-semibold text-white mt-0.5">{selectedExhibitor.country}</p>
                </div>
              ) : null}
              {selectedExhibitor.website ? (
                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-medium">Website / Portal:</span>
                  <p className="font-semibold text-cyan-300 mt-0.5 truncate">{selectedExhibitor.website}</p>
                </div>
              ) : null}
            </div>

            {/* Solution Abstract & Description Box */}
            <div className="rounded-xl border border-cyan-500/30 bg-slate-900/90 p-5 space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Detailed Solution Abstract &amp; Description
                </h4>
                <span className="text-[11px] font-mono text-slate-400">
                  {selectedExhibitor.description ? selectedExhibitor.description.trim().split(/\s+/).filter(Boolean).length : 0} words
                </span>
              </div>
              <div className="max-h-60 overflow-y-auto pr-2">
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedExhibitor.description}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedExhibitor(null)}
                className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-700"
              >
                Close Abstract
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Sandbox Applicant Modal */}
      {selectedSandbox ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8 text-slate-100 shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedSandbox(null)}
              className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header Info */}
            <div className="border-b border-slate-800 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#15B708]/10 px-3 py-1 text-xs font-bold text-[#15B708] border border-[#15B708]/30">
                  {selectedSandbox.focusArea}
                </span>
                {selectedSandbox.submittedAt ? (
                  <span className="text-[11px] font-mono text-slate-400">
                    Submitted: {new Date(selectedSandbox.submittedAt).toLocaleDateString()}
                  </span>
                ) : null}
              </div>
              <h3 className="text-2xl font-extrabold text-white mt-2">{selectedSandbox.projectName}</h3>
              <p className="text-sm font-semibold text-[#15B708] mt-0.5">
                Team: {selectedSandbox.teamName}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid gap-3 sm:grid-cols-2 text-xs rounded-xl border border-slate-800/80 bg-slate-900/60 p-4">
              <div>
                <span className="text-slate-400 font-medium">Contact Lead:</span>
                <p className="font-semibold text-white mt-0.5">{selectedSandbox.contactName}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Email Address:</span>
                <p className="font-semibold text-cyan-300 mt-0.5">{selectedSandbox.email}</p>
              </div>
              {selectedSandbox.phone ? (
                <div>
                  <span className="text-slate-400 font-medium">Phone Number:</span>
                  <p className="font-semibold text-white mt-0.5">{selectedSandbox.phone}</p>
                </div>
              ) : null}
              <div>
                <span className="text-slate-400 font-medium">Organization Type:</span>
                <p className="font-semibold text-white mt-0.5">{selectedSandbox.orgType || "—"}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Country / Location:</span>
                <p className="font-semibold text-white mt-0.5">{selectedSandbox.country || "Nigeria"}</p>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Team Size:</span>
                <p className="font-semibold text-white mt-0.5">{selectedSandbox.teamSize || "1"}</p>
              </div>
              {selectedSandbox.website ? (
                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-medium">Website / Portfolio:</span>
                  <a
                    href={selectedSandbox.website.startsWith("http") ? selectedSandbox.website : `https://${selectedSandbox.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-semibold text-cyan-300 mt-0.5 truncate hover:underline"
                  >
                    {selectedSandbox.website}
                  </a>
                </div>
              ) : null}
              {selectedSandbox.demoLink ? (
                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-medium">Demo / Prototype Link ({selectedSandbox.demoType || "Prototype"}):</span>
                  <a
                    href={selectedSandbox.demoLink.startsWith("http") ? selectedSandbox.demoLink : `https://${selectedSandbox.demoLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-[#15B708] mt-0.5 truncate hover:underline"
                  >
                    <span>{selectedSandbox.demoLink}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              ) : null}
            </div>

            {/* Description / Problem & Solution Box */}
            <div className="rounded-xl border border-[#15B708]/30 bg-slate-900/90 p-5 space-y-3 shadow-inner">
              <h4 className="text-xs font-bold text-[#15B708] uppercase tracking-wider">
                Application Pitch &amp; Description
              </h4>
              <div className="max-h-60 overflow-y-auto pr-2">
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedSandbox.description || "No description provided."}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedSandbox(null)}
                className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-700"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
