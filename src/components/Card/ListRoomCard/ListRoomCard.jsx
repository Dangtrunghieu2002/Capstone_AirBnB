import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const ListRoomCard = ({ item }) => {
  const [searchParam] = useSearchParams();
  const { startDate, endDate } = useSelector(
    (state) => state.InforBookingSlice
  );
  return (
    <div>
      <div className="block sm:flex space-y-5 sm:space-y-0 py-7 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg rounded-lg transition duration-200 ease-out first:border-t">
        <div className="h-[300px] sm:h-24 sm:w-40 md:h-52 md:w-80 flex-shrink-0 relative">
          <img
            src={item.hinhAnh}
            className="w-full h-full object-cover rounded-2xl"
            alt=""
          />
        </div>

        <div className="flex flex-col flex-grow pl-5">
          <div className="flex justify-between">
            <p>Toàn bộ căn hộ dịch vụ tại {searchParam.get("location")}</p>
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
          <h4 className="text-lg lg:text-xl">{item.tenPhong}</h4>

          <div className="border-b w-10 pt-2" />
          <p className="pt-2 text-sm text-gray-500">
            {item.khach} Khách · {item.phongNgu} Phòng ngủ · {item.giuong}{" "}
            Giường · {item.phongTam} Phòng tắm
          </p>
          <p className="pt-2 text-sm text-gray-500 flex-grow">
            {[
              item.mayGiat && "Máy giặt",
              item.banLa && "Bàn là",
              item.tivi && "Ti Vi",
              item.dieuHoa && "Điều Hòa",
              item.wifi && "Wifi",
              item.bep && "Bếp",
              item.doXe && "Đỗ Xe",
              item.hoBoi && "Hồ Bơi",
              item.banUi && "Bàn Ủi",
            ]
              .filter(Boolean) // Lọc các giá trị không hợp lệ (undefined hoặc false)
              .join(" · ")}{" "}
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
              4,74 (12)
            </p>

            <div>
              <p className="text-lg lg:text-2xl font-semibold pb-2">
                ${item.giaTien} / đêm
              </p>
              <p className="text-right font-extralight">
                ${item.giaTien * 3} Tổng
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 hidden">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-[70%]">
              {item.tenPhong}
            </h3>
            <div className="flex items-center gap-1">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: 12,
                    width: 12,
                    fill: "currentcolor",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
              </div>
              <span className="text-sm">5,0</span>
              <span className="text-sm">(11)</span>
            </div>
          </div>
          <div className="mt-1">
            <p className="text-sm text-gray-500">
              {item.khach} Khách | {item.phongNgu} Phòng ngủ | {item.giuong}{" "}
              Giường | {item.phongTam} Phòng tắm
            </p>
          </div>
          <div className="mt-1">
            <p className="text-sm text-gray-500">
              {[
                item.mayGiat && "Máy giặt",
                item.banLa && "Bàn là",
                item.tivi && "Ti Vi",
                item.dieuHoa && "Điều Hòa",
                item.wifi && "Wifi",
                item.bep && "Bếp",
                item.doXe && "Đỗ Xe",
                item.hoBoi && "Hồ Bơi",
                item.banUi && "Bàn Ủi",
              ]
                .filter(Boolean) // Lọc các giá trị không hợp lệ (undefined hoặc false)
                .join(" · ")}{" "}
              {/* Nối các giá trị với dấu " · " */}
            </p>
          </div>
          <div className="mt-1">
            <p className="text-[15px] text-gray-500">
              Ngày 21 - Ngày 26 tháng 10
            </p>
          </div>
          <div className="mt-2">
            <p>
              <span className="font-semibold">US{item.giaTien}</span> / đêm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListRoomCard;
