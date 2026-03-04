"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  FileText,
  Server,
  CheckCircle2,
} from "lucide-react";

const privacyFeatures = [
  {
    icon: Eye,
    title: "Keine Kameras oder Mikrofone",
    description:
      "DICASOL verzichtet bewusst auf Bild- und Tonaufnahmen. Alle Sensoren erfassen ausschliesslich Umgebungsdaten.",
  },
  {
    icon: Lock,
    title: "Ende-zu-Ende-Verschluesselung",
    description:
      "Alle Sensordaten werden verschluesselt uebertragen und in zertifizierten deutschen Rechenzentren gespeichert.",
  },
  {
    icon: Server,
    title: "DSGVO-konformes Hosting",
    description:
      "Unsere Server stehen ausschliesslich in Deutschland. Es erfolgt keine Datenuebertragung in Drittlaender.",
  },
  {
    icon: FileText,
    title: "Datenminimierung",
    description:
      "Es werden nur die fuer die Pflege notwendigen Daten erfasst. Bewegungsprofile werden anonymisiert gespeichert.",
  },
];

export default function PrivacyPage() {
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

      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: "var(--success-dim)" }}
        >
          <Shield size={22} className="text-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            Datenschutz
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            DSGVO-konform &middot; TUeV-zertifiziert
          </p>
        </div>
      </div>

      {/* DSGVO Badge */}
      <div className="glass p-4 mb-5 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shrink-0">
          <CheckCircle2 size={24} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">
            Vollstaendig DSGVO-konform
          </p>
          <p className="text-xs text-text-secondary mt-0.5">
            Letzte Pruefung: Februar 2026
          </p>
          <p className="text-[11px] text-accent font-medium mt-0.5">
            Zertifiziert durch TUeV Rheinland
          </p>
        </div>
      </div>

      {/* Features */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        Datenschutz-Massnahmen
      </h3>
      <div className="space-y-3 stagger">
        {privacyFeatures.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div key={i} className="glass p-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "var(--accent-dim)" }}
                >
                  <Icon size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {feature.title}
                  </p>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Data access */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 mt-6">
        Ihre Rechte
      </h3>
      <div className="glass divide-y divide-border overflow-hidden mb-6">
        {[
          "Auskunftsrecht (Art. 15 DSGVO)",
          "Recht auf Berichtigung (Art. 16 DSGVO)",
          "Recht auf Loeschung (Art. 17 DSGVO)",
          "Recht auf Datenportabilitaet (Art. 20 DSGVO)",
        ].map((right, i) => (
          <div key={i} className="flex items-center gap-3 p-3.5">
            <CheckCircle2 size={16} className="text-accent shrink-0" />
            <span className="text-sm text-text-primary">{right}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
