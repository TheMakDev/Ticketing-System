import React from "react";

const AllTickets = ({ tickets }) => {
  return (
    <div className="bg-[#F9FAFB] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Tickets</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-[#F0F1F6] text-gray-800">
              <th className="py-3 px-4 text-left">Ticket ID</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Department</th>
              <th className="py-3 px-4 text-left">Problem</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index} className="border-b border-gray-300 hover:bg-[#E5E7EB] transition">
                <td className="py-3 px-4">{ticket.id}</td>
                <td className="py-3 px-4">{ticket.date}</td>
                <td className="py-3 px-4">{ticket.firstName} {ticket.lastName}</td>
                <td className="py-3 px-4">{ticket.email}</td>
                <td className="py-3 px-4">{ticket.department}</td>
                <td className="py-3 px-4">{ticket.problemDescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTickets;
