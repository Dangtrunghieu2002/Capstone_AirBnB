import React from "react";
import DateRangPicker from "../DateRangePicker/DateRangPicker";
import { calculateDaysBetween, formatDateString } from "../../utils/utils";
import { useSelector } from "react-redux";
const ContentLeft = ({ room }) => {
  const { startDate, endDate } = useSelector(
    (state) => state.InforBookingSlice
  );
  const { location } = useSelector((state) => state.viTriSlice);
  const night = calculateDaysBetween(startDate, endDate);
  return (
    <div>
      <div className="py-[32px]">
        <h3 className="text-2xl md:text-3xl block md:hidden font-medium mb-3">
          {room?.tenPhong}
        </h3>
        <h3 className="text-lg md:text-2xl font-medium">
          Toàn bộ biệt thự tại Thành phố {location.tinhThanh}, Việt Nam
        </h3>
        <p className="text-[14px] md:text-[16px]">
          {room?.khach} khách · {room?.phongNgu} phòng ngủ · {room?.giuong}{" "}
          giường · {room?.phongTam} phòng tắm và 1 phòng vệ sinh cơ bản
        </p>
      </div>
      <div className="py-[22px] px-[26px] flex items-center justify-around gap-[14px] lg:gap-[24px] rounded-[12px] border mb-5">
        <div className="flex items-center gap-[24px]">
          <div className="flex justify-center items-center gap-[2px] text-center">
            <div>
              <svg
                viewBox="0 0 20 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                height={36}
              >
                <g clipPath="url(#clip0_5880_37773)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z"
                    fill="#222222"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z"
                    fill="#F7F7F7"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z"
                    fill="#222222"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z"
                    fill="#F7F7F7"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z"
                    fill="#222222"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z"
                    fill="#F7F7F7"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z"
                    fill="#222222"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z"
                    fill="#F7F7F7"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z"
                    fill="#222222"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5880_37773">
                    <rect
                      width="18.8235"
                      height={32}
                      fill="white"
                      transform="translate(0.453125 0.000488281)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className=" text-[16px] lg:text-[1.125rem] leading-[20px] font-medium whitespace-nowrap">
              Được khách
              <br /> yêu thích
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 32"
                fill="none"
                height={36}
              >
                <g clipPath="url(#clip0_5880_37786)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.06516 25.417L4.72713 24.4547L3.02437 23.6492L2.3624 24.6116L3.21378 25.0143L2.3624 24.6116C0.890857 26.751 1.60381 29.3868 3.95483 30.4989C4.69986 30.8513 5.55423 31.0196 6.43257 30.987L6.75025 30.9752L6.82494 29.2305L6.50726 29.2423C5.98026 29.2618 5.46764 29.1608 5.02062 28.9494C3.61001 28.2821 3.18223 26.7007 4.06516 25.417Z"
                    fill="#222222"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.2303 10.235C9.47283 8.96204 8.62998 7.4878 8.70171 5.81232C8.77344 4.13685 9.7454 2.59524 11.6176 1.18749C13.375 2.46049 14.2179 3.93473 14.1462 5.6102C14.0744 7.28568 13.1025 8.82729 11.2303 10.235Z"
                    fill="#F7F7F7"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.3604 0.489275C11.9975 0.226387 11.4472 0.246818 11.0605 0.537533C9.01618 2.07473 7.84763 3.84975 7.76242 5.84026C7.6772 7.83076 8.69724 9.52453 10.6163 10.9146C10.9792 11.1775 11.5296 11.157 11.9162 10.8663C13.9605 9.32914 15.1291 7.55411 15.2143 5.56361C15.2995 3.57311 14.2795 1.87933 12.3604 0.489275ZM11.6311 2.3684C12.7748 3.38355 13.2568 4.47199 13.2069 5.63813C13.157 6.80428 12.5801 7.93203 11.3456 9.03547C10.2019 8.02032 9.71991 6.93187 9.76983 5.76573C9.81975 4.59959 10.3966 3.47184 11.6311 2.3684Z"
                    fill="#222222"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.87411 24.0529C5.42328 22.353 7.12208 21.4688 8.97051 21.4001C10.8189 21.3315 12.4473 22.0923 13.8556 23.6824C12.3065 25.3823 10.6077 26.2666 8.75924 26.3352C6.9108 26.4038 5.28243 25.6431 3.87411 24.0529Z"
                    fill="#F7F7F7"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.6494 24.1787C14.9466 23.8526 14.9656 23.4097 14.6954 23.1046C13.1648 21.3765 11.2793 20.4331 9.03368 20.5164C6.78805 20.5998 4.81561 21.6864 3.13199 23.5339C2.83478 23.86 2.81582 24.303 3.08601 24.608C4.61655 26.3361 6.50208 27.2795 8.74771 27.1962C10.9933 27.1128 12.9658 26.0262 14.6494 24.1787ZM12.5669 23.7198C11.3316 24.8808 10.0869 25.4045 8.82241 25.4515C7.55791 25.4984 6.35415 25.0656 5.21452 23.9928C6.44977 22.8318 7.69449 22.3081 8.95899 22.2611C10.2235 22.2142 11.4272 22.6471 12.5669 23.7198Z"
                    fill="#222222"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.87809 20.7043C9.34099 18.5957 10.3908 17.0928 12.0274 16.1956C13.6641 15.2984 15.5603 15.1864 17.716 15.8596C17.2531 17.9683 16.2033 19.4712 14.5667 20.3684C12.93 21.2656 11.0338 21.3775 8.87809 20.7043Z"
                    fill="#F7F7F7"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.7627 15.9443C18.8516 15.5393 18.6104 15.1569 18.1814 15.023C15.821 14.2859 13.5833 14.3695 11.6022 15.4554C9.6302 16.5364 8.45336 18.3139 7.95247 20.5956C7.86356 21.0006 8.10482 21.3829 8.5338 21.5169C10.8942 22.254 13.1319 22.1704 15.113 21.0844C17.085 20.0034 18.2618 18.226 18.7627 15.9443ZM16.6012 16.4656C16.1209 17.9951 15.2748 19.007 14.1415 19.6282C13.0241 20.2407 11.7105 20.4286 10.114 20.0743C10.5943 18.5448 11.4404 17.5329 12.5737 16.9116C13.6911 16.2991 15.0047 16.1113 16.6012 16.4656Z"
                    fill="#222222"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.6456 15.6267C10.8982 13.6743 11.0176 11.9555 12.004 10.4702C12.9903 8.98484 14.6462 8.03014 16.9718 7.60605C17.7192 9.55846 17.5997 11.2773 16.6134 12.7626C15.6271 14.2479 13.9711 15.2026 11.6456 15.6267Z"
                    fill="#F7F7F7"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.8943 7.28295C17.7454 6.89397 17.2889 6.67525 16.8087 6.76282C14.2562 7.22831 12.291 8.31371 11.1107 10.0911C9.93513 11.8614 9.84602 13.854 10.6566 15.9715C10.8055 16.3605 11.262 16.5792 11.7422 16.4916C14.2947 16.0261 16.26 14.9407 17.4402 13.1634C18.6158 11.393 18.7049 9.40048 17.8943 7.28295ZM16.2162 8.6613C16.6143 10.1267 16.4088 11.3465 15.7201 12.3835C15.0407 13.4067 13.9538 14.1584 12.3348 14.5931C11.9366 13.1278 12.1421 11.9079 12.8308 10.8709C13.5102 9.84774 14.5972 9.09607 16.2162 8.6613Z"
                    fill="#222222"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5880_37786">
                    <rect
                      width="18.8235"
                      height={32}
                      fill="white"
                      transform="matrix(-1 0 0 1 19.1016 0.000488281)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="hidden lg:block">
            <h3 className="text-[14px] xl:text-[16px] font-medium leading-[20px]">
              Khách đánh giá đây là một trong những ngôi nhà được yêu thích nhất
              trên Airbnb
            </h3>
          </div>
        </div>
        <div className="w-[1px] h-[40px] bg-gray-300 block lg:hidden"></div>
        <div className="flex flex-col gap-[3px] justify-end items-center">
          <p className="text-xl font-medium">5,0</p>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                height: 10,
                width: 10,
                fill: "currentcolor",
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
                height: 10,
                width: 10,
                fill: "currentcolor",
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
                height: 10,
                width: 10,
                fill: "currentcolor",
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
                height: 10,
                width: 10,
                fill: "currentcolor",
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
                height: 10,
                width: 10,
                fill: "currentcolor",
              }}
            >
              <path
                fillRule="evenodd"
                d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
              />
            </svg>
          </div>
        </div>
        <div className="w-[1px] h-[40px] bg-gray-300"></div>
        <div className="flex flex-col gap-[3px] justify-end items-center">
          <p className="text-lg lg:text-xl font-medium">15</p>
          <h3 className="text-xs underline whitespace-nowrap">đánh giá</h3>
        </div>
      </div>
      <div className="py-[24px] border-t border-b mt-5">
        <div className="flex items-center gap-6">
          <div className="h-[40px] w-[40px] relative">
            <img
              src="https://a0.muscache.com/im/pictures/user/User-6090313/original/9f3e77d3-a1ce-4ade-bcb6-577a88f220cc.jpeg?im_w=240"
              alt=""
              className="rounded-full"
            />
            <div className="absolute top-[22px] right-[-5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 14"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{ display: "block", height: 20, width: 20 }}
              >
                <linearGradient
                  id="a"
                  x1="8.5%"
                  x2="92.18%"
                  y1="17.16%"
                  y2="17.16%"
                >
                  <stop offset={0} stopColor="#e61e4d" />
                  <stop offset=".5" stopColor="#e31c5f" />
                  <stop offset={1} stopColor="#d70466" />
                </linearGradient>
                <path
                  fill="#fff"
                  d="M9.93 0c.88 0 1.6.67 1.66 1.52l.01.15v2.15c0 .54-.26 1.05-.7 1.36l-.13.08-3.73 2.17a3.4 3.4 0 1 1-2.48 0L.83 5.26A1.67 1.67 0 0 1 0 3.96L0 3.82V1.67C0 .79.67.07 1.52 0L1.67 0z"
                />
                <path
                  fill="url(#a)"
                  d="M5.8 8.2a2.4 2.4 0 0 0-.16 4.8h.32a2.4 2.4 0 0 0-.16-4.8zM9.93 1H1.67a.67.67 0 0 0-.66.57l-.01.1v2.15c0 .2.1.39.25.52l.08.05L5.46 6.8c.1.06.2.09.29.1h.1l.1-.02.1-.03.09-.05 4.13-2.4c.17-.1.3-.29.32-.48l.01-.1V1.67a.67.67 0 0 0-.57-.66z"
                />
              </svg>
            </div>
          </div>
          <div className="">
            <div>
              <h3 className="text-[17px] font-medium">
                Lựa chọn chỗ ở của Marianne
              </h3>
            </div>
            <div>
              <p className="text-[15px] text-gray-500">
                Chủ nhà siêu cấp · 11 năm kinh nghiệm đón tiếp khách
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[32px] border-b space-y-7">
        <div className="flex items-center gap-7">
          <div className="">
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
                fill: "currentcolor",
              }}
            >
              <path d="M17 6a2 2 0 0 1 2 1.85v8.91l.24.24H24v-3h-3a1 1 0 0 1-.98-1.2l.03-.12 2-6a1 1 0 0 1 .83-.67L23 6h4a1 1 0 0 1 .9.58l.05.1 2 6a1 1 0 0 1-.83 1.31L29 14h-3v3h5a1 1 0 0 1 1 .88V30h-2v-3H20v3h-2v-3H2v3H0V19a3 3 0 0 1 1-2.24V8a2 2 0 0 1 1.85-2H3zm13 13H20v6h10zm-13-1H3a1 1 0 0 0-1 .88V25h16v-6a1 1 0 0 0-.77-.97l-.11-.02zm8 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM17 8H3v8h2v-3a2 2 0 0 1 1.85-2H13a2 2 0 0 1 2 1.85V16h2zm-4 5H7v3h6zm13.28-5h-2.56l-1.33 4h5.22z" />
            </svg>
          </div>
          <div className="">
            <div className="font-medium">Phòng trong nhà phố</div>
            <div className="font-[400] text-[0.875rem] leading-[1.25rem]">
              Bạn sẽ có phòng riêng trong một ngôi nhà và được sử dụng những khu
              vực chung.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="">
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
                fill: "currentcolor",
              }}
            >
              <path d="m17.98 1.57.14.14 13.59 13.58-1.42 1.42L29 15.4V28a2 2 0 0 1-1.85 2H5a2 2 0 0 1-2-1.85V15.4l-1.3 1.3-1.4-1.42L13.87 1.71a3 3 0 0 1 4.1-.14zM11 17.93a2 2 0 0 0-1 3.73v2.35A6 6 0 0 0 5.32 28h11.36A6 6 0 0 0 12 24.01v-2.35a2 2 0 0 0-1-3.73zm10 0a2 2 0 0 0-1 3.73v2.35c-.95.16-1.84.55-2.6 1.12.63.84 1.1 1.82 1.37 2.87h7.91A6 6 0 0 0 22 24.01v-2.35a2 2 0 0 0-1-3.73zm-4.94-15.1h-.12a1 1 0 0 0-.55.2l-.1.1L5 13.4v11.23a8.02 8.02 0 0 1 2.96-2.11 4 4 0 1 1 6.08 0A8 8 0 0 1 16 23.68c.6-.47 1.25-.86 1.96-1.15a4 4 0 1 1 6.08 0 8.02 8.02 0 0 1 2.96 2.1V13.43L16.7 3.12a1 1 0 0 0-.64-.29z" />
            </svg>
          </div>
          <div className="">
            <div className="font-medium">Khu vực sinh hoạt chung</div>
            <div className="font-[400] text-[0.875rem] leading-[1.25rem]">
              Bạn sẽ sử dụng chung một số khu vực trong nhà với Chủ nhà và khách
              khác.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="">
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
                fill: "currentcolor",
              }}
            >
              <path d="M7 1a3 3 0 0 0-3 2.82V31h2V4a1 1 0 0 1 .88-1H18a1 1 0 0 1 1 .88V5h-5a1 1 0 0 0-1 .88V9h-3v2h19V9h-2V6a1 1 0 0 0-.88-1H21V4a3 3 0 0 0-2.82-3H7zm13 28a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm5-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM15 7h10v2H15V7z" />
            </svg>
          </div>
          <div className="">
            <div className="font-medium">Phòng vệ sinh chung</div>
            <div className="font-[400] text-[0.875rem] leading-[1.25rem]">
              Bạn sẽ dùng chung phòng vệ sinh với những người khác.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="">
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
                fill: "currentcolor",
              }}
            >
              <path d="M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z" />
            </svg>
          </div>
          <div className="">
            <div className="font-medium">Hủy miễn phí trước 23 thg 11</div>
            <div className="font-[400] text-[0.875rem] leading-[1.25rem]">
              Được hoàn tiền đầy đủ nếu bạn thay đổi kế hoạch.
            </div>
          </div>
        </div>
      </div>
      <div className="py-[32px] border-b">
        <h3 className="text-2xl font-medium pb-[16px]">
          Giới thiệu về chỗ ở này
        </h3>
        <p>{room?.moTa}</p>
      </div>
      <div className="py-[48px] border-b">
        <h3 className="pb-[24px] text-xl font-medium">
          Nơi này có những gì cho bạn
        </h3>
        <div className="block sm:flex justify-start items-stretch flex-wrap">
          {room?.banLa && (
            <div className="px-[8px] w-full sm:w-[50%]">
              <div className="pb-[16px] flex items-center justify-end flex-row-reverse">
                <div className="">Bàn là</div>
                <div className="mr-[16px]">
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
                      fill: "currentcolor",
                    }}
                  >
                    <path d="M12 28a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM16.03 3h.3a12.5 12.5 0 0 1 11.82 9.48l.07.3 1.73 7.79.03.14A2 2 0 0 1 28.15 23H2.1a2 2 0 0 1-1.85-1.84v-7.38a5 5 0 0 1 4.77-4.77L5.25 9h9V5h-14V3zm11.53 16H2.25v2H28zM16.24 5v6H5.07a3 3 0 0 0-2.82 2.82V17H27.1l-.84-3.78-.07-.28a10.5 10.5 0 0 0-9.6-7.92L16.32 5z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {room?.bep && (
            <div className="px-[8px] w-full sm:w-[50%]">
              <div className="pb-[16px] flex items-center justify-end flex-row-reverse">
                <div className="">Bếp</div>
                <div className="mr-[16px]">
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
                      fill: "currentcolor",
                    }}
                  >
                    <path d="M26 1a5 5 0 0 1 5 5c0 6.39-1.6 13.19-4 14.7V31h-2V20.7c-2.36-1.48-3.94-8.07-4-14.36v-.56A5 5 0 0 1 26 1zm-9 0v18.12c2.32.55 4 3 4 5.88 0 3.27-2.18 6-5 6s-5-2.73-5-6c0-2.87 1.68-5.33 4-5.88V1zM2 1h1c4.47 0 6.93 6.37 7 18.5V21H4v10H2zm14 20c-1.6 0-3 1.75-3 4s1.4 4 3 4 3-1.75 3-4-1.4-4-3-4zM4 3.24V19h4l-.02-.96-.03-.95C7.67 9.16 6.24 4.62 4.22 3.36L4.1 3.3zm19 2.58v.49c.05 4.32 1.03 9.13 2 11.39V3.17a3 3 0 0 0-2 2.65zm4-2.65V17.7c.99-2.31 2-7.3 2-11.7a3 3 0 0 0-2-2.83z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {room?.dieuHoa && (
            <div className="px-[8px] w-full sm:w-[50%]">
              <div className="pb-[16px] flex items-center justify-end flex-row-reverse">
                <div className="">Hệ thống điều hòa trung tâm</div>
                <div className="mr-[16px]">
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
                      fill: "currentcolor",
                    }}
                  >
                    <path d="M17 1v4.03l4.03-2.32 1 1.73L17 7.34v6.93l6-3.47V5h2v4.65l3.49-2.02 1 1.74L26 11.38l4.03 2.33-1 1.73-5.03-2.9L18 16l6 3.46 5.03-2.9 1 1.73L26 20.62l3.49 2.01-1 1.74L25 22.35V27h-2v-5.8l-6-3.47v6.93l5.03 2.9-1 1.73L17 26.97V31h-2v-4.03l-4.03 2.32-1-1.73 5.03-2.9v-6.93L9 21.2V27H7v-4.65l-3.49 2.02-1-1.74L6 20.62l-4.03-2.33 1-1.73L8 19.46 14 16l-6-3.46-5.03 2.9-1-1.73L6 11.38 2.51 9.37l1-1.74L7 9.65V5h2v5.8l6 3.47V7.34l-5.03-2.9 1-1.73L15 5.03V1z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {room?.doXe && (
            <div className="px-[8px] w-full sm:w-[50%]">
              <div className="pb-[16px] flex items-center justify-end flex-row-reverse">
                <div className="">Chỗ đỗ xe miễn phí tại nơi ở</div>
                <div className="mr-[16px]">
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
                      fill: "currentcolor",
                    }}
                  >
                    <path d="M26 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm20.7-5 .41 1.12A4.97 4.97 0 0 1 30 18v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2H8v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9c0-1.57.75-2.96 1.89-3.88L4.3 13H2v-2h3v.15L6.82 6.3A2 2 0 0 1 8.69 5h14.62c.83 0 1.58.52 1.87 1.3L27 11.15V11h3v2h-2.3zM6 25H4v2h2v-2zm22 0h-2v2h2v-2zm0-2v-5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5h24zm-3-10h.56L23.3 7H8.69l-2.25 6H25zm-15 7h12v-2H10v2z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {room?.hoBoi && (
            <div className="px-[8px] w-full sm:w-[50%]">
              <div className="pb-[16px] flex items-center justify-end flex-row-reverse">
                <div className="">Hồ bơi riêng trong nhà</div>
                <div className="mr-[16px]">
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
                      fill: "currentcolor",
                    }}
                  >
                    <path d="M24 26c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 28c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 26zm0-5c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 23c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 21zM20 3a4 4 0 0 1 4 3.8V9h4v2h-4v5a4 4 0 0 1 2.5.86l.17.15c.3.27.71.44 1.14.48l.19.01v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 18c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 16c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5a3.96 3.96 0 0 1 2.44-1H16v-5H4V9h12V7a2 2 0 0 0-4-.15V7h-2a4 4 0 0 1 7-2.65A3.98 3.98 0 0 1 20 3zm-2 13.52.46.31.21.18c.35.31.83.49 1.33.49a2 2 0 0 0 1.2-.38l.13-.11c.2-.19.43-.35.67-.49V11h-4zM20 5a2 2 0 0 0-2 1.85V9h4V7a2 2 0 0 0-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {room?.mayGiat && (
            <div className="px-[8px] w-full sm:w-[50%]">
              <div className="pb-[16px] flex items-center justify-end flex-row-reverse">
                <div className="">Máy giặt phí Miễn phí – Trong toà nhà</div>
                <div className="mr-[16px]">
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
                      fill: "currentcolor",
                    }}
                  >
                    <path d="M26.29 2a3 3 0 0 1 2.96 2.58c.5 3.56.75 7.37.75 11.42s-.25 7.86-.75 11.42a3 3 0 0 1-2.79 2.57l-.17.01H5.7a3 3 0 0 1-2.96-2.58C2.25 23.86 2 20.05 2 16s.25-7.86.75-11.42a3 3 0 0 1 2.79-2.57L5.7 2zm0 2H5.72a1 1 0 0 0-1 .86A80.6 80.6 0 0 0 4 16c0 3.96.24 7.67.73 11.14a1 1 0 0 0 .87.85l.11.01h20.57a1 1 0 0 0 1-.86c.48-3.47.72-7.18.72-11.14 0-3.96-.24-7.67-.73-11.14A1 1 0 0 0 26.3 4zM16 7a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm-5.84 7.5c-.34 0-.68.02-1.02.07a7 7 0 0 0 13.1 4.58 9.09 9.09 0 0 1-6.9-2.37l-.23-.23a6.97 6.97 0 0 0-4.95-2.05zM16 9a7 7 0 0 0-6.07 3.5h.23c2.26 0 4.44.84 6.12 2.4l.24.24a6.98 6.98 0 0 0 6.4 1.9A7 7 0 0 0 16 9zM7 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {room?.tivi && (
            <div className="px-[8px] w-full sm:w-[50%]">
              <div className="pb-[16px] flex items-center justify-end flex-row-reverse">
                <div className="">
                  HDTV với Netflix, Amazon Prime Video, Apple TV, Chromecast,
                  Disney+
                </div>
                <div className="mr-[16px]">
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
                      fill: "currentcolor",
                    }}
                  >
                    <path d="M9 29v-2h2v-2H6a5 5 0 0 1-5-4.78V8a5 5 0 0 1 4.78-5H26a5 5 0 0 1 5 4.78V20a5 5 0 0 1-4.78 5H21v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-3 2.82V20a3 3 0 0 0 2.82 3H26a3 3 0 0 0 3-2.82V8a3 3 0 0 0-2.82-3z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {room?.wifi && (
            <div className="px-[8px] w-[50%]">
              <div className="pb-[16px] flex items-center justify-end flex-row-reverse">
                <div className="whitespace-nowrap sm:whitespace-normal">
                  Wifi
                </div>
                <div className="mr-[16px]">
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
                      fill: "currentcolor",
                    }}
                  >
                    <path d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-[24px]">
          <button className="py-[13px] px-[23px] rounded-lg border border-black font-medium hover:bg-gray-100">
            Hiển thị tất cả 91 tiện nghi
          </button>
        </div>
      </div>
      <div className="py-[48px]">
        <h3 className="text-2xl font-medium mb-2">
          {night} đêm tại thành phố {location.tinhThanh}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {formatDateString(startDate, false)} -{" "}
          {formatDateString(endDate, false)}
        </p>
        <DateRangPicker className="custom-calender" />
      </div>
    </div>
  );
};

export default ContentLeft;
