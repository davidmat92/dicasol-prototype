"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Video,
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const faqs = [
  {
    q: "Wie fuege ich einen neuen Bewohner hinzu?",
    a: "Gehen Sie zu Einstellungen > Einrichtung und waehlen Sie 'Neuen Bewohner anlegen'. Fuelren Sie die Stammdaten aus und weisen Sie ein Zimmer zu.",
  },
  {
    q: "Was bedeuten die verschiedenen Alarmfarben?",
    a: "Rot (Kritisch): Sofortige Aufmerksamkeit erforderlich, z.B. Sturz. Orange (Warnung): Erhoehte Aufmerksamkeit noetig, z.B. hohe Temperatur. Blau (Info): Informative Meldung, keine sofortige Aktion noetig.",
  },
  {
    q: "Wie kalibriere ich einen Sensor?",
    a: "Oeffnen Sie die Zimmerdetailseite und tippen Sie auf den jeweiligen Sensor. Waehlen Sie 'Kalibrieren' im Sensormenue. Folgen Sie den Anweisungen auf dem Bildschirm.",
  },
  {
    q: "Kann ich Benachrichtigungen fuer bestimmte Raeume deaktivieren?",
    a: "Ja, gehen Sie auf die Zimmerdetailseite und tippen Sie auf das Einstellungs-Symbol. Dort koennen Sie individuelle Benachrichtigungseinstellungen vornehmen.",
  },
  {
    q: "Wie exportiere ich Berichte?",
    a: "Gehen Sie zum Verlauf, waehlen Sie den gewuenschten Zeitraum und tippen Sie auf das Export-Symbol oben rechts. Berichte koennen als PDF oder CSV exportiert werden.",
  },
];

export default function HelpPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
          style={{ background: "var(--bg-elevated)" }}
        >
          <HelpCircle size={22} className="text-text-secondary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            {t("help.title")}
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            {t("help.subtitle")}
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        {t("help.contact")}
      </h3>
      <div className="grid grid-cols-2 gap-2 mb-6">
        <button className="glass p-4 text-center transition-all active:scale-[0.98]">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-2"
            style={{ background: "var(--accent-dim)" }}
          >
            <Phone size={20} className="text-accent" />
          </div>
          <p className="text-sm font-semibold text-text-primary">{t("help.call")}</p>
          <p className="text-[11px] text-text-tertiary mt-0.5">
            {t("help.callHours")}
          </p>
        </button>
        <button className="glass p-4 text-center transition-all active:scale-[0.98]">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-2"
            style={{ background: "var(--info-dim)" }}
          >
            <Mail size={20} className="text-info" />
          </div>
          <p className="text-sm font-semibold text-text-primary">{t("common.email")}</p>
          <p className="text-[11px] text-text-tertiary mt-0.5">
            support@dicasol.de
          </p>
        </button>
        <button className="glass p-4 text-center transition-all active:scale-[0.98]">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-2"
            style={{ background: "var(--warning-dim)" }}
          >
            <MessageCircle size={20} className="text-warning" />
          </div>
          <p className="text-sm font-semibold text-text-primary">{t("help.liveChat")}</p>
          <p className="text-[11px] text-text-tertiary mt-0.5">
            {t("help.liveChatDesc")}
          </p>
        </button>
        <button className="glass p-4 text-center transition-all active:scale-[0.98]">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-2"
            style={{ background: "var(--bg-elevated)" }}
          >
            <Video size={20} className="text-text-secondary" />
          </div>
          <p className="text-sm font-semibold text-text-primary">{t("help.tutorials")}</p>
          <p className="text-[11px] text-text-tertiary mt-0.5">
            {t("help.videoGuides")}
          </p>
        </button>
      </div>

      {/* Resources */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        {t("help.resources")}
      </h3>
      <div className="glass mb-6 divide-y divide-border overflow-hidden">
        <div className="flex items-center gap-3 p-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "var(--accent-dim)" }}
          >
            <BookOpen size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">
              {t("help.manual")}
            </p>
            <p className="text-xs text-text-tertiary mt-0.5">
              {t("help.manualDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        {t("help.faq")}
      </h3>
      <div className="glass divide-y divide-border overflow-hidden mb-6">
        {faqs.map((faq, i) => (
          <button
            key={i}
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            className="w-full text-left p-4 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-text-primary">{faq.q}</p>
              {openFaq === i ? (
                <ChevronUp
                  size={16}
                  className="text-text-tertiary shrink-0 mt-0.5"
                />
              ) : (
                <ChevronDown
                  size={16}
                  className="text-text-tertiary shrink-0 mt-0.5"
                />
              )}
            </div>
            {openFaq === i && (
              <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                {faq.a}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
