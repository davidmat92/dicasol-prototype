// ============================================================
// DICASOL Mock Data - Pflege-Monitoring Plattform
// ============================================================

export type SensorType =
  | "sturz"
  | "rauch"
  | "temperatur"
  | "tuer"
  | "bewegung"
  | "luftqualitaet"
  | "alarm"
  | "gps"
  | "feuchtigkeit";

export type SensorStatus = "ok" | "warnung" | "alarm" | "offline";

export type AlertSeverity = "kritisch" | "warnung" | "info";

export type CareLevel = 1 | 2 | 3 | 4 | 5;

// -----------------------------------------------------------
// Residents
// -----------------------------------------------------------
export interface Resident {
  id: string;
  name: string;
  age: number;
  careLevel: CareLevel;
  notes?: string;
}

export const residents: Resident[] = [
  { id: "r1", name: "Helga Braun", age: 84, careLevel: 3, notes: "Sturzrisiko erhoht" },
  { id: "r2", name: "Werner Fischer", age: 91, careLevel: 4, notes: "Demenz, Weglaufrisiko" },
  { id: "r3", name: "Ingrid Schneider", age: 78, careLevel: 2 },
  { id: "r4", name: "Karl-Heinz Weber", age: 88, careLevel: 5, notes: "Bettlagerig" },
  { id: "r5", name: "Elfriede Hoffmann", age: 82, careLevel: 2 },
  { id: "r6", name: "Heinrich Muller", age: 76, careLevel: 1 },
  { id: "r7", name: "Margarete Schulz", age: 89, careLevel: 3, notes: "Nachtaktiv" },
  { id: "r8", name: "Otto Wagner", age: 93, careLevel: 4, notes: "Schwerhoerig" },
];

// -----------------------------------------------------------
// Sensors
// -----------------------------------------------------------
export interface Sensor {
  id: string;
  type: SensorType;
  label: string;
  value: string;
  unit?: string;
  status: SensorStatus;
  sparkline: number[];
}

// -----------------------------------------------------------
// Rooms
// -----------------------------------------------------------
export interface Room {
  id: string;
  name: string;
  floor: number;
  floorLabel: string;
  resident: Resident;
  status: SensorStatus;
  sensors: Sensor[];
  lastEvent: string;
  lastEventTime: string;
}

function sparkOk(): number[] {
  return [60, 65, 62, 68, 64, 66, 63, 67, 65, 64, 66, 65];
}
function sparkWarn(): number[] {
  return [62, 64, 68, 72, 76, 78, 82, 85, 88, 91, 94, 96];
}
function sparkAlarm(): number[] {
  return [50, 45, 30, 20, 90, 95, 98, 100, 95, 85, 92, 100];
}
function sparkFlat(): number[] {
  return [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40];
}
function sparkHumidity(): number[] {
  return [55, 56, 54, 58, 57, 55, 53, 56, 58, 57, 55, 54];
}
function sparkAir(): number[] {
  return [70, 72, 68, 74, 71, 73, 69, 75, 72, 70, 73, 71];
}
function sparkMovement(): number[] {
  return [10, 30, 80, 20, 5, 60, 40, 10, 0, 0, 70, 50];
}
function sparkDoor(): number[] {
  return [0, 0, 100, 0, 0, 100, 0, 0, 0, 100, 0, 0];
}

