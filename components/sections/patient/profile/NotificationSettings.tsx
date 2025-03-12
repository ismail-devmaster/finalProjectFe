import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NotificationOptionProps = {
  id: string;
  label: string;
};

type NotificationSectionProps = {
  title: string;
  options: NotificationOptionProps[];
};

const NotificationSection = ({ title, options }: NotificationSectionProps) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
      {title}
    </h3>
    {options.map(({ id, label }) => (
      <div
        key={id}
        className="flex items-center justify-between bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md"
      >
        <Label htmlFor={id} className="text-lg dark:text-white">{label}</Label>
        <Switch id={id} />
      </div>
    ))}
  </div>
);

type SettingsType = NotificationSectionProps;

export default function NotificationsSettings() {
  const settings: SettingsType[] = [
    {
      title: "Appointment Reminders",
      options: [
        { id: "email-reminders", label: "Email Reminders" },
        { id: "sms-reminders", label: "SMS Reminders" },
        { id: "push-reminders", label: "Push Notifications" },
      ],
    },
    {
      title: "General Announcements",
      options: [{
        id: "general-announcements",
        label: "Receive General Announcements",
      }],
    },
  ];

  return (
    <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border-none shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
          Notification Preferences
        </CardTitle>
        <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
          Manage how you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {settings.map((section) => (
          <NotificationSection key={section.title} {...section} />
        ))}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Test Results Notifications
          </h3>
          <div className="space-y-2 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <Label
              htmlFor="test-results-method"
              className="text-lg dark:text-white"
            >
              Preferred Notification Method
            </Label>
            <Select>
              <SelectTrigger
                id="test-results-method"
                className="text-lg p-3 dark:bg-gray-600 dark:text-white"
              >
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: "email", label: "Email" },
                  { value: "sms", label: "SMS" },
                  { value: "push", label: "Push Notification" },
                ].map(({ value, label }) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-lg py-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all duration-300">
          Save Notification Preferences
        </Button>
      </CardFooter>
    </Card>
  );
}
