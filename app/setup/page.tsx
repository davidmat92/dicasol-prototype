"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bed,
  User,
  QrCode,
  CheckCircle2,
  Wifi,
  Thermometer,
  Activity,
  DoorOpen,
  Flame,
  Wind,
} from "lucide-react";

const availableRooms = [
  { id: "new-1", name: "Zimmer 301", floor: "2. OG" },
  { id: "new-2", name: "Zimmer 302", floor: "2. OG" },
  { id: "new-3", name: "Zimmer 303", floor: "2. OG" },
];

const sensorTypes = [
  { type: "temperatur", label: "Temperatursensor", icon: Thermometer },
  { type: "bewegung", label: "Bewegungssensor", icon: Activity },
  { type: "tuer", label: "Tuersensor", icon: DoorOpen },
  { type: "rauch", label: "Rauchmelder", icon: Flame },
  { type: "luft", label: "Luftqualitaet", icon: Wind },
];

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [residentName, setResidentName] = useState("");
  const [residentAge, setResidentAge] = useState("");
  const [careLevel, setCareLevel] = useState(2);
  const [scanning, setScanning] = useState(false);
  const [scannedSensors, setScannedSensors] = useState<number>(0);
  const [testing, setTesting] = useState(false);
  const [testedSensors, setTestedSensors] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const totalSteps = 5;

  // Simulate sensor scanning
  useEffect(() => {
    if (scanning && scannedSensors < sensorTypes.length) {
      const timer = setTimeout(() => {
        setScannedSensors((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
    if (scannedSensors === sensorTypes.length && scanning) {
      setScanning(false);
    }
  }, [scanning, scannedSensors]);

  // Simulate sensor testing
  useEffect(() => {
    if (testing) {
      const nextUntested = testedSensors.findIndex((t) => !t);
      if (nextUntested >= 0) {
        const timer = setTimeout(() => {
          setTestedSensors((prev) => {
            const next = [...prev];
            next[nextUntested] = true;
            return next;
          });
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setTesting(false);
      }
    }
  }, [testing, testedSensors]);

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!selectedRoom;
      case 2:
        return residentName.length >= 2 && residentAge.length >= 1;
      case 3:
        return scannedSensors === sensorTypes.length;
      case 4:
        return testedSensors.every((t) => t);
      default:
        return true;
    }
  };

  return (
    <div className="px-4 py-5 animate-fade-in">
      {/* Back */}
      <button
        onClick={() => (step > 1 ? setStep(step - 1) : router.back())}
        className="flex items-center gap-1.5 text-text-secondary text-sm mb-4 transition-colors active:text-text-primary"
      >
        <ArrowLeft size={18} />
        {step > 1 ? "Zurueck" : "Abbrechen"}
      </button>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex-1 flex items-center gap-2">
            <div
              className="h-1.5 rounded-full flex-1 transition-all duration-500"
              style={{
                background:
                  i < step ? "var(--accent)" : "var(--bg-elevated)",
              }}
            />
          </div>
        ))}
        <span className="text-xs font-bold text-text-tertiary ml-1">
          {step}/{totalSteps}
        </span>
      </div>

      {/* Step 1: Room selection */}
      {step === 1 && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--accent-dim)" }}
            >
              <Bed size={22} className="text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                Zimmer waehlen
              </h1>
              <p className="text-xs text-text-secondary mt-0.5">
                Waehlen Sie das einzurichtende Zimmer
              </p>
            </div>
          </div>

          <div className="space-y-2 stagger">
            {availableRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className="w-full glass p-4 flex items-center gap-3 transition-all active:scale-[0.99]"
                style={{
                  borderColor:
                    selectedRoom === room.id
                      ? "var(--accent)"
                      : "var(--border)",
                  borderWidth: selectedRoom === room.id ? "2px" : "1px",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background:
                      selectedRoom === room.id
                        ? "var(--accent)"
                        : "var(--bg-elevated)",
                  }}
                >
                  <Bed
                    size={20}
                    className={
                      selectedRoom === room.id
                        ? "text-white"
                        : "text-text-tertiary"
                    }
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-text-primary">
                    {room.name}
                  </p>
                  <p className="text-xs text-text-tertiary">{room.floor}</p>
                </div>
                {selectedRoom === room.id && (
                  <CheckCircle2 size={20} className="text-accent" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Resident */}
      {step === 2 && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--info-dim)" }}
            >
              <User size={22} className="text-info" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                Bewohner zuordnen
              </h1>
              <p className="text-xs text-text-secondary mt-0.5">
                Stammdaten des Bewohners eingeben
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">
                Name
              </label>
              <input
                type="text"
                value={residentName}
                onChange={(e) => setResidentName(e.target.value)}
                placeholder="Vor- und Nachname"
                className="w-full px-4 py-3.5 rounded-2xl text-sm text-text-primary outline-none"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">
                Alter
              </label>
              <input
                type="number"
                value={residentAge}
                onChange={(e) => setResidentAge(e.target.value)}
                placeholder="Alter eingeben"
                className="w-full px-4 py-3.5 rounded-2xl text-sm text-text-primary outline-none"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block">
                Pflegegrad
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCareLevel(level)}
                    className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background:
                        careLevel === level
                          ? "var(--accent)"
                          : "var(--bg-card)",
                      color:
                        careLevel === level
                          ? "white"
                          : "var(--text-secondary)",
                      border: `1px solid ${careLevel === level ? "var(--accent)" : "var(--border)"}`,
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Sensor Scanning */}
      {step === 3 && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--warning-dim)" }}
            >
              <QrCode size={22} className="text-warning" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                Sensoren scannen
              </h1>
              <p className="text-xs text-text-secondary mt-0.5">
                QR-Codes der Sensoren scannen
              </p>
            </div>
          </div>

          {!scanning && scannedSensors === 0 && (
            <div className="text-center py-8">
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "var(--bg-elevated)" }}
              >
                <QrCode size={40} className="text-text-tertiary" />
              </div>
              <p className="text-sm text-text-secondary mb-6">
                Halten Sie die Kamera auf den QR-Code des Sensors.
              </p>
              <button
                onClick={() => setScanning(true)}
                className="mx-auto flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold px-8 py-3.5 rounded-2xl transition-all active:scale-[0.98]"
              >
                <QrCode size={16} />
                Scannen starten (Demo)
              </button>
            </div>
          )}

          {(scanning || scannedSensors > 0) && (
            <div className="space-y-2 stagger">
              {sensorTypes.map((sensor, i) => {
                const isScanned = i < scannedSensors;
                const isScanning =
                  scanning && i === scannedSensors;
                const Icon = sensor.icon;
                return (
                  <div
                    key={i}
                    className="glass p-4 flex items-center gap-3 transition-all"
                    style={{
                      opacity: isScanned || isScanning ? 1 : 0.4,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: isScanned
                          ? "var(--accent-dim)"
                          : "var(--bg-elevated)",
                      }}
                    >
                      <Icon
                        size={20}
                        className={
                          isScanned ? "text-accent" : "text-text-tertiary"
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">
                        {sensor.label}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {isScanned
                          ? "Erkannt"
                          : isScanning
                            ? "Wird gescannt..."
                            : "Ausstehend"}
                      </p>
                    </div>
                    {isScanned && (
                      <CheckCircle2 size={20} className="text-accent" />
                    )}
                    {isScanning && (
                      <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Step 4: Sensor Testing */}
      {step === 4 && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--accent-dim)" }}
            >
              <Wifi size={22} className="text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                Sensoren testen
              </h1>
              <p className="text-xs text-text-secondary mt-0.5">
                Verbindung und Funktion pruefen
              </p>
            </div>
          </div>

          {!testing && testedSensors.every((t) => !t) && (
            <button
              onClick={() => setTesting(true)}
              className="w-full flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98] mb-5"
            >
              <Wifi size={16} />
              Test starten
            </button>
          )}

          <div className="space-y-2 stagger">
            {sensorTypes.map((sensor, i) => {
              const Icon = sensor.icon;
              const tested = testedSensors[i];
              const isTesting =
                testing &&
                !tested &&
                i === testedSensors.findIndex((t) => !t);
              return (
                <div
                  key={i}
                  className="glass p-4 flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: tested
                        ? "var(--accent-dim)"
                        : "var(--bg-elevated)",
                    }}
                  >
                    <Icon
                      size={20}
                      className={
                        tested ? "text-accent" : "text-text-tertiary"
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      {sensor.label}
                    </p>
                    <p className="text-xs text-text-tertiary">
                      {tested
                        ? "Verbunden & funktionsfaehig"
                        : isTesting
                          ? "Wird getestet..."
                          : "Ausstehend"}
                    </p>
                  </div>
                  {tested && (
                    <CheckCircle2 size={20} className="text-accent" />
                  )}
                  {isTesting && (
                    <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                  )}
                </div>
              );
            })}
          </div>

          {testedSensors.every((t) => t) && (
            <div className="glass p-4 mt-4 flex items-center gap-3">
              <CheckCircle2 size={20} className="text-accent" />
              <p className="text-sm text-accent font-semibold">
                Alle Sensoren erfolgreich getestet!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 5: Done */}
      {step === 5 && (
        <div className="animate-fade-in text-center py-8">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Einrichtung abgeschlossen!
          </h1>
          <p className="text-sm text-text-secondary mb-2">
            {availableRooms.find((r) => r.id === selectedRoom)?.name} wurde
            erfolgreich eingerichtet.
          </p>
          <p className="text-sm text-text-secondary mb-8">
            {residentName} ({residentAge} J., Pflegegrad {careLevel})
          </p>

          <div className="glass p-4 text-left mb-6">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
              Zusammenfassung
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Zimmer</span>
                <span className="text-text-primary font-medium">
                  {availableRooms.find((r) => r.id === selectedRoom)?.name}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Bewohner</span>
                <span className="text-text-primary font-medium">
                  {residentName}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Sensoren</span>
                <span className="text-accent font-medium">
                  {sensorTypes.length} installiert
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold py-3.5 rounded-2xl transition-all active:scale-[0.98]"
          >
            Zum Dashboard
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Next button */}
      {step < 5 && (
        <button
          onClick={() => setStep(step + 1)}
          disabled={!canProceed()}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[398px] flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold py-4 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-40 z-30"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
        >
          Weiter
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
