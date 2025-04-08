"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, Mail, MapPin, Phone, User } from "lucide-react";
import { ReactNode } from "react";
function IconCard(
  { title, icon, content }: {
    title: string;
    icon: ReactNode;
    content: ReactNode;
  },
) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="space-y-2">{content}</CardContent>
    </Card>
  );
}
interface OverviewProps {
  mockData: any;
  isNewPatient: boolean;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

const Overview: React.FC<OverviewProps> = (
  { mockData, isNewPatient },
) => {
  const sections = [
    {
      title: "Profile",
      icon: <User />,
      content: (
        <>
          <p className="text-sm font-medium">{mockData.profile.name}</p>
          <p className="text-xs text-muted-foreground">
            DOB: {mockData.profile.dob}
          </p>
          {[Phone, Mail, MapPin].map((Icon, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs">
                {String(Object.values(mockData.profile)[i + 2])}
              </p>
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Appointments",
      icon: <Calendar />,
      content: isNewPatient
        ? (
          <p className="text-sm text-muted-foreground text-center">
            No upcoming appointments
          </p>
        )
        : (
          mockData.appointments.upcoming.map((apt: string, i: number) => (
            <p key={i} className="text-xs">{apt}</p>
          ))
        ),
    },
    {
      title: "Payments",
      icon: <CreditCard />,
      content: isNewPatient
        ? (
          <p className="text-sm text-muted-foreground">
            No recent transactions
          </p>
        )
        : (
          <>
            {mockData.payments.transactions.map((t: string, i: number) => (
              <p key={i} className="text-xs">{t}</p>
            ))}
            <p
              className={`text-lg font-bold ${mockData.payments.balanceColor}`}
            >
              DA{mockData.payments.balance}
            </p>
          </>
        ),
    },
  ];

  return (
    <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sections.map(({ title, icon, content }, i) => (
        <IconCard key={i} title={title} icon={icon} content={content} />
      ))}
    </CardContent>
  );
};
export default Overview;
