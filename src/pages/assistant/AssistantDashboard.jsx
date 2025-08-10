import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaClipboardList,
  FaEnvelope,
} from "react-icons/fa";
import moment from "moment-timezone";

import QuickActions from '../../components/shared-components/QuickActions';
import AssistantInfo from '../../components/shared-components/AssistantInfo';

// Mock data (for development/testing)
const assistantData = {
  user: {
    _id: "6864cc8b014f5244c7ac3864",
    doctorId: "6864c934014f5244c7ac3832",
    name: "Assistant One",
    email: "assistant@one.com",
    role: "assistant",
    permissions: {
      managePatients: false,
      manageAppointments: false,
      manageSchedule: false,
    },
  },
  todayStats: {
    appointmentsToday: 12,
    pendingTasks: 5,
    messagesUnread: 3,
    patientsScheduled: 8,
  },
  recentActivities: [
    {
      id: 1,
      type: "appointment",
      message: "New appointment scheduled for John Doe",
      time: "10 minutes ago",
    },
    {
      id: 2,
      type: "task",
      message: "Lab results ready for review",
      time: "25 minutes ago",
    },
    {
      id: 3,
      type: "message",
      message: "Dr. Smith sent a message",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "patient",
      message: "Patient Mary Johnson checked in",
      time: "2 hours ago",
    },
  ],
  upcomingAppointments: [
    { id: 1, patient: "John Doe", time: "10:00 AM", type: "Consultation" },
    { id: 2, patient: "Jane Smith", time: "11:30 AM", type: "Follow-up" },
    { id: 3, patient: "Bob Wilson", time: "2:00 PM", type: "Check-up" },
    { id: 4, patient: "Alice Brown", time: "3:30 PM", type: "Consultation" },
  ],
};

const AssistantDashboard = () => {
  const [currentTime, setCurrentTime] = useState(moment().tz("Asia/Dhaka"));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().tz("Asia/Dhaka"));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-4">
          {/* Optional Assistant Info Section */}
          <AssistantInfo user={assistantData.user} />

          {/* Placeholder Notice */}
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Page Under Development
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              We are currently working on enhancing this page to provide you
              with the best possible experience. Thank you for your patience as
              we finalize the details. This page will be available soon!
            </p>
            <p className="text-md text-gray-500">
              In the meantime, feel free to explore other sections of our site
              or contact us for assistance. We appreciate your understanding and
              look forward to serving you better.
            </p>
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Recent Activities */}
          <div className="card w-fit bg-white shadow-md">
            <div className="card-body">
              <h2 className="card-title text-gray-800 text-lg sm:text-xl mb-4">
                Recent Activities
              </h2>
              <div className="space-y-3">
                {assistantData.recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-center w-6 h-6 bg-teal-500/10 text-teal-500 rounded-full sm:w-8 sm:h-8">
                      {activity.type === "appointment" && (
                        <FaCalendarAlt className="text-xs sm:text-sm" />
                      )}
                      {activity.type === "task" && (
                        <FaClipboardList className="text-xs sm:text-sm" />
                      )}
                      {activity.type === "message" && (
                        <FaEnvelope className="text-xs sm:text-sm" />
                      )}
                      {activity.type === "patient" && (
                        <FaUser className="text-xs sm:text-sm" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 sm:text-base">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-600 sm:text-sm">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantDashboard;