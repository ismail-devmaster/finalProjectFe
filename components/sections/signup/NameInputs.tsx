import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { signUpSchema } from "@/hooks/store/useSignUpStore";
interface NameInputsProps {
  firstName: string;
  lastName: string;
  errors: {
    firstName?: string;
    lastName?: string;
    [key: string]: string | undefined;
  };
  onChange: (field: keyof z.infer<typeof signUpSchema>, value: string) => void;
}

export function NameInputs(
  { firstName, lastName, errors, onChange }: NameInputsProps,
) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className={`pl-10 ${errors.firstName ? "border-red-500" : ""}`}
            required
          />
        </div>
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName}</p>
        )}
      </div>
      <div className="space-y-2">
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className={`pl-10 ${errors.lastName ? "border-red-500" : ""}`}
            required
          />
        </div>
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName}</p>
        )}
      </div>
    </div>
  );
}
