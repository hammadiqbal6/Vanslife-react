import React from "react";
import { Oval } from "react-loader-spinner";

function Loader(props) {
  return (
    <div className="flex flex-col min-h-[60vh] justify-center items-center">
      <Oval
        height={100}
        width={100}
        strokeWidth={2}
        visible={true}
        ariaLabel="oval-loading"
        strokeWidthSecondary={2}
      />
    </div>
  );
}

export default Loader;
