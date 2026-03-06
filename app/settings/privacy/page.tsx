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
import { useLanguage } from "@/app/context/LanguageContext";

export default function PrivacyPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const privacyFeatures = [
    {
      icon: Eye,
      title: t("privacy.noCameras"),
      description: t("privacy.noCamerasDesc"),
    },
    {
      icon: Lock,
      title: t("privacy.encryption"),
      description: t("privacy.encryptionDesc"),
    },
    {
      icon: Server,
      title: t("privacy.hosting"),
      description: t("privacy.hostingDesc"),
    },
    {
      icon: FileText,
      title: t("privacy.dataMin"),
      description: t("privacy.dataMinDesc"),
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
          style={{ background: "var(--success-dim)" }}
        >
          <Shield size={22} className="text-accent" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            {t("privacy.title")}
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            {t("privacy.subtitle")}
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
            {t("privacy.compliant")}
          </p>
          <p className="text-xs text-text-secondary mt-0.5">
            {t("privacy.lastCheck")}
          </p>
          <p className="text-[11px] text-accent font-medium mt-0.5">
            {t("privacy.certified")}
          </p>
        </div>
      </div>

      {/* Features */}
      <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
        {t("privacy.measures")}
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
        {t("privacy.rights")}
      </h3>
      <div className="glass divide-y divide-border overflow-hidden mb-6">
        {[
          t("privacy.right1"),
          t("privacy.right2"),
          t("privacy.right3"),
          t("privacy.right4"),
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
