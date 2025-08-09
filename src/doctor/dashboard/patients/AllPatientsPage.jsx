
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch, FaFilter, FaUndo } from "react-icons/fa";
import PatientInfoCard from "../../shared-components/PatientInfoCard";
import Loader from "../../utilities/Loader";
import { useGetMyPatientsQuery } from "../../../features/auth/patientApi";

const AllPatientsPage = () => {
  const { data, isLoading, refetch } = useGetMyPatientsQuery();
  const [patients, setPatients] = useState([]);
  const { register, watch, reset } = useForm({
    defaultValues: {
      searchName: "",
      searchEmail: "",
      filterPaymentStatus: "",
      filterStatus: "",
    },
  });

  useEffect(() => {
    if (!isLoading) {
      const { patients: rawPatients } = data || {};
      let filtered = [...(rawPatients || [])];

      const searchName = watch("searchName").toLowerCase();
      const searchEmail = watch("searchEmail").toLowerCase();
      const filterPaymentStatus = watch("filterPaymentStatus");
      const filterStatus = watch("filterStatus");

      if (searchName) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(searchName)
        );
      }

      if (searchEmail) {
        filtered = filtered.filter((p) =>
          p.email.toLowerCase().includes(searchEmail)
        );
      }

      if (filterPaymentStatus) {
        filtered = filtered.filter(
          (p) => p.subscription?.paymentStatus === filterPaymentStatus
        );
      }

      if (filterStatus) {
        filtered = filtered.filter((p) => p.status === filterStatus);
      }

      setPatients(filtered);
      refetch()
    }
  }, [
    isLoading,
    data,
    watch("searchName"),
    watch("searchEmail"),
    watch("filterPaymentStatus"),
    watch("filterStatus"),
  ]);

  const handleReset = () => {
    reset();
  };

  if (isLoading) return <Loader />;

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Patients</h2>

      <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-4 rounded-lg shadow-lg mb-6 flex flex-col md:flex-row gap-4 items-center flex-wrap">
        {/* Search by Name */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              {...register("searchName")}
              className="input input-bordered w-full pl-10 pr-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Search by Email */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by email..."
              {...register("searchEmail")}
              className="input input-bordered w-full pl-10 pr-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Filter by Payment Status */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <select
              {...register("filterPaymentStatus")}
              className="select select-bordered w-full pl-10 pr-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="">Filter by Payment Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Filter by Status */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <select
              {...register("filterStatus")}
              className="select select-bordered w-full pl-10 pr-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="">Filter by Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Reset Button */}
        <div className="w-full md:w-auto">
          <button
            onClick={handleReset}
            className="btn btn-sm bg-white text-teal hover:bg-highlight hover:text-white transition ease-in-out border-teal flex items-center gap-2 w-full md:w-auto"
          >
            <FaUndo /> Reset
          </button>
        </div>
      </div>

      {patients.length === 0 ? (
        <div className="text-center py-10 bg-base-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Patient Found
          </h3>
          <p className="text-gray-500">
            Try changing search or filter criteria.
          </p>
          <button
            onClick={handleReset}
            className="btn btn-primary mt-4 text-white"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient) => (
            <PatientInfoCard key={patient?._id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPatientsPage;