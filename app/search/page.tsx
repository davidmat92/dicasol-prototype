"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { searchAll, type SearchResult } from "@/app/lib/mock-data";
import SensorIcon from "@/app/components/SensorIcon";
import {
  Search,
  X,
  Bed,
  User,
  Clock,
  ArrowRight,
} from "lucide-react";

const recentSearches = ["Helga Braun", "Zimmer 101", "Sturz", "Temperatur"];

function getResultIcon(type: SearchResult["type"]) {
  switch (type) {
    case "room":
      return <Bed size={16} className="text-accent" />;
    case "resident":
      return <User size={16} className="text-info" />;
    case "event":
      return <Clock size={16} className="text-warning" />;
  }
}

export default function SearchPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchAll(query);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function getResultTypeLabel(type: SearchResult["type"]) {
    switch (type) {
      case "room":
        return t("common.room");
      case "resident":
        return t("common.residents");
      case "event":
        return t("common.events");
    }
  }

  // Group results by type
  const roomResults = results.filter((r) => r.type === "room");
  const residentResults = results.filter((r) => r.type === "resident");
  const eventResults = results.filter((r) => r.type === "event");

  return (
    <div className="px-4 py-5 animate-fade-in">
      {/* Search Input */}
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5"
        style={{
          background: "var(--bg-card)",
          border: "2px solid var(--accent)",
        }}
      >
        <Search size={20} className="text-accent shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search.placeholder")}
          className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary"
        />
        {query && (
          <button onClick={() => setQuery("")} className="shrink-0">
            <X size={18} className="text-text-tertiary" />
          </button>
        )}
      </div>

      {/* No query - show recent searches */}
      {!query && (
        <>
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
            {t("search.recent")}
          </h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {recentSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-text-secondary transition-colors active:text-text-primary"
                style={{ background: "var(--bg-elevated)" }}
              >
                <Clock size={12} className="text-text-tertiary" />
                {term}
              </button>
            ))}
          </div>

          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
            {t("search.quickAccess")}
          </h3>
          <div className="space-y-2 stagger">
            <button
              onClick={() => router.push("/floorplan")}
              className="w-full glass p-4 flex items-center gap-3 transition-all active:scale-[0.99]"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "var(--accent-dim)" }}
              >
                <Bed size={18} className="text-accent" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-text-primary">
                  {t("dashboard.floorplan")}
                </p>
                <p className="text-xs text-text-tertiary">
                  {t("floorplan.subtitle")}
                </p>
              </div>
              <ArrowRight size={16} className="text-text-tertiary" />
            </button>
            <button
              onClick={() => router.push("/reports")}
              className="w-full glass p-4 flex items-center gap-3 transition-all active:scale-[0.99]"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "var(--info-dim)" }}
              >
                <Clock size={18} className="text-info" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-text-primary">
                  {t("dashboard.reports")}
                </p>
                <p className="text-xs text-text-tertiary">
                  {t("reports.subtitle")}
                </p>
              </div>
              <ArrowRight size={16} className="text-text-tertiary" />
            </button>
          </div>
        </>
      )}

      {/* Query but no results */}
      {query.length >= 2 && results.length === 0 && (
        <div className="text-center py-12">
          <Search size={40} className="mx-auto text-text-tertiary mb-3" />
          <p className="text-sm text-text-secondary">
            {t("search.noResults")} &quot;{query}&quot;
          </p>
          <p className="text-xs text-text-tertiary mt-1">
            {t("search.tryAnother")}
          </p>
        </div>
      )}

      {/* Results */}
      {query.length >= 2 && results.length > 0 && (
        <div className="space-y-5 stagger">
          {/* Room results */}
          {roomResults.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-2">
                <Bed size={12} />
                {t("common.room")} ({roomResults.length})
              </h3>
              <div className="glass divide-y divide-border overflow-hidden">
                {roomResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => router.push(result.link)}
                    className="w-full flex items-center gap-3 p-4 text-left transition-colors active:bg-bg-elevated"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "var(--accent-dim)" }}
                    >
                      {getResultIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-text-tertiary truncate">
                        {result.subtitle}
                      </p>
                    </div>
                    {result.status && (
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-lg shrink-0"
                        style={{
                          background:
                            result.status === "alarm"
                              ? "var(--danger-dim)"
                              : result.status === "warnung"
                                ? "var(--warning-dim)"
                                : result.status === "offline"
                                  ? "var(--offline-dim)"
                                  : "var(--accent-dim)",
                          color:
                            result.status === "alarm"
                              ? "var(--danger)"
                              : result.status === "warnung"
                                ? "var(--warning)"
                                : result.status === "offline"
                                  ? "var(--offline)"
                                  : "var(--accent)",
                        }}
                      >
                        {result.status === "alarm"
                          ? t("status.alarm")
                          : result.status === "warnung"
                            ? t("status.warning")
                            : result.status === "offline"
                              ? t("status.offline")
                              : t("status.normal")}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resident results */}
          {residentResults.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-2">
                <User size={12} />
                {t("common.residents")} ({residentResults.length})
              </h3>
              <div className="glass divide-y divide-border overflow-hidden">
                {residentResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => router.push(result.link)}
                    className="w-full flex items-center gap-3 p-4 text-left transition-colors active:bg-bg-elevated"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "var(--info-dim)" }}
                    >
                      {getResultIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-text-tertiary truncate">
                        {result.subtitle}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-text-tertiary shrink-0"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Event results */}
          {eventResults.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-2">
                <Clock size={12} />
                {t("common.events")} ({eventResults.length})
              </h3>
              <div className="glass divide-y divide-border overflow-hidden">
                {eventResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => router.push(result.link)}
                    className="w-full flex items-center gap-3 p-4 text-left transition-colors active:bg-bg-elevated"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "var(--warning-dim)" }}
                    >
                      {getResultIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-text-tertiary truncate">
                        {result.subtitle}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-text-tertiary shrink-0"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
