import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FaTag,
  FaInfoCircle,
  FaDollarSign,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useAddServiceMutation } from "../../../docProvider/docQuery/doctorApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Service name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive")
    .integer("Price must be an integer"),
  duration: yup
    .number()
    .required("Duration is required")
    .positive("Duration must be positive")
    .integer("Duration must be an integer")
    .min(5, "Duration must be at least 5 minutes"),
  location: yup
    .string()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters"),
  availableTimes: yup.array().required("Available times are required"),
});

export default function AddServiceForm() {
  const [addService, { isLoading }] = useAddServiceMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      duration: "",
      location: "",
      availableTimes: [],
    },
  });

  const startTime = watch("startTime");
  const endTime = watch("endTime");

  useEffect(() => {
    if (startTime && endTime) {
      const formatTime = (time) => {
        const [hours, minutes] = time.split(":");
        const hour = parseInt(hours, 10);
        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${period}`;
      };

      const startTimeFormatted = formatTime(startTime);
      const endTimeFormatted = formatTime(endTime);
      const timeRange = `${startTimeFormatted} - ${endTimeFormatted}`;
      setValue("availableTimes", [timeRange]);
    } else {
      setValue("availableTimes", []);
    }
  }, [startTime, endTime, setValue]);

  const onSubmit = async (data) => {
    const { name, description, price, duration, location, availableTimes } = data;

    const serviceData = {
      name,
      description,
      price,
      duration,
      location,
      availableTimes,
    };

    try {
      const result = await addService(serviceData);
      if (result?.data) {
        navigate("/doctor/dashboard/services");
        toast.success(`${result.data.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
        reset();
        return;
      }
      if (result?.error) {
        toast.error(`${result.error.data.message}`, {
          position: "top-center",
          autoClose: false,
        });
      }
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-4 md:mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Service</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <InputField
          id="name"
          label="Service Name"
          icon={<FaTag />}
          register={register}
          error={errors.name}
        />

        {/* Description */}
        <TextAreaField
          id="description"
          label="Description"
          icon={<FaInfoCircle />}
          register={register}
          error={errors.description}
        />

        {/* Price */}
        <InputField
          id="price"
          label="Price (USD)"
          icon={<FaDollarSign />}
          type="number"
          register={register}
          error={errors.price}
        />

        {/* Duration */}
        <InputField
          id="duration"
          label="Duration (minutes)"
          icon={<FaClock />}
          type="number"
          register={register}
          error={errors.duration}
        />

        {/* Location */}
        <InputField
          id="location"
          label="Location"
          icon={<FaMapMarkerAlt />}
          register={register}
          error={errors.location}
        />

        {/* Start Time */}
        <InputField
          id="startTime"
          label="Start Time"
          icon={<FaClock />}
          type="time"
          register={register}
        />

        {/* End Time */}
        <InputField
          id="endTime"
          label="End Time"
          icon={<FaClock />}
          type="time"
          register={register}
        />

        {/* Submit */}
        <button
          disabled={isLoading}
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition w-full"
        >
          {isLoading ? "Please Wait..." : "Add Service"}
        </button>
      </form>
    </div>
  );
}

// Reusable input component
const InputField = ({ id, label, icon, register, error, type = "text" }) => (
  <div className="relative">
    <label htmlFor={id} className="text-sm font-medium text-dark flex items-center gap-2 mb-1">
      {icon} {label}
    </label>
    <input
      id={id}
      {...register(id)}
      type={type}
      placeholder={label}
      className={`input input-bordered w-full ${error ? "input-error" : ""}`}
    />
    {error && <span className="text-danger text-sm mt-1">{error.message}</span>}
  </div>
);

// Reusable textarea component
const TextAreaField = ({ id, label, icon, register, error }) => (
  <div className="relative">
    <label htmlFor={id} className="text-sm font-medium text-dark flex items-center gap-2 mb-1">
      {icon} {label}
    </label>
    <textarea
      id={id}
      {...register(id)}
      placeholder={label}
      className={`textarea textarea-bordered w-full ${error ? "textarea-error" : ""}`}
      rows={3}
    />
    {error && <span className="text-danger text-sm mt-1">{error.message}</span>}
  </div>
);