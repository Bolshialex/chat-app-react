import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import LogoutIcon from "../components/LogoutIcon";
import "../styles/PersonalProfile.css";
import useAuth from "../hooks/useAuth";
import userFunctions from "../api/userFunctions";

function PersonalProfile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const auth = useAuth();
  useEffect(() => {
    userFunctions
      .getUser(auth.auth.accessToken)
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.error("Error getting user: ", error);
      });
  }, []);
  return (
    <>
      <div className="personal-profile-card-container">
        <div className="personal-profile-card">
          <div className="personal-profile-heading-container">
            <Link to={"/messages"}>
              <GoChevronLeft className="personal-profile-icon" />
            </Link>
            <h1 className="personal-profile-card-heading">My Profile</h1>
            <Link to={"/login"} title="Sign Out">
              <LogoutIcon />
            </Link>
          </div>
          <div className="personal-profile-info">
            <form>
              <label htmlFor="username" className="edit-profile-label">
                Username
              </label>
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                value={user.username}
                readOnly
              />
              <label htmlFor="email" className="edit-profile-label">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={user.email}
                readOnly
              />
              <label htmlFor="firstName" className="edit-profile-label">
                First Name
              </label>
              <input
                className="form-control"
                type="text"
                id="firstName"
                name="firstName"
                value={user.firstName}
                readOnly
              />
              <label htmlFor="lastName" className="edit-profile-label">
                Last Name
              </label>
              <input
                className="form-control"
                type="text"
                id="lastName"
                name="lastName"
                value={user.lastName}
                readOnly
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalProfile;
