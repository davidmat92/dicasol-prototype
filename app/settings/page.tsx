"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";
import { useAuth } from "@/app/context/AuthContext";
import Modal from "@/app/components/Modal";
import {
  Bell,
  Globe,
  Shield,
  Moon,
  Sun,
  Volume2,
  Smartphone,
  Building2,
  ChevronRight,
  LogOut,
  HelpCircle,
  Info,
  User,
  Camera,
  Mail,
  Phone,
  Users,
  Calendar,
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
      style={{ background: enabled ? "var(--accent)" : "var(--toggle-track)" }}
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

interface SettingRowProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onClick?: () => void;
}

function SettingRow({
  icon,
  iconBg,
  title,
  subtitle,
  right,
  onClick,
}: SettingRowProps) {
  return (
    <div
      className="flex items-center gap-3 p-4 transition-colors active:bg-bg-elevated"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{title}</p>
        {subtitle && (
          <p className="text-xs text-text-tertiary mt-0.5">{subtitle}</p>
        )}
      </div>
      {right}
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const chevron = (
    <ChevronRight size={18} className="text-text-tertiary" />
  );

  const isDark = theme === "dark";

  return (
    <div className="px-4 py-5 animate-fade-in">
      <h1 className="text-[22px] font-bold text-text-primary tracking-tight mb-5">
        Einstellungen
      </h1>

      {/* Profile Card */}
      <div
        className="glass p-4 mb-6 active:scale-[0.99] transition-transform cursor-pointer"
        onClick={() => setShowProfile(true)}
        role="button"
      >
        <div className="flex items-center gap-3.5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold"
            style={{
              background: "var(--accent-dim)",
              color: "var(--accent)",
            }}
          >
            MS
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-[16px] text-text-primary">
              Maria Schneider
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Pflegefachkraft &middot; Nachmittagsschicht
            </p>
            <p className="text-xs text-accent font-medium mt-0.5">
              Seniorenheim Sonnenschein
            </p>
          </div>
          <ChevronRight size={18} className="text-text-tertiary" />
        </div>
      </div>

      {/* Notifications */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        Benachrichtigungen
      </h3>
      <div className="glass mb-6 divide-y divide-border overflow-hidden">
        <SettingRow
          icon={<Bell size={18} className="text-accent" />}
          iconBg="var(--accent-dim)"
          title="Push-Benachrichtigungen"
          subtitle="Sofortige Alarme erhalten"
          right={chevron}
          onClick={() => router.push("/settings/notifications")}
        />
        <SettingRow
          icon={<Volume2 size={18} className="text-warning" />}
          iconBg="var(--warning-dim)"
          title="Alarmsound"
          subtitle="Akustische Signale bei Alarmen"
          right={
            <ToggleSwitch
              enabled={soundEnabled}
              onToggle={() => setSoundEnabled(!soundEnabled)}
            />
          }
        />
        <SettingRow
          icon={<Smartphone size={18} className="text-info" />}
          iconBg="var(--info-dim)"
          title="Vibration"
          subtitle="Vibrationsalarm bei Ereignissen"
          right={
            <ToggleSwitch
              enabled={vibration}
              onToggle={() => setVibration(!vibration)}
            />
          }
        />
      </div>

      {/* Display */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        Darstellung
      </h3>
      <div className="glass mb-6 divide-y divide-border overflow-hidden">
        <SettingRow
          icon={<Globe size={18} className="text-info" />}
          iconBg="var(--info-dim)"
          title="Sprache"
          subtitle="Deutsch"
          right={chevron}
          onClick={() => router.push("/settings/language")}
        />
        <SettingRow
          icon={
            isDark ? (
              <Moon size={18} className="text-text-secondary" />
            ) : (
              <Sun size={18} className="text-warning" />
            )
          }
          iconBg={isDark ? "var(--bg-elevated)" : "var(--warning-dim)"}
          title={isDark ? "Dunkelmodus" : "Hellmodus"}
          subtitle={
            isDark ? "Augenschonende Darstellung" : "Helle Darstellung"
          }
          right={
            <ToggleSwitch enabled={isDark} onToggle={toggleTheme} />
          }
        />
      </div>

      {/* System */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        System
      </h3>
      <div className="glass mb-6 divide-y divide-border overflow-hidden">
        <SettingRow
          icon={<Building2 size={18} className="text-accent" />}
          iconBg="var(--accent-dim)"
          title="Einrichtung"
          subtitle="Seniorenheim Sonnenschein"
          right={chevron}
          onClick={() => router.push("/settings/facility")}
        />
        <SettingRow
          icon={<Users size={18} className="text-info" />}
          iconBg="var(--info-dim)"
          title="Benutzerverwaltung"
          subtitle="8 Mitarbeiter"
          right={chevron}
          onClick={() => router.push("/admin/users")}
        />
        <SettingRow
          icon={<Calendar size={18} className="text-warning" />}
          iconBg="var(--warning-dim)"
          title="Schichtplan"
          subtitle="KW 10"
          right={chevron}
          onClick={() => router.push("/admin/schedule")}
        />
        <SettingRow
          icon={<Shield size={18} className="text-accent" />}
          iconBg="var(--success-dim)"
          title="Datenschutz"
          subtitle="DSGVO-konform"
          right={chevron}
          onClick={() => router.push("/settings/privacy")}
        />
        <SettingRow
          icon={<HelpCircle size={18} className="text-text-secondary" />}
          iconBg="var(--bg-elevated)"
          title="Hilfe & Support"
          right={chevron}
          onClick={() => router.push("/settings/help")}
        />
        <SettingRow
          icon={<Info size={18} className="text-text-secondary" />}
          iconBg="var(--bg-elevated)"
          title="Ueber DICASOL"
          subtitle="Version 3.0.0"
          right={chevron}
          onClick={() => router.push("/settings/about")}
        />
      </div>

      {/* Logout */}
      <button
        onClick={() => setShowLogout(true)}
        className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98] mb-6 bg-danger-dim text-danger border border-danger/20"
      >
        <LogOut size={18} />
        Abmelden
      </button>

      {/* Version info */}
      <p className="text-center text-[11px] text-text-tertiary mb-4">
        DICASOL UG &middot; Version 3.0.0 &middot; Maerz 2026
      </p>

      {/* Logout Confirmation Modal */}
      <Modal
        open={showLogout}
        onClose={() => setShowLogout(false)}
        title="Abmelden"
      >
        <div className="text-center mb-6">
          <div
            className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--danger-dim)" }}
          >
            <LogOut size={28} className="text-danger" />
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            Moechten Sie sich wirklich abmelden? Sie erhalten dann keine
            Push-Benachrichtigungen mehr, bis Sie sich erneut anmelden.
          </p>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => {
              setShowLogout(false);
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 bg-danger text-white text-sm font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98]"
          >
            <LogOut size={16} />
            Ja, abmelden
          </button>
          <button
            onClick={() => setShowLogout(false)}
            className="w-full text-sm font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98]"
            style={{
              background: "var(--bg-elevated)",
              color: "var(--text-primary)",
            }}
          >
            Abbrechen
          </button>
        </div>
      </Modal>

      {/* Profile Modal */}
      <Modal
        open={showProfile}
        onClose={() => setShowProfile(false)}
        title="Profil"
      >
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-bold"
              style={{
                background: "var(--accent-dim)",
                color: "var(--accent)",
              }}
            >
              MS
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent flex items-center justify-center"
            >
              <Camera size={14} className="text-white" />
            </button>
          </div>
          <h2 className="text-lg font-bold text-text-primary">
            Maria Schneider
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Pflegefachkraft
          </p>
        </div>

        <div className="glass divide-y divide-border overflow-hidden mb-4">
          <div className="flex items-center gap-3 p-4">
            <User size={18} className="text-text-tertiary" />
            <div className="flex-1">
              <p className="text-[11px] text-text-tertiary">Name</p>
              <p className="text-sm text-text-primary">Maria Schneider</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4">
            <Mail size={18} className="text-text-tertiary" />
            <div className="flex-1">
              <p className="text-[11px] text-text-tertiary">E-Mail</p>
              <p className="text-sm text-text-primary">
                m.schneider@sonnenschein.de
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4">
            <Phone size={18} className="text-text-tertiary" />
            <div className="flex-1">
              <p className="text-[11px] text-text-tertiary">Telefon</p>
              <p className="text-sm text-text-primary">+49 241 1234567</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4">
            <Building2 size={18} className="text-text-tertiary" />
            <div className="flex-1">
              <p className="text-[11px] text-text-tertiary">Einrichtung</p>
              <p className="text-sm text-text-primary">
                Seniorenheim Sonnenschein
              </p>
            </div>
          </div>
        </div>

        <div className="glass divide-y divide-border overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-text-primary">Schicht</span>
            <span className="text-sm text-text-secondary">Nachmittag</span>
          </div>
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-text-primary">Bereich</span>
            <span className="text-sm text-text-secondary">
              EG & 1. OG
            </span>
          </div>
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-text-primary">Rolle</span>
            <span className="text-xs font-semibold text-accent px-2 py-0.5 rounded-lg bg-accent-dim">
              Pflegefachkraft
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
