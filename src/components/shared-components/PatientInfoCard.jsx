import React from "react";
import { FaUserCheck, FaEnvelope } from "react-icons/fa";
// import { Link } from "react-router-dom"; // যদি React Router ব্যবহার করো

const PatientInfoCard = ({ patient }) => {
  const { _id, name, email, role, status, subscription } = patient;

  return (
    <div className="card w-full bg-base-100 shadow-xl mx-auto relative">
      <figure className="btn-grad h-24 mb-8"></figure>
      <div className="card-body items-center text-center">
        <div className="avatar flex justify-center items-center absolute top-[7%] z-10">
          <div className="w-24 rounded-full bg-teal flex justify-center items-center">
            <p className="h-full text-4xl font-bold flex items-center justify-center text-white">
              <span>{name.charAt(0)}</span>
            </p>
          </div>
        </div>
        <h2 className="card-title text-2xl font-semibold">{name}</h2>
        <p className="text-gray-500 uppercase">{role}</p>
        <div className="grow space-y-2 text-left w-full">
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Subscription:</strong>{" "}
            {subscription?.isActive ? "Active" : "Inactive"} (
            {subscription?.paymentStatus})
          </p>
          <p>
            <strong>Payment Status:</strong> {subscription?.paymentStatus}
          </p>
        </div>

        {/* <div className="card-actions justify-end mt-4">
          <Link
            to={`/doctor/dashboard/patients/add-prescription?patient=${_id}`}
            className="btn btn-outline text-white bg-teal btn-sm"
          >
            Add Prescription
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default PatientInfoCard;