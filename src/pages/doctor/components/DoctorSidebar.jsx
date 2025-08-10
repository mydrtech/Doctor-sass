import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  FaUserMd,
  FaChartBar,
  FaFileMedical,
  FaSignOutAlt,
  FaClipboardList,
  FaHospitalUser,
  FaUserInjured,
  FaUserMinus,
  FaHospital,
  FaChartLine,
  FaClock,
} from "react-icons/fa";
import { PiPrescriptionFill } from "react-icons/pi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { MdLocalHospital } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import DoctorDashboardHeader from '../../../components/shared-components/DoctorDashboardHeader';

export default function DoctorSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Detect screen size
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

  const navLinks = [
    { label: "Dashboard", icon: <FaChartBar />, href: "/doctor/dashboard" },
    {
      label: "Assistants",
      icon: <FaUserMd />,
      children: [
        {
          label: "Add Assistant",
          icon: <IoIosAddCircle />,
          href: "/doctor/dashboard/assistants/add-assistant",
        },
        {
          label: "All Assistants",
          icon: <FaClipboardList />,
          href: "/doctor/dashboard/assistants",
        },
      ],
    },
    {
      label: "Hospital",
      icon: <FaHospital />,
      children: [
        {
          label: "Add Hospital",
          icon: <MdLocalHospital />,
          href: "/doctor/dashboard/hospitals/add-hospital",
        },
        {
          label: "My Hospital",
          icon: <FaHospitalUser />,
          href: "/doctor/dashboard/hospitals/my-hospital",
        },
        {
          label: "Admit Patient",
          icon: <FaUserInjured />,
          href: "/doctor/dashboard/hospitals/admit-patient",
        },
        {
          label: "Release Patient",
          icon: <FaUserMinus />,
          href: "/doctor/dashboard",
        },
      ],
    },
    {
      label: "Patients",
      icon: <FaFileMedical />,
      children: [
        {
          label: "Add Patient",
          icon: <IoIosAddCircle />,
          href: "/doctor/dashboard/patients/make-appointment",
        },
        {
          label: "Add Prescription",
          icon: <PiPrescriptionFill />,
          href: "/doctor/dashboard/patients/add-prescription",
        },
        {
          label: "All Patients",
          icon: <FaChartLine />,
          href: "/doctor/dashboard/patients",
        },
      ],
    },
    {
      label: "Services",
      icon: <FaClock />,
      children: [
        {
          label: "Add Service",
          icon: <IoIosAddCircle />,
          href: "/doctor/dashboard/services/add-service",
        },
        {
          label: "My Services",
          icon: <FaClipboardList />,
          href: "/doctor/dashboard/services",
        },
      ],
    },
  ];

  return (
    <div className="flex relative text-black">
      {/* Sidebar */}
      <div className={`h-screen sticky top-0 left-0 bg-white z-40`}>
        {sidebarOpen && (
          <aside
            className={`h-full w-56 bg-white text-extraDark transform transition-transform duration-300 overflow-y-auto p-1 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:static md:translate-x-0`}
          >
            {/* Header */}
            <div className="px-4 py-2 flex items-center justify-between">
              <div className="text-2xl font-semibold">Medicare Pro</div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                if (link.children) {
                  return (
                    <details key={link.label} className="group">
                      <summary
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition text-extraDark ${
                          isActive ? "bg-light" : "hover:bg-light"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{link.icon}</span>
                          <span>{link.label}</span>
                        </span>
                        <svg
                          className="w-3 h-3 transition-transform group-open:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="ml-6 mt-2 space-y-1">
                        {link.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.label}
                              to={child.href}
                              onClick={() =>
                                isMobileOrTablet ? setSidebarOpen(false) : null
                              }
                              className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${
                                isChildActive
                                  ? "bg-light"
                                  : "hover:bg-light"
                              }`}
                            >
                              <span className="text-base">{child.icon}</span>
                              <span>{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </details>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() =>
                      isMobileOrTablet ? setSidebarOpen(false) : null
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition text-extraDark ${
                      isActive ? "bg-light" : "hover:bg-light"
                    }`}
                  >
                    <span className="text-base">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-100 transition w-full"
              >
                <FaSignOutAlt className="text-base" />
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

      {/* Main content */}
      <main
        className={`w-full bg-light min-h-screen ${
          sidebarOpen ? "fixed" : "static"
        } md:static`}
      >
        <DoctorDashboardHeader onMenuClick={toggleSidebar} />
        <div className="px-2 py-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}