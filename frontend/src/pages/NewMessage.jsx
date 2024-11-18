import { React, useState, useEffect } from "react";
import "../styles/NewMessage.css";
import { Link } from "react-router-dom";
import { GoChevronLeft } from "react-icons/go";
import TextField from "@mui/material/TextField";
import userFunctions from "../api/userFunctions";
import useAuth from "../hooks/useAuth";
import ContactList from "../components/ContactList";

function NewMessage() {
  const [inputText, setInputText] = useState("");

  const auth = useAuth();

  const handleInput = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <>
      <div className="new-message-card-container">
        <div className="new-message-card">
          <div className="new-message-heading-container">
            <Link to={"/messages"}>
              <GoChevronLeft className="personal-profile-icon" />
            </Link>
            <TextField
              id="contact-search-field"
              variant="standard"
              onChange={handleInput}
              fullWidth
              label="Search Contacts"
              margin="none"
            />
          </div>
          <div className="new-message-contact-list-container">
            <ContactList input={inputText} />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewMessage;
