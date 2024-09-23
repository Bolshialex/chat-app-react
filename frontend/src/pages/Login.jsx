import React from "react";
import "../styles/global.css";

function Login() {
  return (
    <>
      <div className="card-container">
        <h1>Login</h1>
        <form>
          <div>
            <label>Username</label>
            <input type="text" placeholder="Username" required />
            <label>Password</label>
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </div>
          <div>
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
