import React from "react";
import "../styles/Register.css";

function Register() {
  return (
    <div className="card-container">
      <form>
        <div className="register-card">
          <h1 className="register-card-heading">Register</h1>

          <div className="register-card-content">
            <label className="register-card-label">Username:</label>
            <input type="text" className="form-control" required />
            <label className="register-card-label">Password:</label>
            <input type="password" className="form-control" required />
            <label className="register-card-label">Confirm Password:</label>
            <input type="password" className="form-control" required />
          </div>
          <div className="register-card-inputs">
            <p>
              Already have an account? <a href="/login">Login</a>
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
