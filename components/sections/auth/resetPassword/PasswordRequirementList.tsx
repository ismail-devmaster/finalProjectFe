interface PasswordRequirementListProps {
  password: string;
}

export function PasswordRequirementList(
  { password }: PasswordRequirementListProps,
) {
  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[A-Z]/, text: "One uppercase letter" },
    { regex: /[a-z]/, text: "One lowercase letter" },
    { regex: /[0-9]/, text: "One number" },
    { regex: /[^A-Za-z0-9]/, text: "One special character" },
  ];

  return (
    <ul className="text-sm space-y-1">
      {requirements.map(({ regex, text }, index) => (
        <li key={index} className="flex items-center">
          <span
            className={regex.test(password) ? "text-green-500" : "text-red-500"}
          >
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}
