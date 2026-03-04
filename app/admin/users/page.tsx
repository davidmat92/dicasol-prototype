"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { staffMembers, rooms, type StaffMember } from "@/app/lib/mock-data";
import Modal from "@/app/components/Modal";
import {
  ArrowLeft,
  Users,
  Search,
  Phone,
  Mail,
  Clock,
  MapPin,
  Shield,
  ChevronRight,
} from "lucide-react";

function getRoleBg(role: string) {
  switch (role) {
    case "admin":
      return "var(--danger-dim)";
    case "pflegefachkraft":
      return "var(--accent-dim)";
    case "pflegehelfer":
      return "var(--info-dim)";
    case "verwaltung":
      return "var(--warning-dim)";
    default:
      return "var(--bg-elevated)";
  }
}

function getRoleColor(role: string) {
  switch (role) {
    case "admin":
      return "var(--danger)";
    case "pflegefachkraft":
      return "var(--accent)";
    case "pflegehelfer":
      return "var(--info)";
    case "verwaltung":
      return "var(--warning)";
    default:
      return "var(--text-tertiary)";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "online":
      return "var(--accent)";
    case "pause":
      return "var(--warning)";
    default:
      return "var(--offline)";
  }
}

export default function UsersPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("alle");
  const [selectedUser, setSelectedUser] = useState<StaffMember | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = staffMembers.filter((s) => {
    const matchesFilter = filter === "alle" || s.role === filter;
    const matchesSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const onlineCount = staffMembers.filter(
    (s) => s.status === "online"
  ).length;

  return (
    <div className="px-4 py-5 animate-fade-in">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-text-secondary text-sm mb-4 transition-colors active:text-text-primary"
      >
        <ArrowLeft size={18} />
        Zurueck
      </button>

      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--accent-dim)" }}
        >
          <Users size={22} className="text-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            Benutzerverwaltung
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            {staffMembers.length} Mitarbeiter · {onlineCount} online
          </p>
        </div>
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl mb-4"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <Search size={16} className="text-text-tertiary" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Mitarbeiter suchen..."
          className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary"
        />
      </div>

      {/* Role filter */}
      <div className="flex gap-1.5 overflow-x-auto mb-5 pb-1 -mx-1 px-1">
        {[
          { key: "alle", label: "Alle" },
          { key: "pflegefachkraft", label: "Fachkraft" },
          { key: "pflegehelfer", label: "Helfer" },
          { key: "admin", label: "Admin" },
          { key: "verwaltung", label: "Verwaltung" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0"
            style={{
              background:
                filter === f.key ? "var(--accent)" : "var(--bg-elevated)",
              color:
                filter === f.key ? "white" : "var(--text-secondary)",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Staff list */}
      <div className="space-y-2 stagger">
        {filteredStaff.map((staff) => (
          <button
            key={staff.id}
            onClick={() => setSelectedUser(staff)}
            className="w-full glass p-4 flex items-center gap-3 transition-all active:scale-[0.99]"
          >
            <div className="relative">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-bold"
                style={{
                  background: getRoleBg(staff.role),
                  color: getRoleColor(staff.role),
                }}
              >
                {staff.initials}
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
                style={{
                  background: getStatusColor(staff.status),
                  borderColor: "var(--bg)",
                }}
              />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">
                {staff.name}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                  style={{
                    background: getRoleBg(staff.role),
                    color: getRoleColor(staff.role),
                  }}
                >
                  {staff.roleLabel}
                </span>
                <span className="text-[11px] text-text-tertiary">
                  {staff.lastActive}
                </span>
              </div>
            </div>
            <ChevronRight size={16} className="text-text-tertiary shrink-0" />
          </button>
        ))}
      </div>

      {/* User Detail Modal */}
      <Modal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="Mitarbeiter-Details"
      >
        {selectedUser && (
          <div>
            <div className="text-center mb-5">
              <div
                className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-3 text-xl font-bold"
                style={{
                  background: getRoleBg(selectedUser.role),
                  color: getRoleColor(selectedUser.role),
                }}
              >
                {selectedUser.initials}
              </div>
              <h2 className="text-lg font-bold text-text-primary">
                {selectedUser.name}
              </h2>
              <span
                className="inline-block text-xs font-semibold px-2.5 py-1 rounded-lg mt-1"
                style={{
                  background: getRoleBg(selectedUser.role),
                  color: getRoleColor(selectedUser.role),
                }}
              >
                {selectedUser.roleLabel}
              </span>
            </div>

            <div className="glass divide-y divide-border overflow-hidden mb-4">
              <div className="flex items-center gap-3 p-4">
                <Mail size={16} className="text-text-tertiary" />
                <div>
                  <p className="text-[11px] text-text-tertiary">E-Mail</p>
                  <p className="text-sm text-text-primary">
                    {selectedUser.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <Phone size={16} className="text-text-tertiary" />
                <div>
                  <p className="text-[11px] text-text-tertiary">Telefon</p>
                  <p className="text-sm text-text-primary">
                    {selectedUser.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <Clock size={16} className="text-text-tertiary" />
                <div>
                  <p className="text-[11px] text-text-tertiary">Schicht</p>
                  <p className="text-sm text-text-primary">
                    {selectedUser.shiftLabel}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <Shield size={16} className="text-text-tertiary" />
                <div>
                  <p className="text-[11px] text-text-tertiary">Status</p>
                  <p className="text-sm font-medium" style={{ color: getStatusColor(selectedUser.status) }}>
                    {selectedUser.lastActive}
                  </p>
                </div>
              </div>
            </div>

            {selectedUser.assignedRooms.length > 0 && (
              <div className="glass p-4">
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Zugewiesene Zimmer
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedUser.assignedRooms.map((roomId) => {
                    const room = rooms.find((r) => r.id === roomId);
                    return (
                      <span
                        key={roomId}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
                        style={{
                          background: "var(--accent-dim)",
                          color: "var(--accent)",
                        }}
                      >
                        {room?.name || `Zimmer ${roomId}`}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
