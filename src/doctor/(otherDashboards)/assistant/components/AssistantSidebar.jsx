import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
import {
  FaChartBar,
  FaHome,
  FaSignOutAlt,
  FaHospital,
  FaHospitalUser,
  FaUserInjured,
  FaUserMinus,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import AssistantDashboardHeader from "./AssistantDashboardHeader";

const AssistantSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
    { label: "Dashboard", icon: <FaChartBar />, href: "/doctor/assistant" },
    {
      label: "Hospital",
      icon: <FaHospital />,
      children: [
        { label: "My Hospital", icon: <FaHospitalUser />, href: "/assistant/my-hospital" },
        { label: "Admit Patient", icon: <FaUserInjured />, href: "/assistant/admit" },
        { label: "Release Patient", icon: <FaUserMinus />, href: "/assistant/release" },
      ],
    },
  ];

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <div className="h-screen sticky top-0 left-0 bg-white z-40">
        {sidebarOpen && (
          <aside className="h-full w-56 bg-white text-extraDark transition-transform duration-300 overflow-y-auto p-1">
            <div className="px-4 py-2 flex items-center justify-between">
              <div className="text-2xl font-semibold">Medicare Pro</div>
              <div className="flex items-center gap-1">
                <button
                  onClick={logout}
                  className="w-10 h-10 flex items-center justify-center bg-teal text-white transition"
                  title="Logout and Go To Home Page"
                >
                  <FaHome className="text-xl" />
                </button>
              </div>
            </div>

            <nav className="space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                if (link.children) {
                  const isAnyChildActive = link.children.some((child) => pathname === child.href);
                  return (
                    <details key={link.label} className="group" open={isAnyChildActive}>
                      <summary className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition text-extraDark ${isAnyChildActive ? "bg-light" : "hover:bg-light"}`}>
                        <span className="flex items-center gap-2">
                          <span className="text-base">{link.icon}</span>
                          <span>{link.label}</span>
                        </span>
                        <svg className="w-3 h-3 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="ml-6 mt-2 space-y-1">
                        {link.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.label}
                              to={child.href}
                              onClick={() => isMobileOrTablet && setSidebarOpen(false)}
                              className={`flex items-center gap-2 px-3 py-1 rounded-md transition ${isChildActive ? "bg-light" : "hover:bg-light"}`}
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
                    onClick={() => isMobileOrTablet && setSidebarOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition text-extraDark ${isActive ? "bg-light" : "hover:bg-light"}`}
                  >
                    <span className="text-base">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <button onClick={logout} className="btn-grad flex items-center gap-2 px-3 py-2 rounded-md transition text-extraDark">
                <FaSignOutAlt />
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
      <main className={`w-full bg-light min-h-screen ${
          sidebarOpen ? "fixed" : "static"
        } md:static`}>
        <AssistantDashboardHeader onMenuClick={toggleSidebar} />
        <div className="px-2 py-4">
        <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AssistantSidebar;