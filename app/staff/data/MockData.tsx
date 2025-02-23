// MockData.ts

const MockPatients = [
  {
    id: 1,
    name: "John Doe",
    dateOfBirth: "1988-04-15",
    email: "john.doe@example.com",
    phone: "555-0101",
    medicalHistory: "Allergic to penicillin",
    ongoingTreatments: "Root Canal",
    allergies: ["Penicillin"],
    procedures: ["Cleaning", "X-Ray"],
    notes: "Patient experiences dental anxiety",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    dateOfBirth: "1995-07-10",
    email: "jane.smith@example.com",
    phone: "555-0102",
    medicalHistory: "None",
    ongoingTreatments: "Teeth Whitening",
    allergies: [],
    procedures: ["Whitening"],
    notes: "Interested in cosmetic dentistry",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    dateOfBirth: "1981-03-22",
    email: "mike.johnson@example.com",
    phone: "555-0103",
    medicalHistory: "Diabetes",
    ongoingTreatments: "Dental Implants",
    allergies: ["Latex"],
    procedures: ["Implant", "Crown"],
    notes: "Requires frequent follow-ups due to diabetes",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: 4,
    name: "Emily Brown",
    dateOfBirth: "1992-06-12",
    email: "emily.brown@example.com",
    phone: "555-0104",
    medicalHistory: "Pregnancy - 2nd trimester",
    ongoingTreatments: "Regular Checkup",
    allergies: [],
    procedures: ["Cleaning"],
    notes: "Extra care needed due to pregnancy",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: 5,
    name: "David Wilson",
    dateOfBirth: "1968-09-05",
    email: "david.wilson@example.com",
    phone: "555-0105",
    medicalHistory: "High blood pressure",
    ongoingTreatments: "Dentures Fitting",
    allergies: ["Codeine"],
    procedures: ["Dentures"],
    notes: "Monitor blood pressure before procedures",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: 6,
    name: "Sarah Connor",
    dateOfBirth: "1983-02-28",
    email: "sarah.connor@example.com",
    phone: "555-0106",
    medicalHistory: "None",
    ongoingTreatments: "Oral Surgery",
    allergies: [],
    procedures: ["Extraction"],
    notes: "Requires sedation for surgery",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: 7,
    name: "James Miller",
    dateOfBirth: "1963-11-15",
    email: "james.miller@example.com",
    phone: "555-0107",
    medicalHistory: "Asthma",
    ongoingTreatments: "Checkup",
    allergies: ["Ibuprofen"],
    procedures: ["Checkup"],
    notes: "Monitor breathing during procedures",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: 8,
    name: "Linda Garcia",
    dateOfBirth: "1998-05-20",
    email: "linda.garcia@example.com",
    phone: "555-0108",
    medicalHistory: "None",
    ongoingTreatments: "Regular Checkup",
    allergies: ["Shellfish"],
    procedures: ["Cleaning"],
    notes: "No special considerations",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: 9,
    name: "Robert Brown",
    dateOfBirth: "1973-08-30",
    email: "robert.brown@example.com",
    phone: "555-0109",
    medicalHistory: "Heart Disease",
    ongoingTreatments: "Periodontal Maintenance",
    allergies: ["Penicillin"],
    procedures: ["Deep Cleaning"],
    notes: "Needs clearance from cardiologist",
    image: "/placeholder-avatar.jpg",
  },
  {
    id: 10,
    name: "Patricia Johnson",
    dateOfBirth: "1985-12-10",
    email: "patricia.johnson@example.com",
    phone: "555-0110",
    medicalHistory: "None",
    ongoingTreatments: "Orthodontic Adjustment",
    allergies: [],
    procedures: ["Braces Adjustment"],
    notes: "Slight discomfort expected after adjustment",
    image: "/placeholder-avatar.jpg",
  },
];

const MockAppointments = [
  {
    id: 25,
    patientId: 5,
    doctorId: 2,
    actionId: 9,
    statusId: 1,
    date: "2025-02-21T00:00:00.000Z",
    time: "1970-01-01T11:01:00.000Z",
    additionalNotes: "hh",
    status: { id: 1, status: "WAITING" },
    queueEntries: [],
    action: { appointmentType: { id: 6, type: "SPECIALIST" } },
    patient: {
      medicalHistory: null,
      user: {
        id: 5,
        firstName: "ismail",
        lastName: "pc",
        dateOfBirth: "2025-02-11T23:00:00.000Z",
        phone: "12",
        email: "ismailpcuse@gmail.com",
        sex: { gender: "MALE" },
      },
    },
    doctor: { user: { firstName: "Alice", lastName: "Smith" } },
  },
];

// Combine all mocks into a single object for export
const MockData = {
  MockPatients,
  MockAppointments,
};

export default MockData;

export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  medicalHistory: string;
  ongoingTreatments: string;
  allergies: string[];
  procedures?: string[];
  notes: string;
  image?: string;
}
