import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function renderSexSelection(
  sexId: any,
  setField: any,
  errors: any,
) {
  return (
    <div className="space-y-2">
      <Select value={sexId} onValueChange={(value) => setField("sexId", value)}>
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
