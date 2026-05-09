import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { jsPDF } from "jspdf"; // Import jsPDF


function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // For storing filtered users
  const [searchQuery, setSearchQuery] = useState(''); // Search input state
  const [editingUserId, setEditingUserId] = useState(null);// Track which user is being edited
  const [editFormData, setEditFormData] = useState({
    Email: '',
    Password: '',
    Name: '',
    Address: '',
    AnimalType: ''
  });

  useEffect(() => {
    axios
      .get('http://localhost:4000/users') // Get all users
      .then((result) => {
        setUsers(result.data);
        setFilteredUsers(result.data); // Initialize filteredUsers with all users
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter users based on the search query (name, email, animal type, etc.)
    const filtered = users.filter((user) =>
      user.Name.toLowerCase().includes(query) ||
      user.Email.toLowerCase().includes(query) ||
      user.AnimalType.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered); // Update filteredUsers state
  };
   // Handle edit button click
  const handleEditClick = (user) => {
    setEditingUserId(user.ID);// Set the user ID to be edited
    setEditFormData(user);// Set form data to the user's current data
    console.log("Editing user with ID:", user.ID);
  };
  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };
  // Function to handle form submission for updating a user
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updating user with ID:", editingUserId);
    console.log("Data being sent:", editFormData);
    axios
      .put(`http://localhost:4000/users/${editingUserId}`, editFormData)// Update user by custom ID
      .then((result) => {
        // Update the users list with the updated data
        setUsers(users.map((user) => (user.ID === editingUserId ? result.data : user)));
        setFilteredUsers(filteredUsers.map((user) => (user.ID === editingUserId ? result.data : user)));
        setEditingUserId(null);// Exit edit mode
        console.log("User updated successfully");
      })
      .catch((err) => console.log("Error during update:", err));
  };

  // Function to handle delete
  const handleDelete = (ID) => {
    axios
      .delete(`http://localhost:4000/users/${ID}`)// Use custom ID for deletion
      .then(() => {
        // Remove the deleted user from the local state
        setUsers(users.filter((user) => user.ID !== ID));
        console.log("User deleted successfully");
        setFilteredUsers(filteredUsers.filter((user) => user.ID !== ID));
      })
      .catch((err) => console.log("Error during deletion:", err));
  };

   // Function to download the PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("User Management Report", 14, 16);
    doc.text("ID", 14, 30);
    doc.text("Email", 40, 30);
    doc.text("Name", 100, 30);
    doc.text("Address", 130, 30);
    doc.text("Animal Type", 175, 30);
  
    filteredUsers.forEach((user, index) => {
      const y = 40 + (index * 10); // Adjust spacing between rows
      doc.text(user.ID.toString(), 14, y);
      doc.text(user.Email, 40, y);
      doc.text(user.Name, 100, y);
      doc.text(user.Address, 130, y);
      doc.text(user.AnimalType, 175, y);
    });
  
    doc.save("users.pdf");
  };
  

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <div className="bg-orange-200 mx-14 h-[770px] rounded-2xl ">
        <div className="text-center text-3xl font-bold py-6  text-black rounded-t-lg">User Management</div>
        
        {/* Search Input */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or animal type..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border border-gray-300 p-2 rounded-lg w-1/3"
          />
        </div>
        {/* Button to download PDF */}
        <div className="flex justify-center mb-6">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
        </div>

        <table className="min-w-full table-auto">
          <thead className="text-xl text-center">
            <tr>
              <th className="py-4 px-6 text-left">ID</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left">Password</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Address</th>
              <th className="py-4 px-6 text-left">Animal Type</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.ID} className="hover:bg-gray-50">
                {editingUserId === user.ID ? (
                  <>
                    <td className="py-4 px-6">{user.ID}</td>
                    <td className="py-4 px-6">
                      <input
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        type="email"
                        name="Email"
                        value={editFormData.Email}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        type="password"
                        name="Password"
                        value={editFormData.Password}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        type="text"
                        name="Name"
                        value={editFormData.Name}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        type="text"
                        name="Address"
                        value={editFormData.Address}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        className="border border-gray-300 p-2 rounded-lg w-full"
                        type="text"
                        name="AnimalType"
                        value={editFormData.AnimalType}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td className="py-4 px-6 flex gap-4">
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleUpdate}>
                        Save
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => setEditingUserId(null)}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-4 px-6">{user.ID}</td>
                    <td className="py-4 px-6">{user.Email}</td>
                    <td className="py-4 px-6">{user.Password}</td>
                    <td className="py-4 px-6">{user.Name}</td>
                    <td className="py-4 px-6">{user.Address}</td>
                    <td className="py-4 px-6">{user.AnimalType}</td>
                    <td className="py-4 px-6 flex gap-4">
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg" onClick={() => handleEditClick(user)}>
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={() => handleDelete(user.ID)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;