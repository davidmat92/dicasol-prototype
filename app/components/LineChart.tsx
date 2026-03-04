"use client";

interface LineChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  showDots?: boolean;
  showArea?: boolean;
  showLabels?: boolean;
}

export default function LineChart({
  data,
  color = "var(--accent)",
  height = 120,
  showDots = true,
  showArea = true,
  showLabels = true,
}: LineChartProps) {
  if (data.length === 0) return null;

  const padding = { top: 10, right: 10, bottom: showLabels ? 28 : 10, left: 10 };
  const width = 360;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const minVal = Math.min(...data.map((d) => d.value), 0);
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartW,
    y: padding.top + chartH - ((d.value - minVal) / range) * chartH,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
        const y = padding.top + chartH * (1 - pct);
        return (
          <line
            key={i}
            x1={padding.left}
            y1={y}
            x2={width - padding.right}
            y2={y}
            stroke="var(--border)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Area fill */}
      {showArea && (
        <path
          d={areaPath}
          fill={color}
          opacity="0.1"
        />
      )}

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dots */}
      {showDots &&
        points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3.5"
            fill={color}
            stroke="var(--bg)"
            strokeWidth="2"
          />
        ))}

      {/* Labels */}
      {showLabels &&
        data.map((d, i) => (
          <text
            key={i}
            x={points[i].x}
            y={height - 4}
            textAnchor="middle"
            fill="var(--text-tertiary)"
            fontSize="9"
            fontWeight="500"
          >
            {d.label}
          </text>
        ))}
    </svg>
  );
}
