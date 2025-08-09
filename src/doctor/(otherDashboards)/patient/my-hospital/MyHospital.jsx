import React, { useEffect, useState } from "react";
import {
  FaUserMd,
  FaHospital,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import Loader from '../../../utilities/Loader';
import { usePatientMyHospitalQuery } from "../../../../features/auth/patientApi";


const MyHospital = () => {
  const { data, isLoading } = usePatientMyHospitalQuery();
  const [hospitalDataArr, setHospitalDataArr] = useState([]);

  useEffect(() => {
    if (!isLoading && data?.admissions) {
      setHospitalDataArr(data.admissions);
    }
  }, [data, isLoading]);

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        My Hospital Admission
      </h2>

      {hospitalDataArr.length === 0 ? (
        <div className="text-center py-10 bg-base-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Hospital Found
          </h3>
          <p className="text-gray-500">
            Sorry, you are still not admitted in any hospital.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {hospitalDataArr.map((hospitalData) => (
            <div
              key={hospitalData?._id}
              className="flex flex-wrap gap-4 border rounded-2xl p-1"
            >
              {/* Left Side: Doctor & Hospital Info */}
              <div className="space-y-4">
                {/* Doctor Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <FaUserMd className="text-2xl text-teal-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Doctor
                    </h3>
                    <p className="text-sm text-gray-600">
                      {hospitalData?.doctorId?.name}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaEnvelope className="mr-1 text-teal-500" />
                      {hospitalData?.doctorId?.email}
                    </p>
                  </div>
                </div>

                {/* Hospital Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <FaHospital className="text-2xl text-teal-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Hospital
                    </h3>
                    <p className="text-sm text-gray-600">
                      {hospitalData?.hospitalId?.name}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaMapMarkerAlt className="mr-1 text-teal-500" />
                      {hospitalData?.hospitalId?.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Admission Info */}
              <div className="p-4 bg-gray-50 rounded-lg grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Admission Details
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center">
                    <FaClock className="mr-2 text-gray-500" />
                    Admitted At:{" "}
                    {/* <Moment format="MMMM D, YYYY, h:mm A">
                      {hospitalData?.admittedAt}
                    </Moment> */}
                  </p>
                  <p className="flex items-center">
                    <FaClock className="mr-2 text-gray-500" />
                    Released At:{" "}
                    {/* {hospitalData?.releasedAt ? (
                      <Moment format="MMMM D, YYYY, h:mm A">
                        {hospitalData?.releasedAt}
                      </Moment>
                    ) : (
                      "Not Released"
                    )} */}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHospital;