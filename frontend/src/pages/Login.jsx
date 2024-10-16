import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import loginFunctions from "../api/loginFunctions";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

    loginFunctions
      .login(formData.username, formData.password)
      .then((response) => {
        console.log(response);
        navigate("/messages");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setError("Invalid username or password.");
        } else {
          setError("Login Failed - Please try again.");
        }
      });
  };
  return (
    <div className="card-container">
      <form onSubmit={handleSubmit}>
        <div className="login-card">
          <h1 className="login-card-heading">Login</h1>{" "}
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
          <div className="login-card-content">
            <label className="login-card-label" htmlFor="username">
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
            <label className="login-card-label" htmlFor="password">
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
          </div>
          <div className="login-card-inputs">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
