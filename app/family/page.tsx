"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useLanguage } from "@/app/context/LanguageContext";
import { rooms } from "@/app/lib/mock-data";
import Modal from "@/app/components/Modal";
import {
  Heart,
  Sun,
  Moon,
  Activity,
  ThermometerSun,
  Coffee,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  CheckCircle2,
  Clock,
  Shield,
  Send,
  ChevronRight,
} from "lucide-react";

const familyActivities = [
  {
    time: "20:30",
    message: "Ihre Mutter hat die Abendmedikamente eingenommen.",
    icon: CheckCircle2,
    color: "var(--accent)",
    bg: "var(--accent-dim)",
  },
  {
    time: "19:15",
    message: "Abendessen wurde serviert und vollstaendig eingenommen.",
    icon: Coffee,
    color: "var(--accent)",
    bg: "var(--accent-dim)",
  },
  {
    time: "18:00",
    message: "Nachmittagsspaziergang im Garten (30 Minuten).",
    icon: Activity,
    color: "var(--info)",
    bg: "var(--info-dim)",
  },
  {
    time: "15:30",
    message: "Besuch von Frau Mueller. Gute Stimmung.",
    icon: Heart,
    color: "var(--danger)",
    bg: "var(--danger-dim)",
  },
  {
    time: "12:00",
    message: "Mittagessen eingenommen. Guter Appetit.",
    icon: Coffee,
    color: "var(--accent)",
    bg: "var(--accent-dim)",
  },
  {
    time: "10:00",
    message: "Morgengymnastik mit der Gruppe absolviert.",
    icon: Activity,
    color: "var(--info)",
    bg: "var(--info-dim)",
  },
  {
    time: "08:00",
    message: "Ruhige Nacht. Gut geschlafen.",
    icon: Moon,
    color: "var(--text-tertiary)",
    bg: "var(--bg-elevated)",
  },
];

