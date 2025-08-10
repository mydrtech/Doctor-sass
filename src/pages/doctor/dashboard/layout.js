import DocReduxWrapper from "../docProvider/DocReduxWrapper";
import DoctorSidebar from "./components/DoctorSidebar";

export default function DoctorDashboardLayout({ children }) {
  return (
    <DocReduxWrapper>
      <DoctorSidebar>
        <div className="">
          {/* Main content */}
          <div className="">{children}</div>
        </div>
      </DoctorSidebar>
    </DocReduxWrapper>
  );
}
