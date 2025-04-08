import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PersonalInfoType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  medicalHistory: string;
};

type Props = {
  userInfo: PersonalInfoType;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSaveChanges: () => void;
};

const ProfileEdit = ({
  userInfo,
  handleInputChange,
  handleSaveChanges,
}: Props) => {
  const fields = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email", type: "email" },
    { id: "phone", label: "Phone", type: "tel" },
    { id: "dob", label: "Date of Birth", type: "date" },
  ];

  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border-none shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
          Edit Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ id, label, type }) => (
              <div key={id} className="space-y-2">
                <Label
                  htmlFor={id}
                  className="text-lg font-medium dark:text-white"
                >
                  {label}
                </Label>
                <Input
                  id={id}
                  type={type || "text"}
                  value={userInfo[id as keyof PersonalInfoType]}
                  onChange={handleInputChange}
                  className="text-lg p-3 dark:bg-gray-700 dark:text-white"
                />
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSaveChanges}
          className="w-full text-lg py-6 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
        >
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileEdit;
