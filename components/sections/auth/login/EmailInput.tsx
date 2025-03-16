import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/hooks/store/useLoginStore";
import { z } from "zod";

interface EmailInputProps {
  email: string;
  setField: (field: keyof z.infer<typeof loginSchema>, value: string) => void;
  error?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, setField, error }) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setField("email", e.target.value)}
          className={`pl-10 ${error ? "border-red-500" : ""}`}
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default EmailInput;
