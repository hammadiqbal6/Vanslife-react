import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils";

function AuthenticatedNav({ setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      await logoutUser();
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
      setUser(null);
      const pathname = location.pathname;
      if (pathname.includes("host")) {
        navigate({
          pathname: "/login",
          search: `?message=You must login first.&&redirectTo=${pathname}`,
        });
      }
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
