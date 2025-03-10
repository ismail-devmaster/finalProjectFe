import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Users } from "lucide-react";

export function AuthSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-white to-dental-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Login or Register
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Access your patient portal or staff dashboard
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-sm space-y-4 mt-8">
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="patient">
                <UserCircle className="mr-2 h-4 w-4" />
                Patient
              </TabsTrigger>
              <TabsTrigger value="staff">
                <Users className="mr-2 h-4 w-4" />
                Staff
              </TabsTrigger>
            </TabsList>
            <TabsContent value="patient">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your patient portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                    />
                  </div>
                  <Button className="w-full">Sign In</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="staff">
              <Card>
                <CardHeader>
                  <CardTitle>Staff Login</CardTitle>
                  <CardDescription>Access the staff dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="staff-email">Email</Label>
                    <Input
                      id="staff-email"
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staff-password">Password</Label>
                    <Input
                      id="staff-password"
                      placeholder="Enter your password"
                      type="password"
                    />
                  </div>
                  <Button className="w-full">Sign In</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
