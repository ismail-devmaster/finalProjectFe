import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCompleteProfileStore } from "@/hooks/components/useCompleteProfileState";

export default function SexSelect() {
  const { sexId, errors, setField } = useCompleteProfileStore();

  return (
    <div className="space-y-2">
      <Select
        value={sexId}
        onValueChange={(value: string) => setField("sexId", value)}
      >
        <SelectTrigger className={errors.sexId ? "border-red-500" : ""}>
          <SelectValue placeholder="Select Sex" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectContent>
      </Select>
      {errors.sexId && <p className="text-red-500 text-sm">{errors.sexId}</p>}
    </div>
  );
}
