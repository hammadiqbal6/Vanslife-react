import React from "react";
import { Link, useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  const message =
    error?.message ||
    error?.response?.data?.error ||
    "Something went wrong while loading this page.";

  return (
    <div className="wrapper flex flex-col items-center justify-center text-center">
      <div className="max-w-md rounded-xl bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-550">
          Error
        </p>
        <h1 className="mt-2 text-2xl font-bold text-stone-900">{message}</h1>
        {(error?.status || error?.statusText) && (
          <p className="mt-2 text-stone-500">
            {[error.status, error.statusText].filter(Boolean).join(" — ")}
          </p>
        )}
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-amber-550 px-5 py-2.5 font-medium text-white hover:bg-amber-600"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

export default Error;
