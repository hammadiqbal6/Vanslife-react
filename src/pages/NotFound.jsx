import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-2">
      <h1>Sorry, the page you were looking for was not found.</h1>
      <Link to="/" className="font-bold underline">
        Return to Home
      </Link>
    </div>
  );
}

export default NotFound;
