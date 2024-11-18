import { React, useState, useEffect } from "react";
import "../styles/NewMessage.css";
import useAuth from "../hooks/useAuth";
import userFunctions from "../api/userFunctions";

function ContactList(props) {
  const [contacts, setContacts] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    userFunctions
      .getAllUsers(auth.auth.accessToken)
      .then((contacts) => {
        setContacts(contacts);
      })
      .catch((error) => {
        console.error("Error getting contacts : ", error);
      });
  }, []);

  const filteredInput = contacts.filter((el) => {
    if (props.input === "") {
      return el;
    } else {
      return el.username.toLowerCase().includes(props.input);
    }
  });

  return (
    <ul className="new-message-contact-list">
      {filteredInput.map((contact) => (
        <li key={contact._id} className="new-message-contact-item">
          <h5 className="new-message-contact-user">{contact.username}</h5>
          <p className="new-message-contact-name">
            {contact.firstName} {contact.lastName}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
