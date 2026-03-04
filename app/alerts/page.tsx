"use client";

import { useState } from "react";
import { alerts as initialAlerts, type Alert } from "@/app/lib/mock-data";
import SensorIcon from "@/app/components/SensorIcon";
import EscalationBadge from "@/app/components/EscalationBadge";
import Modal from "@/app/components/Modal";
import { Check, Clock, AlertTriangle, Users, Phone, ChevronRight } from "lucide-react";
import Link from "next/link";

type FilterType = "alle" | "offen" | "bestaetigt";

// Escalation data per alert (mock)
const escalationData: Record<
  string,
  { level: 1 | 2 | 3; minutes: number; chain: { name: string; role: string; time: string; status: string }[] }
> = {
  a1: {
    level: 2,
    minutes: 3.4,
    chain: [
      { name: "Maria Schneider", role: "Pflegefachkraft", time: "20:47", status: "Benachrichtigt" },
      { name: "Anna Becker", role: "Schichtleitung", time: "20:50", status: "Eskaliert" },
      { name: "Thomas Mueller", role: "Einrichtungsleitung", time: "-", status: "Ausstehend" },
    ],
  },
  a2: {
    level: 1,
    minutes: 15.2,
    chain: [
      { name: "Maria Schneider", role: "Pflegefachkraft", time: "20:34", status: "Benachrichtigt" },
      { name: "Anna Becker", role: "Schichtleitung", time: "-", status: "Ausstehend" },
    ],
  },
  a3: {
    level: 1,
    minutes: 29.0,
    chain: [
      { name: "Maria Schneider", role: "Pflegefachkraft", time: "20:20", status: "Benachrichtigt" },
    ],
  },
};