export default function FamilyPage() {
  const { logout } = useAuth();
  const { t } = useLanguage();
  const [showMessage, setShowMessage] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [activeTab, setActiveTab] = useState<"aktuell" | "aktivitaet" | "info">("aktuell");

  // Use room 101 (Helga Braun) as the family member's mother
  const room = rooms[0];
  const resident = room.resident;

  const tempSensor = room.sensors.find((s) => s.type === "temperatur");

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageSent(true);
      setTimeout(() => {
        setShowMessage(false);
        setMessageSent(false);
        setMessageText("");
      }, 2000);
    }
  };

  return (
    <div
      className="min-h-[100dvh] animate-fade-in"
      style={{ background: "var(--bg)" }}
    >
      {/* Family Header */}
      <header
        className="sticky top-0 z-40 px-4 h-[60px] flex items-center justify-between"
        style={{
          background: "var(--bg-header)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <Heart size={18} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-[16px] tracking-tight text-text-primary block leading-tight">
              DICASOL
            </span>
            <span className="text-[10px] text-text-tertiary font-medium">
              {t("family.title")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(true)}
            className="p-2.5 rounded-2xl"
            style={{ background: "var(--bg-elevated)" }}
          >
            <Settings size={20} className="text-text-secondary" />
          </button>
        </div>
      </header>

      <div className="px-4 py-5">
        {/* Hero Status Card */}
        <div className="glass p-5 mb-5 text-center">
          <div
            className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-3"
            style={{ background: "var(--accent-dim)" }}
          >
            <Heart size={28} className="text-accent" />
          </div>
          <h1 className="text-xl font-bold text-text-primary mb-1">
            {t("family.motherOk")}
          </h1>
          <p className="text-sm text-text-secondary mb-1">
            {resident.name}, {resident.age} {t("family.years")}
          </p>
          <p className="text-xs text-text-tertiary">
            {room.name} · {t("settings.facilityName")}
          </p>

          <div className="grid grid-cols-3 gap-3 mt-5">
            <div
              className="p-3 rounded-xl"
              style={{ background: "var(--bg-elevated)" }}
            >
              <Activity size={16} className="mx-auto text-accent mb-1" />
              <p className="text-sm font-bold text-text-primary">Gut</p>
              <p className="text-[9px] text-text-tertiary">{t("family.activity")}</p>
            </div>
            <div
              className="p-3 rounded-xl"
              style={{ background: "var(--bg-elevated)" }}
            >
              <ThermometerSun
                size={16}
                className="mx-auto text-accent mb-1"
              />
              <p className="text-sm font-bold text-text-primary">
                {tempSensor?.value || "22"}°C
              </p>
              <p className="text-[9px] text-text-tertiary">{t("common.room")}</p>
            </div>
            <div
              className="p-3 rounded-xl"
              style={{ background: "var(--bg-elevated)" }}
            >
              <Moon size={16} className="mx-auto text-accent mb-1" />
              <p className="text-sm font-bold text-text-primary">Gut</p>
              <p className="text-[9px] text-text-tertiary">{t("family.sleep")}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex rounded-2xl p-1 mb-5"
          style={{ background: "var(--bg-elevated)" }}
        >
          {(["aktuell", "aktivitaet", "info"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all capitalize"
              style={{
                background: activeTab === tab ? "var(--accent)" : "transparent",
                color: activeTab === tab ? "white" : "var(--text-secondary)",
              }}
            >
              {tab === "aktuell"
                ? t("family.current")
                : tab === "aktivitaet"
                  ? t("family.activity")
                  : t("family.info")}
            </button>
          ))}
        </div>

        {/* Tab Content: Aktuell */}
        {activeTab === "aktuell" && (
          <div className="space-y-3 stagger">
            {/* Today's summary */}
            <div className="glass p-4">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
                {t("family.daySummary")}
              </h3>
              <div className="space-y-2.5">
                {familyActivities.slice(0, 3).map((act, i) => {
                  const Icon = act.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: act.bg }}
                      >
                        <Icon size={14} style={{ color: act.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-text-primary leading-snug">
                          {act.message}
                        </p>
                        <p className="text-[11px] text-text-tertiary mt-0.5">
                          {act.time} {t("family.oclock")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Message button */}
            <button
              onClick={() => setShowMessage(true)}
              className="w-full flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98]"
            >
              <MessageCircle size={16} />
              {t("family.sendMessage")}
            </button>
          </div>
        )}

        {/* Tab Content: Aktivitaet */}
        {activeTab === "aktivitaet" && (
          <div className="glass divide-y divide-border overflow-hidden">
            {familyActivities.map((act, i) => {
              const Icon = act.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: act.bg }}
                  >
                    <Icon size={14} style={{ color: act.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-primary leading-snug">
                      {act.message}
                    </p>
                    <p className="text-[11px] text-text-tertiary mt-0.5">
                      {act.time} {t("family.oclock")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Content: Info */}
        {activeTab === "info" && (
          <div className="space-y-3 stagger">
            <div className="glass p-4">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
                {t("family.residentInfo")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">{t("common.name")}</span>
                  <span className="text-sm font-medium text-text-primary">
                    {resident.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">{t("common.age")}</span>
                  <span className="text-sm font-medium text-text-primary">
                    {resident.age} {t("family.years")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">{t("common.room")}</span>
                  <span className="text-sm font-medium text-text-primary">
                    {room.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">
                    {t("room.careGrade")}
                  </span>
                  <span className="text-sm font-semibold text-accent">
                    {resident.careLevel}
                  </span>
                </div>
              </div>
            </div>

            <div className="glass p-4">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
                {t("family.facilityInfo")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">{t("common.name")}</span>
                  <span className="text-sm font-medium text-text-primary">
                    {t("settings.facilityName")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">{t("family.address")}</span>
                  <span className="text-sm font-medium text-text-primary">
                    {t("family.addressVal")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Telefon</span>
                  <span className="text-sm font-medium text-accent">
                    +49 241 123456
                  </span>
                </div>
              </div>
            </div>

            <div className="glass p-4 flex items-center gap-3">
              <Shield size={18} className="text-accent shrink-0" />
              <p className="text-xs text-text-secondary leading-relaxed">
                {t("family.gdprHint")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Family Bottom Nav */}
      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50"
        style={{
          background: "var(--bg-nav)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center justify-around h-[68px] px-2 pb-[env(safe-area-inset-bottom)]">
          {[
            { icon: Heart, label: t("family.overview"), tab: "aktuell" as const },
            { icon: Clock, label: t("family.activity"), tab: "aktivitaet" as const },
            { icon: MessageCircle, label: t("family.message"), tab: null },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() =>
                item.tab ? setActiveTab(item.tab) : setShowMessage(true)
              }
              className="flex flex-col items-center gap-1 px-4 py-1.5 relative"
            >
              {item.tab && activeTab === item.tab && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
              )}
              <item.icon
                size={22}
                strokeWidth={item.tab && activeTab === item.tab ? 2.5 : 1.8}
                className={
                  item.tab && activeTab === item.tab
                    ? "text-accent"
                    : "text-text-tertiary"
                }
              />
              <span
                className={`text-[10px] ${
                  item.tab && activeTab === item.tab
                    ? "text-accent font-semibold"
                    : "text-text-tertiary font-medium"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Message Modal */}
      <Modal
        open={showMessage}
        onClose={() => {
          setShowMessage(false);
          setMessageSent(false);
          setMessageText("");
        }}
        title={t("family.sendBtn")}
      >
        {messageSent ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-1">
              {t("family.sent")}
            </h3>
            <p className="text-sm text-text-secondary">
              {t("family.sentDesc")}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-text-secondary mb-4">
              {t("family.sendDesc")}
            </p>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={t("family.placeholder")}
              rows={4}
              className="w-full rounded-2xl p-4 text-sm text-text-primary outline-none resize-none mb-4"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="w-full flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-40"
            >
              <Send size={16} />
              {t("family.sendBtn")}
            </button>
          </div>
        )}
      </Modal>

      {/* Settings Modal */}
      <Modal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        title={t("settings.title")}
      >
        <div className="glass divide-y divide-border overflow-hidden mb-4">
          <div className="flex items-center gap-3 p-4">
            <Bell size={18} className="text-text-tertiary" />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">
                {t("settings.notifications")}
              </p>
              <p className="text-xs text-text-tertiary">
                {t("family.pushActive")}
              </p>
            </div>
            <ChevronRight size={16} className="text-text-tertiary" />
          </div>
          <div className="flex items-center gap-3 p-4">
            <Shield size={18} className="text-text-tertiary" />
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">
                {t("settings.privacy")}
              </p>
              <p className="text-xs text-text-tertiary">
                {t("settings.privacyDesc")}
              </p>
            </div>
            <ChevronRight size={16} className="text-text-tertiary" />
          </div>
        </div>

        <button
          onClick={() => {
            setShowSettings(false);
            logout();
          }}
          className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98] bg-danger-dim text-danger border border-danger/20"
        >
          <LogOut size={16} />
          {t("settings.logout")}
        </button>
      </Modal>
    </div>
  );
}