export const rooms: Room[] = [
  // --- ALARM: Sturz erkannt ---
  {
    id: "101",
    name: "Zimmer 101",
    floor: 1,
    floorLabel: "Erdgeschoss",
    resident: residents[0],
    status: "alarm",
    sensors: [
      { id: "s101-1", type: "sturz", label: "Sturzsensor", value: "ALARM", status: "alarm", sparkline: sparkAlarm() },
      { id: "s101-2", type: "temperatur", label: "Temperatur", value: "22.4", unit: "\u00b0C", status: "ok", sparkline: sparkOk() },
      { id: "s101-3", type: "bewegung", label: "Bewegung", value: "Keine", status: "warnung", sparkline: sparkMovement() },
      { id: "s101-4", type: "tuer", label: "Tuer", value: "Geschlossen", status: "ok", sparkline: sparkDoor() },
      { id: "s101-5", type: "feuchtigkeit", label: "Feuchtigkeit", value: "54", unit: "%", status: "ok", sparkline: sparkHumidity() },
    ],
    lastEvent: "Sturz erkannt - Sofort pruefen!",
    lastEventTime: "vor 2 Min.",
  },
  // --- WARNUNG: Temperatur ---
  {
    id: "102",
    name: "Zimmer 102",
    floor: 1,
    floorLabel: "Erdgeschoss",
    resident: residents[1],
    status: "warnung",
    sensors: [
      { id: "s102-1", type: "temperatur", label: "Temperatur", value: "28.7", unit: "\u00b0C", status: "warnung", sparkline: sparkWarn() },
      { id: "s102-2", type: "bewegung", label: "Bewegung", value: "Aktiv", status: "ok", sparkline: sparkMovement() },
      { id: "s102-3", type: "tuer", label: "Tuer", value: "Offen", status: "warnung", sparkline: sparkDoor() },
      { id: "s102-4", type: "luftqualitaet", label: "Luftqualitaet", value: "Gut", status: "ok", sparkline: sparkAir() },
      { id: "s102-5", type: "gps", label: "GPS-Tracker", value: "Im Zimmer", status: "ok", sparkline: sparkFlat() },
    ],
    lastEvent: "Temperatur ueber 28\u00b0C",
    lastEventTime: "vor 15 Min.",
  },
  // --- OFFLINE ---
  {
    id: "103",
    name: "Zimmer 103",
    floor: 1,
    floorLabel: "Erdgeschoss",
    resident: residents[2],
    status: "offline",
    sensors: [
      { id: "s103-1", type: "temperatur", label: "Temperatur", value: "--", status: "offline", sparkline: sparkFlat() },
      { id: "s103-2", type: "bewegung", label: "Bewegung", value: "--", status: "offline", sparkline: sparkFlat() },
      { id: "s103-3", type: "tuer", label: "Tuer", value: "--", status: "offline", sparkline: sparkFlat() },
      { id: "s103-4", type: "rauch", label: "Rauchmelder", value: "--", status: "offline", sparkline: sparkFlat() },
    ],
    lastEvent: "Verbindung verloren",
    lastEventTime: "vor 45 Min.",
  },
  // --- OK ---
  {
    id: "104",
    name: "Zimmer 104",
    floor: 1,
    floorLabel: "Erdgeschoss",
    resident: residents[3],
    status: "ok",
    sensors: [
      { id: "s104-1", type: "temperatur", label: "Temperatur", value: "21.8", unit: "\u00b0C", status: "ok", sparkline: sparkOk() },
      { id: "s104-2", type: "bewegung", label: "Bewegung", value: "Ruhig", status: "ok", sparkline: [5, 3, 2, 1, 0, 0, 0, 1, 0, 0, 0, 0] },
      { id: "s104-3", type: "feuchtigkeit", label: "Feuchtigkeit", value: "48", unit: "%", status: "ok", sparkline: sparkHumidity() },
      { id: "s104-4", type: "alarm", label: "Notruf", value: "Inaktiv", status: "ok", sparkline: sparkFlat() },
      { id: "s104-5", type: "luftqualitaet", label: "Luftqualitaet", value: "Sehr gut", status: "ok", sparkline: sparkAir() },
      { id: "s104-6", type: "rauch", label: "Rauchmelder", value: "OK", status: "ok", sparkline: sparkFlat() },
    ],
    lastEvent: "Vitalcheck abgeschlossen",
    lastEventTime: "vor 30 Min.",
  },
  // --- 1. OG Rooms ---
  {
    id: "201",
    name: "Zimmer 201",
    floor: 2,
    floorLabel: "1. Obergeschoss",
    resident: residents[4],
    status: "ok",
    sensors: [
      { id: "s201-1", type: "temperatur", label: "Temperatur", value: "22.1", unit: "\u00b0C", status: "ok", sparkline: sparkOk() },
      { id: "s201-2", type: "bewegung", label: "Bewegung", value: "Aktiv", status: "ok", sparkline: sparkMovement() },
      { id: "s201-3", type: "tuer", label: "Tuer", value: "Geschlossen", status: "ok", sparkline: sparkDoor() },
      { id: "s201-4", type: "feuchtigkeit", label: "Feuchtigkeit", value: "51", unit: "%", status: "ok", sparkline: sparkHumidity() },
    ],
    lastEvent: "Tuer geoffnet und geschlossen",
    lastEventTime: "vor 1 Std.",
  },
  {
    id: "202",
    name: "Zimmer 202",
    floor: 2,
    floorLabel: "1. Obergeschoss",
    resident: residents[5],
    status: "ok",
    sensors: [
      { id: "s202-1", type: "temperatur", label: "Temperatur", value: "21.5", unit: "\u00b0C", status: "ok", sparkline: sparkOk() },
      { id: "s202-2", type: "rauch", label: "Rauchmelder", value: "OK", status: "ok", sparkline: sparkFlat() },
      { id: "s202-3", type: "bewegung", label: "Bewegung", value: "Aktiv", status: "ok", sparkline: sparkMovement() },
      { id: "s202-4", type: "luftqualitaet", label: "Luftqualitaet", value: "Gut", status: "ok", sparkline: sparkAir() },
    ],
    lastEvent: "Morgenroutine erkannt",
    lastEventTime: "vor 2 Std.",
  },
  {
    id: "203",
    name: "Zimmer 203",
    floor: 2,
    floorLabel: "1. Obergeschoss",
    resident: residents[6],
    status: "ok",
    sensors: [
      { id: "s203-1", type: "temperatur", label: "Temperatur", value: "23.0", unit: "\u00b0C", status: "ok", sparkline: sparkOk() },
      { id: "s203-2", type: "bewegung", label: "Bewegung", value: "Ruhig", status: "ok", sparkline: [0, 0, 5, 10, 0, 0, 0, 0, 5, 0, 0, 0] },
      { id: "s203-3", type: "tuer", label: "Tuer", value: "Geschlossen", status: "ok", sparkline: sparkDoor() },
      { id: "s203-4", type: "sturz", label: "Sturzsensor", value: "OK", status: "ok", sparkline: sparkFlat() },
      { id: "s203-5", type: "feuchtigkeit", label: "Feuchtigkeit", value: "52", unit: "%", status: "ok", sparkline: sparkHumidity() },
    ],
    lastEvent: "Nachtruhe eingeleitet",
    lastEventTime: "vor 3 Std.",
  },
  {
    id: "204",
    name: "Zimmer 204",
    floor: 2,
    floorLabel: "1. Obergeschoss",
    resident: residents[7],
    status: "ok",
    sensors: [
      { id: "s204-1", type: "temperatur", label: "Temperatur", value: "21.9", unit: "\u00b0C", status: "ok", sparkline: sparkOk() },
      { id: "s204-2", type: "bewegung", label: "Bewegung", value: "Ruhig", status: "ok", sparkline: [2, 1, 0, 0, 0, 3, 5, 2, 0, 0, 0, 1] },
      { id: "s204-3", type: "alarm", label: "Notruf", value: "Inaktiv", status: "ok", sparkline: sparkFlat() },
      { id: "s204-4", type: "rauch", label: "Rauchmelder", value: "OK", status: "ok", sparkline: sparkFlat() },
      { id: "s204-5", type: "feuchtigkeit", label: "Feuchtigkeit", value: "49", unit: "%", status: "ok", sparkline: sparkHumidity() },
      { id: "s204-6", type: "luftqualitaet", label: "Luftqualitaet", value: "Gut", status: "ok", sparkline: sparkAir() },
    ],
    lastEvent: "Medikamentenausgabe bestaetigt",
    lastEventTime: "vor 4 Std.",
  },
];

