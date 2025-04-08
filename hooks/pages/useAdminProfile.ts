import { useEffect, useState } from "react";
import { patient, user } from "@/app/api";

type PersonalInfoType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  userId: string;
};

export default function useAdminDataProfile() {
  const [userInfo, setUserInfo] = useState<PersonalInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await user.getProfile();
        if (response) {
          const  user  = response;
          setUserInfo({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            dob: new Date(user.dateOfBirth).toISOString().split("T")[0],
            address: "", // Placeholder until actual data is available
            userId: user.id.toString(),
          });
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatientData();
  }, []);

  return { userInfo, setUserInfo, isLoading };
}
