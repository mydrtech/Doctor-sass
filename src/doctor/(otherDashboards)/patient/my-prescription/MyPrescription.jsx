import React, { useEffect, useState } from "react";
import Loader from '../../../utilities/Loader';
import { usePatientPrescriptionQuery } from "../../../docProvider/docQuery/doctorApiSlice";
import PrescriptionCard from "../../../shared-components/PrescriptionCard";

const MyPrescriptionsPage = () => {
  const { data, isLoading } = usePatientPrescriptionQuery();
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const { prescriptions } = data || {};
    if (prescriptions) {
      setPrescriptions(prescriptions);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Prescriptions</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prescriptions?.map((prescription) => (
          <PrescriptionCard
            key={prescription._id}
            prescription={prescription}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPrescriptionsPage;