import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaPrescriptionBottle, FaFilePdf, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
// import { useGetMyPatientsQuery } from "../../../../features/auth/patientApi";
// import { useAddPrescriptionMutation } from "../../../../features/auth/doctorApi";
import Loader from "../../../../components/shared/Loader";
import { useGetMyPatientsQuery } from "../../../../services/patientApiSlice";
import { useAddPrescriptionMutation } from "../../../../services/doctorApiSlice";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Prescription title is required")
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
  content: yup
    .string()
    .required("Content is required")
    .min(5, "Content must be at least 5 characters"),
  patientId: yup.string().required("Patient is required"),
  pdf: yup
    .mixed()
    .required("PDF file is required")
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (!value) return false;
      return value[0]?.type === "application/pdf";
    })
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return false;
      return value[0]?.size <= 5 * 1024 * 1024; // 5MB in bytes
    }),
});

export default function AddPrescriptionForm() {
  const { data: patientsData, isLoading: patientsLoading } =
    useGetMyPatientsQuery();
  const [addPrescription, { isLoading }] = useAddPrescriptionMutation();
  const [patientOptions, setPatientOptions] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    // console.log("patientsData:", patientsData?.patients); // Debug the structure
    if (!patientsLoading && patientsData) {
      const patients = patientsData?.patients || []; // Adjust based on actual structure
      const options = patients?.map((patient) => ({
        value: patient._id,
        label: `${patient.name} (${patient.email})`,
      }));
      setPatientOptions(options);
    }
  }, [patientsLoading, patientsData]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      patientId: "",
      pdf: null,
    },
  });

  const onSubmit = async (data) => {
    console.log("submitted data", data);
    // const formData = new FormData();
    // formData.append("title", data.name);
    // formData.append("content", data.content);
    // formData.append("patientId", data.patientId);
    // formData.append("pdf", data.pdf[0]);

    // console.log("Form data submitted:", Object.fromEntries(formData));

    // Swal.fire({
    //   title: "Are you sure?",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, Add Prescription!",
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     const result = await addPrescription(data);
    //     console.log(result);
    //     if (result?.data) {
    //       //   router.push("/doctor/dashboard/hospitals/my-hospital");
    //       toast.success(`${result?.data?.message}`, {
    //         position: "top-right",
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: false,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //       reset();
    //       return;
    //     }
    //     if (result?.error) {
    //       toast.error(`${result?.error?.data?.message}`, {
    //         position: "top-center",
    //         autoClose: false,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: false,
    //         theme: "light",
    //       });
    //     }
    //   }
    // });
  };

  if (patientsLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add Prescription
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"
          >
            <FaPrescriptionBottle className="text-teal-600" /> Prescription
            Title
          </label>
          <input
            id="title"
            {...register("title")}
            type="text"
            placeholder="Enter prescription title"
            className={`input input-bordered w-full ${
              errors.name ? "input-error" : ""
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"
          >
            <FaPrescriptionBottle className="text-teal-600" /> Content
          </label>
          <textarea
            id="content"
            {...register("content")}
            placeholder="Enter prescription details"
            className={`textarea textarea-bordered w-full ${
              errors.content ? "textarea-error" : ""
            }`}
            rows={4}
          />
          {errors.content && (
            <span className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </span>
          )}
        </div>

        {/* Patient ID */}
        <div>
          <label
            htmlFor="patientId"
            className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"
          >
            <FaUser className="text-teal-600" /> Select Patient
          </label>
          {isHydrated && (
            <Controller
              name="patientId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={patientOptions}
                  onChange={(selectedOption) =>
                    field.onChange(selectedOption?.value)
                  }
                  onBlur={field.onBlur}
                  value={patientOptions.find(
                    (option) => option.value === field.value
                  )}
                  placeholder="Search or select patient..."
                  className="w-full"
                  classNamePrefix="react-select"
                  instanceId="static-patient-select"
                />
              )}
            />
          )}
          {errors.patientId && (
            <span className="text-red-500 text-sm mt-1">
              {errors.patientId.message}
            </span>
          )}
        </div>

        {/* PDF */}
        <div>
          <label
            htmlFor="pdf"
            className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"
          >
            <FaFilePdf className="text-teal-600" /> Upload PDF
          </label>
          <input
            id="pdf"
            {...register("pdf")}
            type="file"
            accept="application/pdf"
            className={`file-input file-input-bordered w-full ${
              errors.pdf ? "file-input-error" : ""
            }`}
          />
          {errors.pdf && (
            <span className="text-red-500 text-sm mt-1">
              {errors.pdf.message}
            </span>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition w-full">
          Add Prescription
        </button>
      </form>
    </div>
  );
}
