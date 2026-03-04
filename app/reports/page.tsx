"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { rooms, alerts } from "@/app/lib/mock-data";
import BarChart from "@/app/components/BarChart";
import LineChart from "@/app/components/LineChart";
import DonutChart from "@/app/components/DonutChart";
import {
  ArrowLeft,
  FileBarChart,
  TrendingDown,
  Clock,
  Wifi,
  AlertTriangle,
  Download,
  CheckCircle2,
  Calendar,
} from "lucide-react";

// Mock report data
const alarmsByType = [
  { label: "Sturz", value: 12, color: "var(--danger)" },
  { label: "Temperatur", value: 8, color: "var(--warning)" },
  { label: "Tuer/Bewegung", value: 15, color: "var(--info)" },
  { label: "Rauch", value: 2, color: "var(--offline)" },
  { label: "Sensor-Offline", value: 5, color: "var(--text-tertiary)" },
];

const alarmTrend = [
  { label: "Mo", value: 8 },
  { label: "Di", value: 12 },
  { label: "Mi", value: 6 },
  { label: "Do", value: 14 },
  { label: "Fr", value: 9 },
  { label: "Sa", value: 4 },
  { label: "So", value: 3 },
];

const sensorDistribution = [
  { label: "Online", value: 32, color: "var(--accent)" },
  { label: "Warnung", value: 4, color: "var(--warning)" },
  { label: "Alarm", value: 2, color: "var(--danger)" },
  { label: "Offline", value: 4, color: "var(--offline)" },
];

export default function ReportsPage() {
  const router = useRouter();
  const [period, setPeriod] = useState<"heute" | "woche" | "monat">("woche");
  const [showExportToast, setShowExportToast] = useState(false);

  const openAlerts = alerts.filter((a) => !a.acknowledged).length;
  const totalSensors = rooms.reduce((sum, r) => sum + r.sensors.length, 0);
  const onlineSensors = rooms
    .filter((r) => r.status !== "offline")
    .reduce((sum, r) => sum + r.sensors.length, 0);
  const sensorUptime = Math.round((onlineSensors / totalSensors) * 100);

  const handleExport = () => {
    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3000);
  };

  return (
    <div className="px-4 py-5 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-text-secondary text-sm mb-4 transition-colors active:text-text-primary"
      >
        <ArrowLeft size={18} />
        Zurueck
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--info-dim)" }}
          >
            <FileBarChart size={22} className="text-info" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary tracking-tight">
              Berichte
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Analysen & Statistiken
            </p>
          </div>
        </div>
        <button
          onClick={handleExport}
          className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-[0.95]"
          style={{ background: "var(--bg-elevated)" }}
        >
          <Download size={18} className="text-text-secondary" />
        </button>
      </div>

      {/* Period tabs */}
      <div
        className="flex rounded-2xl p-1 mb-5"
        style={{ background: "var(--bg-elevated)" }}
      >
        {(["heute", "woche", "monat"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize"
            style={{
              background: period === p ? "var(--accent)" : "transparent",
              color: period === p ? "white" : "var(--text-secondary)",
            }}
          >
            {p === "heute" ? "Heute" : p === "woche" ? "Woche" : "Monat"}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-2 mb-6 stagger">
        <div className="glass p-3 text-center">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2"
            style={{ background: "var(--danger-dim)" }}
          >
            <AlertTriangle size={16} className="text-danger" />
          </div>
          <p className="text-xl font-bold text-text-primary">
            {period === "heute" ? openAlerts : period === "woche" ? 42 : 156}
          </p>
          <p className="text-[10px] text-text-tertiary font-medium">
            Alarme
          </p>
        </div>
        <div className="glass p-3 text-center">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2"
            style={{ background: "var(--accent-dim)" }}
          >
            <Clock size={16} className="text-accent" />
          </div>
          <p className="text-xl font-bold text-text-primary">
            {period === "heute" ? "2:34" : period === "woche" ? "3:12" : "2:48"}
          </p>
          <p className="text-[10px] text-text-tertiary font-medium">
            Ø Reaktion
          </p>
        </div>
        <div className="glass p-3 text-center">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2"
            style={{ background: "var(--info-dim)" }}
          >
            <Wifi size={16} className="text-info" />
          </div>
          <p className="text-xl font-bold text-accent">{sensorUptime}%</p>
          <p className="text-[10px] text-text-tertiary font-medium">
            Verfuegbarkeit
          </p>
        </div>
      </div>

      {/* Alarm Trend */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
        <TrendingDown size={12} />
        Alarmverlauf (7 Tage)
      </h3>
      <div className="glass p-4 mb-6">
        <LineChart
          data={alarmTrend}
          color="var(--danger)"
          height={140}
          showDots={true}
          showArea={true}
          showLabels={true}
        />
      </div>

      {/* Alarms by Type */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
        <AlertTriangle size={12} />
        Alarme nach Typ
      </h3>
      <div className="glass p-4 mb-6">
        <BarChart data={alarmsByType} />
      </div>

      {/* Sensor Status Distribution */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
        <Wifi size={12} />
        Sensor-Verteilung
      </h3>
      <div className="glass p-4 mb-6 flex justify-center">
        <DonutChart
          data={sensorDistribution}
          centerValue={String(totalSensors)}
          centerLabel="Sensoren"
        />
      </div>

      {/* Export button */}
      <button
        onClick={handleExport}
        className="w-full flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98] mb-5"
      >
        <Download size={16} />
        Bericht exportieren (PDF)
      </button>

      {/* Report info */}
      <div className="glass p-4 mb-5">
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-text-tertiary" />
          <div>
            <p className="text-xs text-text-secondary">Berichtszeitraum</p>
            <p className="text-sm font-medium text-text-primary">
              {period === "heute"
                ? "04. Maerz 2026"
                : period === "woche"
                  ? "26. Feb - 04. Maerz 2026"
                  : "Februar 2026"}
            </p>
          </div>
        </div>
      </div>

      {/* Export toast */}
      {showExportToast && (
        <div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 max-w-[400px] w-[calc(100%-32px)] z-[60] animate-slide-up"
        >
          <div
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
            style={{
              background: "var(--accent)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <CheckCircle2 size={20} className="text-white shrink-0" />
            <span className="text-sm font-semibold text-white">
              Bericht wird als PDF exportiert...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
