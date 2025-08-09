import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaUser, FaHospital } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";

import { useGetMyHospitalsQuery } from "../../../../features/auth/doctorApi";
import { useAdmitPatientMutation, useGetMyPatientsQuery } from "../../../../features/auth/patientApi";

// ✅ Validation Schema
const schema = yup.object().shape({
  patientId: yup.string().required("Patient is required"),
  hospitalId: yup.string().required("Hospital is required"),
});

const AdmitPatientForm = () => {
  const { data: patientData, isLoading: isPatientLoading } = useGetMyPatientsQuery();
  const { data: hospitalData, isLoading: isHospitalLoading } = useGetMyHospitalsQuery();
  const [admitPatient, { isLoading: admitLoading }] = useAdmitPatientMutation();

  const [patients, setPatients] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      patientId: "",
      hospitalId: "",
    },
  });

  // 🧠 Set Patients
  useEffect(() => {
    if (!isPatientLoading && patientData?.patients) {
      setPatients(patientData.patients);
    }
  }, [isPatientLoading, patientData]);

  // 🧠 Set Hospitals
  useEffect(() => {
    if (!isHospitalLoading && hospitalData) {
      setHospitals(hospitalData);
    }
  }, [isHospitalLoading, hospitalData]);

  const onSubmit = async (data) => {
    const result = await admitPatient(data);
    if (result?.data) {
      toast.success(result.data.message || "Patient admitted successfully");
      reset();
    } else if (result?.error) {
      toast.error(result.error.data?.message || "Failed to admit patient");
    }
  };

  // 📌 Options
  const patientOptions = patients.map((p) => ({
    value: p._id,
    label: `${p.name} (${p.email})`,
  }));

  const hospitalOptions = hospitals.map((h) => ({
    value: h._id,
    label: `${h.name} (${h.location})`,
  }));

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Admit Patient</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 👤 Patient Select */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <FaUser className="text-blue-500" />
            Select Patient
          </label>
          <Controller
            name="patientId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={patientOptions}
                onChange={(option) => field.onChange(option?.value)}
                value={patientOptions.find((opt) => opt.value === field.value)}
                placeholder="Choose patient..."
              />
            )}
          />
          {errors.patientId && (
            <p className="text-red-500 text-sm mt-1">{errors.patientId.message}</p>
          )}
        </div>

        {/* 🏥 Hospital Select */}
        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
            <FaHospital className="text-green-500" />
            Select Hospital
          </label>
          <Controller
            name="hospitalId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={hospitalOptions}
                onChange={(option) => field.onChange(option?.value)}
                value={hospitalOptions.find((opt) => opt.value === field.value)}
                placeholder="Choose hospital..."
              />
            )}
          />
          {errors.hospitalId && (
            <p className="text-red-500 text-sm mt-1">{errors.hospitalId.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={admitLoading}
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition w-full"
        >
          {admitLoading ? "Processing..." : "Admit Patient"}
        </button>
      </form>
    </div>
  );
};

export default AdmitPatientForm;