import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import GuestNav from "./GuestNav";
import AuthenticatedNav from "./AuthenticatedNav";

function Header() {
  const { user, setUser } = useAuth();

  if (user === false) return;

  return (
    <header className="flex items-center justify-between border-b px-4 py-3 text-sm shadow-sm md:text-base">
      <Link to="/" className="mr-2 font-bold uppercase md:text-2xl">
        #VanLife
      </Link>
      <nav className="flex gap-2 md:gap-10">
        <NavLink
          to="/host"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Vans
        </NavLink>
        {!user ? <GuestNav /> : <AuthenticatedNav setUser={setUser} />}
      </nav>
    </header>
  );
}

export default Header;
