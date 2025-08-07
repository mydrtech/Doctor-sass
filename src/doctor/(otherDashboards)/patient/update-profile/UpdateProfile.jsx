import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { usePatientPersonalInfoQuery, useUpdatePatientPersonalInfoMutation } from "../../../docProvider/docQuery/doctorApiSlice";


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
});

const UpdateProfile = () => {
  const navigate = useNavigate(); 

  const { data: patientInfo, isLoading } = usePatientPersonalInfoQuery();
  const [updatePatientPersonalInfo, { isLoading: updateLoading }] =
    useUpdatePatientPersonalInfoMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (!isLoading && patientInfo) {
      reset({
        name: patientInfo.name || "",
        email: patientInfo.email || "",
      });
    }
  }, [isLoading, patientInfo, reset]);

  const onSubmit = async (formData) => {
    const result = await updatePatientPersonalInfo(formData);

    if (result?.data) {
      toast.success(result?.data?.message || "Updated successfully");
      navigate("/doctor/patient");
    } else if (result?.error) {
      toast.error(result?.error?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading profile data...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"
            >
              <FaUser className="text-teal" /> Name
            </label>
            <input
              id="name"
              {...register("name")}
              type="text"
              placeholder="Name"
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"
            >
              <FaEnvelope className="text-teal" /> Email
            </label>
            <input
              readOnly
              id="email"
              {...register("email")}
              type="email"
              placeholder="Email"
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition w-full">
            {updateLoading ? "Please wait..." : "Update Profile"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateProfile;