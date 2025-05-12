import React, { useState } from "react";
import Sidebar from "../Component/Sidebar";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white overflow-x-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-auto">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 w-full">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 bg-[#F0F1F6] p-4 rounded-lg shadow-lg text-gray-800">
          {/* Header content if needed */}
        </header>

        {/* Ticket Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {[
            { label: "Total Tickets", value: 120 },
            { label: "Open Tickets", value: 42 },
            { label: "Closed Tickets", value: 78 },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#F9FAFB] p-4 sm:p-6 rounded-lg shadow-lg text-gray-800"
            >
              <h2 className="text-lg font-medium">{stat.label}</h2>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Ticket List */}
        <div className="bg-[#F9FAFB] p-4 sm:p-6 rounded-lg shadow-lg text-gray-800">
          <h2 className="text-xl font-medium mb-4">Recent Tickets</h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="bg-[#F0F1F6] text-gray-800">
                  <th className="py-3 px-4 text-left">Ticket ID</th>
                  <th className="py-3 px-4 text-left">Subject</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Priority</th>
                  <th className="py-3 px-4 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300 hover:bg-[#E5E7EB] transition">
                  <td className="py-3 px-4">#001</td>
                  <td className="py-3 px-4">Login Issue</td>
                  <td className="py-3 px-4 text-yellow-500 font-semibold">Open</td>
                  <td className="py-3 px-4 text-red-500">High</td>
                  <td className="py-3 px-4 text-gray-500">2025-05-11</td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-[#E5E7EB] transition">
                  <td className="py-3 px-4">#002</td>
                  <td className="py-3 px-4">Payment Failure</td>
                  <td className="py-3 px-4 text-green-500 font-semibold">Closed</td>
                  <td className="py-3 px-4 text-yellow-500">Medium</td>
                  <td className="py-3 px-4 text-gray-500">2025-05-10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
