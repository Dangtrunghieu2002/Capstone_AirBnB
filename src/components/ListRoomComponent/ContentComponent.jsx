import React from "react";
import ListRoomCard from "../Card/ListRoomCard/ListRoomCard";
import { useSearchParams } from "react-router-dom";
import ListRoom from "../../assets/datajson/ListRoom.json";
const ContentComponent = ({ listRoom }) => {
  const [searchParam] = useSearchParams();
  const getRandomNumber = () => {
    return Math.floor(Math.random() * (200 - 10 + 1)) + 10;
  };
  return (
    <div className="">
      <div className="py-6">
        <p className="text-xs">{getRandomNumber()}+ chỗ ở </p>
        <h1 className="text-2xl lg:text-3xl font-semibold mt-2 mb-6">
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
      <div className="">
        {listRoom.map((item, index) => {
          return <ListRoomCard item={item} />;
        })}
        {ListRoom.map((item, index) => {
          return (
            <div className="flex py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg rounded-lg transition duration-200 ease-out first:border-t">
              <div className="h-24 w-40 md:h-52 md:w-80 flex-shrink-0 relative">
                <img
                  src={
                    item["img-src"]
                      ? item["img-src"]
                      : "https://a0.muscache.com/im/pictures/hosting/Hosting-1071370453780399924/original/4f7cf485-b405-4bdc-b1ee-e01d1cba0408.jpeg?im_w=720"
                  }
                  className="w-full h-full object-cover rounded-2xl"
                  alt=""
                />
              </div>

              <div className="flex flex-col flex-grow pl-5">
                <div className="flex justify-between">
                  <p>
                    Toàn bộ căn hộ dịch vụ tại {searchParam.get("location")}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-7 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl">{item.moTa}</h4>

                <div className="border-b w-10 pt-2" />
                <p className="pt-2 text-sm text-gray-500">
                  4 Khách · 2 Phòng ngủ · 2 Giường · 1 Phòng tắm
                </p>
                <p className="pt-2 text-sm text-gray-500 flex-grow">
                  Bàn là · Ti Vi · Điều Hòa · Wifi · Bếp · Đỗ Xe
                </p>
                <div className="flex justify-between items-end pt-5">
                  <p className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 text-black "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                    4,74
                  </p>

                  <div>
                    <p className="text-lg lg:text-2xl font-semibold pb-2">
                      ${getRandomNumber()}/ đêm
                    </p>
                    <p className="text-right font-extralight">
                      ${getRandomNumber() * 3} Tổng
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentComponent;
