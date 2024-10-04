import React, { useContext, useEffect, useState } from "react";
import { datPhongService } from "../../service/datPhong.service";
import { useDispatch, useSelector } from "react-redux";
import { phongService } from "../../service/phong.service";
import { Link, useSearchParams } from "react-router-dom";
import { formatDateString } from "../../utils/utils";
import { getRoomBooking } from "../../redux/SliceUser/phongDaDatSlice";
import { NotificationContext } from "../../App";
const ContentRightContent = ({ user }) => {
  const { roomBooking } = useSelector((state) => state.phongDaDatSlice);
  const dispatch = useDispatch();
  const { showNotification } = useContext(NotificationContext);
  const data = [
    {
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "var(--linaria-theme_palette-hof)",
          }}
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <path d="m31.47 10.12-15-8a1 1 0 0 0-.94 0l-15 8a1 1 0 0 0 0 1.76L4 13.73V23a1 1 0 0 0 .52.88l11 6a1 1 0 0 0 .96 0l11-6A1 1 0 0 0 28 23v-9.27l2-1.06V23h2V11a1 1 0 0 0-.53-.88zM26 22.4l-10 5.45-10-5.45V14.8l9.53 5.08a1 1 0 0 0 .94 0L26 14.8v7.6zm-10-4.54L3.12 11 16 4.13 28.88 11 16 17.87z" />
        </svg>
      ),
      desc: "Nơi tôi từng theo học: Đại Học Tôn Đức Thắng",
    },
    {
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "var(--linaria-theme_palette-hof)",
          }}
          aria-hidden="true"
          role="presentation"
          focusable="false"
        >
          <path d="M20 2a2 2 0 0 1 2 1.85V6h6a3 3 0 0 1 3 2.82V27a3 3 0 0 1-2.82 3H4a3 3 0 0 1-3-2.82V9a3 3 0 0 1 2.82-3H10V4a2 2 0 0 1 1.85-2H12zm8 6H4a1 1 0 0 0-1 .88V12a3 3 0 0 0 2.82 3H13v2H6a4.98 4.98 0 0 1-3-1v11a1 1 0 0 0 .88 1H28a1 1 0 0 0 1-.88V16c-.78.59-1.74.95-2.78 1h-7.17v-2H26a3 3 0 0 0 3-2.82V9a1 1 0 0 0-.88-1zm-10 4a1 1 0 0 1 1 .88V19a1 1 0 0 1-.88 1H14a1 1 0 0 1-1-.88V13a1 1 0 0 1 .88-1H14zm-1 2h-2v4h2zm3-10h-8v2h8z" />
        </svg>
      ),

      desc: "Công việc của tôi : Lập trình viên",
    },
    {
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "var(--linaria-theme_palette-hof)",
          }}
        >
          <path d="M16 1a11 11 0 0 1 11 10.7v.3c0 3.7-2.03 7.14-6 10.3v7.03c0 .92-.75 1.67-1.67 1.67h-6.66c-.92 0-1.67-.75-1.67-1.67V22.3c-3.85-3.07-5.87-6.39-6-9.98V12A11 11 0 0 1 16 1zm3 26h-6v2h6v-2zm0-4h-6v2h6v-2zM16 3a9 9 0 0 0-9 8.98v.29c.1 2.9 1.8 5.7 5.17 8.4l.42.33h.4l.01-9.67a3 3 0 0 1 6 0V21h.41l.43-.34c3.36-2.7 5.05-5.48 5.15-8.36l.01-.28v-.27A9 9 0 0 0 16 3zm0 7.33-.12.01a1 1 0 0 0-.88 1V21h2v-9.67a1 1 0 0 0-1-1z" />
        </svg>
      ),
      desc: "Sự thật thú vị: ProVip",
    },
    {
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "var(--linaria-theme_palette-hof)",
          }}
        >
          <path d="M16 .33a15.67 15.67 0 1 1 0 31.34A15.67 15.67 0 0 1 16 .33zm0 2a13.67 13.67 0 1 0 0 27.34 13.67 13.67 0 0 0 0-27.34zm1 3v10.1l8.74 5.04-1 1.73L15 16.58V5.33z" />
        </svg>
      ),
      desc: "Tôi dành quá nhiều thời gian để: Chơi game",
    },
    {
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "var(--linaria-theme_palette-hof)",
          }}
        >
          <path d="M13.7 13.93a4 4 0 0 1 5.28.6l.29.37 4.77 6.75a4 4 0 0 1 .6 3.34 4 4 0 0 1-4.5 2.91l-.4-.08-3.48-.93a1 1 0 0 0-.52 0l-3.47.93a4 4 0 0 1-2.94-.35l-.4-.25a4 4 0 0 1-1.2-5.2l.23-.37 4.77-6.75a4 4 0 0 1 .96-.97zm3.75 1.9a2 2 0 0 0-2.98.08l-.1.14-4.84 6.86a2 2 0 0 0 2.05 3.02l.17-.04 4-1.07a1 1 0 0 1 .5 0l3.97 1.06.15.04a2 2 0 0 0 2.13-2.97l-4.95-7.01zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      ),
      desc: "Thú cưng: Mèo",
    },
    {
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "var(--linaria-theme_palette-hof)",
          }}
        >
          <path d="m28 2.12-.22.01-16 1.78A2 2 0 0 0 10 5.89v15.14A4.95 4.95 0 0 0 7 20a5 5 0 1 0 5 5V11.9l16-1.78v8.9A4.95 4.95 0 0 0 25 18a5 5 0 1 0 5 5V4.12a2 2 0 0 0-2-2zM7 28a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5-18.12V5.9l16-1.77V8.1L12 9.88zM25 26a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
      ),
      desc: "Bài hát yêu thích thời trung học phổ thông: Senorita",
    },
    {
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "var(--linaria-theme_palette-hof)",
          }}
        >
          <path d="M23.02 3a8.3 8.3 0 0 0-5.58 2.44L16 6.88l-1.44-1.44a8.31 8.31 0 0 0-11.79 0 8.3 8.3 0 0 0-2.44 5.9c0 4.92 2.49 8.84 8.04 13.43l.7.58.75.58.77.6.4.3.82.6.86.62.89.63.92.64L16 30.35l1.33-.9 1.06-.73.66-.46.7-.5.85-.62c7.4-5.45 11.07-10.12 11.07-15.8A8.3 8.3 0 0 0 23.33 3zm.31 2a6.31 6.31 0 0 1 6.34 6.33c0 4.3-2.62 8.12-8.01 12.48l-.72.57-.75.58-.79.58-.81.6-.7.49-.65.45-1.24.85-.36-.24-.9-.63-.87-.6-.42-.31-.81-.6-.4-.29-.76-.58-.74-.57c-5.84-4.6-8.4-8.31-8.4-12.78A6.3 6.3 0 0 1 8.66 5c1.67 0 3.27.65 4.48 1.85L16 9.71l2.86-2.86A6.31 6.31 0 0 1 23.33 5z" />
        </svg>
      ),
      desc: "Thứ mà tôi luôn nghĩ đến: You",
    },
    {
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "var(--linaria-theme_palette-hof)",
          }}
        >
          <path d="M30 4H20c-1.64 0-3.09.8-4 2.03A4.99 4.99 0 0 0 12 4H2a2 2 0 0 0-2 2v19c0 1.1.9 2 2 2h10a3 3 0 0 1 3 3h2a3 3 0 0 1 3-3h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-4 2v8.61l-2-.66-2 .66V6h4zM15 26a4.98 4.98 0 0 0-3-1H2V6h10a3 3 0 0 1 3 3v17zm15-1H20a4.97 4.97 0 0 0-3 1V9a3 3 0 0 1 3-3v11.39l4-1.34 4 1.34V6h2v19z" />
        </svg>
      ),
      desc: "Tên tiểu sử của tôi: Hun Bò Sữa",
    },
    {
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "var(--linaria-theme_palette-hof)",
          }}
        >
          <path d="M26 2a5 5 0 0 1 5 4.78V21a5 5 0 0 1-4.78 5h-6.06L16 31.08 11.84 26H6a5 5 0 0 1-4.98-4.56L1 21.22 1 21V7a5 5 0 0 1 4.78-5H26zm0 2H6a3 3 0 0 0-3 2.82V21a3 3 0 0 0 2.82 3H12.8l3.2 3.92L19.2 24H26a3 3 0 0 0 3-2.82V7a3 3 0 0 0-2.82-3H26zM16 6a8.02 8.02 0 0 1 8 8.03A8 8 0 0 1 16.23 22h-.25A8 8 0 0 1 8 14.24v-.25A8 8 0 0 1 16 6zm1.68 9h-3.37c.11 1.45.43 2.76.79 3.68l.09.22.13.3c.23.45.45.74.62.8H16c.33 0 .85-.94 1.23-2.34l.11-.44c.16-.67.29-1.42.34-2.22zm4.24 0h-2.23c-.1 1.6-.42 3.12-.92 4.32a6 6 0 0 0 3.1-4.07l.05-.25zm-9.61 0h-2.23a6 6 0 0 0 3.14 4.32c-.5-1.2-.82-2.71-.91-4.32zm.92-6.32-.13.07A6 6 0 0 0 10.08 13h2.23c.1-1.61.42-3.12.91-4.32zM16 8h-.05c-.27.08-.64.7-.97 1.65l-.13.4a13.99 13.99 0 0 0-.54 2.95h3.37c-.19-2.66-1.1-4.85-1.63-5H16zm2.78.69.02.05c.48 1.19.8 2.68.9 4.26h2.21A6.02 6.02 0 0 0 19 8.8l-.22-.12z" />
        </svg>
      ),
      desc: "Nói Tiếng Anh và Tiếng Việt",
    },
    {
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 24,
            width: 24,
            fill: "var(--linaria-theme_palette-hof)",
          }}
        >
          <path d="m5.7 1.3 3 3-.66.72a12 12 0 0 0 16.95 16.94l.72-.67 3 3-1.42 1.42-1.67-1.68A13.94 13.94 0 0 1 18 26.96V29h3v2h-8v-2h3v-2.04a13.95 13.95 0 0 1-8.92-4.08 14 14 0 0 1-1.11-18.5L4.29 2.71zm18.18 4.44.21.21.21.22a10 10 0 1 1-.64-.63zm-9.34 11.13-2.45 2.45a8 8 0 0 0 8.04 1.05 16.7 16.7 0 0 1-5.59-3.5zm4.91-4.91-3.5 3.5c2.85 2.54 6.08 3.82 6.7 3.2.63-.61-.66-3.85-3.2-6.7zm-9.81-2.1-.08.19a8 8 0 0 0 1.12 7.86l2.45-2.45a16.68 16.68 0 0 1-3.5-5.6zM23.32 8.1l-2.45 2.44a16.73 16.73 0 0 1 3.5 5.6 8 8 0 0 0-1.05-8.05zm-11.98-.76c-.62.62.66 3.86 3.2 6.7l3.5-3.5c-2.85-2.54-6.07-3.82-6.7-3.2zm2.54-1.7c1.75.59 3.75 1.83 5.58 3.49l2.44-2.45a8.03 8.03 0 0 0-8.02-1.04z" />
        </svg>
      ),
      desc: "Sống tại Thành phố Hồ Chí Minh, Việt Nam",
    },
    {
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
      ),
      desc: `Số điện thoại: ${user?.phone ? user?.phone : 1234124121}`,
    },
    {
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
          />
        </svg>
      ),
      desc: `Ngày sinh: ${user?.birthday}`,
    },
  ];
  const [room, setRoom] = useState([]);
  const { inforUser } = useSelector((state) => state.authSlice);
  const [searchParam] = useSearchParams();
  const handleDeleteRoom = (id) => {
    datPhongService
      .xoaPhongDaDat(id)
      .then((res) => {
        showNotification("Xóa thành công", "success", 1000);
        const updateRoom = room.filter(
          (item) => item.maDatPhong !== id
        );
        console.log("room", updateRoom);
        setRoom(updateRoom);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    roomBooking.map((item, index) => {
      phongService
        .layPhongTheoId(item.maPhong)
        .then((res) => {
          setRoom((prevRoom) => [
            ...prevRoom,
            { ...res.data.content, maDatPhong: item.id },
          ]);
        })
        .catch((err) => console.log(err));
    });
  }, [roomBooking]);

  return (
    <div>
      <div className="hidden md:grid grid-cols-1 xl:grid-cols-2 gap-x-[24px] gap-y-[16px] w-[90%]">
        {data.map((item, index) => {
          return (
            <div className="flex items-center gap-[12px]">
              <div>{item.logo}</div>
              <p>{item.desc}</p>
            </div>
          );
        })}
      </div>
      <hr className="my-[40px] w-[90%] xl:w-full border-t" />
      <div className="w-[100%]">
        <h3 className="text-[2rem] font-bold">Phòng đã thuê</h3>
        <div className="mt-5">
          {room.map((item, index) => {
            return (
              <div
                // to={`${path.roomDetail}?maPhong=${item.id}`}
                className="block md:flex space-y-5 md:space-y-0 py-7 px-2  w-[100%] lg:w-[90%] xl:w-full border-b cursor-pointer hover:opacity-80 hover:shadow-lg rounded-lg transition duration-200 ease-out first:border-t"
              >
                <div className="w-full h-[300px] md:w-[220px] md:h-[150px] xl:w-[250px] xl:h-[180px] flex-shrink-0 relative">
                  <img
                    src={item.hinhAnh}
                    className="w-full h-full object-cover rounded-2xl"
                    alt=""
                  />
                </div>

                <div className="flex flex-col flex-grow pl-5">
                  <div className="flex justify-between">
                    <p>Toàn bộ căn hộ dịch vụ tại</p>
                  </div>
                  <h4 className="lg:text-lg xl:text-xl text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.tenPhong}
                  </h4>

                  <div className="border-b w-10 pt-2" />
                  <p className="pt-2 text-sm text-gray-500">
                    {item.khach} Khách · {item.phongNgu} Phòng ngủ ·{" "}
                    {item.giuong} Giường · {item.phongTam} Phòng tắm
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
                  <div className="flex  xl:justify-end gap-5 pt-5">
                    <button className="hover:underline">Xác nhận</button>
                    <button
                      className="hover:underline"
                      onClick={() => handleDeleteRoom(item.maDatPhong)}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentRightContent;
