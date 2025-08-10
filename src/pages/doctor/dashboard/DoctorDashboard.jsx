import React from "react";
import StatInfo from '../../../components/shared-components/StatInfo';
import DoctorInfoCard from '../../../components/shared-components/DoctorInfo';

export default function DoctorDashboard() {
  return (
    <div className="my-4 w-full flex justify-center">
      <div className="flex flex-wrap gap-4">
        <StatInfo />
        <DoctorInfoCard />
      </div>
    </div>
  );
}
