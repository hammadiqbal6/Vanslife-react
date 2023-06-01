import React from "react";
import { NavLink } from "react-router-dom";

function GuestNav() {
  return (
    <>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Register
      </NavLink>
    </>
  );
}

export default GuestNav;
