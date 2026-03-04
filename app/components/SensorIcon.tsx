import {
  Thermometer,
  Move,
  DoorOpen,
  Wind,
  AlertTriangle,
  MapPin,
  Flame,
  TriangleAlert,
  Droplets,
} from "lucide-react";
import type { SensorType } from "@/app/lib/mock-data";

const icons: Record<
  SensorType,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  sturz: TriangleAlert,
  rauch: Flame,
  temperatur: Thermometer,
  tuer: DoorOpen,
  bewegung: Move,
  luftqualitaet: Wind,
  alarm: AlertTriangle,
  gps: MapPin,
  feuchtigkeit: Droplets,
};

export default function SensorIcon({
  type,
  size = 20,
  className = "",
}: {
  type: SensorType;
  size?: number;
  className?: string;
}) {
  const Icon = icons[type];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}
