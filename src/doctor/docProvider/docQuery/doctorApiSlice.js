import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApiSlice = createApi({
  reducerPath: "doctorApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://medicare-pro-backend.vercel.app",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
return headers;
    },
  }),

  endpoints: (builder) => {
    return {
      // Login api
      login: builder.mutation({
        query: (credentials) => ({
          url: "/api/v1/auth/login",
          method: "POST",
          body: credentials,
        }),
      }),

      //   get my site for doctor
      getMySite: builder.query({
        query: () => ({
          url: "/api/v1/doctor/profile",
          method: "GET",
        }),
      }),

      //   get hospitals for doctor
      getMyHospitals: builder.query({
        query: () => ({
          url: "/api/v1/doctor/hospitals",
          method: "GET",
        }),
      }),

      //   get my assistants
      getMyAssistants: builder.query({
        query: () => ({
          url: "/api/v1/doctor/assistants",
          method: "GET",
        }),
      }),

      //   get single assistant
      getSingleAssistant: builder.query({
        query: (id) => ({
          url: `/api/v1/doctor/assistants/${id}`,
          method: "GET",
        }),
      }),

      //   add assistant
      addAssistant: builder.mutation({
        query: (assistantData) => ({
          url: `/api/v1/doctor/assistants`,
          method: "POST",
          body: assistantData,
        }),
      }),

      //   update assistant
      updateAssistant: builder.mutation({
        query: ({ id, updatedDoc }) => ({
          url: `/api/v1/doctor/assistants/${id}`,
          method: "PATCH",
          body: updatedDoc,
        }),
      }),

      //   delete assistant
      deleteAssistant: builder.mutation({
        query: (id) => ({
          url: `/api/v1/doctor/assistants/${id}`,
          method: "DELETE",
        }),
      }),

      //   add hospital
      addHospital: builder.mutation({
        query: (hospitalData) => ({
          url: `/api/v1/doctor/add-hospital`,
          method: "POST",
          body: hospitalData,
        }),
      }),

      //   add service
      addService: builder.mutation({
        query: (serviceData) => ({
          url: `/api/v1/doctor/services`,
          method: "POST",
          body: serviceData,
        }),
      }),

      // get my services
      getMyServices: builder.query({
        query: () => ({
          url: "/api/v1/doctor/services",
          method: "GET",
        }),
      }),

      // get appointment requests
      getAppointmentRequests: builder.query({
        query: () => ({
          url: "/api/v1/doctor/pendig-request",
          method: "GET",
        }),
      }),

      //   get single subscription plan
      getSingleSubscriptionPlan: builder.query({
        query: (planId) => ({
          url: `/api/v1/admin/plans/${planId}`,
          method: "GET",
        }),
      }),

      //   add patient appointment
      addPatientAppointment: builder.mutation({
        query: (patientData) => ({
          url: `/api/v1/doctor/add-pattaient`,
          method: "POST",
          body: patientData,
        }),
      }),

      //   get my patients
      getMyPatients: builder.query({
        query: () => ({
          url: `/api/v1/doctor/all-patatoins`,
          method: "GET",
        }),
      }),

      //   admit patient
      admitPatient: builder.mutation({
        query: (patientData) => ({
          url: `/api/v1/doctor/admitPatient`,
          method: "POST",
          body: patientData,
        }),
      }),

      //   add prescription by doctor
      addPrescription: builder.mutation({
        query: (prescriptionData) => ({
          url: `/api/v1/doctor/prescriptions`,
          method: "POST",
          body: prescriptionData,
        }),
      }),

      //   hospital info for  patient
      patientMyHospital: builder.query({
        query: () => ({
          url: `/api/v1/patient/hospitilizes`,
          method: "GET",
        }),
      }),

      //   user info for  patient
      patientPersonalInfo: builder.query({
        query: () => ({
          url: `/api/v1/patient/me`,
          method: "GET",
        }),
      }),

      //   prescription for  patient
      patientPrescription: builder.query({
        query: () => ({
          url: `/api/v1/patient/my-prescriptions`,
          method: "GET",
        }),
      }),

      //  update user info for  patient
      updatePatientPersonalInfo: builder.mutation({
        query: (updatedData) => ({
          url: `/api/v1/patient/me`,
          method: "PATCH",
          body: updatedData,
        }),
      }),
    };
  },
});

export const {
  useLoginMutation,
  useGetMySiteQuery,
  useGetMyHospitalsQuery,
  useGetSingleSubscriptionPlanQuery,
  useGetMyAssistantsQuery,
  useGetSingleAssistantQuery,
  useAddAssistantMutation,
  useUpdateAssistantMutation,
  useDeleteAssistantMutation,
  useAddHospitalMutation,
  useAddServiceMutation,
  useGetMyServicesQuery,
  useAddPatientAppointmentMutation,
  useGetMyPatientsQuery,
  useAdmitPatientMutation,
  useGetAppointmentRequestsQuery,
  usePatientMyHospitalQuery,
  usePatientPersonalInfoQuery,
  useUpdatePatientPersonalInfoMutation,
  usePatientPrescriptionQuery,
  useAddPrescriptionMutation,
} = doctorApiSlice;
