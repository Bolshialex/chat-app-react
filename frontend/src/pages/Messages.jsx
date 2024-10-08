import React from "react";
import "../styles/Messages.css";

function Main() {
  return (
    <>
      <div className="card-container">
        <div className="messages-card">
          <div className="messages-heading-container">
            <h1 className="messages-card-heading">Messages</h1>
          </div>

          <ul className="messages-message-list">
            <li className="messages-message-container">
              <div className="messages-message-info-card">
                <h3>Messenger</h3>
                <p>Latest message</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Main;
