import React, { useState } from "react";
import Sidebar from "../Component/Sidebar"; // Correct Sidebar component import

const NewTicketForm = ({ onAddTicket }) => {
  const [formData, setFormData] = useState({
    date: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    computerName: "",
    problemDescription: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.date &&
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.department &&
      formData.computerName &&
      formData.problemDescription
    ) {
      onAddTicket(formData);
      setFormData({
        date: "",
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        computerName: "",
        problemDescription: "",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-auto">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 w-full">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 bg-[#F0F1F6] p-4 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-800">Submit New Ticket</h1>
        </header>

        {/* Form */}
        <div className="bg-[#F9FAFB] p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 text-gray-800"
              />
            </div>

            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 text-gray-800"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded p-2 text-gray-800"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@example.com"
                className="w-full border border-gray-300 rounded p-2 text-gray-800"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 text-gray-800"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Computer Name</label>
              <input
                type="text"
                name="computerName"
                value={formData.computerName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded p-2 text-gray-800"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Describe the Problem</label>
              <textarea
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleInputChange}
                rows="4"
                className="w-full border border-gray-300 rounded p-2 text-gray-800"
                placeholder="Describe your issue..."
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded font-medium"
            >
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTicketForm;
