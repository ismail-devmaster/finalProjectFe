import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { patient } from "@/app/api";

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: "MALE" | "FEMALE";
};

export default function usePatients() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { patients } = await patient.getAllPatients();
        setPatients(patients);
        setFilteredPatients(patients);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
        router.push("/auth/login");
      }
    };

    fetchPatients();
  }, [router]);

  useEffect(() => {
    setFilteredPatients(
      patients.filter((patient) =>
        `${patient.firstName}${patient.lastName}${patient.email}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),
    );
  }, [patients, searchTerm]);

  return {
    isLoading,
    patients: filteredPatients,
    searchTerm,
    setSearchTerm,
  };
}
