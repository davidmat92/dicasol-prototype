"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Info, ExternalLink, Award, Users, Zap } from "lucide-react";

const partners = [
  { name: "Deutsche Telekom", role: "IoT-Infrastruktur" },
  { name: "Steinel", role: "Sensortechnologie" },
  { name: "Enerthing", role: "Energieversorgung" },
  { name: "TUeV Rheinland", role: "Zertifizierung" },
];

const stats = [
  { value: "500+", label: "Installierte Zimmer" },
  { value: "99.9%", label: "Verfuegbarkeit" },
  { value: "< 3s", label: "Alarmzeit" },
  { value: "24/7", label: "Monitoring" },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="px-4 py-5 animate-fade-in">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-text-secondary text-sm mb-4 transition-colors active:text-text-primary"
      >
        <ArrowLeft size={18} />
        Zurueck
      </button>

      {/* Hero */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-3xl bg-accent flex items-center justify-center mx-auto mb-3">
          <span className="text-white font-bold text-2xl">D</span>
        </div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          DICASOL
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Intelligentes Pflege-Monitoring
        </p>
        <p className="text-xs text-text-tertiary mt-0.5">Version 3.0.0</p>
      </div>

      {/* Mission */}
      <div className="glass p-4 mb-5">
        <p className="text-sm text-text-secondary leading-relaxed">
          DICASOL steht fuer{" "}
          <span className="text-text-primary font-semibold">
            Digital Care Solution
          </span>
          . Unsere Mission ist es, durch intelligente Sensortechnologie die
          Sicherheit in Pflegeeinrichtungen zu erhoehen - ohne dabei die
          Privatsphaere der Bewohner einzuschraenken.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-3.5 text-center">
            <p className="text-lg font-bold text-accent">{stat.value}</p>
            <p className="text-[11px] text-text-tertiary font-medium mt-0.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Key features */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        Kernfunktionen
      </h3>
      <div className="glass divide-y divide-border overflow-hidden mb-5">
        {[
          {
            icon: Zap,
            title: "Echtzeit-Monitoring",
            desc: "Sofortige Alarme bei kritischen Ereignissen",
          },
          {
            icon: Award,
            title: "DSGVO-konform",
            desc: "Keine Kameras, keine Audioaufnahmen",
          },
          {
            icon: Users,
            title: "Multi-Rollen-System",
            desc: "Pflege, Verwaltung, Angehoerige",
          },
        ].map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div key={i} className="flex items-center gap-3 p-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "var(--accent-dim)" }}
              >
                <Icon size={18} className="text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  {feature.title}
                </p>
                <p className="text-xs text-text-tertiary mt-0.5">
                  {feature.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Partners */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        Partner & Zertifizierungen
      </h3>
      <div className="glass divide-y divide-border overflow-hidden mb-5">
        {partners.map((partner, i) => (
          <div key={i} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium text-text-primary">
                {partner.name}
              </p>
              <p className="text-xs text-text-tertiary mt-0.5">
                {partner.role}
              </p>
            </div>
            <ExternalLink size={14} className="text-text-tertiary" />
          </div>
        ))}
      </div>

      {/* Legal */}
      <div className="glass divide-y divide-border overflow-hidden mb-5">
        {["Impressum", "Nutzungsbedingungen", "Open-Source-Lizenzen"].map(
          (item, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <span className="text-sm text-text-primary">{item}</span>
              <ExternalLink size={14} className="text-text-tertiary" />
            </div>
          )
        )}
      </div>

      <p className="text-center text-[11px] text-text-tertiary mb-4">
        DICASOL UG &middot; Aachen, Deutschland
        <br />
        &copy; 2024-2026 Alle Rechte vorbehalten
      </p>
    </div>
  );
}
