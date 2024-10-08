import React from "react";
import "../styles/Login.css";

function Login() {
  return (
    <div className="card-container">
      <form>
        <div className="login-card">
          <h1 className="login-card-heading">Login</h1>

          <div className="login-card-content">
            <label className="login-card-label">Username:</label>
            <input type="text" className="form-control" required />
            <label className="login-card-label">Password:</label>
            <input type="password" className="form-control" required />
          </div>
          <div className="login-card-inputs">
            <p>
              Don't have an account? <a href="/register">Register</a>
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
