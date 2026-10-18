import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="wrapper flex flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-amber-550">
        404
      </p>
      <h1 className="mt-2 max-w-md text-2xl font-bold text-stone-900 md:text-3xl">
        Sorry, the page you were looking for was not found.
      </h1>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-stone-900 px-5 py-3 font-medium text-white transition hover:bg-stone-800"
      >
        Return to home
      </Link>
    </div>
  );
}

export default NotFound;
