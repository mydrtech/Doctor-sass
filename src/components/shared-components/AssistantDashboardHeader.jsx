// AssistantDashboardHeader.jsx

import React from "react";
import { FaBars, FaSyncAlt, FaUserNurse } from "react-icons/fa";

const AssistantDashboardHeader = ({ onMenuClick }) => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b">
      
      {/* Left Section: Menu toggle & refresh */}
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          title="Toggle Side Bar"
          className="text-gray-500 hover:text-black text-lg cursor-pointer"
        >
          <FaBars />
        </button>

        <button
          title="Refresh Page"
          onClick={() => window.location.reload()}
          className="text-gray-500 hover:text-black text-lg cursor-pointer"
        >
          <FaSyncAlt />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />
      </div>

      {/* Center Section: Greeting */}
      <div title="UI only" className="flex items-center">
        <span className="font-semibold text-gray-500">
          Welcome to your Dashboard
        </span>
      </div>

      {/* Right Section: Profile Icon */}
      <div title="UI only" className="flex items-center gap-4">
        <div className="relative p-1 bg-highlight rounded-full">
          <FaUserNurse className="text-xl text-white" />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-teal-500 border-2 border-white rounded-full" />
        </div>
      </div>
    </header>
  );
};

export default AssistantDashboardHeader;