"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  ArrowLeft,
  Bell,
  BellOff,
  Smartphone,
  Mail,
  MessageSquare,
  Moon,
  Volume2,
  AlertTriangle,
  Thermometer,
  Flame,
  DoorOpen,
  Activity,
  Wind,
  MapPin,
  Droplets,
} from "lucide-react";

function ToggleSwitch({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="relative w-12 h-7 rounded-full transition-colors duration-200 shrink-0"
      style={{
        background: enabled ? "var(--accent)" : "var(--toggle-track)",
      }}
    >
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full shadow-md transition-transform duration-200 ${
          enabled ? "translate-x-5" : "translate-x-0.5"
        }`}
        style={{ background: "var(--toggle-thumb)" }}
      />
    </button>
  );
}

interface SliderProps {
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}

function Slider({ value, min, max, unit, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, var(--bg-elevated) ${pct}%, var(--bg-elevated) 100%)`,
        }}
      />
      <span className="text-xs font-semibold text-text-primary w-12 text-right">
        {value}
        {unit}
      </span>
    </div>
  );
}

export default function NotificationsPage() {
  const router = useRouter();
  const { t } = useLanguage();

  // Channels
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  // Alarm types
  const [sturzEnabled, setSturzEnabled] = useState(true);
  const [rauchEnabled, setRauchEnabled] = useState(true);
  const [tempEnabled, setTempEnabled] = useState(true);
  const [tuerEnabled, setTuerEnabled] = useState(true);
  const [bewegungEnabled, setBewegungEnabled] = useState(true);
  const [luftEnabled, setLuftEnabled] = useState(false);
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [feuchtigkeitEnabled, setFeuchtigkeitEnabled] = useState(false);

  // Thresholds
  const [tempThreshold, setTempThreshold] = useState(28);
  const [humidityThreshold, setHumidityThreshold] = useState(70);
  const [noMovementMin, setNoMovementMin] = useState(120);

  // Quiet hours
  const [quietMode, setQuietMode] = useState(true);
  const [quietFrom] = useState("22:00");
  const [quietTo] = useState("06:00");

  // Sound
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const alarmTypes = [
    {
      icon: AlertTriangle,
      label: t("notif.fall"),
      color: "text-danger",
      bg: "var(--danger-dim)",
      enabled: sturzEnabled,
      toggle: () => setSturzEnabled(!sturzEnabled),
    },
    {
      icon: Flame,
      label: t("notif.smoke"),
      color: "text-danger",
      bg: "var(--danger-dim)",
      enabled: rauchEnabled,
      toggle: () => setRauchEnabled(!rauchEnabled),
    },
    {
      icon: Thermometer,
      label: t("notif.tempWarning"),
      color: "text-warning",
      bg: "var(--warning-dim)",
      enabled: tempEnabled,
      toggle: () => setTempEnabled(!tempEnabled),
    },
    {
      icon: DoorOpen,
      label: t("notif.doorWindow"),
      color: "text-warning",
      bg: "var(--warning-dim)",
      enabled: tuerEnabled,
      toggle: () => setTuerEnabled(!tuerEnabled),
    },
    {
      icon: Activity,
      label: t("notif.motion"),
      color: "text-info",
      bg: "var(--info-dim)",
      enabled: bewegungEnabled,
      toggle: () => setBewegungEnabled(!bewegungEnabled),
    },
    {
      icon: Wind,
      label: t("notif.airQuality"),
      color: "text-info",
      bg: "var(--info-dim)",
      enabled: luftEnabled,
      toggle: () => setLuftEnabled(!luftEnabled),
    },
    {
      icon: MapPin,
      label: t("notif.gps"),
      color: "text-accent",
      bg: "var(--accent-dim)",
      enabled: gpsEnabled,
      toggle: () => setGpsEnabled(!gpsEnabled),
    },
    {
      icon: Droplets,
      label: t("notif.humidity"),
      color: "text-accent",
      bg: "var(--accent-dim)",
      enabled: feuchtigkeitEnabled,
      toggle: () =>
        setFeuchtigkeitEnabled(!feuchtigkeitEnabled),
    },
  ];

  return (
    <div className="px-4 py-5 animate-fade-in">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-text-secondary text-sm mb-4 transition-colors active:text-text-primary"
      >
        <ArrowLeft size={18} />
        {t("common.back")}
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--accent-dim)" }}
        >
          <Bell size={22} className="text-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            {t("notif.title")}
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            {t("notif.subtitle")}
          </p>
        </div>
      </div>

      {/* Channels */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        {t("notif.channels")}
      </h3>
      <div className="glass divide-y divide-border overflow-hidden mb-6">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--accent-dim)" }}
            >
              <Smartphone size={18} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {t("notif.push")}
              </p>
              <p className="text-xs text-text-tertiary">{t("notif.pushDesc")}</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={pushEnabled}
            onToggle={() => setPushEnabled(!pushEnabled)}
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--warning-dim)" }}
            >
              <MessageSquare size={18} className="text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{t("notif.sms")}</p>
              <p className="text-xs text-text-tertiary">
                {t("notif.smsDesc")}
              </p>
            </div>
          </div>
          <ToggleSwitch
            enabled={smsEnabled}
            onToggle={() => setSmsEnabled(!smsEnabled)}
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--info-dim)" }}
            >
              <Mail size={18} className="text-info" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">E-Mail</p>
              <p className="text-xs text-text-tertiary">{t("notif.emailDesc")}</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={emailEnabled}
            onToggle={() => setEmailEnabled(!emailEnabled)}
          />
        </div>
      </div>

      {/* Alarm types */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        {t("notif.alarmTypes")}
      </h3>
      <div className="glass divide-y divide-border overflow-hidden mb-6">
        {alarmTypes.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: item.bg }}
                >
                  <Icon size={16} className={item.color} />
                </div>
                <span className="text-sm text-text-primary">{item.label}</span>
              </div>
              <ToggleSwitch enabled={item.enabled} onToggle={item.toggle} />
            </div>
          );
        })}
      </div>

      {/* Thresholds */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        {t("notif.thresholds")}
      </h3>
      <div className="glass p-4 space-y-5 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-primary">
              {t("notif.tempThreshold")}
            </span>
          </div>
          <Slider
            value={tempThreshold}
            min={20}
            max={35}
            unit="°C"
            onChange={setTempThreshold}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-primary">
              {t("notif.humidityThreshold")}
            </span>
          </div>
          <Slider
            value={humidityThreshold}
            min={30}
            max={90}
            unit="%"
            onChange={setHumidityThreshold}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-primary">
              {t("notif.noMotion")}
            </span>
          </div>
          <Slider
            value={noMovementMin}
            min={30}
            max={360}
            unit=" Min"
            onChange={setNoMovementMin}
          />
        </div>
      </div>

      {/* Quiet mode */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        {t("notif.quietMode")}
      </h3>
      <div className="glass divide-y divide-border overflow-hidden mb-6">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--bg-elevated)" }}
            >
              <Moon size={18} className="text-text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {t("notif.quietMode")}
              </p>
              <p className="text-xs text-text-tertiary">
                {t("notif.quietOnly")}
              </p>
            </div>
          </div>
          <ToggleSwitch
            enabled={quietMode}
            onToggle={() => setQuietMode(!quietMode)}
          />
        </div>
        {quietMode && (
          <div className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">{t("notif.quietPeriod")}</span>
              <span className="text-sm font-semibold text-accent">
                {quietFrom} - {quietTo}
              </span>
            </div>
            <p className="text-xs text-text-tertiary mt-2">
              {t("notif.quietHint")}
            </p>
          </div>
        )}
      </div>

      {/* Sound & Vibration */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        {t("notif.soundVibration")}
      </h3>
      <div className="glass divide-y divide-border overflow-hidden mb-6">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Volume2 size={18} className="text-text-secondary" />
            <span className="text-sm text-text-primary">{t("settings.alarmSound")}</span>
          </div>
          <ToggleSwitch
            enabled={soundEnabled}
            onToggle={() => setSoundEnabled(!soundEnabled)}
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Smartphone size={18} className="text-text-secondary" />
            <span className="text-sm text-text-primary">{t("settings.vibration")}</span>
          </div>
          <ToggleSwitch
            enabled={vibrationEnabled}
            onToggle={() => setVibrationEnabled(!vibrationEnabled)}
          />
        </div>
      </div>
    </div>
  );
}
