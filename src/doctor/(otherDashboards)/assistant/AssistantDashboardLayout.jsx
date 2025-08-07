import { Outlet } from "react-router-dom";
import AssistantSidebar from "./components/AssistantSidebar";
import AssistantDashboardHeader from './components/AssistantDashboardHeader';

const AssistantDashboardLayout = () => {
  return (
    <div className="flex">
      <AssistantSidebar />
      <div className="w-full p-4">
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default AssistantDashboardLayout;