// -----------------------------------------------------------
// Alerts
// -----------------------------------------------------------
export interface Alert {
  id: string;
  roomId: string;
  roomName: string;
  residentName: string;
  sensorType: SensorType;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  timeAgo: string;
  acknowledged: boolean;
}

export const alerts: Alert[] = [
  {
    id: "a1",
    roomId: "101",
    roomName: "Zimmer 101",
    residentName: "Helga Braun",
    sensorType: "sturz",
    severity: "kritisch",
    message: "Sturz erkannt - Bewohnerin am Boden. Sofortige Pruefung erforderlich.",
    timestamp: "2026-03-04T20:47:00",
    timeAgo: "vor 2 Min.",
    acknowledged: false,
  },
  {
    id: "a2",
    roomId: "102",
    roomName: "Zimmer 102",
    residentName: "Werner Fischer",
    sensorType: "temperatur",
    severity: "warnung",
    message: "Raumtemperatur ueber 28\u00b0C. Bitte Fenster oeffnen oder Klimaanlage pruefen.",
    timestamp: "2026-03-04T20:34:00",
    timeAgo: "vor 15 Min.",
    acknowledged: false,
  },
  {
    id: "a3",
    roomId: "102",
    roomName: "Zimmer 102",
    residentName: "Werner Fischer",
    sensorType: "tuer",
    severity: "warnung",
    message: "Zimmertur laenger als 10 Minuten offen. Weglaufrisiko beachten.",
    timestamp: "2026-03-04T20:20:00",
    timeAgo: "vor 29 Min.",
    acknowledged: false,
  },
  {
    id: "a4",
    roomId: "103",
    roomName: "Zimmer 103",
    residentName: "Ingrid Schneider",
    sensorType: "alarm",
    severity: "warnung",
    message: "Alle Sensoren offline. Netzwerkverbindung pruefen.",
    timestamp: "2026-03-04T20:04:00",
    timeAgo: "vor 45 Min.",
    acknowledged: true,
  },
  {
    id: "a5",
    roomId: "104",
    roomName: "Zimmer 104",
    residentName: "Karl-Heinz Weber",
    sensorType: "bewegung",
    severity: "info",
    message: "Keine Bewegung seit 2 Stunden erkannt. Vitalcheck empfohlen.",
    timestamp: "2026-03-04T19:30:00",
    timeAgo: "vor 1 Std.",
    acknowledged: true,
  },
  {
    id: "a6",
    roomId: "201",
    roomName: "Zimmer 201",
    residentName: "Elfriede Hoffmann",
    sensorType: "tuer",
    severity: "info",
    message: "Regelmaessiger Tuersensor-Check erfolgreich abgeschlossen.",
    timestamp: "2026-03-04T18:45:00",
    timeAgo: "vor 2 Std.",
    acknowledged: true,
  },
  {
    id: "a7",
    roomId: "203",
    roomName: "Zimmer 203",
    residentName: "Margarete Schulz",
    sensorType: "bewegung",
    severity: "info",
    message: "Naechtliche Aktivitaet erkannt. Muster wird ueberwacht.",
    timestamp: "2026-03-04T17:30:00",
    timeAgo: "vor 3 Std.",
    acknowledged: true,
  },
];

