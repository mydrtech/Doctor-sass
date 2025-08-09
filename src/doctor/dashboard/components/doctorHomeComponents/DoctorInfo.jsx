import React from "react";

import { FaUserMd, FaCheckCircle, FaCreditCard } from "react-icons/fa";
import { useGetMySiteQuery } from "../../../../features/auth/doctorApi";

// Main Component
export default function DoctorInfoCard() {
  const { data: doctorData, isLoading } = useGetMySiteQuery();
  const { name, email, role, status, subscription } = doctorData?.doctor || {};

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-600">Loading doctor info...</div>
    );
  }

  return (
    <div className="max-w-lg bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl shadow-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
      <HeaderSection name={name} email={email} role={role} />
      <StatusSection status={status} />
      <SubscriptionSection subscription={subscription} />
    </div>
  );
}

// Header Section
function HeaderSection({ name, email, role }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <FaUserMd className="text-4xl" />
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm opacity-90">
          {email} | {role}
        </p>
      </div>
    </div>
  );
}

// Status Section
function StatusSection({ status }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <FaCheckCircle className="text-green-300" />
      <p className="text-sm">
        Status: <span className="font-medium">{status}</span>
      </p>
    </div>
  );
}

// Subscription Section
function SubscriptionSection({ subscription }) {
  return (
    <div className="bg-white/10 p-3 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        <FaCreditCard className="text-yellow-300" />
        <h3 className="text-md font-semibold">Subscription Details</h3>
      </div>

      <p className="text-xs">
        Active:{" "}
        <span className="font-medium">
          {subscription?.isActive ? "Yes" : "No"}
        </span>
      </p>
      <p className="text-xs">
        Payment Status:{" "}
        <span className="font-medium">{subscription?.paymentStatus}</span>
      </p>
    </div>
  );
}