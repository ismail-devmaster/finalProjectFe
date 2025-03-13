import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCompleteProfileStore } from "@/hooks/components/useCompleteProfileState";

export default function DateOfBirthInput() {
  const { dateOfBirth, errors, setField } = useCompleteProfileStore();

  return (
    <div className="space-y-2">
      <div className="relative">
        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setField("dateOfBirth", e.target.value)}
          className={`pl-10 ${errors.dateOfBirth ? "border-red-500" : ""}`}
          required
        />
      </div>
      {errors.dateOfBirth && (
        <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
      )}
    </div>
  );
}
