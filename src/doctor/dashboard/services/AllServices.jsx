import React, { useEffect, useState } from "react";
import ServiceInfoCard from "../../shared-components/ServiceInfoCard";
import { useForm } from "react-hook-form";
import { FaSearch, FaSortAmountDownAlt, FaUndo } from "react-icons/fa";
import Loader from "../../utilities/Loader";
import { useGetMyServicesQuery } from "../../../features/auth/doctorApi";

const AllServices = () => {
  const { data, isLoading, refetch } = useGetMyServicesQuery();
  const [services, setServices] = useState([]);

  const { register, watch, reset } = useForm({
    defaultValues: {
      searchName: "",
      sortPrice: "",
      sortDuration: "",
    },
  });

  useEffect(() => {
    if (!isLoading) {
      refetch();
      const { services: rawServices } = data || {};
      let filtered = [...(rawServices || [])];

      const searchName = watch("searchName").toLowerCase();
      if (searchName) {
        filtered = filtered.filter((s) =>
          s.name.toLowerCase().includes(searchName)
        );
      }

      const sortPrice = watch("sortPrice");
      if (sortPrice) {
        filtered.sort((a, b) =>
          sortPrice === "asc" ? a.price - b.price : b.price - a.price
        );
      }

      const sortDuration = watch("sortDuration");
      if (sortDuration) {
        filtered.sort((a, b) =>
          sortDuration === "asc"
            ? a.duration - b.duration
            : b.duration - a.duration
        );
      }

      setServices(filtered);
    }
  }, [
    isLoading,
    data,
    watch("searchName"),
    watch("sortPrice"),
    watch("sortDuration"),
  ]);

  const handleReset = () => {
    reset({
      searchName: "",
      sortPrice: "",
      sortDuration: "",
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Services</h2>

      {/* Filter/Sort Bar */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-4 rounded-lg shadow-lg mb-6 flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="w-full grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              {...register("searchName")}
              className="input input-bordered w-full pl-10 pr-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Sort by Price */}
        <div className="w-full md:w-1/3">
          <div className="relative">
            <select
              {...register("sortPrice")}
              className="select select-bordered w-full pl-10 pr-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="">Sort by Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
            <FaSortAmountDownAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Sort by Duration */}
        <div className="w-full md:w-1/3">
          <div className="relative">
            <select
              {...register("sortDuration")}
              className="select select-bordered w-full pl-10 pr-4 py-2 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              <option value="">Sort by Duration</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
            <FaSortAmountDownAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Reset Button */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <button
            onClick={handleReset}
            className="btn btn-sm bg-white text-teal hover:bg-highlight hover:text-white transition ease-in-out border-teal flex items-center gap-2 w-full md:w-auto"
          >
            <FaUndo className="text-lg" /> Reset
          </button>
        </div>
      </div>

      {/* Service Grid or Message */}
      {services?.length === 0 ? (
        <div className="text-center py-10 bg-base-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Service Found
          </h3>
          <p className="text-gray-500">
            Sorry, no services match your search or filter criteria.
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
          {services?.map((service) => (
            <ServiceInfoCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllServices;