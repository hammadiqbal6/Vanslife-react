import React from "react";
import { useOutletContext } from "react-router-dom";

function HostVanInfo() {
  const { currentVan } = useOutletContext();
  return (
    <section className="flex flex-col gap-y-3 text-stone-800">
      <p>
        <span className="font-semibold">Name:</span> {currentVan.name}
      </p>
      <p>
        <span className="font-semibold">Category:</span>{" "}
        <span className="capitalize">{currentVan.type}</span>
      </p>
      <p>
        <span className="font-semibold">Description:</span>{" "}
        {currentVan.description}
      </p>
      <p>
        <span className="font-semibold">Visibility:</span> Public
      </p>
    </section>
  );
}

export default HostVanInfo;
