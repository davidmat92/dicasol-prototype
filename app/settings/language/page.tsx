"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Globe } from "lucide-react";

const languages = [
  { code: "de", label: "Deutsch", flag: "🇩🇪", active: true },
  { code: "en", label: "English", flag: "🇬🇧", active: false },
  { code: "tr", label: "Tuerkce", flag: "🇹🇷", active: false },
  { code: "pl", label: "Polski", flag: "🇵🇱", active: false },
  { code: "ru", label: "Russkiy", flag: "🇷🇺", active: false },
  { code: "ar", label: "Al-Arabiyyah", flag: "🇸🇦", active: false },
];

export default function LanguagePage() {
  const router = useRouter();
  const [selected, setSelected] = useState("de");

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
          style={{ background: "var(--info-dim)" }}
        >
          <Globe size={22} className="text-info" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            Sprache
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Waehlen Sie Ihre bevorzugte Sprache
          </p>
        </div>
      </div>

      <div className="glass divide-y divide-border overflow-hidden">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelected(lang.code)}
            className="w-full flex items-center gap-3 p-4 transition-colors active:bg-bg-elevated"
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="flex-1 text-left text-sm font-medium text-text-primary">
              {lang.label}
            </span>
            {selected === lang.code && (
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      <p className="text-[11px] text-text-tertiary text-center mt-4">
        Weitere Sprachen werden in zukuenftigen Updates hinzugefuegt.
      </p>
    </div>
  );
}
