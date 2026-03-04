"use client";

import { useState } from "react";
import { historyEvents } from "@/app/lib/mock-data";
import SensorIcon from "@/app/components/SensorIcon";
import { Clock } from "lucide-react";
import Link from "next/link";

type DateFilter = "heute" | "woche" | "monat";

export default function HistoryPage() {
  const [dateFilter, setDateFilter] = useState<DateFilter>("heute");

  // Filter events based on selected period
  const filteredEvents = historyEvents.filter((event) => {
    if (dateFilter === "heute") return event.date === "Heute";
    if (dateFilter === "woche")
      return event.date === "Heute" || event.date === "Gestern";
    return true; // monat = show all
  });

  // Group events by date
  const grouped = filteredEvents.reduce(
    (acc, event) => {
      if (!acc[event.date]) acc[event.date] = [];
      acc[event.date].push(event);
      return acc;
    },
    {} as Record<string, typeof filteredEvents>
  );

  const dateLabels: Record<DateFilter, string> = {
    heute: "Heute",
    woche: "Woche",
    monat: "Monat",
  };

  const severityDot: Record<string, string> = {
    kritisch: "bg-danger",
    warnung: "bg-warning",
    info: "bg-accent",
  };

  const severityIconColor: Record<string, string> = {
    kritisch: "text-danger",
    warnung: "text-warning",
    info: "text-text-tertiary",
  };

  return (
    <div className="px-4 py-5 animate-fade-in">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[22px] font-bold text-text-primary tracking-tight">
          Verlauf
        </h1>
        <p className="text-sm text-text-secondary mt-0.5">
          {filteredEvents.length} Ereignisse
        </p>
      </div>

      {/* Date Filter Pills */}
      <div
        className="flex gap-1 mb-6 p-1 rounded-2xl"
        style={{ background: "var(--bg-card)" }}
      >
        {(["heute", "woche", "monat"] as DateFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setDateFilter(f)}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
              dateFilter === f
                ? "bg-bg-elevated text-text-primary shadow-sm"
                : "text-text-tertiary"
            }`}
          >
            {dateLabels[f]}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-6 stagger">
        {Object.entries(grouped).map(([date, events]) => (
          <div key={date}>
            {/* Date header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                {date}
              </span>
              <div className="flex-1 h-px bg-border" />
              <span className="text-[11px] text-text-tertiary">
                {events.length} Ereignisse
              </span>
            </div>

            {/* Event cards */}
            <div className="relative">
              {/* Vertical timeline line */}
              <div
                className="absolute left-[15px] top-2 bottom-2 w-px"
                style={{ background: "var(--border)" }}
              />

              <div className="space-y-0">
                {events.map((event, i) => (
                  <Link
                    key={event.id}
                    href={`/room/${event.roomId}`}
                  >
                    <div
                      className={`flex items-start gap-3 py-3 pl-0 transition-all active:scale-[0.99] ${
                        i < events.length - 1
                          ? ""
                          : ""
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className="relative z-10 flex items-center justify-center w-[30px] shrink-0">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${severityDot[event.severity]} ring-4 ring-bg`}
                        />
                      </div>

                      {/* Event card */}
                      <div className="glass flex-1 p-3.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-text-primary font-medium leading-snug">
                              {event.message}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-[11px] text-accent font-medium">
                                {event.roomName}
                              </span>
                              <span className="text-text-tertiary text-[10px]">
                                &middot;
                              </span>
                              <div className="flex items-center gap-1">
                                <Clock
                                  size={10}
                                  className="text-text-tertiary"
                                />
                                <span className="text-[11px] text-text-tertiary">
                                  {event.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              event.severity === "kritisch"
                                ? "bg-danger-dim"
                                : event.severity === "warnung"
                                  ? "bg-warning-dim"
                                  : "bg-bg-elevated"
                            }`}
                          >
                            <SensorIcon
                              type={event.sensorType}
                              size={14}
                              className={
                                severityIconColor[event.severity]
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <div
            className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--bg-card)" }}
          >
            <Clock size={28} className="text-text-tertiary" />
          </div>
          <p className="text-sm font-medium text-text-secondary">
            Keine Ereignisse in diesem Zeitraum
          </p>
        </div>
      )}
    </div>
  );
}
