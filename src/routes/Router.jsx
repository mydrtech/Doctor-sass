import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import LoginPage from "../doctor/utilities/LoginPage";
import DoctorSidebar from "../doctor/dashboard/components/DoctorSidebar";
import AddAssistantForm from "../doctor/dashboard/assistants/add-assistant/AddAssistantForm";
import AllAssistantPage from "../doctor/dashboard/assistants/AllassistantPage";
import AddHospitalForm from "../doctor/dashboard/hospitals/add-hospital/AddHospitalForm";
import MyHospitals from "../doctor/dashboard/hospitals/my-hospital/MyHospitals";
import AdmitPatientForm from "../doctor/dashboard/hospitals/admit-patient/AdmitPatientForm";
import AddPrescriptionForm from "../doctor/dashboard/patients/add-prescription/AddPrescriptionForm";
import AddAppointmentForm from "../doctor/dashboard/patients/make-appointment/AddAppointmentForm";
import AllPatientsPage from "../doctor/dashboard/patients/AllPatientsPage";
import AddServiceForm from "../doctor/dashboard/services/add-service/AddServiceForm";
import AllServices from "../doctor/dashboard/services/AllServices";
import DoctorDashboardHomePage from "../doctor/dashboard/DoctorDashboardHomePage";
import AssistantDashboard from "../doctor/(otherDashboards)/assistant/AssistantDashboard";
import AssistantSidebar from "../doctor/(otherDashboards)/assistant/components/AssistantSidebar";
import ErrorPage from '../ErrorPage';
import PatientLayout from "../layout/PatientLayout";
import PatientSidebar from "../doctor/(otherDashboards)/patient/components/PatientSidebar";
import PatientDashboard from "../doctor/(otherDashboards)/patient/PatientDashboard";
import MyHospital from "../doctor/(otherDashboards)/patient/my-hospital/MyHospital";
import MyPrescriptionsPage from '../doctor/(otherDashboards)/patient/my-prescription/MyPrescription';
import MyProfilePage from "../doctor/(otherDashboards)/patient/my-profile/MyProfile";
import UpdateProfile from "../doctor/(otherDashboards)/patient/update-profile/UpdateProfile";


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
          { index: true, element: <DoctorDashboardHomePage /> },
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
              element: <MyProfilePage />
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