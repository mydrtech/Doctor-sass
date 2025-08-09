import React from "react";
import Loader from '../../../utilities/Loader';
import { usePatientPersonalInfoQuery } from "../../../../features/auth/patientApi";

const MyProfilePage = () => {
  const { data, isLoading, error } = usePatientPersonalInfoQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-lg text-red-600">
          {error?.message || "No patient data available."}
        </p>
      </div>
    );
  }

  const { subscription, name, email, status } = data;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Patient Profile</h1>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Name:</span>
          <span className="text-gray-600">{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-600">{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Status:</span>
          <span className="text-gray-600">{status}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Subscription Status:</span>
          <span className="text-gray-600">
            {subscription?.isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Payment Status:</span>
          <span className="text-gray-600">{subscription?.paymentStatus}</span>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;