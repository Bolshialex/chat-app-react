import { useEffect, useState } from "react";
import "../styles/Messages.css";
import messageFunctions from "../api/messageFunctions";
import { Link } from "react-router-dom";
import { GoPerson, GoPlus } from "react-icons/go";
import useAuth from "../hooks/useAuth";

function Main() {
  const [messages, setMessages] = useState([]);
  const auth = useAuth();
  useEffect(() => {
    messageFunctions
      .getMessageList(auth.auth.accessToken)
      .then((messages) => {
        setMessages(messages);
      })
      .catch((error) => {
        console.error("Error getting messages : ", error);
      });
  }, []);
  return (
    <>
      <div className="messages-card-container">
        <div className="messages-card">
          <div className="messages-heading-container">
            <Link to={"/profile"}>
              <GoPerson title="Profile" className="messages-icon" />
            </Link>
            <h1 className="messages-card-heading">Messages</h1>
            <Link to={"/new-message"}>
              <GoPlus className="messages-icon" />
            </Link>
          </div>

          <ul className="messages-message-list">
            {messages.map((message) => (
              <li key={message._id} className="messages-message-list-item">
                <div className="messages-message-info-card">
                  {message.participants.map((user) => (
                    <h3 key={user._id} className="messages-user-heading">
                      {user.username}
                    </h3>
                  ))}
                  <p className="messages-user-last">
                    {message.lastMessage.content}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Main;
