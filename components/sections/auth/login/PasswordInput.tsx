import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/hooks/store/useLoginStore"; // importing type
import { z } from "zod";
interface PasswordInputProps {
  password: string;
  setField: (field: keyof z.infer<typeof loginSchema>, value: string) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = (
  { password, setField, showPassword, toggleShowPassword, error },
) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setField("password", e.target.value)}
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
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PasswordInput;
