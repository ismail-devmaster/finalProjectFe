import AppointmentsPage from "./components/appointments-page";

export default function Home() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center dark:text-white">
        Appointments
      </h1>
      <AppointmentsPage />
    </div>
  );
}
