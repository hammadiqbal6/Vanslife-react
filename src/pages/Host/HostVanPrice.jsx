import React from "react";
import { useOutletContext } from "react-router-dom";

function HostVanPrice() {
  const { currentVan } = useOutletContext();
  return (
    <h3 className="text-xl font-bold">
      ${currentVan.price}
      <span>/day</span>
    </h3>
  );
}

export default HostVanPrice;