// -----------------------------------------------------------
// History events
// -----------------------------------------------------------
export interface HistoryEvent {
  id: string;
  roomId: string;
  roomName: string;
  sensorType: SensorType;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  time: string;
  date: string;
}

export const historyEvents: HistoryEvent[] = [
  { id: "h1", roomId: "101", roomName: "Zimmer 101", sensorType: "sturz", severity: "kritisch", message: "Sturz erkannt - Alarmmeldung ausgeloest", timestamp: "2026-03-04T20:47:00", time: "20:47", date: "Heute" },
  { id: "h2", roomId: "102", roomName: "Zimmer 102", sensorType: "temperatur", severity: "warnung", message: "Temperatur ueberschreitet 28\u00b0C Schwellenwert", timestamp: "2026-03-04T20:34:00", time: "20:34", date: "Heute" },
  { id: "h3", roomId: "102", roomName: "Zimmer 102", sensorType: "tuer", severity: "warnung", message: "Tuer laenger als 10 Min. geoeffnet", timestamp: "2026-03-04T20:20:00", time: "20:20", date: "Heute" },
  { id: "h4", roomId: "103", roomName: "Zimmer 103", sensorType: "alarm", severity: "warnung", message: "Sensorverbindung verloren - offline", timestamp: "2026-03-04T20:04:00", time: "20:04", date: "Heute" },
  { id: "h5", roomId: "104", roomName: "Zimmer 104", sensorType: "bewegung", severity: "info", message: "Vitalcheck durchgefuehrt - alles normal", timestamp: "2026-03-04T19:30:00", time: "19:30", date: "Heute" },
  { id: "h6", roomId: "201", roomName: "Zimmer 201", sensorType: "tuer", severity: "info", message: "Tuer geoeffnet und geschlossen", timestamp: "2026-03-04T19:00:00", time: "19:00", date: "Heute" },
  { id: "h7", roomId: "202", roomName: "Zimmer 202", sensorType: "bewegung", severity: "info", message: "Morgenroutine erkannt", timestamp: "2026-03-04T18:00:00", time: "18:00", date: "Heute" },
  { id: "h8", roomId: "203", roomName: "Zimmer 203", sensorType: "bewegung", severity: "info", message: "Nachtruhe eingeleitet", timestamp: "2026-03-04T17:00:00", time: "17:00", date: "Heute" },
  { id: "h9", roomId: "204", roomName: "Zimmer 204", sensorType: "alarm", severity: "info", message: "Medikamentenausgabe bestaetigt", timestamp: "2026-03-04T16:00:00", time: "16:00", date: "Heute" },
  { id: "h10", roomId: "101", roomName: "Zimmer 101", sensorType: "bewegung", severity: "info", message: "Normale Aktivitaet erkannt", timestamp: "2026-03-03T22:00:00", time: "22:00", date: "Gestern" },
  { id: "h11", roomId: "102", roomName: "Zimmer 102", sensorType: "gps", severity: "warnung", message: "GPS-Tracker: Bewohner im Gartenbereich", timestamp: "2026-03-03T15:30:00", time: "15:30", date: "Gestern" },
  { id: "h12", roomId: "104", roomName: "Zimmer 104", sensorType: "temperatur", severity: "info", message: "Heizung automatisch angepasst", timestamp: "2026-03-03T14:00:00", time: "14:00", date: "Gestern" },
  { id: "h13", roomId: "201", roomName: "Zimmer 201", sensorType: "rauch", severity: "info", message: "Rauchmelder-Test erfolgreich", timestamp: "2026-03-03T10:00:00", time: "10:00", date: "Gestern" },
  { id: "h14", roomId: "203", roomName: "Zimmer 203", sensorType: "sturz", severity: "info", message: "Sturzsensor kalibriert", timestamp: "2026-03-02T09:00:00", time: "09:00", date: "02.03.2026" },
  { id: "h15", roomId: "202", roomName: "Zimmer 202", sensorType: "luftqualitaet", severity: "info", message: "Luftqualitaet: Tagesbericht erstellt", timestamp: "2026-03-02T08:00:00", time: "08:00", date: "02.03.2026" },
];

