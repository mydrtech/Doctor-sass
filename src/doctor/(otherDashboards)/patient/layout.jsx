import PatientSidebar from "./components/PatientSidebar";

export default function PatientDashboardLayout({ children }) {
  return (
    <PatientSidebar>
      <div className="">
        {/* Main content */}
        <div className="">{children}</div>
      </div>
    </PatientSidebar>
  );
}
