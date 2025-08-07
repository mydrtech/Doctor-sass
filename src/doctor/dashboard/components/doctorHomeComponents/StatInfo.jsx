import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaUsers,
  FaUserMd,
  FaHospital,
} from "react-icons/fa";
import {
  useGetAppointmentRequestsQuery,
  useGetMyHospitalsQuery,
  useGetMyPatientsQuery,
  useGetMyServicesQuery,
} from "../../../docProvider/docQuery/doctorApiSlice";
import Loader from "../../../utilities/Loader";

export default function StatInfo() {
  const {
    data: patients,
    isLoading: patientLoading,
    refetch: patientRefetch,
  } = useGetMyPatientsQuery();

  const {
    data: hospitals,
    isLoading: hospitalsLoading,
    refetch: hospitalRefetch,
  } = useGetMyHospitalsQuery();

  const {
    data: services,
    isLoading: servicesLoading,
    refetch: servicesRefetch,
  } = useGetMyServicesQuery();

  const {
    data: appointments,
    isLoading: appointmentsLoading,
    refetch: appointmentsRefetch,
  } = useGetAppointmentRequestsQuery();

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if (
      !patientLoading &&
      !hospitalsLoading &&
      !servicesLoading &&
      !appointmentsLoading
    ) {
      servicesRefetch();
      hospitalRefetch();
      patientRefetch();
      appointmentsRefetch();

      setCardData([
        {
          type: "appointments",
          icon: FaCalendarCheck,
          title: "Appointments",
          count: appointments?.appointments?.length || 0,
          href: "/",
        },
        {
          type: "patients",
          icon: FaUsers,
          title: "Patients",
          count: patients?.patients?.length || 0,
          href: "/doctor/dashboard/patients",
        },
        {
          type: "services",
          icon: FaUserMd,
          title: "Services",
          count: services?.services?.length || 0,
          href: "/doctor/dashboard/services",
        },
        {
          type: "hospitals",
          icon: FaHospital,
          title: "Hospitals",
          count: hospitals?.length || 0,
          href: "/doctor/dashboard/hospitals/my-hospital",
        },
      ]);
    }
  }, [
    patientLoading,
    hospitalsLoading,
    servicesLoading,
    appointmentsLoading,
  ]);

  if (
    patientLoading ||
    hospitalsLoading ||
    servicesLoading ||
    appointmentsLoading
  ) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map(({ type, icon: Icon, title, count, href }) => (
        <Link
          key={type}
          to={href}
          className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          aria-label={title}
        >
          <div className="bg-teal-100 rounded-full p-4 mb-4">
            <Icon className="text-teal-600 w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-3xl font-extrabold text-gray-900">{count}</p>
        </Link>
      ))}
    </div>
  );
}