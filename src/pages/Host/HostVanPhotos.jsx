import React from "react";
import { useOutletContext } from "react-router-dom";

function HostVanPhotos() {
  const { currentVan } = useOutletContext();
  return (
    <img
      src={currentVan.image}
      alt={`${currentVan.name} photo`}
      className="h-60 w-60 rounded-lg object-cover"
    />
  );
}

export default HostVanPhotos;
