import React from "react";
import { Skeleton } from "antd";
const SkeletonIndexPage = () => {
  return (
    <div className="h-screen mt-4 px-10 xl:px-20 md:mt-[250px] lg:mt-[184px]">
      <div className="cursor-pointer flex-shrink-0 flex gap-10 items-center justify-center py-3 overflow-hidden">
        {Array.from({ length: 33 }).map((_, index) => (
          <div
            className="max-h-16 flex flex-col justify-center items-center gap-2"
            key={index}
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 skeleton-box"></div>
            <div className="w-16 h-4 rounded bg-gray-200 skeleton-box "></div>
          </div>
        ))}
      </div>
      <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6  gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div class="relative animate-pulse">
            <div class="h-[340px] sm:h-[260px] md:h-[350px] lg:h-[258px] bg-gray-200 skeleton-box rounded-xl"></div>
            <div class="mt-3">
              <div class="h-4 bg-gray-200 skeleton-box rounded w-3/4"></div>
              <div class="mt-2 h-4 bg-gray-200 skeleton-box rounded w-1/2"></div>
              <div class="mt-2 h-4 bg-gray-200 skeleton-box rounded w-full"></div>
            </div>
            <div class="absolute top-[10px] right-[10px] p-[10px] rounded-full bg-gray-300"></div>
          </div>
        ))}
      </div>
      <div className="mt-20 space-y-5">
        <h3 class="text-6xl font-medium animate-pulse">
          <div class="bg-gray-200 skeleton-box rounded w-[800px] h-[40px]"></div>
        </h3>
      </div>
      <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6  gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div class="relative animate-pulse">
            <div class="h-[340px] sm:h-[260px] md:h-[350px] lg:h-[258px] bg-gray-200 skeleton-box rounded-xl"></div>
            <div class="mt-3">
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              <div class="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
              <div class="mt-2 h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonIndexPage;
