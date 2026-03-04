"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  shiftSchedule,
  staffMembers,
  getStaffById,
} from "@/app/lib/mock-data";
import Modal from "@/app/components/Modal";
import {
  ArrowLeft,
  Calendar,
  Sun,
  Sunset,
  Moon,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";

const shiftConfig = {
  frueh: {
    label: "Frueh",
    time: "06:00 - 14:00",
    icon: Sun,
    color: "var(--warning)",
    bg: "var(--warning-dim)",
  },
  spaet: {
    label: "Spaet",
    time: "14:00 - 22:00",
    icon: Sunset,
    color: "var(--info)",
    bg: "var(--info-dim)",
  },
  nacht: {
    label: "Nacht",
    time: "22:00 - 06:00",
    icon: Moon,
    color: "var(--text-tertiary)",
    bg: "var(--bg-elevated)",
  },
};

export default function SchedulePage() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedShift, setSelectedShift] = useState<
    "frueh" | "spaet" | "nacht" | null
  >(null);

  const todayIndex = 1; // Tuesday (04.03.)

  const handleShiftClick = (dayIndex: number, shift: "frueh" | "spaet" | "nacht") => {
    setSelectedDay(dayIndex);
    setSelectedShift(shift);
  };

  const selectedEntry =
    selectedDay !== null ? shiftSchedule[selectedDay] : null;
  const selectedShiftStaff =
    selectedEntry && selectedShift
      ? selectedEntry.shifts[selectedShift].map(getStaffById).filter(Boolean)
      : [];

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
          style={{ background: "var(--info-dim)" }}
        >
          <Calendar size={22} className="text-info" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            Schichtplan
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            KW 10 · 03. - 09. Maerz 2026
          </p>
        </div>
      </div>

      {/* Shift legend */}
      <div className="flex gap-2 mb-5">
        {(Object.entries(shiftConfig) as [string, typeof shiftConfig.frueh][]).map(
          ([key, config]) => {
            const Icon = config.icon;
            return (
              <div
                key={key}
                className="flex-1 flex items-center gap-1.5 p-2.5 rounded-xl"
                style={{ background: config.bg }}
              >
                <Icon size={14} style={{ color: config.color }} />
                <div>
                  <p
                    className="text-[10px] font-bold"
                    style={{ color: config.color }}
                  >
                    {config.label}
                  </p>
                  <p className="text-[8px] text-text-tertiary">{config.time}</p>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Week view */}
      <div className="glass overflow-hidden mb-5">
        {/* Header row */}
        <div
          className="grid grid-cols-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="p-2.5">
            <span className="text-[10px] font-bold text-text-tertiary">
              TAG
            </span>
          </div>
          {(["frueh", "spaet", "nacht"] as const).map((shift) => {
            const config = shiftConfig[shift];
            const Icon = config.icon;
            return (
              <div
                key={shift}
                className="p-2.5 text-center"
              >
                <Icon
                  size={12}
                  className="mx-auto mb-0.5"
                  style={{ color: config.color }}
                />
                <span
                  className="text-[9px] font-bold"
                  style={{ color: config.color }}
                >
                  {config.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Day rows */}
        {shiftSchedule.map((entry, i) => {
          const isToday = i === todayIndex;
          return (
            <div
              key={i}
              className="grid grid-cols-4 border-b last:border-b-0"
              style={{
                borderColor: "var(--border)",
                background: isToday ? "var(--accent-dim)" : "transparent",
              }}
            >
              <div className="p-2.5 flex flex-col justify-center">
                <p
                  className={`text-xs font-bold ${isToday ? "text-accent" : "text-text-primary"}`}
                >
                  {entry.dayShort}
                </p>
                <p className="text-[9px] text-text-tertiary">{entry.date}</p>
              </div>
              {(["frueh", "spaet", "nacht"] as const).map((shift) => {
                const staffIds = entry.shifts[shift];
                return (
                  <button
                    key={shift}
                    onClick={() => handleShiftClick(i, shift)}
                    className="p-2 text-center transition-colors active:bg-bg-elevated"
                  >
                    <div className="flex flex-wrap justify-center gap-0.5">
                      {staffIds.slice(0, 3).map((id) => {
                        const staff = getStaffById(id);
                        if (!staff) return null;
                        return (
                          <span
                            key={id}
                            className="w-6 h-6 rounded-md flex items-center justify-center text-[8px] font-bold"
                            style={{
                              background: "var(--bg-elevated)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {staff.initials}
                          </span>
                        );
                      })}
                    </div>
                    <p className="text-[8px] text-text-tertiary mt-0.5">
                      {staffIds.length}
                    </p>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Today highlight */}
      <div className="glass p-4 mb-5">
        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
          Heute - Dienstag, 04.03.
        </h3>
        {(["frueh", "spaet", "nacht"] as const).map((shift) => {
          const config = shiftConfig[shift];
          const Icon = config.icon;
          const staffIds = shiftSchedule[todayIndex].shifts[shift];
          return (
            <div
              key={shift}
              className="flex items-center gap-3 py-2.5"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: config.bg }}
              >
                <Icon size={14} style={{ color: config.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold" style={{ color: config.color }}>
                  {config.label} ({config.time})
                </p>
                <p className="text-[11px] text-text-secondary">
                  {staffIds
                    .map((id) => getStaffById(id)?.name)
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
              <span className="text-xs font-bold text-text-tertiary">
                {staffIds.length}
              </span>
            </div>
          );
        })}
      </div>

      {/* Shift Detail Modal */}
      <Modal
        open={selectedDay !== null && selectedShift !== null}
        onClose={() => {
          setSelectedDay(null);
          setSelectedShift(null);
        }}
        title={
          selectedEntry && selectedShift
            ? `${selectedEntry.day} - ${shiftConfig[selectedShift].label}schicht`
            : "Schicht-Details"
        }
      >
        {selectedEntry && selectedShift && (
          <div>
            <div
              className="flex items-center gap-3 p-3 rounded-xl mb-4"
              style={{ background: shiftConfig[selectedShift].bg }}
            >
              {(() => {
                const Icon = shiftConfig[selectedShift].icon;
                return (
                  <Icon
                    size={20}
                    style={{ color: shiftConfig[selectedShift].color }}
                  />
                );
              })()}
              <div>
                <p
                  className="text-sm font-bold"
                  style={{ color: shiftConfig[selectedShift].color }}
                >
                  {shiftConfig[selectedShift].label}schicht
                </p>
                <p className="text-xs text-text-secondary">
                  {selectedEntry.day}, {selectedEntry.date} ·{" "}
                  {shiftConfig[selectedShift].time}
                </p>
              </div>
            </div>

            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
              Zugeteiltes Personal ({selectedShiftStaff.length})
            </h3>
            <div className="glass divide-y divide-border overflow-hidden">
              {selectedShiftStaff.map((staff) => {
                if (!staff) return null;
                return (
                  <div key={staff.id} className="flex items-center gap-3 p-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                      style={{
                        background: "var(--accent-dim)",
                        color: "var(--accent)",
                      }}
                    >
                      {staff.initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">
                        {staff.name}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {staff.roleLabel}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
