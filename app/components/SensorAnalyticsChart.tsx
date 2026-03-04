"use client";

import type { SensorHistory24h, SensorThreshold } from "@/app/lib/mock-data";

interface SensorAnalyticsChartProps {
  data: SensorHistory24h[];
  thresholds: SensorThreshold;
  color: string;
  height?: number;
}

export default function SensorAnalyticsChart({
  data,
  thresholds,
  color,
  height = 160,
}: SensorAnalyticsChartProps) {
  if (data.length === 0) return null;

  const padding = { top: 12, right: 12, bottom: 30, left: 36 };
  const width = 360;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);

  // Expand range to include thresholds if they exist
  let rangeMin = dataMin;
  let rangeMax = dataMax;
  if (thresholds.alarmLow !== undefined) rangeMin = Math.min(rangeMin, thresholds.alarmLow - 2);
  if (thresholds.warningLow !== undefined) rangeMin = Math.min(rangeMin, thresholds.warningLow - 1);
  if (thresholds.alarmHigh !== undefined) rangeMax = Math.max(rangeMax, thresholds.alarmHigh + 2);
  if (thresholds.warningHigh !== undefined) rangeMax = Math.max(rangeMax, thresholds.warningHigh + 1);

  const range = rangeMax - rangeMin || 1;

  const yScale = (v: number) => padding.top + chartH - ((v - rangeMin) / range) * chartH;
  const xScale = (i: number) => padding.left + (i / (data.length - 1)) * chartW;

  const points = data.map((d, i) => ({
    x: xScale(i),
    y: yScale(d.value),
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  // Threshold zone rects
  const thresholdZones: { y: number; h: number; color: string; opacity: number }[] = [];

  if (thresholds.alarmHigh !== undefined) {
    const y1 = yScale(rangeMax);
    const y2 = yScale(thresholds.alarmHigh);
    thresholdZones.push({ y: y1, h: Math.max(y2 - y1, 0), color: "var(--danger)", opacity: 0.08 });
  }
  if (thresholds.warningHigh !== undefined) {
    const top = thresholds.alarmHigh !== undefined ? thresholds.alarmHigh : rangeMax;
    const y1 = yScale(top);
    const y2 = yScale(thresholds.warningHigh);
    thresholdZones.push({ y: y1, h: Math.max(y2 - y1, 0), color: "var(--warning)", opacity: 0.08 });
  }
  if (thresholds.warningLow !== undefined) {
    const bottom = thresholds.alarmLow !== undefined ? thresholds.alarmLow : rangeMin;
    const y1 = yScale(thresholds.warningLow);
    const y2 = yScale(bottom);
    thresholdZones.push({ y: y1, h: Math.max(y2 - y1, 0), color: "var(--warning)", opacity: 0.08 });
  }
  if (thresholds.alarmLow !== undefined) {
    const y1 = yScale(thresholds.alarmLow);
    const y2 = yScale(rangeMin);
    thresholdZones.push({ y: y1, h: Math.max(y2 - y1, 0), color: "var(--danger)", opacity: 0.08 });
  }

  // Y-axis labels (5 ticks)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((pct) => {
    const val = rangeMin + pct * range;
    return { y: yScale(val), label: val % 1 === 0 ? String(Math.round(val)) : val.toFixed(1) };
  });

  // X-axis labels (every 4h)
  const xLabels = data.filter((_, i) => i % 4 === 0);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {/* Threshold zone backgrounds */}
      {thresholdZones.map((zone, i) => (
        <rect
          key={`zone-${i}`}
          x={padding.left}
          y={zone.y}
          width={chartW}
          height={zone.h}
          fill={zone.color}
          opacity={zone.opacity}
          rx="2"
        />
      ))}

      {/* Grid lines */}
      {yTicks.map((tick, i) => (
        <line
          key={`grid-${i}`}
          x1={padding.left}
          y1={tick.y}
          x2={width - padding.right}
          y2={tick.y}
          stroke="var(--border)"
          strokeWidth="0.5"
        />
      ))}

      {/* Threshold dashed lines */}
      {thresholds.warningHigh !== undefined && (
        <line
          x1={padding.left}
          y1={yScale(thresholds.warningHigh)}
          x2={width - padding.right}
          y2={yScale(thresholds.warningHigh)}
          stroke="var(--warning)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.6"
        />
      )}
      {thresholds.alarmHigh !== undefined && (
        <line
          x1={padding.left}
          y1={yScale(thresholds.alarmHigh)}
          x2={width - padding.right}
          y2={yScale(thresholds.alarmHigh)}
          stroke="var(--danger)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.6"
        />
      )}
      {thresholds.warningLow !== undefined && (
        <line
          x1={padding.left}
          y1={yScale(thresholds.warningLow)}
          x2={width - padding.right}
          y2={yScale(thresholds.warningLow)}
          stroke="var(--warning)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.6"
        />
      )}
      {thresholds.alarmLow !== undefined && (
        <line
          x1={padding.left}
          y1={yScale(thresholds.alarmLow)}
          x2={width - padding.right}
          y2={yScale(thresholds.alarmLow)}
          stroke="var(--danger)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.6"
        />
      )}

      {/* Area fill */}
      <path d={areaPath} fill={color} opacity="0.1" />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dots (every 3rd point to avoid clutter) */}
      {points
        .filter((_, i) => i % 3 === 0 || i === points.length - 1)
        .map((p, i) => (
          <circle
            key={`dot-${i}`}
            cx={p.x}
            cy={p.y}
            r="2.5"
            fill={color}
            stroke="var(--bg)"
            strokeWidth="1.5"
          />
        ))}

      {/* Y-axis labels */}
      {yTicks.map((tick, i) => (
        <text
          key={`y-${i}`}
          x={padding.left - 4}
          y={tick.y + 3}
          textAnchor="end"
          fill="var(--text-tertiary)"
          fontSize="8"
          fontWeight="500"
        >
          {tick.label}
        </text>
      ))}

      {/* X-axis labels */}
      {xLabels.map((d, i) => {
        const idx = data.indexOf(d);
        return (
          <text
            key={`x-${i}`}
            x={xScale(idx)}
            y={height - 4}
            textAnchor="middle"
            fill="var(--text-tertiary)"
            fontSize="8"
            fontWeight="500"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
