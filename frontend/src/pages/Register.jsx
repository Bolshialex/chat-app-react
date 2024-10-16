import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import registerFunctions from "../api/registerFunctions";
import validator from "validator";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  useEffect(() => {
    setError(null);
  }, []);

  const handle = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(formData.email)) {
      setError("Invalid email");
      return;
    }
    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!validator.isStrongPassword(formData.password)) {
      setError("Password is not strong enough");
      return;
    }

    registerFunctions
      .registerUser(formData)
      .then(() => {
        navigate("/messages");
      })
      .catch((error) => {
        const status = error.response.status;
        console.log(status);
        if (status === 409) {
          setError("User already exists.");
        } else {
          setError("Registration Failed - Please try again.");
        }
      });
  };
  return (
    <div className="card-container">
      <form onSubmit={handleSubmit}>
        <div className="register-card">
          <div>
            <h1 className="register-card-heading">Register</h1>
            {error && (
              <div
                className="alert alert-danger text-center alert-box"
                role="alert"
                style={{
                  width: "300px",
                  fontSize: "14px",
                  padding: "10px",
                  margin: "10px 0",
                }}
              >
                {error}
              </div>
            )}
          </div>

          <div className="register-card-content">
            <label className="register-card-label" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handle}
              required
            />
            <label className="register-card-label" htmlFor="firstName">
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handle}
              required
            />
            <label className="register-card-label" htmlFor="lastName">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handle}
              required
            />
            <label className="register-card-label" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handle}
              required
            />
            <label className="register-card-label" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handle}
              required
            />
            <label className="register-card-label" htmlFor="repeatPassword">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="repeatPassword"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handle}
              required
            />
          </div>
          <div className="register-card-inputs">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
