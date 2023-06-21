import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import GuestNav from "./GuestNav";
import AuthenticatedNav from "./AuthenticatedNav";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

function Header() {
  const { user, setUser } = useAuth();
  const cartCount = useSelector((state) => {
    return state.cart.length;
  });

  if (user === false) return;

  return (
    <header className="flex items-center justify-between border-b px-4 py-3 text-sm shadow-sm md:text-base">
      <Link to="/" className="mr-2 font-bold uppercase md:text-2xl">
        #VanLife
      </Link>
      <nav className="flex items-center gap-2 md:gap-8">
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
        <div className="relative">
          {cartCount !== 0 && (
            <span className="absolute -top-3 right-0 inline-flex rounded-full bg-red-600 px-1 py-1 text-xs font-bold leading-none text-red-100">
              {cartCount}
            </span>
          )}

          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <MdShoppingCart className="h-6 w-6" />
          </NavLink>
        </div>
        {!user ? <GuestNav /> : <AuthenticatedNav setUser={setUser} />}
      </nav>
    </header>
  );
}

export default Header;
