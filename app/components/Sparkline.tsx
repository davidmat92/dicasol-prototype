"use client";

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
}

export default function Sparkline({
  data,
  color = "var(--accent)",
  height = 28,
}: SparklineProps) {
  const max = Math.max(...data, 1);

  return (
    <div className="sparkline" style={{ height }}>
      {data.map((val, i) => {
        const h = Math.max((val / max) * 100, 4);
        return (
          <div
            key={i}
            className="spark-bar"
            style={{
              height: `${h}%`,
              backgroundColor: color,
              opacity: 0.4 + (i / data.length) * 0.6,
            }}
          />
        );
      })}
    </div>
  );
}
