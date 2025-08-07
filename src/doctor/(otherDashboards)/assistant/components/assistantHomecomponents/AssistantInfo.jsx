import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AssistantInfo = () => {
  const [assistantData, setAssistantData] = useState(null);

  useEffect(() => {
    const assistantDataRaw = localStorage.getItem("user");
    if (assistantDataRaw) {
      try {
        const parsedData = JSON.parse(assistantDataRaw);
        setAssistantData(parsedData);
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
      }
    }
  }, []);

  if (!assistantData) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <div className="card bg-white shadow-md">
        <div className="card-body">
          <h2 className="card-title text-gray-800 text-lg sm:text-xl mb-4">
            Account Info
          </h2>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 sm:text-base">Role</p>
              <p className="font-semibold text-gray-800 text-sm sm:text-base capitalize">
                {assistantData?.role || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 sm:text-base">Email</p>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {assistantData?.email || "N/A"}
              </p>
            </div>

            <div>
              <strong className="text-gray-700">Permissions:</strong>
              <ul className="mt-2 space-y-1">
                <PermissionItem
                  label="Manage Appointments"
                  value={assistantData?.permissions?.manageAppointments}
                />
                <PermissionItem
                  label="Manage Patients"
                  value={assistantData?.permissions?.managePatients}
                />
                <PermissionItem
                  label="Manage Schedule"
                  value={assistantData?.permissions?.manageSchedule}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PermissionItem = ({ label, value }) => (
  <li className="flex items-center text-sm sm:text-base">
    {value ? (
      <FaCheckCircle className="mr-2 text-green-500" />
    ) : (
      <FaTimesCircle className="mr-2 text-red-500" />
    )}
    {label}
  </li>
);

export default AssistantInfo;