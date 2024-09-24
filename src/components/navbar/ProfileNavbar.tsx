import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { FiUser } from "react-icons/fi";

const ProfileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{
    username: string;
    isAdmin: boolean;
  } | null>(null);
  const navigate = useNavigate();

  const { opacity, transform } = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(-20px)",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedStoredUser = JSON.parse(storedUser);
      setUser({
        username: parsedStoredUser.username,
        isAdmin: parsedStoredUser.isAdmin,
      });
    }
  }, []);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const goToProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={handleProfileClick} className="...">
        <FiUser className="mr-2" />
        {user ? user.username : "Profile"}
      </button>
      {isOpen && (
        <animated.div style={{ opacity, transform }} className="...">
          <div className="text-sm text-gray-700 mb-2">
            Role: {user?.isAdmin ? "Admin" : "User"}
          </div>
          <button onClick={goToProfile} className="...">
            Go to Profile
          </button>
          {user?.isAdmin && (
            <button onClick={() => navigate("/admin")} className="...">
              Admin Panel
            </button>
          )}
        </animated.div>
      )}
    </div>
  );
};

export default ProfileNavbar;
