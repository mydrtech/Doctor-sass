import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUserMd, FaUserNurse, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../docProvider/docQuery/doctorApiSlice";

const demoCredentials = {
  doctor: {
    email: import.meta.env.VITE_DOCTOR_EMAIL,
    password: import.meta.env.VITE_DOCTOR_PASSWORD,
    icon: FaUserMd,
    label: "Doctor",
  },
  assistant: {
    email: import.meta.env.VITE_ASSISTANT_EMAIL,
    password: import.meta.env.VITE_ASSISTANT_PASSWORD,
    icon: FaUserNurse,
    label: "Assistant",
  },
  patient: {
    email: import.meta.env.VITE_PATIENT_EMAIL,
    password: import.meta.env.VITE_PATIENT_PASSWORD,
    icon: FaUser,
    label: "Patient",
  },
};

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleDemoLogin = (userType) => {
    const credentials = demoCredentials[userType];
    setValue("email", credentials.email);
    setValue("password", credentials.password);
  };

  const onSubmit = async (data) => {
    const result = await login(data);

    if (result?.data) {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      const role = result.data.user.role;
      if (role === "doctor") navigate("/doctor/dashboard");
      else if (role === "assistant") navigate("/doctor/assistant");
      else if (role === "patient") navigate("/doctor/patient");

      toast.success("Welcome to your dashboard", {
        position: "top-right",
        autoClose: 3000,
      });
      reset();
    } else if (result?.error) {
      toast.error(result.error?.data?.message || "Login failed", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-teal-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-teal-700">
              Welcome to MediCare Pro
            </h1>
            <p className="text-gray-600 text-sm md:text-base">Login to continue</p>
          </div>

          {/* Demo Buttons */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Try Demo Accounts:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(demoCredentials).map(([key, cred]) => {
                const Icon = cred.icon;
                return (
                  <button
                    key={key}
                    onClick={() => handleDemoLogin(key)}
                    className="bg-white border border-teal-300 hover:bg-teal-50 transition-all duration-200 p-3 rounded-lg flex flex-col items-center justify-center shadow-sm"
                  >
                    <Icon className="text-xl text-teal-600" />
                    <span className="text-xs mt-1 font-medium text-gray-700">{cred.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-b border-gray-200" />

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md transition"
              disabled={isLoading}
            >
              {isLoading ? "Please Wait..." : "Login"}
            </button>
          </form>

          <div className="text-center space-y-1 pt-4">
            <button className="text-sm text-teal-700 hover:underline font-medium">
              Forgot your password?
            </button>
            <p className="text-xs text-gray-500">Need help? Contact support.</p>
          </div>
        </div>
      </div>
    </div>
  );
}