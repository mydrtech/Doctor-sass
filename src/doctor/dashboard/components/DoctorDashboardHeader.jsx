import {
  FaBars,
  FaSyncAlt,
  FaTh,
  FaSearch,
  FaSlidersH,
  FaCommentDots,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

export default function DoctorDashboardHeader({ onMenuClick }) {
  return (
    <div className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b">
      {/* Left: Menu & Icons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          title="Toggle Side Bar"
          className="text-gray-500 hover:text-black text-lg cursor-pointer"
        >
          <FaBars />
        </button>
        <FaSyncAlt
          title="Refresh Page"
          onClick={() => window.location.reload()}
          className="text-gray-500 hover:text-black text-lg cursor-pointer"
        />
        {/* <FaTh className="text-gray-500 hover:text-black text-lg cursor-pointer" /> */}
        <div className="w-px h-5 bg-gray-300 mx-1" />
      </div>

      {/* Center field */}
      <div title="UI only" className="flex items-center">
        <span className="font-semibold text-gray-500 text-center">
          Welcome to your Dashboard
        </span>
      </div>

      {/* Right: Profile & Actions */}
      <div title="UI only" className="flex items-center gap-4">
        {/* Profile Icon */}
        <div className="relative p-1 bg-highlight rounded-full">
          <FaUserDoctor className="text-xl text-white" />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-teal-500 border-2 border-white rounded-full" />
        </div>
        {/* Optional Icons */}
        {/* <FaSlidersH className="text-gray-500 hover:text-black text-lg cursor-pointer" />
        <FaCommentDots className="text-gray-500 hover:text-black text-lg cursor-pointer" /> */}
      </div>
    </div>
  );
}