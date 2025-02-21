import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    isVerified: false,
  });
  const [editUserEmail, setEditUserEmail] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Add a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/users", formData);
      alert("User added successfully!");
      setFormData({ name: "", email: "", role: "User", isVerified: false });
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user.");
    }
  };

  // Update an existing user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admin/users/${editUserEmail}`, formData);
      alert("User updated successfully!");
      setEditUserEmail(null);
      setFormData({ name: "", email: "", role: "User", isVerified: false });
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  // Delete a user
  const handleDeleteUser = async (email) => {
    try {
      await axios.delete(`/api/admin/users/${email}`);
      alert("User deleted successfully!");
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  // Set form data for editing
  const handleEditUser = (user) => {
    setEditUserEmail(user.email);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add/Edit User Form */}
      <form
        onSubmit={editUserEmail ? handleUpdateUser : handleAddUser}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editUserEmail ? "Edit User" : "Add User"}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
            disabled={!!editUserEmail}
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="User">User</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isVerified"
              checked={formData.isVerified}
              onChange={handleInputChange}
              className="form-checkbox"
            />
            <span>Is Verified</span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editUserEmail ? "Update User" : "Add User"}
        </button>
        {editUserEmail && (
          <button
            type="button"
            onClick={() => {
              setEditUserEmail(null);
              setFormData({
                name: "",
                email: "",
                role: "User",
                isVerified: false,
              });
            }}
            className="mt-4 ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Users Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 ">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Verified</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">{user.isVerified ? "Yes" : "No"}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.email)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
