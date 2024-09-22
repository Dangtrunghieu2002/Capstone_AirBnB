import React from "react";
import ListRoomCard from "../Card/ListRoomCard/ListRoomCard";
import { useSearchParams } from "react-router-dom";

const ContentComponent = ({ listRoom }) => {
  const [searchParam] = useSearchParams();
  return (
    <div className="">
      <div className="py-6">
        <p className="text-xs">Hơn 1.000 chỗ ở tại Thành phố Hồ Chí Minh</p>
        <h1 className="text-3xl font-semibold mt-2 mb-6">
          Chỗ ở tại khu vực {searchParam.get("location")}
        </h1>
        <div className="hidden lg:inline-flex space-x-3 text-gray-800 whitespace-nowrap text-[15px] font-medium">
          <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">
            Loại nơi ở
          </p>
          <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">
            Giá
          </p>
          <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">
            Đặt ngay
          </p>
          <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">
            Phòng và phòng ngủ
          </p>
          <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">
            Bộ lọc khác
          </p>
        </div>
      </div>
      <div className="space-y-5">
        {listRoom.map((item, index) => {
          return <ListRoomCard item={item} />;
        })}
      </div>
    </div>
  );
};

export default ContentComponent;
