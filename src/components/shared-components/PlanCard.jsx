"use client";

import { FaClock } from "react-icons/fa";
import { useGetSingleSubscriptionPlanQuery } from "../docProvider/docQuery/doctorApiSlice";

const PlanCard = ({ planId }) => {
  const { data: plan, isLoading } = useGetSingleSubscriptionPlanQuery(planId);

  if (isLoading)
    return (
      <div className="w-full flex justify-center items-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  // console.log(data);
  return (
    <div className="card bg-base-100 shadow-md rounded-lg p-4 mb-4 h-full hover:scale-105 transition ease-in-out">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{plan?.name}</h3>
        </div>
        <span className="text-3xl font-bold text-highlight">
          ${plan?.price.toFixed(2)}
        </span>
        <span className="text-sm text-gray-500">per month</span>
      </div>

      {/* Duration Section */}
      <div className="mb-4 p-3 bg-base-200 rounded-lg flex justify-between">
        <div className="flex items-center gap-2">
          <FaClock className="text-lg text-gray-600" />
          <span className="font-medium">Duration</span>
        </div>
        <p className="">{plan?.durationInDays} Days</p>
      </div>

      {/* Features Section */}
      <div className="mb-4 grow ">
        <h4 className="font-semibold mb-2">FEATURES INCLUDED</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
          {plan?.features?.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      {/* <div className=" grid grid-cols-2 gap-4">
          <Link
            href={`/doctor-register?planId=${plan._id}`}
            className="btn btn-sm bg-teal text-white flex items-center gap-2"
          >
            <FaEdit className="text-lg" /> Buy Now
          </Link>
        </div> */}
    </div>
  );
};

export default PlanCard;