// -----------------------------------------------------------
// Helper functions
// -----------------------------------------------------------
export function getRoomById(id: string): Room | undefined {
  return rooms.find((r) => r.id === id);
}

export function getAlertsByRoom(roomId: string): Alert[] {
  return alerts.filter((a) => a.roomId === roomId);
}

export function getOpenAlerts(): Alert[] {
  return alerts.filter((a) => !a.acknowledged);
}

export function getCriticalAlerts(): Alert[] {
  return alerts.filter((a) => a.severity === "kritisch" && !a.acknowledged);
}

export function getRoomsByStatus(status: SensorStatus): Room[] {
  return rooms.filter((r) => r.status === status);
}

export function getHistoryByDate(date: string): HistoryEvent[] {
  return historyEvents.filter((e) => e.date === date);
}

export function getHistoryByRoom(roomId: string): HistoryEvent[] {
  return historyEvents.filter((e) => e.roomId === roomId);
}

// -----------------------------------------------------------
// Search helper
// -----------------------------------------------------------
export interface SearchResult {
  type: "room" | "resident" | "event";
  id: string;
  title: string;
  subtitle: string;
  link: string;
  status?: SensorStatus;
}

export function searchAll(query: string): SearchResult[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  rooms.forEach((room) => {
    if (
      room.name.toLowerCase().includes(q) ||
      room.resident.name.toLowerCase().includes(q) ||
      room.floorLabel.toLowerCase().includes(q)
    ) {
      results.push({
        type: "room",
        id: room.id,
        title: room.name,
        subtitle: `${room.resident.name} · ${room.floorLabel}`,
        link: `/room/${room.id}`,
        status: room.status,
      });
    }
  });

  residents.forEach((res) => {
    const room = rooms.find((r) => r.resident.id === res.id);
    if (
      res.name.toLowerCase().includes(q) &&
      !results.some((r) => r.type === "room" && room && r.id === room.id)
    ) {
      results.push({
        type: "resident",
        id: res.id,
        title: res.name,
        subtitle: `${res.age} J. · Pflegegrad ${res.careLevel}${room ? ` · ${room.name}` : ""}`,
        link: room ? `/room/${room.id}` : "#",
      });
    }
  });

  historyEvents.forEach((ev) => {
    if (
      ev.message.toLowerCase().includes(q) ||
      ev.roomName.toLowerCase().includes(q)
    ) {
      results.push({
        type: "event",
        id: ev.id,
        title: ev.message,
        subtitle: `${ev.roomName} · ${ev.date} ${ev.time}`,
        link: `/room/${ev.roomId}`,
      });
    }
  });

  return results.slice(0, 20);
}

// -----------------------------------------------------------
// Staff Members
// -----------------------------------------------------------
export interface StaffMember {
  id: string;
  name: string;
  initials: string;
  role: "admin" | "pflegefachkraft" | "pflegehelfer" | "verwaltung";
  roleLabel: string;
  email: string;
  phone: string;
  shift: "frueh" | "spaet" | "nacht";
  shiftLabel: string;
  assignedRooms: string[];
  status: "online" | "offline" | "pause";
  lastActive: string;
}

export const staffMembers: StaffMember[] = [
  {
    id: "st1",
    name: "Maria Schneider",
    initials: "MS",
    role: "pflegefachkraft",
    roleLabel: "Pflegefachkraft",
    email: "m.schneider@sonnenschein.de",
    phone: "+49 241 1234567",
    shift: "spaet",
    shiftLabel: "Spaetschicht",
    assignedRooms: ["101", "102", "103", "104"],
    status: "online",
    lastActive: "Jetzt aktiv",
  },
  {
    id: "st2",
    name: "Thomas Mueller",
    initials: "TM",
    role: "admin",
    roleLabel: "Administrator",
    email: "t.mueller@sonnenschein.de",
    phone: "+49 241 1234568",
    shift: "frueh",
    shiftLabel: "Fruehschicht",
    assignedRooms: [],
    status: "offline",
    lastActive: "vor 2 Std.",
  },
  {
    id: "st3",
    name: "Anna Becker",
    initials: "AB",
    role: "pflegefachkraft",
    roleLabel: "Pflegefachkraft",
    email: "a.becker@sonnenschein.de",
    phone: "+49 241 1234569",
    shift: "spaet",
    shiftLabel: "Spaetschicht",
    assignedRooms: ["201", "202", "203", "204"],
    status: "online",
    lastActive: "Jetzt aktiv",
  },
  {
    id: "st4",
    name: "Stefan Klein",
    initials: "SK",
    role: "pflegehelfer",
    roleLabel: "Pflegehelfer",
    email: "s.klein@sonnenschein.de",
    phone: "+49 241 1234570",
    shift: "spaet",
    shiftLabel: "Spaetschicht",
    assignedRooms: ["101", "104", "201"],
    status: "online",
    lastActive: "Jetzt aktiv",
  },
  {
    id: "st5",
    name: "Petra Wagner",
    initials: "PW",
    role: "pflegefachkraft",
    roleLabel: "Pflegefachkraft",
    email: "p.wagner@sonnenschein.de",
    phone: "+49 241 1234571",
    shift: "nacht",
    shiftLabel: "Nachtschicht",
    assignedRooms: ["101", "102", "201", "202"],
    status: "offline",
    lastActive: "vor 6 Std.",
  },
  {
    id: "st6",
    name: "Michael Braun",
    initials: "MB",
    role: "pflegehelfer",
    roleLabel: "Pflegehelfer",
    email: "m.braun@sonnenschein.de",
    phone: "+49 241 1234572",
    shift: "frueh",
    shiftLabel: "Fruehschicht",
    assignedRooms: ["103", "104", "203", "204"],
    status: "offline",
    lastActive: "vor 4 Std.",
  },
  {
    id: "st7",
    name: "Sandra Hoffmann",
    initials: "SH",
    role: "verwaltung",
    roleLabel: "Verwaltung",
    email: "s.hoffmann@sonnenschein.de",
    phone: "+49 241 1234573",
    shift: "frueh",
    shiftLabel: "Fruehschicht",
    assignedRooms: [],
    status: "offline",
    lastActive: "vor 3 Std.",
  },
  {
    id: "st8",
    name: "Klaus Fischer",
    initials: "KF",
    role: "pflegefachkraft",
    roleLabel: "Pflegefachkraft",
    email: "k.fischer@sonnenschein.de",
    phone: "+49 241 1234574",
    shift: "nacht",
    shiftLabel: "Nachtschicht",
    assignedRooms: ["103", "104", "203", "204"],
    status: "pause",
    lastActive: "Pause seit 19:30",
  },
];

