import { Skeleton } from "antd";
import React from "react";
const SkeletonLeftListRoom = () => {
  return (
    <div className="flex pl-10 pr-2 xl:pl-20 justify-between">
      <div className=" xl:w-[62%] w-full">
        <div>
          <div class="py-6 animate-pulse">
            <div class="h-4 bg-gray-200 skeleton-box rounded w-16 text-xs"></div>
            <div class="h-8  bg-gray-200 skeleton-box rounded mt-2 w-[30%] mb-6"></div>
            <div class="hidden lg:inline-flex space-x-3 text-[15px] font-medium">
              <div class="h-8 w-[80px] bg-gray-200 skeleton-box px-4 py-2 border rounded-full"></div>
              <div class="h-8 w-[50px] bg-gray-200 skeleton-box border rounded-full px-4 py-2"></div>
              <div class="h-8 w-[80px] bg-gray-200 skeleton-box border rounded-full px-4 py-2"></div>
              <div class="h-8 w-[110px] bg-gray-200 skeleton-box border rounded-full px-4 py-2"></div>
              <div class="h-8 w-[90px] bg-gray-200 skeleton-box border rounded-full px-4 py-2"></div>
            </div>
          </div>
          <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="flex gap-2">
                <div class="h-[300px] sm:h-24 sm:w-40 md:h-52 md:w-80 flex-shrink-0 relative animate-pulse">
                  <div class="w-full h-full bg-gray-200 skeleton-box rounded-2xl"></div>
                </div>
                <div class="flex flex-col flex-grow pl-5 animate-pulse">
                  <div class="flex justify-between">
                    <div class="h-4 bg-gray-200 skeleton-box rounded w-[35%]"></div>
                    <div class="w-7 h-7 bg-gray-200 skeleton-box rounded-full"></div>
                  </div>
                  <div class="h-8 bg-gray-200 skeleton-box my-4 rounded w-2/3"></div>

                  <div class="border-b w-10 pt-2"></div>
                  <div class="h-4 bg-gray-200 skeleton-box my-2 rounded w-[40%]"></div>
                  <div class="h-4 bg-gray-200 skeleton-box my-2 rounded w-[45%]"></div>

                  <div class="flex justify-between items-end pt-5">
                    <div class="flex gap-1">
                      <div class="w-16 h-6 bg-gray-200 skeleton-box rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky top-0 h-screen hidden xl:block">
        <div class="h-screen w-full animate-pulse">
          <div class="h-full xl:w-[450px] 2xl:w-[660px] bg-gray-200 skeleton-box"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLeftListRoom;
