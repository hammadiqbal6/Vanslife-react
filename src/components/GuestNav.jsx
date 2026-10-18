import React from "react";
import { NavLink } from "react-router-dom";

function GuestNav({ onNavigate }) {
  return (
    <>
      <NavLink
        to="/login"
        onClick={onNavigate}
        className={({ isActive }) =>
          isActive
            ? "active-link"
            : "text-stone-700 transition-colors hover:text-stone-900"
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        onClick={onNavigate}
        className="rounded-md bg-amber-550 px-3 py-1.5 font-medium text-white transition hover:bg-amber-600"
      >
        Register
      </NavLink>
    </>
  );
}

export default GuestNav;
