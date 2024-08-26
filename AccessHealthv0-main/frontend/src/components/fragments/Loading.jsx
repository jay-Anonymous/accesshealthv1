import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center">
      <HashLoader />
    </div>
  );
};

export default Loading;
