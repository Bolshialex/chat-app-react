import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import LogoutIcon from "../components/LogoutIcon";
import "../styles/PersonalProfile.css";
import useAuth from "../hooks/useAuth";
import userFunctions from "../api/userFunctions";

function PersonalProfile() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [formData, setFormData] = useState({
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
        setFormData(user);
      })
      .catch((error) => {
        console.error("Error getting user: ", error);
      });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsDisabled(!isDisabled);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userFunctions
      .updateUser(auth.auth.accessToken, formData)
      .then((response) => {
        console.log("User updated successfully: ", response);
        setIsDisabled(true);
      })
      .catch((error) => {
        console.error("Error updating user: ", error);
      });
  };
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
            <form onSubmit={handleSubmit}>
              <div className="personal-profile-form-container">
                <label htmlFor="username" className="personal-profile-label">
                  Username
                </label>
                <input
                  className="personal-profile-input-read-only"
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleFormChange}
                  value={formData.username}
                  disabled={isDisabled}
                />
              </div>
              <div className="personal-profile-form-container">
                <label htmlFor="email" className="personal-profile-label">
                  Email
                </label>
                <input
                  className="personal-profile-input-read-only"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleFormChange}
                  value={formData.email}
                  disabled={isDisabled}
                />
              </div>
              <div className="personal-profile-form-container">
                <label htmlFor="firstName" className="personal-profile-label">
                  First Name
                </label>
                <input
                  className="personal-profile-input-read-only"
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleFormChange}
                  value={formData.firstName}
                  disabled={isDisabled}
                />
              </div>
              <div className="personal-profile-form-container">
                <label htmlFor="lastName" className="personal-profile-label">
                  Last Name
                </label>
                <input
                  className="personal-profile-input-read-only"
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleFormChange}
                  value={formData.lastName}
                  disabled={isDisabled}
                />
              </div>
              <div className="personal-profile-form-button-container">
                <button
                  className="personal-profile-edit-button"
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
                <button
                  className="personal-profile-save-button"
                  disabled={isDisabled}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalProfile;
