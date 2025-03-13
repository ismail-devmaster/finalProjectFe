import { Textarea } from "@/components/ui/textarea";

interface MedicalHistoryInputProps {
  medicalHistory: string;
  error?: string;
  onChange: (value: string) => void;
}

export function MedicalHistoryInput({
  medicalHistory,
  error,
  onChange,
}: MedicalHistoryInputProps) {
  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Medical History"
        value={medicalHistory}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
