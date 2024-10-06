import React from "react";

const SkeletonSignUp = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[550px] h-[715px] border rounded-2xl skeleton-box bg-gray-200"></div>
    </div>
  );
};

export default SkeletonSignUp;
