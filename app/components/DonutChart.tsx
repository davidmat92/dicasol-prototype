"use client";

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerValue?: string;
}

export default function DonutChart({
  data,
  size = 160,
  strokeWidth = 24,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) return null;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let currentOffset = 0;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--bg-elevated)"
          strokeWidth={strokeWidth}
        />

        {/* Data segments */}
        {data.map((item, i) => {
          const pct = item.value / total;
          const dashLength = pct * circumference;
          const gap = circumference - dashLength;
          const offset = -currentOffset * circumference - circumference * 0.25;
          currentOffset += pct;

          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              style={{
                transition: "stroke-dasharray 0.8s ease",
              }}
            />
          );
        })}

        {/* Center text */}
        {centerValue && (
          <>
            <text
              x={center}
              y={center - 4}
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="22"
              fontWeight="800"
            >
              {centerValue}
            </text>
            {centerLabel && (
              <text
                x={center}
                y={center + 14}
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="10"
                fontWeight="500"
              >
                {centerLabel}
              </text>
            )}
          </>
        )}
      </svg>

      {/* Legend below */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-4">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: item.color }}
            />
            <span className="text-[11px] text-text-secondary">
              {item.label} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
