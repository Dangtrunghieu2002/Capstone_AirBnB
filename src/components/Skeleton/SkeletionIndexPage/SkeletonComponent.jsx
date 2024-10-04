import React from "react";

const SkeletonComponent = () => {
  return (
    <div class="animate-pulse">
      <div class="h-64 bg-gray-200 skeleton-box rounded-xl relative"></div>
      <div class="mt-2 relative">
        <div class="flex items-center justify-between">
          <div class="h-4 bg-gray-200 skeleton-box rounded w-1/2"></div>
          <div class="flex items-center gap-1">
            <div></div>
            <div class="h-4 bg-gray-200 skeleton-box rounded w-1/4"></div>
          </div>
        </div>
        <div class="h-4 bg-gray-200 skeleton-box rounded w-[30%] my-2"></div>
        <div class="h-4 bg-gray-200 skeleton-box rounded w-[60%] my-2"></div>
        <div class="h-4 bg-gray-200 skeleton-box rounded w-[50%] mt-4"></div>
        <div className="absolute top-0 right-0 bg-gray-200 rounded h-[24px] w-[24px]"></div>
      </div>
    </div>
  );
};

export default SkeletonComponent;
