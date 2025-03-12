import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ConfirmPasswordInputProps {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ConfirmPasswordInput(
  { value, error, onChange }: ConfirmPasswordInputProps,
) {
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <Input
        type="password"
        placeholder="Confirm New Password"
        value={value}
        onChange={onChange}
        className={`pl-10 ${error ? "border-red-500" : ""}`}
        required
      />
    </div>
  );
}
