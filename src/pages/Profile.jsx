import React, { useCallback, useEffect, useState } from "react";
import { fetchUserById, updateUser } from "../Routes/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit, FiSave, FiXCircle } from "react-icons/fi";
import { useSpring, animated } from "@react-spring/web";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const storedUsername = localStorage.getItem("username");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const token = localStorage.getItem("authToken");

  const fade = useSpring({
    opacity: editing ? 1 : 0,
    transform: editing ? "translateY(0)" : "translateY(-10px)",
  });

  useEffect(() => {
    if (!userId || !token) {
      navigate("/login");
      return;
    }

    const fetchAndSetUser = async () => {
      if (!userId || !token) {
        toast.error("User ID or token is missing.");
        return;
      }

      try {
        const response = await fetchUserById(userId, token);
        if (response && response.user) {
          const userData = response.user;
          setUser(userData);
          setUpdatedUser({
            ...userData,
            phone: userData.phone ?? undefined,
            addressLine1: userData.addressLine1 ?? undefined,
            addressLine2: userData.addressLine2 ?? undefined,
            city: userData.city ?? undefined,
            state: userData.state ?? undefined,
            postalCode: userData.postalCode ?? undefined,
            country: userData.country ?? undefined,
          });
        } else {
          toast.error("User data not found.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchAndSetUser();
  }, [userId, token, navigate]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        [name]: value !== "" ? value : undefined, // Cambia a undefined si value es vacío
      };
    });
  }, []);

  const handleSaveChanges = async () => {
    if (updatedUser && userId && token) {
      if (!updatedUser.email.includes("@")) {
        toast.error("Please enter a valid email address.");
        return;
      }

      try {
        const userUpdate = {
          username: updatedUser.username,
          email: updatedUser.email,
          phone: updatedUser.phone,
          addressLine1: updatedUser.addressLine1,
          addressLine2: updatedUser.addressLine2,
          city: updatedUser.city,
          state: updatedUser.state,
          postalCode: updatedUser.postalCode,
          country: updatedUser.country,
        };

        const response = await updateUser(userId, userUpdate, token);

        if (response) {
          setUser(updatedUser);
          localStorage.setItem("username", updatedUser.username);
          toast.success("Profile updated successfully!");
        } else {
          toast.error("Failed to update profile.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to update profile.");
      }
    }
  };

  if (!user) {
    return <div className="text-center p-6">Loading profile...</div>;
  }

  const fields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "phone", type: "text" },
    { label: "Address", name: "addressLine1", type: "text" },
    { label: "Address 2", name: "addressLine2", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "State", name: "state", type: "text" },
    { label: "Postal Code", name: "postalCode", type: "text" },
    { label: "Country", name: "country", type: "text" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Profile</h1>
      <h2 className="text-xl font-semibold mb-4">Welcome, {storedUsername}!</h2>
      {isAdmin && (
        <div className="text-sm text-green-600">You are an Admin</div>
      )}

      {editing ? (
        <animated.div style={fade}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {fields.map(({ label, name, type }) => (
              <div key={name} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  {label}:
                </label>
                <input
                  type={type}
                  name={name}
                  value={updatedUser?.[name] ?? ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleSaveChanges}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <FiSave className="mr-2" /> Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              <FiXCircle className="mr-2" /> Cancel
            </button>
          </div>
        </animated.div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {fields.map(({ label, name }) => (
              <div key={label} className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {label}:
                </span>
                <span className="text-lg text-gray-900">
                  {user[name] ?? "Not Available"}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setEditing(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <FiEdit className="mr-2" /> Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
