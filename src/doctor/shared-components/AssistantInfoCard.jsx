import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDeleteAssistantMutation } from "../docProvider/docQuery/doctorApiSlice";

const AssistantInfoCard = ({ assistant, refetch }) => {
  const navigate = useNavigate();
  const [deleteAssistant, { isLoading }] = useDeleteAssistantMutation();
  const { _id, email, name, permissions, role } = assistant;

  const handleDelete = (id) => {
    Swal.fire({
      title: `Delete ${name} from your assistants?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteAssistant(id);

        if (res?.data) {
          refetch();
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "light",
          });
        } else if (res?.error) {
          toast.error(res.error?.data?.message || "Deletion failed", {
            position: "top-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      } else if (result.isDenied) {
        toast.info("Changes were not saved", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    });
  };

  return (
    <div className="card w-full bg-white shadow-lg rounded-xl overflow-hidden relative">
      {/* Banner */}
      <div className="h-24 bg-gradient-to-r from-teal-500 to-blue-500"></div>

      {/* Card Body */}
      <div className="p-6 pt-10 text-center relative">
        {/* Avatar */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 rounded-full bg-teal-600 flex justify-center items-center text-white text-4xl font-bold shadow-md">
            {name?.charAt(0)}
          </div>
        </div>

        {/* Name & Role */}
        <h2 className="text-xl font-bold mt-12">{name}</h2>
        <p className="uppercase text-sm text-gray-500 mb-4">{role}</p>

        {/* Email & Permissions */}
        <div className="text-left space-y-2">
          <p>
            <strong>Email:</strong> {email}
          </p>
          <div>
            <strong>Permissions:</strong>
            <ul className="mt-1 space-y-1 text-sm">
              <li className="flex items-center">
                {permissions?.managePatients ? (
                  <FaCheckCircle className="mr-2 text-green-500" />
                ) : (
                  <FaTimesCircle className="mr-2 text-red-500" />
                )}
                Manage Patients
              </li>
              <li className="flex items-center">
                {permissions?.manageAppointments ? (
                  <FaCheckCircle className="mr-2 text-green-500" />
                ) : (
                  <FaTimesCircle className="mr-2 text-red-500" />
                )}
                Manage Appointments
              </li>
              <li className="flex items-center">
                {permissions?.manageSchedule ? (
                  <FaCheckCircle className="mr-2 text-green-500" />
                ) : (
                  <FaTimesCircle className="mr-2 text-red-500" />
                )}
                Manage Schedule
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-3 mt-6">
          <button
            onClick={() =>
              navigate(`/doctor/dashboard/assistants/update-assistant/${_id}`)
            }
            className="flex-1 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(_id)}
            disabled={isLoading}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            {isLoading ? "Please Wait..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistantInfoCard;