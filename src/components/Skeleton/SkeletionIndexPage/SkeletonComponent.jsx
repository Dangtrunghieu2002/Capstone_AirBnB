import React from "react";

const SkeletonComponent = () => {
  return (
    <div>
      <div class="relative animate-pulse">
        <div class="h-[340px] sm:h-[260px] md:h-[350px] lg:h-[258px] bg-gray-200 rounded-xl"></div>
        <div class="mt-3">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
          <div class="mt-2 h-4 bg-gray-200 rounded w-full"></div>
        </div>
        <div class="absolute top-[10px] right-[10px] p-[10px] rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export default SkeletonComponent;