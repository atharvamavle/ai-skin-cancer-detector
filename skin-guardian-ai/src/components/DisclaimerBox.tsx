import { AlertTriangle } from "lucide-react";

interface DisclaimerBoxProps {
  compact?: boolean;
}

export default function DisclaimerBox({ compact = false }: DisclaimerBoxProps) {
  return (
    <div className="disclaimer-box">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="font-display font-semibold text-destructive text-sm">
            Research Prototype — Not a Medical Device
          </p>
          {!compact && (
            <p className="text-xs text-muted-foreground mt-1">
              This tool is a prototype exploring AI-assisted skin lesion analysis. It cannot diagnose cancer.
              Model evaluated on public datasets; real-world performance may differ.
              Always consult a qualified healthcare professional. If in doubt, see a dermatologist.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
