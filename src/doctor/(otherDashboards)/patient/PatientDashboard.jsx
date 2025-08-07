import React from "react";
import PatientInfoCard from './components/homeComponents/PatientInfoCard';

const PatientDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="my-4">
        <PatientInfoCard />
      </div>
    </div>
  );
};

export default PatientDashboard;