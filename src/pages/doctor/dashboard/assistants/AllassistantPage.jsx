import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaSearch,
  FaFilter,
  FaSortAmountDownAlt,
  FaUndo,
} from "react-icons/fa";
// import { useGetMyAssistantsQuery } from "../../../features/auth/doctorApi";
import AssistantInfoCard from "../../../../components/shared-components/AssistantInfoCard";
import { useGetMyAssistantsQuery } from "../../../../services/doctorApiSlice";

const AllAssistantPage = () => {
  const { data, isLoading, refetch } = useGetMyAssistantsQuery();
  const [assistants, setAssistants] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      search: "",
      permissions: "",
      sort: "",
    },
  });

  // Watch inputs for filtering and sorting
  const searchTerm = watch("search");
  const permission = watch("permissions");
  const sort = watch("sort");

  useEffect(() => {
    refetch();
    if (!isLoading && data?.assistants) {
      let filtered = [...data.assistants];

      if (searchTerm) {
        filtered = filtered.filter((assistant) =>
          assistant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (permission) {
        filtered = filtered.filter(
          (assistant) => assistant.permissions?.[permission] === true
        );
      }

      if (sort) {
        filtered.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return sort === "desc" ? dateB - dateA : dateA - dateB;
        });
      }

      setAssistants(filtered);
    }
  }, [isLoading, data, searchTerm, permission, sort, refetch]);

  const handleReset = () => {
    reset({
      search: "",
      permissions: "",
      sort: "",
    });
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-10">Loading assistants...</div>
    );
  }

  return (
    <div className="my-8 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-teal-600 mb-8">
        All Assistants
      </h2>

      {/* Filters & Search Bar */}
      <form
        onSubmit={handleSubmit(() => {})}
        className="bg-gradient-to-r from-teal-500 to-blue-600 p-5 rounded-xl shadow-lg mb-10 flex flex-col md:flex-row gap-5 items-center"
      >
        {/* Search */}
        <div className="relative w-full md:flex-1">
          <input
            type="text"
            placeholder="Search by name..."
            {...register("search")}
            className="w-full rounded-lg py-2 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Permission Filter */}
        <div className="relative w-full md:w-64">
          <select
            {...register("permissions")}
            className="w-full rounded-lg py-2 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            <option value="">Filter by Permissions</option>
            <option value="managePatients">Manage Patients</option>
            <option value="manageAppointments">Manage Appointments</option>
            <option value="manageSchedule">Manage Schedule</option>
          </select>
          <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Sort */}
        <div className="relative w-full md:w-64">
          <select
            {...register("sort")}
            className="w-full rounded-lg py-2 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            <option value="">Sort by Date</option>
            <option value="desc">Recently Added</option>
            <option value="asc">Oldest First</option>
          </select>
          <FaSortAmountDownAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Reset */}
        <button
          type="button"
          onClick={handleReset}
          className="bg-white text-teal-600 font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-teal-600 hover:text-white transition flex items-center gap-2 w-full md:w-auto justify-center"
        >
          <FaUndo /> Reset
        </button>
      </form>

      {/* Assistants List */}
      {assistants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assistants.map((assistant) => (
            <AssistantInfoCard
              key={assistant._id}
              assistant={assistant}
              refetch={refetch}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No assistants found.</p>
      )}
    </div>
  );
};

export default AllAssistantPage;