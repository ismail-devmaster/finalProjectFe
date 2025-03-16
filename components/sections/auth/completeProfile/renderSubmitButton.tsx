import { Button } from "@/components/ui/button";
export default function renderSubmitButton(isLoading: any, errors: any) {
  return (
    <Button
      type="submit"
      className="w-full"
      disabled={isLoading || Object.keys(errors).length > 0}
    >
      {isLoading ? "Completing..." : "Complete Profile"}
    </Button>
  );
}
