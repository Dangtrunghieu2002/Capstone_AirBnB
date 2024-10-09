import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { binhLuanService } from "../../service/binhLuan.service";
import { formatDateString } from "../../utils/utils";
import { useFormik } from "formik";
import { useSearchParams } from "react-router-dom";

const RatingLayout = ({ maPhong }) => {
  const { location } = useSelector((state) => state.viTriSlice);
  const [binhLuan, setBinhLuan] = useState([]);
  const [searchParam] = useSearchParams();
  const { inforUser } = useSelector((state) => state.authSlice);
  const { handleChange, handleSubmit, values, resetForm } = useFormik({
    initialValues: {
      maPhong: searchParam.get("maPhong"),
      maNguoiBinhLuan: inforUser?.user.id ? inforUser.user.id : 0,
      ngayBinhLuan: new Date(),
      noiDung: "",
      saoBinhLuan: 5,
    },
    onSubmit: (values) => {
      const fullValues = {
        ...values,
        tenNguoiBinhLuan: inforUser?.user.name,
        avatar: inforUser?.user.avatar,
      };
      setBinhLuan((preV) => [...preV, fullValues]);
      binhLuanService
        .binhLuan(values, inforUser.token)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(values);
      resetForm();
    },
  });
  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = Math.floor(seconds / 31536000); // seconds in a year
    if (interval >= 1)
      return interval === 1 ? "1 năm trước" : `${interval} năm trước`;

    interval = Math.floor(seconds / 2592000); // seconds in a month
    if (interval >= 1)
      return interval === 1 ? "1 tháng trước" : `${interval} tháng trước`;

    interval = Math.floor(seconds / 86400); // seconds in a day
    if (interval >= 1)
      return interval === 1 ? "1 ngày trước" : `${interval} ngày trước`;

    interval = Math.floor(seconds / 3600); // seconds in an hour
    if (interval >= 1)
      return interval === 1 ? "1 giờ trước" : `${interval} giờ trước`;

    interval = Math.floor(seconds / 60); // seconds in a minute
    if (interval >= 1)
      return interval === 1 ? "1 phút trước" : `${interval} phút trước`;

    return "Vừa xong"; // less than a minute
  };
  useEffect(() => {
    binhLuanService
      .layBinhLuanTheoPhong(maPhong)
      .then((res) => {
        setBinhLuan(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="mt-[16px] mb-[64px] flex flex-col justify-center items-center">
        <div className="flex items-start justify-between gap-[6px]">
          <div className="w-auto h-[100px] md:h-[132px]">
            <img
              src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png"
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="text-[70px] md:text-[100px] font-medium leading-[70px] md:leading-[80px]">
            5,0
          </div>
          <div className="w-auto h-[100px] md:h-[132px]">
            <img
              src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png"
              alt=""
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="pb-[8px] text-[1.375rem] leading-[1.625rem] font-[500]">
          Được khách yêu thích
        </div>
        <span className="text-[14px] lg:text-[18px] text-gray-500 w-[71%] sm:w-[47%] md:w-[34%] text-center leading-6">
          Một trong những ngôi nhà được yêu thích nhất trên Airbnb dựa trên điểm
          xếp hạng, đánh giá và độ tin cậy
        </span>
      </div>
      <div className="mb-[40px] pb-[40px] border-b">
        <div className="flex items-stretch h-[112px] overflow-hidden">
          <div className="w-[138px] mr-[32px] flex-shrink-0">
            <h3 className="text-[14px] font-medium mb-1">Xếp hạng tổng thể</h3>
            <div className="flex flex-col gap-[2px]">
              <div className="flex items-center gap-[8px]">
                <span className="w-[6px] text-xs text-gray-500">5</span>
                <div className="flex-grow">
                  <div className="h-[4px] bg-black rounded-[2px] overflow-hidden"></div>
                </div>
              </div>
              <div className="flex items-center gap-[8px]">
                <span className="w-[6px] text-xs text-gray-500">4</span>
                <div className="flex-grow">
                  <div className="h-[4px] bg-gray-300 rounded-[2px] overflow-hidden"></div>
                </div>
              </div>
              <div className="flex items-center gap-[8px]">
                <span className="w-[6px] text-xs text-gray-500">3</span>
                <div className="flex-grow">
                  <div className="h-[4px] bg-gray-300 rounded-[2px] overflow-hidden"></div>
                </div>
              </div>
              <div className="flex items-center gap-[8px]">
                <span className="w-[6px] text-xs text-gray-500">2</span>
                <div className="flex-grow">
                  <div className="h-[4px] bg-gray-300 rounded-[2px] overflow-hidden"></div>
                </div>
              </div>
              <div className="flex items-center gap-[8px]">
                <span className="w-[6px] text-xs text-gray-500">1</span>
                <div className="flex-grow">
                  <div className="h-[4px] bg-gray-300 rounded-[2px] overflow-hidden"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-[24px] pb-[4px] border-l border-r h-full min-w-[10rem] max-w-[10rem]">
            <div className="flex flex-col justify-between items-start h-full w-full">
              <div>
                <h3 className="text-sm font-medium">Mức độ sạch sẽ</h3>
                <span className="text-lg font-medium">5,0</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: 32,
                    width: 32,
                    fill: "currentcolor",
                  }}
                >
                  <path d="M24 0v6h-4.3c.13 1.4.67 2.72 1.52 3.78l.2.22-1.5 1.33a9.05 9.05 0 0 1-2.2-5.08c-.83.38-1.32 1.14-1.38 2.2v4.46l4.14 4.02a5 5 0 0 1 1.5 3.09l.01.25.01.25v8.63a3 3 0 0 1-2.64 2.98l-.18.01-.21.01-12-.13A3 3 0 0 1 4 29.2L4 29.02v-8.3a5 5 0 0 1 1.38-3.45l.19-.18L10 12.9V8.85l-4.01-3.4.02-.7A5 5 0 0 1 10.78 0H11zm-5.03 25.69a8.98 8.98 0 0 1-6.13-2.41l-.23-.23A6.97 6.97 0 0 0 6 21.2v7.82c0 .51.38.93.87 1H7l11.96.13h.13a1 1 0 0 0 .91-.88l.01-.12v-3.52c-.34.04-.69.06-1.03.06zM17.67 2H11a3 3 0 0 0-2.92 2.3l-.04.18-.01.08 3.67 3.1h2.72l.02-.1a4.29 4.29 0 0 1 3.23-3.4zM30 4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-3-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 0h-2.33v2H22zm8-2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM20 20.52a3 3 0 0 0-.77-2l-.14-.15-4.76-4.61v-4.1H12v4.1l-5.06 4.78a3 3 0 0 0-.45.53 9.03 9.03 0 0 1 7.3 2.34l.23.23A6.98 6.98 0 0 0 20 23.6z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="px-[24px] pb-[4px] border-r h-full min-w-[10rem] max-w-[10rem]">
            <div className="flex flex-col justify-between items-start h-full w-full">
              <div>
                <h3 className="text-sm font-medium">Độ chính xác</h3>
                <span className="text-lg font-medium">4,9</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: 32,
                    width: 32,
                    fill: "currentcolor",
                  }}
                >
                  <path d="M16 1a15 15 0 1 1 0 30 15 15 0 0 1 0-30zm0 2a13 13 0 1 0 0 26 13 13 0 0 0 0-26zm7 7.59L24.41 12 13.5 22.91 7.59 17 9 15.59l4.5 4.5z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="px-[24px] pb-[4px] border-r h-full min-w-[10rem] max-w-[10rem]">
            <div className="flex flex-col justify-between items-start h-full w-full">
              <div>
                <h3 className="text-sm font-medium">Nhận phòng</h3>
                <span className="text-lg font-medium">4,9</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: 32,
                    width: 32,
                    fill: "currentcolor",
                  }}
                >
                  <path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="px-[24px] pb-[4px] border-r h-full min-w-[10rem] max-w-[10rem]">
            <div className="flex flex-col justify-between items-start h-full w-full">
              <div>
                <h3 className="text-sm font-medium">Giao tiếp</h3>
                <span className="text-lg font-medium">4,9</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    fill: "none",
                    height: 32,
                    width: 32,
                    stroke: "currentcolor",
                    strokeWidth: 2,
                    overflow: "visible",
                  }}
                >
                  <path
                    fill="none"
                    d="M26 3a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-6.32L16 29.5 12.32 25H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="px-[24px] pb-[4px] border-r h-full min-w-[10rem] max-w-[10rem]">
            <div className="flex flex-col justify-between items-start h-full w-full">
              <div>
                <h3 className="text-sm font-medium">Vị trí</h3>
                <span className="text-lg font-medium">4,9</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: 32,
                    width: 32,
                    fill: "currentcolor",
                  }}
                >
                  <path d="M30.95 3.81a2 2 0 0 0-2.38-1.52l-7.58 1.69-10-2-8.42 1.87A1.99 1.99 0 0 0 1 5.8v21.95a1.96 1.96 0 0 0 .05.44 2 2 0 0 0 2.38 1.52l7.58-1.69 10 2 8.42-1.87A1.99 1.99 0 0 0 31 26.2V4.25a1.99 1.99 0 0 0-.05-.44zM12 4.22l8 1.6v21.96l-8-1.6zM3 27.75V5.8l-.22-.97.22.97 7-1.55V26.2zm26-1.55-7 1.55V5.8l7-1.55z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="px-[24px] pb-[4px] h-full min-w-[10rem] max-w-[10rem]">
            <div className="flex flex-col justify-between items-start h-full w-full">
              <div>
                <h3 className="text-sm font-medium">Giá trị</h3>
                <span className="text-lg font-medium">5,0</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: 32,
                    width: 32,
                    fill: "currentcolor",
                  }}
                >
                  <path d="M16.17 2a3 3 0 0 1 1.98.74l.14.14 11 11a3 3 0 0 1 .14 4.1l-.14.14L18.12 29.3a3 3 0 0 1-4.1.14l-.14-.14-11-11A3 3 0 0 1 2 16.37l-.01-.2V5a3 3 0 0 1 2.82-3h11.35zm0 2H5a1 1 0 0 0-1 .88v11.29a1 1 0 0 0 .2.61l.1.1 11 11a1 1 0 0 0 1.31.08l.1-.08L27.88 16.7a1 1 0 0 0 .08-1.32l-.08-.1-11-11a1 1 0 0 0-.58-.28L16.17 4zM9 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-[48px] border-b">
        <div className="block md:flex flex-wrap justify-start items-stretch">
          <div className="px-[8px] mr-[8.33333%] w-full md:w-[41.6667%] mb-[40px]">
            <div className="flex items-center gap-5 mb-3    ">
              <div className="">
                <img
                  src="https://a0.muscache.com/im/pictures/user/06557518-5e30-43a8-8b1c-f9b54ccf734b.jpg?im_w=240"
                  className="rounded-full h-[48px] w-[48px] object-cover"
                  alt=""
                />
              </div>
              <div>
                <h3 className="font-medium text-[15px]">David</h3>
                <p className="text-sm text-gray-600">
                  10 năm hoạt động trên Airbnb
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <div className="flex items-center gap-[1px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
              </div>
              <div> · </div>3 tuần trước
            </div>
            <div className="mb-2">
              Đây là nơi tuyệt vời nhất mà tôi và bạn bè của tôi từng ở. Nếu bạn
              có một nhóm lớn và thật khó để có được bóng lăn khi ra ngoài và
              về, đừng lo lắng, airbnb có nhiều tiện nghi để giữ cho
            </div>
            <div className="underline font-medium">Hiển thị thêm</div>
          </div>
          <div className="px-[8px] mr-[8.33333%] w-full md:w-[41.6667%] mb-[40px]">
            <div className="flex items-center gap-5 mb-3    ">
              <div className="">
                <img
                  src="https://a0.muscache.com/im/pictures/user/e200b2ca-4f90-4d9e-85bf-2b01de63ed70.jpg?im_w=240"
                  className="rounded-full h-[48px] w-[48px] object-cover"
                  alt=""
                />
              </div>
              <div>
                <h3 className="font-medium text-[15px]">Jacob </h3>
                <p className="text-sm text-gray-600">
                  11 tháng hoạt động trên Airbnb
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <div className="flex items-center gap-[1px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
              </div>
              <div> · </div>3 tuần trước
            </div>
            <div className="mb-2">
              Biệt thự tuyệt vời và đáng giá một cách thoải mái phù hợp với tất
              cả mọi người chúng tôi có và dịch vụ Bữa sáng nổi bật được thực
              hiện hàng ngày và khi chúng tôi
            </div>
            <div className="underline font-medium">Hiển thị thêm</div>
          </div>
          <div className="px-[8px] mr-[8.33333%] w-full md:w-[41.6667%] mb-[40px]">
            <div className="flex items-center gap-5 mb-3 ">
              <div className="">
                <img
                  src="https://a0.muscache.com/im/pictures/user/e59f44e7-d78a-4636-92d0-72a9beacd665.jpg?im_w=240"
                  className="rounded-full h-[48px] w-[48px] object-cover"
                  alt=""
                />
              </div>
              <div>
                <h3 className="font-medium text-[15px]">Jake</h3>
                <p className="text-sm text-gray-600">
                  6 năm hoạt động trên Airbnb
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <div className="flex items-center gap-[1px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
              </div>
              <div> · </div>tháng 6 năm 2024
            </div>
            <div className="mb-2">
              Trải nghiệm Airbnb tuyệt vời nhất mà tôi từng có. Biệt thự đẹp đến
              mức bạn sẽ không muốn rời đi. Mỗi phòng và khu vực đã được thiết
              kế với một con mắt tuyệt vời về chi tiết.
            </div>
            <div className="underline font-medium">Hiển thị thêm</div>
          </div>
          <div className="px-[8px] mr-[8.33333%] w-full md:w-[41.6667%] mb-[40px]">
            <div className="flex items-center gap-5 mb-3    ">
              <div className="">
                <img
                  src="https://a0.muscache.com/im/pictures/user/3ee82bfd-c4d5-4485-a238-da3033209c0c.jpg?im_w=240"
                  className="rounded-full h-[48px] w-[48px] object-cover"
                  alt=""
                />
              </div>
              <div>
                <h3 className="font-medium text-[15px]">Abby</h3>
                <p className="text-sm text-gray-600">
                  12 năm hoạt động trên Airbnb
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <div className="flex items-center gap-[1px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "0.5625rem",
                    width: "0.5625rem",
                    fill: "var(--linaria-theme_palette-hof)",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                  />
                </svg>
              </div>
              <div> · </div>tháng 3 năm 2024
            </div>
            <div className="mb-2">
              chủ nhà tuyệt vời. nơi tuyệt vời để lưu trú. ngôi nhà trực tiếp
              tốt hơn so với hình ảnh mô tả
            </div>
            <div className="underline font-medium">Hiển thị thêm</div>
          </div>
          {binhLuan.map((item, index) => {
            const commentDate = new Date(item.ngayBinhLuan);
            const timeSinceComment = timeAgo(commentDate);
            return (
              <div className="px-[8px] mr-[8.33333%] w-full md:w-[41.6667%] mb-[40px]">
                <div className="flex items-center gap-5 mb-3    ">
                  <div className="">
                    <img
                      src={
                        item.avatar
                          ? item.avatar
                          : "https://avatars.githubusercontent.com/u/49735763?v=4"
                      }
                      className="rounded-full h-[48px] w-[48px] object-cover border"
                      alt=""
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-[15px]">
                      {item.tenNguoiBinhLuan}
                    </h3>
                    <p className="text-sm text-gray-600">
                      10 năm hoạt động trên Airbnb
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <div className="flex items-center gap-[1px]">
                    {Array.from({ length: item.saoBinhLuan }, (_, index) => (
                      <svg
                        key={index} // Thêm key để tránh cảnh báo từ React
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                          display: "block",
                          height: "0.5625rem",
                          width: "0.5625rem",
                          fill: "var(--linaria-theme_palette-hof)",
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
                        />
                      </svg>
                    ))}
                  </div>
                  <div> · </div>
                  {timeSinceComment}
                </div>
                <div className="mb-2">{item.noiDung}</div>
                <div className="underline font-medium">Hiển thị thêm</div>
              </div>
            );
          })}
        </div>
        <div>
          <button className="hover:bg-gray-100 py-3 px-6 rounded-lg border border-black font-medium">
            Hiển thi tất cả 15 đánh giá
          </button>
        </div>
        {inforUser && (
          <div className="mt-10">
            <form onSubmit={handleSubmit}>
              <label for="chat" class="sr-only">
                Your message
              </label>
              <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <button
                  type="button"
                  class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      fill="currentColor"
                      d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                    />
                  </svg>
                  <span class="sr-only">Upload image</span>
                </button>
                <button
                  type="button"
                  class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                    />
                  </svg>
                  <span class="sr-only">Add emoji</span>
                </button>
                <textarea
                  id="noiDung"
                  name="noiDung"
                  onChange={handleChange}
                  value={values.noiDung}
                  rows="1"
                  class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your message..."
                ></textarea>
                <button
                  type="submit"
                  class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <svg
                    class="w-5 h-5 rotate-90 rtl:-rotate-90"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                  </svg>
                  <span class="sr-only">Send message</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="pt-[48px]">
        <h3 className="pb-[24px] font-medium text-[22px]">Nơi bạn sẽ đến</h3>
        <div className="h-[480px] mb-[32px] rounded-[8px] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3242.849769294591!2d139.87930286948162!3d35.63142990597677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sdisneyland%20tokyo!5e0!3m2!1svi!2s!4v1727328778165!5m2!1svi!2s"
            width="100%"
            height={480}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="absolute top-[50%] right-[50%] p-3 rounded-full bg-[#FF385C]">
            <div className="relative">
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: 22,
                  width: 22,
                  fill: "currentcolor",
                }}
                className="text-white"
              >
                <path d="m8.94959955 1.13115419 5.71719515 4.68049298c.2120231.18970472.3332053.46073893.3332053.74524138v7.94311145c0 .2761424-.2238576.5-.5.5h-4.5v-5.5c0-.24545989-.17687516-.44960837-.41012437-.49194433l-.08987563-.00805567h-3c-.27614237 0-.5.22385763-.5.5v5.5h-4.5c-.27614237 0-.5-.2238576-.5-.5v-7.95162536c0-.28450241.12118221-.55553661.3502077-.75978249l5.70008742-4.65820288c.55265671-.45163993 1.34701168-.45132001 1.89930443.00076492z" />
              </svg>
              <div className="absolute w-[12px] h-[12px] bg-[#FF385C] rounded-[2px] bottom-[-15px] left-[50%] translate-x-[-50%] rotate-[45deg]"></div>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-medium mb-[16px]">
          Thành phố {location.tinhThanh} , Việt Nam
        </h3>
        <div>
          <p>
            Biệt thự nằm ở khu vực đặc quyền nhất của thành phố{" "}
            {location.tinhThanh}. <br />
            Bảo vệ an ninh.
          </p>
        </div>
        <div className="mt-[16px] flex items-center gap-1 cursor-pointer">
          <p className="font-medium underline">Hiển thị thêm</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                fill: "none",
                height: 12,
                width: 12,
                stroke: "currentcolor",
                strokeWidth: "5.33333",
                overflow: "visible",
              }}
            >
              <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingLayout;