export function getStaffByRole(role: string): StaffMember[] {
  return staffMembers.filter((s) => s.role === role);
}

export function getStaffById(id: string): StaffMember | undefined {
  return staffMembers.find((s) => s.id === id);
}

// -----------------------------------------------------------
// Shift Schedule
// -----------------------------------------------------------
export interface ShiftEntry {
  day: string;
  dayShort: string;
  date: string;
  shifts: {
    frueh: string[];
    spaet: string[];
    nacht: string[];
  };
}

export const shiftSchedule: ShiftEntry[] = [
  {
    day: "Montag", dayShort: "Mo", date: "03.03.",
    shifts: { frueh: ["st2", "st6", "st7"], spaet: ["st1", "st3", "st4"], nacht: ["st5", "st8"] },
  },
  {
    day: "Dienstag", dayShort: "Di", date: "04.03.",
    shifts: { frueh: ["st2", "st6", "st7"], spaet: ["st1", "st3", "st4"], nacht: ["st5", "st8"] },
  },
  {
    day: "Mittwoch", dayShort: "Mi", date: "05.03.",
    shifts: { frueh: ["st1", "st4", "st7"], spaet: ["st2", "st3", "st6"], nacht: ["st5", "st8"] },
  },
  {
    day: "Donnerstag", dayShort: "Do", date: "06.03.",
    shifts: { frueh: ["st2", "st6", "st7"], spaet: ["st1", "st3", "st4"], nacht: ["st5", "st8"] },
  },
  {
    day: "Freitag", dayShort: "Fr", date: "07.03.",
    shifts: { frueh: ["st1", "st4", "st7"], spaet: ["st2", "st3", "st6"], nacht: ["st5", "st8"] },
  },
  {
    day: "Samstag", dayShort: "Sa", date: "08.03.",
    shifts: { frueh: ["st2", "st6"], spaet: ["st1", "st3"], nacht: ["st5"] },
  },
  {
    day: "Sonntag", dayShort: "So", date: "09.03.",
    shifts: { frueh: ["st4", "st8"], spaet: ["st3", "st6"], nacht: ["st1"] },
  },
];

