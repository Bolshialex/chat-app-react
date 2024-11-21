import { React, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import useAuth from "../hooks/useAuth";
import messageFunctions from "../api/messageFunctions";
import "../styles/DirectMessages.css";

function DirectMessages() {
  const auth = useAuth();
  const location = useLocation();
  const [messageData, setMessageData] = useState({});
  const { message } = location.state;
  useEffect(() => {
    messageFunctions
      .getMessages(auth.auth.accessToken, message.participants[0]._id)
      .then((messageData) => {
        setMessageData(messageData.data);
      })
      .catch((error) => {
        console.error("Error getting details : ", error);
      });
  }, []);
  console.log(messageData);
  return (
    <>
      <div className="direct-message-card-container">
        <div className="direct-message-card">
          <div className="direct-message-heading-container">
            <Link to={"/messages"}>
              <GoChevronLeft className="personal-profile-icon" />
            </Link>
            <h1 className="direct-message-card-heading">
              {message.participants[0].username}
            </h1>
          </div>
          <div className="direct-message-card-chat"></div>
        </div>
      </div>
    </>
  );
}

export default DirectMessages;
