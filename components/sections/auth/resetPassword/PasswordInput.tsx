import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
}

export function PasswordInput({
  value,
  error,
  onChange,
  showPassword,
  toggleShowPassword,
}: PasswordInputProps) {
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="New Password"
        value={value}
        onChange={onChange}
        className={`pl-10 pr-10 ${error ? "border-red-500" : ""}`}
        required
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
      >
        {showPassword
          ? <EyeOff className="h-5 w-5" />
          : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
}
