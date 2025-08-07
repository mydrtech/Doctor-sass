import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaNotesMedical,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTag,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";

import { useNavigate } from "react-router-dom"; // React Router DOM
import { useAddPatientAppointmentMutation, useGetMyServicesQuery } from "../../../docProvider/docQuery/doctorApiSlice";
import Loader from '../../../utilities/Loader';

const today = new Date();
const oneYearFromToday = new Date(today);
oneYearFromToday.setFullYear(today.getFullYear() + 1);

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  serviceId: yup.string().required("Service is required"),
  patientNote: yup
    .string()
    .required("Patient note is required")
    .min(5, "Note must be at least 5 characters"),
  appointmentDate: yup
    .date()
    .required("Appointment date is required")
    .min(today, "Date must be today or later")
    .max(oneYearFromToday, "Date must be within one year from today"),
  timeSlot: yup.string().required("Time slot is required"),
  location: yup
    .string()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters"),
});

export default function AddAppointmentForm() {
  const [isHydrated, setIsHydrated] = useState(false);
  const { data, isLoading } = useGetMyServicesQuery();
  const [addPatientAppointment, { isLoading: appointmentLoading }] =
    useAddPatientAppointmentMutation();
  const [services, setServices] = useState([]);
  const navigate = useNavigate(); // React Router for navigation

  useEffect(() => {
    setIsHydrated(true);
    if (!isLoading && data?.services) {
      setServices(data.services);
    }
  }, [isLoading, data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      serviceId: "",
      patientNote: "",
      appointmentDate: "",
      timeSlot: "",
      location: "",
    },
  });

  const serviceOptions = services.map((service) => ({
    value: service._id,
    label: `${service.name} - $${service.price} (${service.duration} mins)`,
  }));

  const onSubmit = async (formData) => {
    const result = await addPatientAppointment(formData);

    if (result?.data) {
      toast.success(result.data.message);
      reset();
      navigate("/doctor/dashboard/patients");
    } else if (result?.error) {
      toast.error(result.error?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Patient</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* Name */}
        <InputField
          label="Name"
          icon={<FaUser />}
          id="name"
          register={register}
          error={errors.name}
        />

        {/* Email */}
        <InputField
          label="Email"
          icon={<FaEnvelope />}
          id="email"
          register={register}
          type="email"
          error={errors.email}
        />

        {/* Password */}
        <InputField
          label="Password"
          icon={<FaLock />}
          id="password"
          register={register}
          type="password"
          error={errors.password}
        />

        {/* Select Service */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <FaTag className="text-teal" /> Select Service
          </label>
          {isHydrated && (
            <Controller
              name="serviceId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={serviceOptions}
                  onChange={(option) => field.onChange(option?.value)}
                  value={serviceOptions.find(opt => opt.value === field.value)}
                  placeholder="Search or select service..."
                  className="w-full"
                  classNamePrefix="react-select"
                  instanceId="service-select"
                />
              )}
            />
          )}
          {errors.serviceId && (
            <span className="text-red-500 text-sm">{errors.serviceId.message}</span>
          )}
        </div>

        {/* Patient Note */}
        <TextAreaField
          label="Patient Note"
          icon={<FaNotesMedical />}
          id="patientNote"
          register={register}
          error={errors.patientNote}
        />

        {/* Appointment Date */}
        <InputField
          label="Appointment Date"
          icon={<FaCalendarAlt />}
          id="appointmentDate"
          register={register}
          type="date"
          error={errors.appointmentDate}
          min={today.toISOString().split("T")[0]}
          max={oneYearFromToday.toISOString().split("T")[0]}
        />

        {/* Time Slot */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <FaClock className="text-teal" /> Time Slot
          </label>
          <select
            {...register("timeSlot")}
            className={`select select-bordered w-full ${
              errors.timeSlot ? "select-error" : ""
            }`}
          >
            <option value="">Select a time slot</option>
            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
            <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
            <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
          </select>
          {errors.timeSlot && (
            <span className="text-red-500 text-sm">{errors.timeSlot.message}</span>
          )}
        </div>

        {/* Location */}
        <InputField
          label="Location"
          icon={<FaMapMarkerAlt />}
          id="location"
          register={register}
          error={errors.location}
        />

        {/* Submit Button */}
        <button
          disabled={appointmentLoading}
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition w-full"
        >
          {appointmentLoading ? "Please Wait..." : "Add Appointment"}
        </button>
      </form>
    </div>
  );
}

// Reusable Input Field
function InputField({ label, icon, id, register, error, type = "text", ...rest }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
        {icon} {label}
      </label>
      <input
        id={id}
        {...register(id)}
        type={type}
        className={`input input-bordered w-full ${error ? "input-error" : ""}`}
        {...rest}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
}

// Reusable TextArea Field
function TextAreaField({ label, icon, id, register, error }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
        {icon} {label}
      </label>
      <textarea
        id={id}
        {...register(id)}
        className={`textarea textarea-bordered w-full ${error ? "textarea-error" : ""}`}
        rows={3}
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
}