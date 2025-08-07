import React from "react";
import { FaEye, FaFileAlt, FaList, FaPhone } from "react-icons/fa";

// Color utility to avoid Tailwind purging dynamic class names
const colorClassMap = {
  teal: {
    border: "border-teal-500",
    text: "text-teal-500",
    hoverBg: "hover:bg-teal-500",
  },
  purple: {
    border: "border-purple-500",
    text: "text-purple-500",
    hoverBg: "hover:bg-purple-500",
  },
  yellow: {
    border: "border-yellow-500",
    text: "text-yellow-500",
    hoverBg: "hover:bg-yellow-500",
  },
  green: {
    border: "border-green-500",
    text: "text-green-500",
    hoverBg: "hover:bg-green-500",
  },
};

const ActionButton = ({ icon, text, color }) => {
  const colorClasses = colorClassMap[color] || {};
  return (
    <button
      className={`btn btn-outline justify-start text-sm sm:text-base transition-all duration-200 
        ${colorClasses.border} ${colorClasses.text} ${colorClasses.hoverBg} hover:text-white`}
    >
      {icon} {text}
    </button>
  );
};

const QuickActions = () => {
  return (
    <div className="card w-fit bg-white shadow-md">
      <div className="card-body">
        <h2 className="card-title  dark:text-gray-100 text-lg sm:text-xl mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-col gap-3">
          <ActionButton
            icon={<FaEye className="mr-2" />}
            text="View Patient Records"
            color="teal"
          />
          <ActionButton
            icon={<FaList className="mr-2" />}
            text="View Appointments"
            color="purple"
          />
          <ActionButton
            icon={<FaFileAlt className="mr-2" />}
            text="View Schedules"
            color="yellow"
          />
          <ActionButton
            icon={<FaPhone className="mr-2" />}
            text="Contact Doctor"
            color="green"
          />
        </div>
      </div>
    </div>
  );
};

export default QuickActions;