import React from "react";
import { Oval } from "react-loader-spinner";

function Loader() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <Oval
        height={72}
        width={72}
        color="#ff8c38"
        secondaryColor="#fed7aa"
        strokeWidth={3}
        visible
        ariaLabel="oval-loading"
        strokeWidthSecondary={3}
      />
      <p className="mt-3 text-sm text-stone-500">Loading…</p>
    </div>
  );
}

export default Loader;
