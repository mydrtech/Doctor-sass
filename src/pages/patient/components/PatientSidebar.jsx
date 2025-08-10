import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaChartBar,
  FaFileMedical,
  FaHome,
  FaSignOutAlt,
  FaHospitalUser,
  FaUserInjured,
  FaUserCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import PatientDashboardHeader from "./PatientDashboardHeader";

const PatientSidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      setIsMobileOrTablet(isMobile);
      setSidebarOpen(!isMobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navLinks = [
    { label: "Dashboard", icon: <FaChartBar />, href: "/doctor/patient" },
    { label: "My Hospital", icon: <FaHospitalUser />, href: "/doctor/patient/my-hospital" },
    { label: "My Prescription", icon: <FaFileMedical />, href: "/doctor/patient/my-prescription" },
    { label: "My Profile", icon: <FaUserCircle />, href: "/doctor/patient/my-profile" },
    { label: "Update Profile", icon: <FaUserInjured />, href: "/doctor/patient/update-profile" },
  ];

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007BFF",
      cancelButtonColor: "#DC3545",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        toast.success("Logout Successfully", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    });
  };

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <div className={`h-screen sticky top-0 left-0 bg-white z-40`}>
        {sidebarOpen && (
          <aside className="h-full w-56 bg-white text-extraDark transform transition-transform duration-300 overflow-y-auto p-1">
            <div className="px-4 py-2 flex items-center justify-between">
              <div className="text-2xl font-semibold">Medicare Pro</div>
              <button
                onClick={logout}
                className="w-10 h-10 flex items-center justify-center bg-teal text-white transition"
                title="Logout and Go To Home Page"
              >
                <FaHome className="text-xl" />
              </button>
            </div>
            <nav className="space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <button
                    key={link.label}
                    onClick={() => {
                      navigate(link.href);
                      if (isMobileOrTablet) setSidebarOpen(false);
                    }}
                    className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md transition ${
                      isActive ? "bg-light" : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-base">{link.icon}</span>
                    <span>{link.label}</span>
                  </button>
                );
              })}
              <button
  onClick={logout}
  className="bg-gradient-to-r from-teal-500 to-teal-700 flex items-center gap-2 px-3 py-2 rounded-md w-full text-white hover:opacity-90"
>
  <span className="text-base">
    <FaSignOutAlt />
  </span>
  <span>Logout</span>
</button>
            </nav>
          </aside>
        )}

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 -z-10 md:hidden"
          />
        )}
      </div>

      <main
  className={`w-full bg-light min-h-screen ${sidebarOpen ? "fixed" : "static"} md:static`}
>
  <PatientDashboardHeader onMenuClick={toggleSidebar} />
  <div className="px-2">
    <Outlet /> 
  </div>
</main>
    </div>
  );
};

export default PatientSidebar;