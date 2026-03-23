import type { YoloDetection } from "@/services/yoloApi";

interface ConfidenceBarProps {
  detection: YoloDetection;
}

export default function ConfidenceBar({ detection }: ConfidenceBarProps) {
  const riskColors: Record<string, string> = {
    High: "bg-destructive",
    Moderate: "bg-accent",
    Low: "bg-primary",
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: detection.color }} />
          <span className="font-display font-semibold text-sm">{detection.class}</span>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            detection.riskLevel === "High"
              ? "bg-destructive/10 text-destructive"
              : detection.riskLevel === "Moderate"
              ? "bg-accent/10 text-accent"
              : "bg-primary/10 text-primary"
          }`}
        >
          {detection.riskLevel} Risk
        </span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${riskColors[detection.riskLevel]}`}
          style={{ width: `${detection.confidence * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground">{detection.description.slice(0, 80)}…</span>
        <span className="text-xs font-semibold text-foreground">
          {(detection.confidence * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
