import React from "react";
import { FaStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ServiceInfoCard = ({ service }) => {
  if (!service) return null;

  const { name, description, price, duration, location, availableTimes } = service;

  return (
    <div className="card w-full bg-base-100 shadow-xl mx-auto relative">
      {/* Banner/Header section */}
      <figure className="btn-grad h-24 mb-8"></figure>

      {/* Main content */}
      <div className="card-body items-center text-center">

        {/* Avatar */}
        <div className="avatar flex justify-center items-center absolute top-[7%] z-10">
          <div className="w-24 rounded-full bg-teal flex justify-center items-center">
            <p className="h-full text-4xl font-bold flex items-center justify-center text-white">
              {name?.charAt(0)}
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 className="card-title text-2xl font-semibold">{name}</h2>
        <p className="text-gray-500 uppercase">Service</p>

        {/* Details */}
        <div className="grow space-y-2 text-left w-full mt-2">
          {description && (
            <p>
              <strong>Description:</strong> {description}
            </p>
          )}
          {price !== undefined && (
            <p>
              <strong>Price:</strong> ${price}
            </p>
          )}
          {duration && (
            <p>
              <strong>Duration:</strong> {duration} minutes
            </p>
          )}
          {location && (
            <p>
              <strong>Location:</strong> {location}
            </p>
          )}

          {/* Available Times */}
          {Array.isArray(availableTimes) && availableTimes.length > 0 && (
            <div>
              <strong>Available Times:</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                {availableTimes.map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Optional Actions */}
        {/* 
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">Edit Service</button>
        </div> 
        */}
      </div>
    </div>
  );
};

export default ServiceInfoCard;