import React from "react";
import StatInfo from './components/doctorHomeComponents/StatInfo';
import DoctorInfo from "./components/doctorHomeComponents/DoctorInfo";

export default function DoctorDashboardHomePage() {
  return (
    <div className="my-4 w-full flex justify-center">
      <div className="flex flex-wrap gap-4">
        <StatInfo />
        <DoctorInfo />
      </div>
    </div>
  );
}
