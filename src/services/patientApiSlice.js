import { baseApi } from "./baseApi";

export const patientApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        patientMyHospital: builder.query({
            query: () => ({
                url: `/api/v1/patient/hospitilizes`,
                method: "GET"
            }),
        }),
        // patientPersonalInfo: builder.query({
        //     query: () => ({
        //         url: `/api/v1/patient/me`,
        //         method: "GET"
        //     })
        // }),
        updatePatientPersonalInfo: builder.mutation({
            query: (updateData) =>({
                url: `/api/v1/patient/me`,
                method: "PATCH",
                body: updateData,
            })
        }),
         //   get my patients
        getMyPatients: builder.query({
            query: () => ({
                url: `/api/v1/doctor/all-patatoins`,
                method: "GET",
            })
        }),
        //   admit patient
        admitPatient: builder.mutation({
            query: (patientData) => ({
                url: `/api/v1/doctor/admitPatient`,
                method: "POST",
                body: patientData,
            }) 
        }),
         //   prescription for  patient
         patientPrescription: builder.query({
            query: () => ({
                url: `/api/v1/patient/my-prescriptions`,
                method: "GET"
            })
         }),
    })
})

export const {
    usePatientMyHospitalQuery,
    usePatientPersonalInfoQuery,
    useUpdatePatientPersonalInfoMutation,
    useGetMyPatientsQuery,
    useAdmitPatientMutation,
    usePatientPrescriptionQuery,
} = patientApi