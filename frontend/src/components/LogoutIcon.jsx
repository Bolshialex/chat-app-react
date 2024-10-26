import React from "react";
import { GoSignOut } from "react-icons/go";
import useAuth from "../hooks/useAuth";

const LogoutIcon = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <GoSignOut className="personal-profile-icon" onClick={handleLogout}>
      Logout
    </GoSignOut>
  );
};

export default LogoutIcon;
