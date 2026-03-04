"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getRoomById, getHistoryByRoom, getSensorAnalytics } from "@/app/lib/mock-data";
import StatusBadge from "@/app/components/StatusBadge";
import SensorIcon from "@/app/components/SensorIcon";
import Sparkline from "@/app/components/Sparkline";
import SensorAnalyticsChart from "@/app/components/SensorAnalyticsChart";
import Modal from "@/app/components/Modal";
import {
  ArrowLeft,
  Phone,
  Heart,
  Clock,
  Settings,
  Bell,
  BellOff,
  Activity,
  CheckCircle2,
  Pill,
  Utensils,
  Droplets,
  Moon,
  TrendingDown,
  TrendingUp,
  Minus,
  Wifi,
  Battery,
  Wrench,
} from "lucide-react";

export default function RoomDetail() {
  const params = useParams();
  const router = useRouter();
  const room = getRoomById(params.id as string);

  const [showCallModal, setShowCallModal] = useState(false);
  const [showCarePlan, setShowCarePlan] = useState(false);
  const [showSensorDetail, setShowSensorDetail] = useState<string | null>(null);
  const [roomNotifications, setRoomNotifications] = useState(true);

  if (!room) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-text-secondary">Raum nicht gefunden</p>
      </div>
    );
  }

  const history = getHistoryByRoom(room.id).slice(0, 6);

  // Status gradient
  const gradients: Record<string, string> = {
    alarm: "from-danger/30 via-danger/10 to-transparent",
    warnung: "from-warning/20 via-warning/5 to-transparent",
    ok: "from-accent/15 via-accent/5 to-transparent",
    offline: "from-offline/20 via-offline/5 to-transparent",
  };
  const gradient = gradients[room.status] ?? gradients.ok;

  const statusColor: Record<string, string> = {
    alarm: "var(--danger)",
    warnung: "var(--warning)",
    ok: "var(--accent)",
    offline: "var(--offline)",
  };

  const sensorIconColor: Record<string, string> = {
    alarm: "text-danger",
    warnung: "text-warning",
    ok: "text-accent",
    offline: "text-offline",
  };

  const sensorBg: Record<string, string> = {
    alarm: "bg-danger-dim",
    warnung: "bg-warning-dim",
    ok: "bg-accent-dim",
    offline: "bg-offline-dim",
  };

  const initials = room.resident.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const selectedSensor = showSensorDetail
    ? room.sensors.find((s) => s.id === showSensorDetail)
    : null;

  const sensorAnalytics = selectedSensor
    ? getSensorAnalytics(selectedSensor.id, selectedSensor.type, selectedSensor.status)
    : null;

  // Care plan mock data
  const carePlanItems = [
    {
      icon: Pill,
      time: "08:00",
      title: "Medikamentenausgabe",
      desc: "Blutdrucksenker, Schmerzmittel",
      done: true,
    },
    {
      icon: Utensils,
      time: "12:00",
      title: "Mittagessen",
      desc: "Diaetische Kost, pueriert",
      done: true,
    },
    {
      icon: Activity,
      time: "14:00",
      title: "Vitalzeichenkontrolle",
      desc: "Blutdruck, Puls, Temperatur",
      done: false,
    },
    {
      icon: Droplets,
      time: "15:00",
      title: "Koerperpflege",
      desc: "Teilwaschung, Hautpflege",
      done: false,
    },
    {
      icon: Pill,
      time: "18:00",
      title: "Medikamentenausgabe",
      desc: "Abendmedikation",
      done: false,
    },
    {
      icon: Moon,
      time: "20:00",
      title: "Bettruhe",
      desc: "Lagerung, Nachtmedikation",
      done: false,
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero header with gradient */}
      <div className={`bg-gradient-to-b ${gradient} px-4 pt-3 pb-6`}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-text-secondary text-sm transition-colors active:text-text-primary"
          >
            <ArrowLeft size={18} />
            Zurueck
          </button>

          {/* Room notification toggle */}
          <button
            onClick={() => setRoomNotifications(!roomNotifications)}
            className="p-2 rounded-xl transition-colors"
            style={{ background: "var(--bg-elevated)" }}
          >
            {roomNotifications ? (
              <Bell size={18} className="text-accent" />
            ) : (
              <BellOff size={18} className="text-text-tertiary" />
            )}
          </button>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              {room.name}
            </h1>
            <p className="text-sm text-text-secondary mt-0.5">
              {room.floorLabel}
            </p>
          </div>
          <StatusBadge status={room.status} />
        </div>
      </div>

      <div className="px-4 -mt-2 stagger">
        {/* Resident Card */}
        <div className="glass p-4 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold"
              style={{
                background: "var(--accent-dim)",
                color: "var(--accent)",
              }}
            >
              {initials}
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-[16px] text-text-primary">
                {room.resident.name}
              </h2>
              <p className="text-xs text-text-secondary mt-0.5">
                {room.resident.age} Jahre &middot; Pflegegrad{" "}
                {room.resident.careLevel}
              </p>
              {room.resident.notes && (
                <p className="text-[11px] text-text-tertiary mt-0.5">
                  {room.resident.notes}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCallModal(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold py-3 rounded-2xl transition-all active:scale-[0.98]"
            >
              <Phone size={16} />
              Anrufen
            </button>
            <button
              onClick={() => setShowCarePlan(true)}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-2xl transition-all active:scale-[0.98]"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-primary)",
              }}
            >
              <Heart size={16} />
              Pflegeplan
            </button>
          </div>
        </div>

        {/* Sensors Grid */}
        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
          Sensoren ({room.sensors.length})
        </h3>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {room.sensors.map((sensor) => {
            const sc = sensorIconColor[sensor.status] ?? "text-accent";
            const sb = sensorBg[sensor.status] ?? "bg-accent-dim";
            const sparkColor =
              statusColor[sensor.status] ?? "var(--accent)";

            return (
              <div
                key={sensor.id}
                className="glass p-3.5 cursor-pointer active:scale-[0.98] transition-transform"
                onClick={() => setShowSensorDetail(sensor.id)}
                role="button"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${sb}`}
                  >
                    <SensorIcon
                      type={sensor.type}
                      size={16}
                      className={sc}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-text-tertiary truncate">
                      {sensor.label}
                    </p>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p
                      className={`text-lg font-bold leading-tight ${
                        sensor.status === "alarm"
                          ? "text-danger"
                          : sensor.status === "warnung"
                            ? "text-warning"
                            : "text-text-primary"
                      }`}
                    >
                      {sensor.value}
                      <span className="text-xs text-text-tertiary font-normal">
                        {sensor.unit ?? ""}
                      </span>
                    </p>
                    <StatusBadge status={sensor.status} />
                  </div>
                  <Sparkline
                    data={sensor.sparkline}
                    color={sparkColor}
                    height={28}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Event Timeline */}
        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
          Letzte Ereignisse
        </h3>
        <div className="glass p-4 mb-6">
          {history.length === 0 ? (
            <p className="text-sm text-text-tertiary text-center py-4">
              Keine Ereignisse
            </p>
          ) : (
            <div className="space-y-0">
              {history.map((event, i) => {
                const severityColor =
                  event.severity === "kritisch"
                    ? "bg-danger"
                    : event.severity === "warnung"
                      ? "bg-warning"
                      : "bg-accent";
                const iconColor =
                  event.severity === "kritisch"
                    ? "text-danger"
                    : event.severity === "warnung"
                      ? "text-warning"
                      : "text-text-tertiary";

                return (
                  <div
                    key={event.id}
                    className={`flex items-start gap-3 py-3 ${
                      i < history.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    {/* Timeline dot + line */}
                    <div className="flex flex-col items-center pt-1">
                      <span
                        className={`w-2 h-2 rounded-full ${severityColor} shrink-0`}
                      />
                      {i < history.length - 1 && (
                        <div className="w-px flex-1 bg-border mt-1" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary">
                        {event.message}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Clock
                          size={10}
                          className="text-text-tertiary"
                        />
                        <span className="text-[11px] text-text-tertiary">
                          {event.time}
                        </span>
                        <SensorIcon
                          type={event.sensorType}
                          size={10}
                          className={iconColor}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Call Modal */}
      <Modal
        open={showCallModal}
        onClose={() => setShowCallModal(false)}
        title="Anrufen"
      >
        <div className="space-y-3">
          <button
            onClick={() => setShowCallModal(false)}
            className="w-full glass p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--accent-dim)" }}
            >
              <Phone size={20} className="text-accent" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-text-primary">
                Zimmer anrufen
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                {room.name} - Sprechanlage
              </p>
            </div>
          </button>

          <button
            onClick={() => setShowCallModal(false)}
            className="w-full glass p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--danger-dim)" }}
            >
              <Phone size={20} className="text-danger" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-text-primary">
                Notfallkontakt
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                Angehoerige: +49 170 1234567
              </p>
            </div>
          </button>

          <button
            onClick={() => setShowCallModal(false)}
            className="w-full glass p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--warning-dim)" }}
            >
              <Phone size={20} className="text-warning" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-text-primary">
                Dienstarzt
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                Dr. Mueller: +49 241 9876543
              </p>
            </div>
          </button>

          <button
            onClick={() => setShowCallModal(false)}
            className="w-full glass p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--info-dim)" }}
            >
              <Phone size={20} className="text-info" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-text-primary">
                Pflegestation
              </p>
              <p className="text-xs text-text-secondary mt-0.5">
                Station EG: +49 241 5551234
              </p>
            </div>
          </button>
        </div>
      </Modal>

      {/* Care Plan Modal */}
      <Modal
        open={showCarePlan}
        onClose={() => setShowCarePlan(false)}
        title={`Pflegeplan - ${room.resident.name}`}
      >
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs font-semibold text-accent px-2.5 py-1 rounded-lg bg-accent-dim">
            Pflegegrad {room.resident.careLevel}
          </span>
          {room.resident.notes && (
            <span className="text-xs text-text-tertiary">
              {room.resident.notes}
            </span>
          )}
        </div>

        <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
          Heutige Massnahmen
        </h3>
        <div className="space-y-2 mb-5">
          {carePlanItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`glass p-3.5 flex items-center gap-3 ${
                  item.done ? "opacity-50" : ""
                }`}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: item.done
                      ? "var(--accent-dim)"
                      : "var(--bg-elevated)",
                  }}
                >
                  {item.done ? (
                    <CheckCircle2 size={18} className="text-accent" />
                  ) : (
                    <Icon size={18} className="text-text-secondary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-text-tertiary font-medium">
                      {item.time}
                    </span>
                    <p
                      className={`text-sm font-medium ${
                        item.done
                          ? "text-text-tertiary line-through"
                          : "text-text-primary"
                      }`}
                    >
                      {item.title}
                    </p>
                  </div>
                  <p className="text-xs text-text-tertiary mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-primary font-medium">
              Fortschritt heute
            </span>
            <span className="text-sm font-semibold text-accent">
              {carePlanItems.filter((i) => i.done).length}/
              {carePlanItems.length}
            </span>
          </div>
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ background: "var(--bg-elevated)" }}
          >
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{
                width: `${
                  (carePlanItems.filter((i) => i.done).length /
                    carePlanItems.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </Modal>

      {/* Sensor Detail Modal (Enhanced Analytics) */}
      <Modal
        open={!!showSensorDetail && !!selectedSensor}
        onClose={() => setShowSensorDetail(null)}
        title={selectedSensor?.label ?? "Sensor"}
      >
        {selectedSensor && sensorAnalytics && (
          <>
            {/* Current Value Hero */}
            <div className="text-center mb-5">
              <div
                className={`w-14 h-14 rounded-3xl flex items-center justify-center mx-auto mb-2 ${
                  sensorBg[selectedSensor.status] ?? "bg-accent-dim"
                }`}
              >
                <SensorIcon
                  type={selectedSensor.type}
                  size={28}
                  className={
                    sensorIconColor[selectedSensor.status] ?? "text-accent"
                  }
                />
              </div>
              <p
                className={`text-3xl font-bold ${
                  selectedSensor.status === "alarm"
                    ? "text-danger"
                    : selectedSensor.status === "warnung"
                      ? "text-warning"
                      : "text-text-primary"
                }`}
              >
                {selectedSensor.value}
                <span className="text-lg text-text-tertiary font-normal">
                  {selectedSensor.unit ?? ""}
                </span>
              </p>
              <StatusBadge status={selectedSensor.status} />
            </div>

            {/* Min / Avg / Max Stats */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="glass p-3 text-center">
                <TrendingDown size={14} className="text-info mx-auto mb-1" />
                <p className="text-sm font-bold text-text-primary">
                  {sensorAnalytics.min}
                  <span className="text-[10px] text-text-tertiary font-normal">
                    {sensorAnalytics.thresholds.unit}
                  </span>
                </p>
                <p className="text-[10px] text-text-tertiary font-medium">
                  Minimum
                </p>
              </div>
              <div className="glass p-3 text-center">
                <Minus size={14} className="text-accent mx-auto mb-1" />
                <p className="text-sm font-bold text-accent">
                  {sensorAnalytics.avg}
                  <span className="text-[10px] text-text-tertiary font-normal">
                    {sensorAnalytics.thresholds.unit}
                  </span>
                </p>
                <p className="text-[10px] text-text-tertiary font-medium">
                  Durchschnitt
                </p>
              </div>
              <div className="glass p-3 text-center">
                <TrendingUp size={14} className="text-danger mx-auto mb-1" />
                <p className="text-sm font-bold text-text-primary">
                  {sensorAnalytics.max}
                  <span className="text-[10px] text-text-tertiary font-normal">
                    {sensorAnalytics.thresholds.unit}
                  </span>
                </p>
                <p className="text-[10px] text-text-tertiary font-medium">
                  Maximum
                </p>
              </div>
            </div>

            {/* 24h Analytics Chart with Threshold Zones */}
            <div className="glass p-4 mb-4">
              <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
                Verlauf (24 Stunden)
              </p>
              <SensorAnalyticsChart
                data={sensorAnalytics.history24h}
                thresholds={sensorAnalytics.thresholds}
                color={
                  statusColor[selectedSensor.status] ?? "var(--accent)"
                }
                height={160}
              />
              {/* Threshold legend */}
              {(sensorAnalytics.thresholds.warningHigh !== undefined ||
                sensorAnalytics.thresholds.alarmHigh !== undefined) && (
                <div className="flex items-center gap-4 mt-3 justify-center">
                  {sensorAnalytics.thresholds.warningHigh !== undefined && (
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-0 border-t border-dashed"
                        style={{ borderColor: "var(--warning)" }}
                      />
                      <span className="text-[10px] text-text-tertiary">
                        Warnung ({sensorAnalytics.thresholds.warningHigh}
                        {sensorAnalytics.thresholds.unit})
                      </span>
                    </div>
                  )}
                  {sensorAnalytics.thresholds.alarmHigh !== undefined && (
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-0 border-t border-dashed"
                        style={{ borderColor: "var(--danger)" }}
                      />
                      <span className="text-[10px] text-text-tertiary">
                        Alarm ({sensorAnalytics.thresholds.alarmHigh}
                        {sensorAnalytics.thresholds.unit})
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sensor Details */}
            <div className="glass divide-y divide-border overflow-hidden mb-4">
              <div className="flex items-center justify-between p-3.5">
                <span className="text-xs text-text-secondary">Typ</span>
                <span className="text-xs text-text-primary capitalize font-medium">
                  {selectedSensor.type}
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-xs text-text-secondary">Status</span>
                <StatusBadge status={selectedSensor.status} />
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-xs text-text-secondary">Sensor-ID</span>
                <span className="text-[11px] text-text-tertiary font-mono">
                  {selectedSensor.id}
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <span className="text-xs text-text-secondary">Letzte Messung</span>
                <span className="text-xs text-text-primary font-medium">Jetzt</span>
              </div>
            </div>

            {/* Sensor Health */}
            <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">
              Sensor-Gesundheit
            </h4>
            <div className="glass divide-y divide-border overflow-hidden mb-4">
              <div className="flex items-center gap-3 p-3.5">
                <Wifi size={14} className="text-accent shrink-0" />
                <span className="text-xs text-text-secondary flex-1">Signalstaerke</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-16 h-1.5 rounded-full overflow-hidden"
                    style={{ background: "var(--bg-elevated)" }}
                  >
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${sensorAnalytics.signalStrength}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-text-primary font-medium w-8 text-right">
                    {sensorAnalytics.signalStrength}%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5">
                <Battery size={14} className="text-accent shrink-0" />
                <span className="text-xs text-text-secondary flex-1">Batterie</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-16 h-1.5 rounded-full overflow-hidden"
                    style={{ background: "var(--bg-elevated)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${sensorAnalytics.batteryLevel}%`,
                        background:
                          sensorAnalytics.batteryLevel > 30
                            ? "var(--accent)"
                            : "var(--warning)",
                      }}
                    />
                  </div>
                  <span className="text-[11px] text-text-primary font-medium w-8 text-right">
                    {sensorAnalytics.batteryLevel}%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5">
                <Wrench size={14} className="text-text-tertiary shrink-0" />
                <span className="text-xs text-text-secondary flex-1">Letzte Kalibrierung</span>
                <span className="text-[11px] text-text-primary font-medium">
                  {sensorAnalytics.lastCalibration}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowSensorDetail(null)}
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-2xl transition-all active:scale-[0.98]"
              style={{
                background: "var(--bg-elevated)",
                color: "var(--text-primary)",
              }}
            >
              <Settings size={16} />
              Sensor kalibrieren
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}
