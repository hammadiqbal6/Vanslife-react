import React from "react";
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h1 className="font-bold text-2lg">Error: {error.message}</h1>
        <div>
          {error.status} - {error.statusText}
        </div>
      </div>
    </div>
  );
}

export default Error;