export default function AlertsPage() {
  const [alertList, setAlertList] = useState<Alert[]>(initialAlerts);
  const [filter, setFilter] = useState<FilterType>("alle");
  const [showEscalation, setShowEscalation] = useState<string | null>(null);

  const filteredAlerts = alertList.filter((a) => {
    if (filter === "offen") return !a.acknowledged;
    if (filter === "bestaetigt") return a.acknowledged;
    return true;
  });

  const acknowledge = (id: string) => {
    setAlertList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const openCount = alertList.filter((a) => !a.acknowledged).length;

  const severityBorder: Record<string, string> = {
    kritisch: "border-l-danger",
    warnung: "border-l-warning",
    info: "border-l-info",
  };

  const severityBadgeBg: Record<string, string> = {
    kritisch: "bg-danger",
    warnung: "bg-warning",
    info: "bg-info",
  };

  const severityIconBg: Record<string, string> = {
    kritisch: "bg-danger-dim",
    warnung: "bg-warning-dim",
    info: "bg-info-dim",
  };

  const severityIconColor: Record<string, string> = {
    kritisch: "text-danger",
    warnung: "text-warning",
    info: "text-info",
  };

  const filterLabels: Record<FilterType, string> = {
    alle: "Alle",
    offen: "Offen",
    bestaetigt: "Bestaetigt",
  };

  const selectedEscalation = showEscalation
    ? escalationData[showEscalation]
    : null;
  const selectedAlert = showEscalation
    ? alertList.find((a) => a.id === showEscalation)
    : null;

  return (
    <div className="px-4 py-5 animate-fade-in">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[22px] font-bold text-text-primary tracking-tight">
          Alarme
        </h1>
        <p className="text-sm text-text-secondary mt-0.5">
          {openCount} offene Meldungen
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        className="flex gap-1 mb-5 p-1 rounded-2xl"
        style={{ background: "var(--bg-card)" }}
      >
        {(["alle", "offen", "bestaetigt"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              filter === f
                ? "bg-bg-elevated text-text-primary shadow-sm"
                : "text-text-tertiary"
            }`}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3 stagger">
        {filteredAlerts.map((alert) => {
          const esc = escalationData[alert.id];
          return (
            <div
              key={alert.id}
              className={`glass border-l-[3px] ${severityBorder[alert.severity]} p-4 transition-all ${
                alert.acknowledged ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${severityIconBg[alert.severity]}`}
                >
                  <SensorIcon
                    type={alert.sensorType}
                    size={20}
                    className={severityIconColor[alert.severity]}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded-lg ${severityBadgeBg[alert.severity]}`}
                    >
                      {alert.severity}
                    </span>
                    {esc && !alert.acknowledged && (
                      <EscalationBadge
                        level={esc.level}
                        minutesSinceAlert={esc.minutes}
                        compact
                      />
                    )}
                    <span className="text-[11px] text-text-tertiary flex items-center gap-1 ml-auto">
                      <Clock size={10} />
                      {alert.timeAgo}
                    </span>
                  </div>
                  <p className="text-sm text-text-primary font-medium leading-snug">
                    {alert.message}
                  </p>
                  <Link
                    href={`/room/${alert.roomId}`}
                    className="text-xs text-accent font-medium mt-1.5 inline-block"
                  >
                    {alert.roomName} &middot; {alert.residentName}
                  </Link>
                </div>
              </div>

              {/* Escalation info for unacknowledged */}
              {esc && !alert.acknowledged && (
                <button
                  onClick={() => setShowEscalation(alert.id)}
                  className="mt-3 w-full"
                >
                  <EscalationBadge
                    level={esc.level}
                    minutesSinceAlert={esc.minutes}
                  />
                </button>
              )}

              {!alert.acknowledged && (
                <button
                  onClick={() => acknowledge(alert.id)}
                  className="mt-3 w-full flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-2xl transition-all active:scale-[0.98]"
                  style={{
                    background: "var(--bg-elevated)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Check size={16} />
                  Bestaetigen
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredAlerts.length === 0 && (
        <div className="text-center py-16">
          <div
            className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--accent-dim)" }}
          >
            <Check size={28} className="text-accent" />
          </div>
          <p className="text-sm font-medium text-text-secondary">
            Keine Alarme in dieser Kategorie
          </p>
        </div>
      )}

      {/* Escalation Chain Modal */}
      <Modal
        open={!!showEscalation}
        onClose={() => setShowEscalation(null)}
        title="Eskalationskette"
      >
        {selectedAlert && selectedEscalation && (
          <div>
            <div className="glass p-3 mb-4">
              <p className="text-sm font-semibold text-text-primary">
                {selectedAlert.roomName} - {selectedAlert.residentName}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                {selectedAlert.message}
              </p>
            </div>

            <div className="space-y-0">
              {selectedEscalation.chain.map((step, i) => {
                const isActive = i < selectedEscalation.level;
                const isCurrent = i === selectedEscalation.level - 1;
                return (
                  <div key={i} className="flex gap-3">
                    {/* Vertical line */}
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: isActive
                            ? isCurrent
                              ? "var(--danger)"
                              : "var(--accent)"
                            : "var(--bg-elevated)",
                        }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{
                            color: isActive ? "white" : "var(--text-tertiary)",
                          }}
                        >
                          {i + 1}
                        </span>
                      </div>
                      {i < selectedEscalation.chain.length - 1 && (
                        <div
                          className="w-0.5 h-12"
                          style={{
                            background: isActive
                              ? "var(--accent)"
                              : "var(--border)",
                          }}
                        />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-sm font-semibold text-text-primary">
                        {step.name}
                      </p>
                      <p className="text-xs text-text-tertiary">{step.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {step.time !== "-" && (
                          <span className="text-[11px] text-text-secondary flex items-center gap-1">
                            <Clock size={10} />
                            {step.time} Uhr
                          </span>
                        )}
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-lg"
                          style={{
                            background: isActive
                              ? isCurrent
                                ? "var(--danger-dim)"
                                : "var(--accent-dim)"
                              : "var(--bg-elevated)",
                            color: isActive
                              ? isCurrent
                                ? "var(--danger)"
                                : "var(--accent)"
                              : "var(--text-tertiary)",
                          }}
                        >
                          {step.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowEscalation(null)}
              className="w-full flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98] mt-4"
            >
              <Phone size={16} />
              Zustaendige Person anrufen
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
