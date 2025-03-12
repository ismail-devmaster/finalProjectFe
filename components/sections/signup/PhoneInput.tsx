import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  phone: string;
  error?: string;
  onChange: (value: string) => void;
}

export function PhoneInput({ phone, error, onChange }: PhoneInputProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => onChange(e.target.value)}
          className={`pl-10 ${error ? "border-red-500" : ""}`}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
