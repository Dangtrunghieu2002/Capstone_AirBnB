import React, { useEffect, useState } from "react";

const SkeletonDetailPage = () => {
  const initialMx = 312; // Giá trị ban đầu của mx
  const [mx, setMx] = useState(initialMx);
  const handleResize = () => {
    const newWidth = window.innerWidth;
    const newMx = Math.max(
      0,
      initialMx - Math.floor(((initialMx / 63) * (1924 - newWidth)) / 10)
    ); // Giảm mx
    setMx(newMx);
  };
  useEffect(() => {
    // Thêm sự kiện lắng nghe resize
    window.addEventListener("resize", handleResize);
    handleResize();
    // Cleanup khi component bị gỡ bỏ
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      style={{
        marginLeft: mx,
        marginRight: mx,
      }}
      className="px-10 xl:px-20"
    >
      <div class="py-5 animate-pulse w-full">
        <div class="h-8 bg-gray-200 skeleton-box w-[40%] rounded text-xs"></div>
        <div className="grid grid-cols-4 gap-2 mt-10">
          <div className="h-[410px] w-full bg-gray-200 skeleton-box rounded-lg col-span-2 row-span-2"></div>
          <div className="h-[200px] w-full bg-gray-200 skeleton-box rounded-lg"></div>
          <div className="h-[200px]  w-full bg-gray-200 skeleton-box rounded-lg"></div>
          <div className="h-[200px] w-full bg-gray-200 skeleton-box rounded-lg"></div>
          <div className="h-[200px]  w-full bg-gray-200 skeleton-box rounded-lg"></div>
        </div>
        <div className="mt-10 flex justify-between items-center w-full">
          <div className="w-full space-y-2">
            <div class="h-7 bg-gray-200 skeleton-box w-[35%] rounded text-xs"></div>
            <div class="h-5 bg-gray-200 skeleton-box w-[30%] rounded text-xs"></div>
          </div>
          <div className="w-full gap-2 flex flex-col items-end">
            <div class="h-9 bg-gray-200 skeleton-box w-[25%] rounded text-xs"></div>
            <div class="h-14 bg-gray-200 skeleton-box w-[50%] rounded text-xs"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetailPage;
