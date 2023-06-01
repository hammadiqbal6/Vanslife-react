import React from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../utils";

function AuthenticatedNav({ setUser }) {
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await logoutUser();
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
      setUser(null);
      window.location.reload();
    } catch (error) {}
  };

  return (
    <>
      <NavLink
        to="*"
        onClick={handleLogout}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        Logout
      </NavLink>
    </>
  );
}

export default AuthenticatedNav;
