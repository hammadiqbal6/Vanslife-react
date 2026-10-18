import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import GuestNav from "./GuestNav";
import AuthenticatedNav from "./AuthenticatedNav";
import { MdClose, MdMenu, MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

const navClass = ({ isActive }) =>
  isActive
    ? "active-link"
    : "text-stone-700 transition-colors hover:text-stone-900";

function Header() {
  const { user, setUser, ready } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.length);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-amber-200/60 bg-[#fff7ed]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link
          to="/"
          className="font-display text-xl font-bold uppercase tracking-wide text-stone-900 md:text-2xl"
          onClick={closeMenu}
        >
          #VanLife
        </Link>

        <button
          type="button"
          className="rounded-md p-2 text-stone-800 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <MdClose className="h-6 w-6" />
          ) : (
            <MdMenu className="h-6 w-6" />
          )}
        </button>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-4 border-b border-amber-200/60 bg-[#fff7ed] px-4 py-4 shadow-sm md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <NavLink to="/host" className={navClass} onClick={closeMenu}>
            Host
          </NavLink>
          <NavLink to="/about" className={navClass} onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/vans" className={navClass} onClick={closeMenu}>
            Vans
          </NavLink>
          <div className="relative w-fit">
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold leading-5 text-white">
                {cartCount}
              </span>
            )}
            <NavLink
              to="/cart"
              className={navClass}
              onClick={closeMenu}
              aria-label={`Cart (${cartCount} items)`}
            >
              <MdShoppingCart className="h-6 w-6" />
            </NavLink>
          </div>
          {!ready ? (
            <span
              className="inline-block h-8 w-24 animate-pulse rounded-md bg-stone-200/80"
              aria-hidden="true"
            />
          ) : !user ? (
            <GuestNav onNavigate={closeMenu} />
          ) : (
            <AuthenticatedNav setUser={setUser} onNavigate={closeMenu} />
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
