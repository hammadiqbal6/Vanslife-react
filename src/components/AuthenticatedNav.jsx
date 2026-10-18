import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils";

function AuthenticatedNav({ setUser, onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    onNavigate?.();
    try {
      await logoutUser();
    } catch {
      // Clear session even if the mock logout fails
    }
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    setUser(null);
    if (location.pathname.includes("host")) {
      navigate({
        pathname: "/login",
        search: `?message=${encodeURIComponent(
          "You must log in first."
        )}&redirectTo=${encodeURIComponent(location.pathname)}`,
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-left text-stone-700 transition-colors hover:text-stone-900"
    >
      Logout
    </button>
  );
}

export default AuthenticatedNav;
