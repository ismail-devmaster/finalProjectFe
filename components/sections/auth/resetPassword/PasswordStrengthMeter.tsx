interface PasswordStrengthMeterProps {
  strength: string;
}

export function PasswordStrengthMeter(
  { strength }: PasswordStrengthMeterProps,
) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strength === "weak"
              ? "w-1/3 bg-red-500"
              : strength === "medium"
                ? "w-2/3 bg-yellow-500"
                : strength === "strong"
                  ? "w-full bg-green-500"
                  : "w-0"
            }`}
        />
      </div>
      <span
        className={`text-sm font-medium ${strength === "weak"
            ? "text-red-500"
            : strength === "medium"
              ? "text-yellow-500"
              : strength === "strong"
                ? "text-green-500"
                : "text-gray-500"
          }`}
      >
        {strength || "Enter password"}
      </span>
    </div>
  );
}
