"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Globe } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Locale } from "@/app/lib/translations";

const languages: { code: Locale | string; label: string; flag: string; enabled: boolean }[] = [
  { code: "de", label: "Deutsch", flag: "\u{1F1E9}\u{1F1EA}", enabled: true },
  { code: "en", label: "English", flag: "\u{1F1EC}\u{1F1E7}", enabled: true },
  { code: "pl", label: "Polski", flag: "\u{1F1F5}\u{1F1F1}", enabled: true },
  { code: "tr", label: "Tuerkce", flag: "\u{1F1F9}\u{1F1F7}", enabled: false },
  { code: "ru", label: "Russkiy", flag: "\u{1F1F7}\u{1F1FA}", enabled: false },
  { code: "ar", label: "Al-Arabiyyah", flag: "\u{1F1F8}\u{1F1E6}", enabled: false },
];

export default function LanguagePage() {
  const router = useRouter();
  const { locale, setLocale, t } = useLanguage();

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
          style={{ background: "var(--info-dim)" }}
        >
          <Globe size={22} className="text-info" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            {t("language.title")}
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            {t("language.subtitle")}
          </p>
        </div>
      </div>

      <div className="glass divide-y divide-border overflow-hidden">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              if (lang.enabled) {
                setLocale(lang.code as Locale);
              }
            }}
            className={`w-full flex items-center gap-3 p-4 transition-colors active:bg-bg-elevated ${!lang.enabled ? "opacity-40" : ""}`}
            disabled={!lang.enabled}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="flex-1 text-left text-sm font-medium text-text-primary">
              {lang.label}
            </span>
            {!lang.enabled && (
              <span className="text-[10px] text-text-tertiary px-2 py-0.5 rounded-full bg-bg-elevated">
                {locale === "de" ? "Bald" : locale === "en" ? "Soon" : "Wkrotce"}
              </span>
            )}
            {locale === lang.code && (
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      <p className="text-[11px] text-text-tertiary text-center mt-4">
        {t("language.hint")}
      </p>
    </div>
  );
}
