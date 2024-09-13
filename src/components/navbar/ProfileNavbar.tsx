import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { FiUser } from "react-icons/fi";

const ProfileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { opacity, transform } = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(-20px)",
  });

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const goToProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleProfileClick}
        className="flex items-center bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition"
      >
        <FiUser className="mr-2" />
        Profile
      </button>
      {isOpen && (
        <animated.div
          style={{
            opacity,
            transform,
          }}
          className="absolute right-0 top-full mt-2 w-48 bg-white text-black p-4 shadow-lg border border-gray-200 rounded-lg"
        >
          <button
            onClick={goToProfile}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Go to Profile
          </button>
        </animated.div>
      )}
    </div>
  );
};

export default ProfileNavbar;
