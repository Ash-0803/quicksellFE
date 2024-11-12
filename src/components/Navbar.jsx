// components/Navbar.js
import React, { useState } from "react";
import { Icons } from "./Icons";
import "./Navbar.css";

const Navbar = ({ grouping, sorting, onDisplayChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar-container">
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        <Icons.Display />
        <span>Display</span>
        <span className="arrow">
          <Icons.Down />
        </span>
      </button>

      {isOpen && (
        <div className="dropdown-content">
          <div className="dropdown-option">
            <span className="dropdown-header">Grouping</span>
            <select
              value={grouping}
              className="select-box"
              onChange={(e) => onDisplayChange(e.target.value, sorting)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-option">
            <span className="dropdown-header">Ordering</span>
            <select
              className="select-box"
              value={sorting}
              onChange={(e) => onDisplayChange(grouping, e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
