"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/app/context/AuthContext";
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Users,
} from "lucide-react";

type LoginStep = "splash" | "credentials" | "2fa" | "success";

export default function LoginPage() {
  const { login, setUserRole, userRole } = useAuth();
  const [step, setStep] = useState<LoginStep>("splash");
  const [email, setEmail] = useState("m.schneider@sonnenschein.de");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Splash auto-advance
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep("credentials");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-submit 2FA when all digits entered
  useEffect(() => {
    if (step === "2fa" && code.every((d) => d !== "")) {
      handle2FASubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, step]);

  const handleCredentialSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("2fa");
    }, 1200);
  };

  const handle2FASubmit = () => {
    setIsLoading(true);
    const enteredCode = code.join("");
    // Accept any 6-digit code for demo purposes
    if (enteredCode.length === 6) {
      setTimeout(() => {
        setIsLoading(false);
        setStep("success");
        // Auto-login after success animation
        setTimeout(() => {
          login();
        }, 1800);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setShakeError(true);
        setTimeout(() => setShakeError(false), 500);
        setCode(["", "", "", "", "", ""]);
        codeRefs.current[0]?.focus();
      }, 800);
    }
  };

  const handleCodeInput = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  // --- SPLASH SCREEN ---
  if (step === "splash") {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center z-[200]"
        style={{ background: "var(--bg)" }}
      >
        <div className="animate-fade-in text-center">
          <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <span className="text-white font-bold text-3xl tracking-tight">
              D
            </span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight mb-2">
            DICASOL
          </h1>
          <p className="text-sm text-text-secondary">
            Intelligentes Pflege-Monitoring
          </p>
          <div className="mt-8 flex items-center gap-2 justify-center">
            <div
              className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
              style={{ animationDelay: "200ms" }}
            />
            <div
              className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
              style={{ animationDelay: "400ms" }}
            />
          </div>
        </div>
      </div>
    );
  }

  // --- SUCCESS SCREEN ---
  if (step === "success") {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center z-[200]"
        style={{ background: "var(--bg)" }}
      >
        <div className="animate-fade-in text-center">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Willkommen zurueck!
          </h2>
          <p className="text-sm text-text-secondary">
            {userRole === "angehoerig"
              ? "Sie werden zum Familienportal weitergeleitet..."
              : "Sie werden zum Dashboard weitergeleitet..."}
          </p>
          <div className="mt-6 w-32 h-1 rounded-full mx-auto overflow-hidden bg-bg-elevated">
            <div
              className="h-full bg-accent rounded-full"
              style={{
                animation: "fillBar 1.5s ease-out forwards",
              }}
            />
          </div>
        </div>
        <style jsx>{`
          @keyframes fillBar {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }

  // --- CREDENTIALS SCREEN ---
  if (step === "credentials") {
    return (
      <div
        className="fixed inset-0 z-[200] overflow-y-auto"
        style={{ background: "var(--bg)" }}
      >
        <div className="min-h-full flex flex-col max-w-[430px] mx-auto px-6 py-10">
          {/* Header */}
          <div className="animate-fade-in text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl tracking-tight">
                D
              </span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-1">
              Anmelden
            </h1>
            <p className="text-sm text-text-secondary">
              Melden Sie sich mit Ihren Zugangsdaten an
            </p>
          </div>

          {/* Role selector */}
          <div
            className="animate-fade-in flex rounded-2xl p-1 mb-8"
            style={{
              background: "var(--bg-elevated)",
              animationDelay: "50ms",
            }}
          >
            <button
              onClick={() => setUserRole("pflege")}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background:
                  userRole === "pflege" ? "var(--accent)" : "transparent",
                color:
                  userRole === "pflege" ? "white" : "var(--text-secondary)",
              }}
            >
              <Shield size={16} />
              Pflegekraft
            </button>
            <button
              onClick={() => setUserRole("angehoerig")}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background:
                  userRole === "angehoerig" ? "var(--accent)" : "transparent",
                color:
                  userRole === "angehoerig"
                    ? "white"
                    : "var(--text-secondary)",
              }}
            >
              <Users size={16} />
              Angehoerige/r
            </button>
          </div>

          {/* Form */}
          <div
            className="animate-fade-in space-y-4 mb-6"
            style={{ animationDelay: "100ms" }}
          >
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">
                E-Mail
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-colors"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <Mail size={18} className="text-text-tertiary shrink-0" />
                <input
                  type="email"
                  value={
                    userRole === "angehoerig"
                      ? "s.braun@email.de"
                      : email
                  }
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary"
                  placeholder="ihre.email@domain.de"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">
                Passwort
              </label>
              <div
                className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-colors"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <Lock size={18} className="text-text-tertiary shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-tertiary"
                  placeholder="Passwort eingeben"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-text-tertiary" />
                  ) : (
                    <Eye size={18} className="text-text-tertiary" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  className="w-5 h-5 rounded-md border flex items-center justify-center"
                  style={{
                    borderColor: "var(--accent)",
                    background: "var(--accent-dim)",
                  }}
                >
                  <CheckCircle2 size={14} className="text-accent" />
                </div>
                <span className="text-xs text-text-secondary">
                  Angemeldet bleiben
                </span>
              </label>
              <button className="text-xs text-accent font-medium">
                Passwort vergessen?
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            onClick={handleCredentialSubmit}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-60 mb-4"
            style={{ animationDelay: "150ms" }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Anmelden
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* Footer */}
          <div className="mt-auto text-center pt-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield size={14} className="text-accent" />
              <span className="text-[11px] text-text-tertiary font-medium">
                DSGVO-konform &middot; Ende-zu-Ende verschluesselt
              </span>
            </div>
            <p className="text-[10px] text-text-tertiary">
              DICASOL UG &middot; Version 3.0.0
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- 2FA SCREEN ---
  return (
    <div
      className="fixed inset-0 z-[200] overflow-y-auto"
      style={{ background: "var(--bg)" }}
    >
      <div className="min-h-full flex flex-col max-w-[430px] mx-auto px-6 py-10">
        {/* Header */}
        <div className="animate-fade-in text-center mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--accent-dim)" }}
          >
            <Smartphone size={28} className="text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight mb-2">
            Zwei-Faktor-Authentifizierung
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Geben Sie den 6-stelligen Code ein, den wir an Ihr Geraet gesendet
            haben.
          </p>
        </div>

        {/* Code inputs */}
        <div
          className={`animate-fade-in flex justify-center gap-3 mb-6 ${shakeError ? "animate-shake" : ""}`}
          style={{ animationDelay: "50ms" }}
        >
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                codeRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeInput(i, e.target.value)}
              onKeyDown={(e) => handleCodeKeyDown(i, e)}
              className="w-12 h-14 rounded-2xl text-center text-xl font-bold outline-none transition-all focus:ring-2 focus:ring-accent"
              style={{
                background: "var(--bg-card)",
                border: `2px solid ${digit ? "var(--accent)" : "var(--border)"}`,
                color: "var(--text-primary)",
              }}
              autoFocus={i === 0}
            />
          ))}
        </div>

        {/* Demo hint */}
        <div
          className="animate-fade-in glass p-3 mb-6 flex items-center gap-3"
          style={{ animationDelay: "100ms" }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "var(--info-dim)" }}
          >
            <Shield size={16} className="text-info" />
          </div>
          <div>
            <p className="text-[11px] text-text-secondary">
              <span className="font-semibold text-text-primary">
                Demo-Modus:
              </span>{" "}
              Geben Sie 123456 ein oder einen beliebigen 6-stelligen Code.
            </p>
          </div>
        </div>

        {/* Verify button */}
        <button
          onClick={handle2FASubmit}
          disabled={isLoading || code.some((d) => d === "")}
          className="w-full flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-40 mb-4"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Verifizieren
              <ArrowRight size={16} />
            </>
          )}
        </button>

        {/* Resend */}
        <button className="w-full text-sm text-text-secondary py-3 transition-colors active:text-text-primary">
          Code erneut senden
        </button>

        {/* Back */}
        <button
          onClick={() => {
            setStep("credentials");
            setCode(["", "", "", "", "", ""]);
          }}
          className="w-full text-sm text-text-tertiary py-3 mt-2 transition-colors active:text-text-primary"
        >
          Zurueck zur Anmeldung
        </button>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-4px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(4px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
