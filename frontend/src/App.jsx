import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersonalProfile from "./pages/PersonalProfile";
import NewMessage from "./pages/NewMessage";
import DirectMessages from "./pages/DirectMessages";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<PersonalProfile />} />
          <Route path="/new-message" element={<NewMessage />} />
          <Route path="/messages/:participant" element={<DirectMessages />} />
        </Route>

        {/* Catch all */}
      </Route>
    </Routes>
  );
}

export default App;
