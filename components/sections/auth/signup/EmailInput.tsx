import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";

interface EmailInputProps {
  email: string;
  error?: string;
  onChange: (value: string) => void;
}

export function EmailInput({ email, error, onChange }: EmailInputProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onChange(e.target.value)}
          className={`pl-10 ${error ? "border-red-500" : ""}`}
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
