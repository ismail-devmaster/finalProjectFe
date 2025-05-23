import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCompleteProfileStore } from "@/hooks/components/useCompleteProfileState";

export default function PhoneInput() {
  const { phone, errors, setField } = useCompleteProfileStore();

  return (
    <div className="space-y-2">
      <div className="relative">
        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setField("phone", e.target.value)}
          className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
        />
      </div>
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
    </div>
  );
}
