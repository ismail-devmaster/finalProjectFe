import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SexSelectProps {
  sexId: string;
  error?: string;
  onChange: (value: string) => void;
}

export function SexSelect({ sexId, error, onChange }: SexSelectProps) {
  return (
    <div className="space-y-2">
      <Select
        value={sexId}
        onValueChange={(value: string) => onChange(value)}
      >
        <SelectTrigger className={error ? "border-red-500" : ""}>
          <SelectValue placeholder="Select Sex" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
