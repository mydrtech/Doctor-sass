import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaHospital, FaMapMarkerAlt } from "react-icons/fa";
// import { useAddHospitalMutation } from "../../../docProvider/docQuery/doctorApiSlice"; // ✅ Adjust path if needed
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddHospitalMutation } from "../../../../features/auth/doctorApi";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Hospital name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  location: yup
    .string()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters"),
});

export default function AddHospitalForm() {
  const [addHospital, { isLoading }] = useAddHospitalMutation();
  const navigate = useNavigate(); // ⬅️ Replace useRouter

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      location: "",
    },
  });

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add Hospital!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await addHospital(data);
        if (result?.data) {
          navigate("/doctor/dashboard/hospitals/my-hospital"); // ⬅️ React Router navigation
          toast.success(`${result?.data?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          reset();
          return;
        }
        if (result?.error) {
          toast.error(`${result?.error?.data?.message}`, {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: false,
            theme: "light",
          });
        }
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Hospital</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <FaHospital className="text-xl text-highlight" />
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Hospital Name
            </label>
          </div>
          <input
            {...register("name")}
            id="name"
            type="text"
            className={`input input-bordered w-full pl-3 ${
              errors.name ? "input-error" : ""
            }`}
          />
          {errors.name && (
            <span className="text-danger text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Location */}
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <FaMapMarkerAlt className="text-xl text-highlight" />
            <label htmlFor="location" className="text-sm font-medium text-gray-700">
              Location
            </label>
          </div>
          <input
            {...register("location")}
            id="location"
            type="text"
            className={`input input-bordered w-full pl-3 ${
              errors.location ? "input-error" : ""
            }`}
          />
          {errors.location && (
            <span className="text-danger text-sm mt-1">
              {errors.location.message}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          disabled={isLoading}
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition w-full"
        >
          {isLoading ? "Please Wait.." : "Add Hospital"}
        </button>
      </form>
    </div>
  );
}