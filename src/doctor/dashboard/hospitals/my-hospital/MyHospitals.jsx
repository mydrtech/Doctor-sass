import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaSearch,
  FaSortAmountDownAlt,
  FaUndo,
} from "react-icons/fa";
import { useGetMyHospitalsQuery } from "../../../docProvider/docQuery/doctorApiSlice";
import Loader from '../../../utilities/Loader';
import HospitalInfoCard from "../../../shared-components/HospitalInfoCard";

const MyHospitals = () => {
  const { data: hospitals, isLoading, refetch } = useGetMyHospitalsQuery();

  const { register, watch, reset } = useForm({
    defaultValues: {
      searchName: "",
      searchLocation: "",
      sortDate: "",
      sortAdmitCount: "",
    },
  });

  useEffect(() => {
    refetch();
  }, [hospitals]);

  if (isLoading) return <Loader />;

  const filteredHospitals = [...(hospitals || [])].filter((hospital) => {
    const nameMatch =
      !watch("searchName") ||
      hospital.name.toLowerCase().includes(watch("searchName").toLowerCase());
    const locationMatch =
      !watch("searchLocation") ||
      hospital.location
        .toLowerCase()
        .includes(watch("searchLocation").toLowerCase());
    return nameMatch && locationMatch;
  });

  const sortedHospitals = [...filteredHospitals].sort((a, b) => {
    const sortDate = watch("sortDate");
    const sortAdmitCount = watch("sortAdmitCount");

    if (sortDate) {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortDate === "desc" ? dateB - dateA : dateA - dateB;
    }

    if (sortAdmitCount) {
      return sortAdmitCount === "desc"
        ? b.admitCount - a.admitCount
        : a.admitCount - b.admitCount;
    }

    return 0;
  });

  const handleReset = () => {
    reset({
      searchName: "",
      searchLocation: "",
      sortDate: "",
      sortAdmitCount: "",
    });
  };

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Hospitals</h2>

      {/* Filters + Sorting UI */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-4 rounded-lg shadow-lg mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full grow flex flex-col md:flex-row gap-4">
          {/* Search Name */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by name..."
              {...register("searchName")}
              className="input input-bordered w-full pl-10 pr-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Search Location */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by location..."
              {...register("searchLocation")}
              className="input input-bordered w-full pl-10 pr-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Sort by Date */}
        <div className="w-full md:w-1/3">
          <div className="relative">
            <select
              {...register("sortDate")}
              className="select select-bordered w-full pl-10 pr-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="">Sort by Date</option>
              <option value="desc">Recently Added</option>
              <option value="asc">Oldest First</option>
            </select>
            <FaSortAmountDownAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Sort by Admit Count */}
        <div className="w-full md:w-1/3">
          <div className="relative">
            <select
              {...register("sortAdmitCount")}
              className="select select-bordered w-full pl-10 pr-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="">Sort by Admit Count</option>
              <option value="desc">High to Low</option>
              <option value="asc">Low to High</option>
            </select>
            <FaSortAmountDownAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Reset Button */}
        <div className="w-full md:w-1/4 text-center md:text-left">
          <button
            onClick={handleReset}
            className="btn btn-sm bg-white text-teal hover:bg-highlight hover:text-white transition ease-in-out border-teal flex items-center gap-2 w-full md:w-auto"
          >
            <FaUndo className="text-lg" /> Reset
          </button>
        </div>
      </div>

      {/* Results */}
      {sortedHospitals.length === 0 ? (
        <div className="text-center py-10 bg-base-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Hospital Found
          </h3>
          <p className="text-gray-500">
            Sorry, no hospital matches your search or filter criteria. Try
            adjusting your filters or resetting the search.
          </p>
          <button
            onClick={handleReset}
            className="btn btn-primary mt-4 text-white"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {sortedHospitals.map((hospital) => (
            <HospitalInfoCard
              key={hospital?._id}
              hospital={hospital}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHospitals;