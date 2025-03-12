import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DateOfBirthInputProps {
  dateOfBirth: string;
  error?: string;
  onChange: (value: string) => void;
}

export function DateOfBirthInput(
  { dateOfBirth, error, onChange }: DateOfBirthInputProps,
) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => onChange(e.target.value)}
          className={`pl-10 ${error ? "border-red-500" : ""}`}
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
