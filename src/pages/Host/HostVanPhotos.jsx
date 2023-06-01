import React from "react";
import { useOutletContext } from "react-router-dom";

function HostVanPhotos(props) {
  const { currentVan } = useOutletContext();
  return <img src={currentVan.image} alt="" className="h-60 w-60 rounded-lg" />;
}

export default HostVanPhotos;
