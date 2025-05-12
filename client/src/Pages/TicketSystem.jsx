import React, { useState } from "react";
import Sidebar from "../Component/Sidebar";
import NewTicketForm from "./NewTicketForm";
import AllTickets from "./AllTickets";

const TicketSystem = () => {
  // State to store tickets
  const [tickets, setTickets] = useState([]);

  // Function to add a new ticket to the list
  const handleAddTicket = (newTicket) => {
    setTickets((prevTickets) => [
      ...prevTickets,
      { ...newTicket, id: `#${prevTickets.length + 1}` }, // Create a new unique ID
    ]);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-auto">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 w-full">
        {/* New Ticket Form */}
        <NewTicketForm onAddTicket={handleAddTicket} />

        {/* All Tickets Table */}
        <AllTickets tickets={tickets} />
      </div>
    </div>
  );
};

export default TicketSystem;
