import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAddAssistantMutation } from "../../../../features/auth/doctorApi";

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
  permissions: yup.object().shape({
    managePatients: yup.boolean(),
    manageAppointments: yup.boolean(),
    manageSchedule: yup.boolean(),
  }),
});

export default function AddAssistantForm() {
  const [addAssistant, { isLoading }] = useAddAssistantMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      permissions: {
        managePatients: false,
        manageAppointments: false,
        manageSchedule: false,
      },
    },
  });

  const permissions = watch("permissions");

  const togglePermission = (key) => {
    setValue(`permissions.${key}`, !permissions[key], {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add Assistant!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await addAssistant(data);
        if (res?.data) {
          toast.success(`${res?.data?.message}`, {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/doctor/dashboard/assistants");
          reset();
        } else if (res?.error) {
          toast.error(`${res?.error?.data?.message}`, {
            position: "top-center",
            autoClose: 10000,
          });
        }
      }
    });
  };

  return (
    <div className="card w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden relative mt-10">
      {/* Banner */}
      <div className="h-24 bg-gradient-to-r from-teal-500 to-blue-500"></div>

      {/* Form Body */}
      <div className="p-6 pt-10 relative">
        {/* Avatar placeholder */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-20 h-20 rounded-full bg-teal-600 flex justify-center items-center text-white text-3xl font-bold shadow-md">
            +
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center mt-10 mb-6">Add New Assistant</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <FaUser /> Assistant's Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Enter name"
              className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <FaEnvelope /> Assistant's Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter email"
              className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2">
              <FaLock /> Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Create password"
              className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Permissions */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold mb-2 text-highlight">Permissions</h3>
            {Object.keys(permissions).map((key) => (
              <div key={key} className="flex justify-between items-center py-2">
                <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                <button
                  type="button"
                  onClick={() => togglePermission(key)}
                  className="text-xl"
                >
                  {permissions[key] ? (
                    <FaToggleOn className="text-green-500" />
                  ) : (
                    <FaToggleOff className="text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-4">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition w-full"
            >
              {isLoading ? "Please Wait..." : "Add Assistant"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}