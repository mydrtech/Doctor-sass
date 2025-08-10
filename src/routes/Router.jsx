import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DoctorSidebar from "../pages/doctor/components/DoctorSidebar";
import AddAssistantForm from "../pages/doctor/dashboard/assistants/AddAssistantForm";
import AllAssistantPage from "../pages/doctor/dashboard/assistants/AllassistantPage";
import AddHospitalForm from '../pages/doctor/dashboard/hospitals/AddHospitalForm';
import DoctorDashboard from "../pages/doctor/dashboard/DoctorDashboard";
import LoginPage from '../pages/auth/LoginPage';
import ErrorPage from '../pages/auth/ErrorPage';
import MyHospitals from '../pages/doctor/dashboard/hospitals/MyHospitals';
import AdmitPatientForm from '../pages/doctor/dashboard/hospitals/AdmitPatientForm';
import AddPrescriptionForm from '../pages/doctor/dashboard/patients/AddPrescriptionForm';
import AddAppointmentForm from '../pages/doctor/dashboard/patients/AddAppointmentForm';
import AllPatientsPage from "../pages/doctor/dashboard/patients/AllPatientsPage";
import AddServiceForm from '../pages/doctor/dashboard/services/AddServiceForm';
import AllServices from "../pages/doctor/dashboard/services/AllServices";
import AssistantDashboard from "../pages/assistant/AssistantDashboard";
import AssistantSidebar from "../pages/assistant/AssistantSidebar";
import PatientSidebar from "../pages/patient/components/PatientSidebar";
import PatientLayout from "../layout/PatientLayout";
import PatientDashboard from "../pages/patient/PatientDashboard";
import MyHospital from "../pages/patient/my-hospital/MyHospital";
import MyPrescriptionsPage from "../pages/patient/my-prescription/MyPrescription";
import MyProfile from "../pages/patient/my-profile/MyProfile";
import UpdateProfile from "../pages/patient/update-profile/UpdateProfile";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/doctor",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <DoctorSidebar />,
        errorElement: <ErrorPage />,
        //this sidebar component is use by Layout
        children: [
          { index: true, element: <DoctorDashboard /> },
          { path: "assistants/add-assistant", element: <AddAssistantForm /> },
          { path: "assistants", element: <AllAssistantPage /> },
          { path: "hospitals/add-hospital", element: <AddHospitalForm /> },
          { path: "hospitals/my-hospital", element: <MyHospitals /> },
          { path: "hospitals/admit-patient", element: <AdmitPatientForm /> },
          { path: "patients/add-prescription", element: <AddPrescriptionForm /> },
          { path: "patients/make-appointment", element: <AddAppointmentForm /> },
          { path: "patients", element: <AllPatientsPage /> },
          { path: "services/add-service", element: <AddServiceForm /> },
          { path: "services", element: <AllServices /> },
        ],
      },
      {
        path: "assistant",
        element: <AssistantSidebar />,
        errorElement: <ErrorPage />,
        //this sidebar component is use by layout
        children: [
          { index: true, element: <AssistantDashboard /> }, 
        ],
      },
      {
        path: "patient",
        element: <PatientLayout />,
        errorElement: <ErrorPage />,
        children: [
          { 
            path: "",
            element: <PatientSidebar />,
            errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <PatientDashboard />
            },
            {
              path: "my-hospital",
              element: <MyHospital />
            },
            {
              path: "my-prescription",
              element: <MyPrescriptionsPage />
            },
            {
              path: "my-profile",
              element: <MyProfile />
            },
            {
              path: "update-profile",
              element: <UpdateProfile />
            }
          ]
        }
        ]
      }
    ],
  },
]);

export default Router;