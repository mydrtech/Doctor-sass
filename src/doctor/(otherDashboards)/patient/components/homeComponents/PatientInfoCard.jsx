import React, { useEffect } from "react";
import { FaUser, FaEnvelope, FaCheckCircle, FaClock } from "react-icons/fa";
import Loader from '../../../../utilities/Loader';
import { usePatientPersonalInfoQuery } from "../../../../../features/auth/patientApi";

const PatientInfoCard = () => {
  const {
    data: patientData,
    isLoading,
    refetch,
  } = usePatientPersonalInfoQuery();
  

  useEffect(() => {
    refetch();
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-md lg:max-w-lg">
      <div className="p-4 sm:p-6">
        <div className="flex items-center space-x-4 mb-4 sm:mb-6">
          <div className="avatar flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center sm:w-14 sm:h-14">
              <FaUser className="text-white text-xl sm:text-2xl p-2 w-full h-full" />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
              {patientData?.name}
            </h2>
            <p className="text-sm text-dark flex items-center sm:text-base">
              <FaEnvelope className="mr-1 text-teal-500" /> {patientData?.email}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Status */}
          <div className="flex items-center text-sm sm:text-base">
            <FaCheckCircle className="mr-2 text-green-500" />
            <span className="text-extraDark">
              Status: {patientData?.status}
            </span>
          </div>

          {/* Subscription */}
          <div className="flex items-center text-sm sm:text-base">
            <FaClock className="mr-2 text-yellow-500" />
            <span className="text-extraDark">
              Subscription:{" "}
              {patientData?.subscription?.isActive ? "Active" : "Inactive"} (
              {patientData?.subscription?.paymentStatus})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfoCard;