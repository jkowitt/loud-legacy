interface TrendPillProps {
  trend: "up" | "down" | "neutral";
  value: string;
}

export const TrendPill = ({ trend, value }: TrendPillProps) => {
  const color =
    trend === "up"
      ? "text-success bg-success/10"
      : trend === "down"
      ? "text-warning bg-warning/10"
      : "text-neutral-300 bg-brand-800/50";

  const symbol = trend === "up" ? "▲" : trend === "down" ? "▼" : "◆";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${color}`}
    >
      <span className="text-base">{symbol}</span>
      {value}
    </span>
  );
};
