import { baseApi } from "./baseApi";

export const doctorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMySite: builder.query({
            query: () => ({
                url: `/api/v1/doctor/profile`,
                method: "GET",
            }),
        }),

        getMyHospitals: builder.query({
            query: () => ({
                url: `/api/v1/doctor/hospitals`,
                method: "GET",
            }),
        }),

        addAssistant: builder.mutation({
            query: (assistantData) => ({
                url: `/api/v1/doctor/assistants`,
                method: "POST",
                body: assistantData,
            }),
        }),

        deleteAssistant: builder.mutation({
            query: (id) => ({
                url: `/api/v1/doctor/assistants/${id}`,
                method: "DELETE",
            }),
        }),

        //   get my assistants
        getMyAssistants: builder.query({
            query: () => ({
                url: `/api/v1/doctor/assistants`,
                method: "GET",
            })
        }),

         //   add hospital
        addHospital: builder.mutation({
        query: (hospitalData) => ({
            url: `/api/v1/doctor/add-hospital`,
            method: "POST",
            body: hospitalData,
        }),
        }),

        //   add prescription by doctor
        addPrescription: builder.mutation({
            query: (prescriptionData) => ({
                url: `api/v1/doctor/prescriptions`,
                method: "POST",
                body: prescriptionData,
            })
        }),
        getMyServices: builder.query({
            query: () => ({
                url: `/api/v1/doctor/services`,
                method: "GET",
            })
        }),
          //   add patient appointment
          addPatientAppointment: builder.mutation({
            query: (patientData) => ({
                url: `/api/v1/doctor/add-pattaient`,
                method: "POST",
                body: patientData,
            })
          }),
          //   add service
          addService: builder.mutation({
            query: (serviceData) => ({
                url: `/api/v1/doctor/services`,
                method: "POST",
                body: serviceData
            })
          }),
        // get appointment requests
        getAppointmentRequests: builder.query({
            query: () => ({
                url: `/api/v1/doctor/pendig-request`,
                method: "GET"
            })
        }),

    }),
});

export const {
    useGetMySiteQuery,
    useGetMyHospitalsQuery,
    useAddAssistantMutation,
    useDeleteAssistantMutation,
    useGetMyAssistantsQuery,
    useAddHospitalMutation,
    useAddPrescriptionMutation,
    useGetMyServicesQuery,
    useAddPatientAppointmentMutation,
    useAddServiceMutation,
    useGetAppointmentRequestsQuery,
} = doctorApi;