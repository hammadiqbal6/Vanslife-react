import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";

function RedirectIfAuthed({ children, to = "/host" }) {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && user) {
      navigate(to, { replace: true });
    }
  }, [ready, user, navigate, to]);

  if (!ready) {
    return <Loader />;
  }

  if (user) {
    return null;
  }

  return children;
}

export default RedirectIfAuthed;
