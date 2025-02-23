import { PatientDashboard } from "@/components/patient-dashboard"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
      <PatientDashboard />
    </main>
  )
}