// -----------------------------------------------------------
// Sensor Analytics (24h History + Thresholds)
// -----------------------------------------------------------
export interface SensorThreshold {
  warningLow?: number;
  warningHigh?: number;
  alarmLow?: number;
  alarmHigh?: number;
  unit: string;
}

export interface SensorHistory24h {
  label: string;
  value: number;
}

export interface SensorAnalytics {
  history24h: SensorHistory24h[];
  min: number;
  max: number;
  avg: number;
  thresholds: SensorThreshold;
  lastCalibration: string;
  batteryLevel: number;
  signalStrength: number;
}

const sensorThresholds: Record<SensorType, SensorThreshold> = {
  temperatur: { warningLow: 18, warningHigh: 26, alarmLow: 15, alarmHigh: 30, unit: "\u00b0C" },
  feuchtigkeit: { warningLow: 30, warningHigh: 70, alarmLow: 20, alarmHigh: 80, unit: "%" },
  luftqualitaet: { warningHigh: 1000, alarmHigh: 1500, unit: "ppm" },
  sturz: { alarmHigh: 80, unit: "%" },
  rauch: { warningHigh: 50, alarmHigh: 80, unit: "ppm" },
  bewegung: { unit: "Events" },
  tuer: { unit: "Events" },
  alarm: { unit: "" },
  gps: { unit: "m" },
};

function generateHistory24h(type: SensorType, status: SensorStatus): SensorHistory24h[] {
  const hours: SensorHistory24h[] = [];
  for (let h = 0; h < 24; h++) {
    const label = `${String(h).padStart(2, "0")}:00`;
    let value: number;
    switch (type) {
      case "temperatur":
        if (status === "warnung") {
          value = 21.5 + Math.sin(h / 4) * 2 + (h > 12 ? (h - 12) * 0.6 : 0) + (h % 3) * 0.3;
        } else {
          value = 21 + Math.sin(h / 6) * 1.5 + (h % 4) * 0.2;
        }
        break;
      case "feuchtigkeit":
        value = 50 + Math.sin(h / 5) * 8 + (h % 3) * 1.2;
        break;
      case "luftqualitaet":
        value = 400 + Math.sin(h / 4) * 150 + (h % 5) * 20;
        break;
      case "bewegung":
        value = h >= 7 && h <= 21 ? (h % 4) * 8 + 5 : (h % 3);
        break;
      case "tuer":
        value = h >= 7 && h <= 20 ? (h % 3) * 3 : (h % 2);
        break;
      case "sturz":
        value = status === "alarm" && h === 20 ? 95 : (h % 5) * 2;
        break;
      case "rauch":
        value = 5 + (h % 4) * 3;
        break;
      default:
        value = 50 + (h % 6) * 4;
    }
    hours.push({ label, value: Math.round(value * 10) / 10 });
  }
  return hours;
}

export function getSensorAnalytics(sensorId: string, type: SensorType, status: SensorStatus): SensorAnalytics {
  const history = generateHistory24h(type, status);
  const values = history.map((h) => h.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;

  return {
    history24h: history,
    min: Math.round(min * 10) / 10,
    max: Math.round(max * 10) / 10,
    avg,
    thresholds: sensorThresholds[type] || { unit: "" },
    lastCalibration: "28.02.2026",
    batteryLevel: type === "sturz" || type === "gps" ? 78 : 100,
    signalStrength: status === "offline" ? 0 : 85,
  };
}
