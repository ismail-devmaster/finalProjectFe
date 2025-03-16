import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  password: string;
  showPassword: boolean;
  error?: string;
  onChange: (value: string) => void;
  toggleShowPassword: () => void;
  passwordStrength: string;
}

export function PasswordInput({
  password,
  showPassword,
  error,
  onChange,
  toggleShowPassword,
  passwordStrength,
}: PasswordInputProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => onChange(e.target.value)}
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
      {password && (
        <div className="space-y-2 mt-2">
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              {["weak", "medium", "strong"].map((strength, index) => (
                <div
                  key={strength}
                  className={`h-full transition-all duration-300 ${passwordStrength === "weak"
                      ? "w-1/3 bg-red-500"
                      : passwordStrength === "medium"
                        ? "w-2/3 bg-yellow-500"
                        : passwordStrength === "strong"
                          ? "w-full bg-green-500"
                          : "w-0"
                    }`}
                />
              ))}
            </div>
            <span
              className={`text-sm font-medium ${passwordStrength === "weak"
                  ? "text-red-500"
                  : passwordStrength === "medium"
                    ? "text-yellow-500"
                    : passwordStrength === "strong"
                      ? "text-green-500"
                      : "text-gray-500"
                }`}
            >
              {passwordStrength || "Enter password"}
            </span>
          </div>
          <ul className="text-sm space-y-1">
            {[
              { regex: /.{8,}/, text: "At least 8 characters" },
              { regex: /[A-Z]/, text: "One uppercase letter" },
              { regex: /[a-z]/, text: "One lowercase letter" },
              { regex: /[0-9]/, text: "One number" },
              { regex: /[^A-Za-z0-9]/, text: "One special character" },
            ].map(({ regex, text }, index) => (
              <li key={index} className="flex items-center">
                {regex.test(password)
                  ? (
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )
                  : (
                    <svg
                      className="w-4 h-4 mr-2 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                <span
                  className={regex.test(password)
                    ? "text-green-500"
                    : "text-red-500"}
                >
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
