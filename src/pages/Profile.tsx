
import React, { useEffect, useState } from "react";
import { fetchUserById, updateUser } from "../Routes/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit, FiSave, FiXCircle } from "react-icons/fi";
import { useSpring, animated } from "@react-spring/web";

interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fade = useSpring({
    opacity: editing ? 1 : 0,
    transform: editing ? "translateY(0)" : "translateY(-10px)",
  });

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

const fetchAndSetUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      const fetchedUser = await fetchUserById(userId, token);
      if (fetchedUser) {
        setUser(fetchedUser);
        setUpdatedUser(fetchedUser);
        localStorage.setItem("user", JSON.stringify({ user: fetchedUser }));
      } else {
        toast.error("Failed to fetch user data.");
      }
    } else {
      toast.error("Token or User ID is missing. Unable to fetch user data.");
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error("Error loading profile.");
  }
};



    fetchAndSetUser();
  }, [userId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (updatedUser) {
      setUpdatedUser({
        ...updatedUser,
        [name]: value,
      });
    }
  };

const handleSaveChanges = async () => {
  const token = localStorage.getItem("token"); // Asegúrate de usar la misma clave que usaste para almacenar el token
  if (updatedUser && userId && token) {
    try {
      const response = await updateUser(userId, updatedUser, token);
      if (response) {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify({ user: updatedUser }));
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  }
};


  if (!user) {
    return <div className="text-center p-6">Loading profile...</div>;
  }

return (
  <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">Profile</h1>
    {editing ? (
      <animated.div style={fade}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            { label: "Username", name: "username", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "text" },
            { label: "Address", name: "addressLine1", type: "text" },
            { label: "Address 2", name: "addressLine2", type: "text" },
            { label: "City", name: "city", type: "text" },
            { label: "State", name: "state", type: "text" },
            { label: "Postal Code", name: "postalCode", type: "text" },
            { label: "Country", name: "country", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-2">
                {label}:
              </label>
              <input
                type={type}
                name={name}
                value={updatedUser?.[name as keyof User] || ""}
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
          {[
            { label: "Username", value: user.username },
            { label: "Email", value: user.email },
            { label: "Phone", value: user.phone },
            { label: "Address", value: user.addressLine1 },
            { label: "Address 2", value: user.addressLine2 },
            { label: "City", value: user.city },
            { label: "State", value: user.state },
            { label: "Postal Code", value: user.postalCode },
            { label: "Country", value: user.country },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {label}:
              </span>
              <span className="text-lg text-gray-900">
                {value || "Not Available"}
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
