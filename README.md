# Frontend Next.js Project README

This repository contains the frontend part of a full-stack application built using Next.js. The frontend is designed to work in synchronization with other parts of the application, such as the backend and database. Below are the instructions to set up, install, and run the frontend project.

---

## **Prerequisites**

Before you begin, ensure you have the following installed on your system:

1. **Node.js**: Required to run the project.

   - Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).
   - Verify installation by running:

     ```bash
     node -v
     npm -v
     ```

2. **Git**: Required to clone the repository.

   - Download and install Git from [https://git-scm.com/](https://git-scm.com/).
   - Verify installation by running:

     ```bash
     git --version
     ```

---

## **Installation**

### 1. Clone the Repository

To clone the project, run the following command in your terminal:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the actual URL of this repository.

### 2. Navigate to the Project Directory

After cloning, navigate to the project folder:

```bash
cd <project-folder-name>
```

### 3. Install Dependencies

Install all the required dependencies using npm:

```bash
npm install
```

---

## **Environment Variables Setup**

Create a `.env` file in the root directory of the project. Add the following environment variables:

```env
JWT_SECRET=
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

Replace `your_backend_api_url` and `your_google_maps_api_key` with the appropriate values.

---

## **Running the Frontend**

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## **Available Routes Based on User Roles**

The application has different routes accessible based on the user's role. Below is a list of available routes:

### **Patient**

- `/dashboard/patient` - Patient dashboard.
- `/appointments` - View and manage appointments.
- `/profile` - View and edit patient profile.

### **Doctor**

- `/dashboard/doctor` - Doctor dashboard.
- `/appointments` - View and manage appointments.
- `/patients` - View patient list and details.
- `/profile` - View and edit doctor profile.

### **Receptionist**

- `/dashboard/receptionist` - Receptionist dashboard.
- `/appointments` - Manage appointments.
- `/patients` - Manage patient records.
- `/doctors` - Manage doctor schedules.

### **Admin**

- `/dashboard/admin` - Admin dashboard.
- `/users` - Manage all users (patients, doctors, receptionists).
- `/settings` - Application settings and configurations.

---

## **Synchronization with Other Parts of the Application**

This frontend repository is part of a full-stack application. Ensure the following for proper synchronization:

1. **Backend API**: The frontend communicates with the backend API. Ensure the backend is running and the `NEXT_PUBLIC_API_URL` environment variable is correctly set.
2. **Database**: The backend should be connected to the database. Ensure the database is properly configured and migrated.
3. **Real-time Updates**: If real-time features are required, ensure the backend supports WebSocket or similar technologies.

---

## **Future Enhancements**

- Add detailed documentation for API endpoints.
- Implement role-based access control (RBAC) for routes.
- Add unit and integration tests.
- Optimize performance and accessibility.

---

## **Notes**

- Replace `<repository-url>` and `<project-folder-name>` with actual values.
- Add more details about the project as needed.
- Ensure all team members are aware of the synchronization requirements between the frontend, backend, and database.

---

Feel free to update this README with additional details or instructions as the project evolves.

