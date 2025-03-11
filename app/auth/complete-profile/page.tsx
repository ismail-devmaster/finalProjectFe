"use client";
import { Card } from "@/components/ui/card";
import { useCompleteProfile } from "@/hooks/pages/useCompleteProfile";
import renderHeader from "@/components/sections/completeProfile/renderHeader";
import renderDateOfBirthField from "@/components/sections/completeProfile/renderDateOfBirthField";
import renderPhoneField from "@/components/sections/completeProfile/renderPhoneField";
import renderSexSelection from "@/components/sections/completeProfile/renderSexSelection";
import renderSubmitButton from "@/components/sections/completeProfile/renderSubmitButton";

export default function CompleteProfile() {
  const {
    tempToken,
    isLoading,
    handleSubmit,
    sexId,
    setField,
    dateOfBirth,
    errors,
  } = useCompleteProfile();
  if (!tempToken) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 space-y-6">
        {renderHeader()}
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderDateOfBirthField(dateOfBirth, setField, errors)}
          {renderPhoneField()}
          {renderSexSelection(sexId, setField, errors)}
          {renderSubmitButton(isLoading, errors)}
        </form>
      </Card>
    </div>
  );
}
