import React from "react";
import { useOutletContext } from "react-router-dom";

function HostVanPrice() {
  const { currentVan } = useOutletContext();
  return (
    <p className="text-2xl font-bold text-stone-900">
      ${currentVan.price}
      <span className="text-base font-normal text-stone-500">/day</span>
    </p>
  );
}

export default HostVanPrice;
