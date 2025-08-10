import { FaMapMarkerAlt, FaProcedures } from "react-icons/fa";

const HospitalInfoCard = ({ hospital }) => {
  const { name, location, admitCount } = hospital;

  return (
    <div className="w-full max-w-md  shadow-md hover:shadow-xl rounded-xl transition duration-300 mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-t-xl">
        <h2 className="text-2xl font-semibold tracking-wide">{name}</h2>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-4">
        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-blue-600 text-lg" />
          <p className="text-base">
            <span className="font-medium ">Location:</span> {location}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <FaProcedures className="text-green-600 text-lg" />
          <p className="text-base">
            <span className="font-medium">Admit Count:</span> {admitCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalInfoCard;