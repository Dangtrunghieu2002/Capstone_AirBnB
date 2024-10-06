import React from "react";

const SkeletonSignIn = () => {
  return (
    <div className="block lg:flex items-center gap-[110px] h-screen pl-20">
      <div className="w-[562px] h-[615px] border rounded-2xl skeleton-box bg-gray-200"></div>

      <div className="w-[80%] h-full border rounded-2xl skeleton-box bg-gray-200"></div>
    </div>
  );
};

export default SkeletonSignIn;
