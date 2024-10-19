import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderCard from "../Card/HeaderCard";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import {
  decreaseBabyGuest,
  decreaseChildGuest,
  decreaseGuest,
  increaseBabyGuest,
  increaseGuest,
  increateChildGuest,
  setEndDateR,
  setStartDateR,
} from "../../redux/SliceUser/InforBookingSlice";
import { formatDateString } from "../../utils/utils";
import { useSpring, animated } from "@react-spring/web";
import { throttle } from "lodash";
import { viTriService } from "../../service/viTri.service";
import useDebounce from "../../hooks/useDebounce";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../common/path/path";
import { removeInforUser } from "../../redux/SliceUser/authSlice";
import { getRoomBooking } from "../../redux/SliceUser/phongDaDatSlice";
const Header = (props) => {
  const dispatch = useDispatch();
  const { guest, childGuest, babyGuest, startDate, endDate } = useSelector(
    (state) => state.InforBookingSlice
  );
  const { count } = useSelector((state) => state.phongDaDatSlice);
  const { inforUser } = useSelector((state) => state.authSlice);
  const [isActive, setIsActive] = useState(true);
  const [isFocused, setIsFocused] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [scrollOverride, setScrollOverride] = useState(false);
  const [responsiveActive, setResponsiveActive] = useState(false);
  const [responsievActiveTime, setResponsivActiveTime] = useState(true);
  const [responsievActiveGuest, setResponsivActiveGuest] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [listViTri, setListViTri] = useState([]);
  const [listIdViTri, setListIdViTri] = useState([]);
  const [searchParam] = useSearchParams();
  const [isHandlingClick, setIsHandlingClick] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [isActiveNavRoom, setIsActiveNavRoom] = useState(false);
  const [isActiveNavPrice, setIsActiveNavPrice] = useState(false);
  const initialMx = searchParam.get("id") ? 232 : 312;
  const devideMx = searchParam.get("id") ? 47 : 63; // Giá trị ban đầu của mx
  const [mx, setMx] = useState(initialMx);
  const [isFocusSignIn, setIsFocusSignIn] = useState(false); // Giá trị ban đầu của mx
  const debouncedValue = useDebounce(inputValue, 0);
  const inputRef = useRef(null);
  const pickerRef = useRef(null);
  const containerRef = useRef(null);
  const signInRef = useRef(null);
  const navigate = useNavigate();
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const marginStyle =
    searchParam.get("maPhong") || searchParam.get("id")
      ? { marginLeft: mx, marginRight: mx }
      : { margin: "0" }; // Giá trị mặc định nếu không có maPhong
  const throttledScrollHandler = useCallback(
    throttle(() => {
      if (!scrollOverride) {
        const scrollPosition = window.scrollY;

        // Kiểm tra điều kiện cuộn
        if (scrollPosition > 105 && !isScrollingDown) {
          setIsScrollingDown(true);
        } else if (scrollPosition <= 105 && isScrollingDown) {
          setIsScrollingDown(false);
        }
      }
    }, 150), // Thay đổi delay nếu cần
    [scrollOverride, isScrollingDown]
  ); // Adjust the throttle delay as needed
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  const handleSelect = (ranges) => {
    setIsSelect(true);
    dispatch(setStartDateR(ranges.selection.startDate));
    dispatch(setEndDateR(ranges.selection.endDate));
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };
  // Hàm xử lý sự kiện focus
  const dataLocation = [
    {
      img: "https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg?im_w=320",
      desc: "Tìm kiếm sự linh h...",
    },
    {
      img: "https://a0.muscache.com/im/pictures/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2.jpg?im_w=320",
      desc: "Châu Âu",
    },
    {
      img: "https://a0.muscache.com/im/pictures/c193e77c-0b2b-4f76-8101-b869348d8fc4.jpg?im_w=320",
      desc: "Hàn Quốc",
    },
    {
      img: "https://a0.muscache.com/im/pictures/4e762891-75a3-4fe1-b73a-cd7e673ba915.jpg?im_w=320",
      desc: "Hoa Kỳ",
    },
    {
      img: "https://a0.muscache.com/im/pictures/924d2b73-6c65-4d04-a2ad-bbc028299658.jpg?im_w=320",
      desc: "Thái Lan",
    },
    {
      img: "https://a0.muscache.com/im/pictures/42a1fb0f-214c-41ec-b9d7-135fbbdb8316.jpg?im_w=320",
      desc: "Úc",
    },
  ];
  if (childGuest > 0 && guest == 0) dispatch(increaseGuest());
  if (babyGuest > 0 && guest == 0) dispatch(increaseGuest());
  const handleFocus = (divID) => {
    setIsFocused(divID);
  };
  const handleFocusInput = () => {
    setIsOpen(true);
  };
  // Hàm xử lý sự kiện blur (khi mất focus)
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsFocused(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler);

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsHandlingClick(false);
        setScrollOverride(false);
        if (window.scrollY > 105) setIsScrollingDown(true);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [throttledScrollHandler]);
  const handleClick = () => {
    setIsHandlingClick(true);
    setIsScrollingDown(false);
    setScrollOverride(true);
    // Reset the override after a delay or based on specific logic // Example: reset after 5 seconds
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định
    // Thực hiện hành động khi nhấn Enter
    // navigate(`${path.listRoomPage}?maViTri=${listIdViTri}`)
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event); // Gọi hàm submit nếu nhấn Enter
    }
  };
  const getDropdownContent = () => {
    if (inputValue === "" && responsiveActive == false) {
      return (
        <div className="p-7 flex flex-col justify-center items-center">
          <h3 className="text-sm font-semibold">Tìm kiếm theo khu vực</h3>
          <div className="mt-5 grid grid-cols-3 gap-1 gap-y-5">
            {dataLocation.map((item, index) => {
              return <HeaderCard img={item.img} desc={item.desc} />;
            })}
          </div>
        </div>
      );
    } else if (inputValue === "" && responsiveActive) {
      return (
        <div className="">
          <div className="p-4 space-y-5">
            <div className="flex items-center gap-4">
              <div className=" p-3 rounded-xl bg-[#DDDDDD]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: 22,
                    width: 22,
                    fill: "currentcolor",
                  }}
                >
                  <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </div>
              <h3>Paris</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className=" p-3 rounded-xl bg-[#DDDDDD]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: 22,
                    width: 22,
                    fill: "currentcolor",
                  }}
                >
                  <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </div>
              <h3>Paris-Charles de Gaulle Airport, Roissy-en-France</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className=" p-3 rounded-xl bg-[#DDDDDD]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: 22,
                    width: 22,
                    fill: "currentcolor",
                  }}
                >
                  <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </div>
              <h3>Eiffel Tower, Paris</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className=" p-3 rounded-xl bg-[#DDDDDD]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: 22,
                    width: 22,
                    fill: "currentcolor",
                  }}
                >
                  <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </div>
              <h3>Paris 13, Paris</h3>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <ul className="p-4">
          {listViTri.length == 0 ? (
            <div className="p-5">Vị trí bạn tìm kiếm không tồn tại</div>
          ) : (
            listViTri.map((item, index) => {
              return (
                <Link
                  to={`${path.listRoomPage}?maViTri=${item.id}&location=${item.tenViTri}`}
                  className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-[#DDDDDD]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{
                        display: "block",
                        height: 22,
                        width: 22,
                        fill: "currentcolor",
                      }}
                    >
                      <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                    </svg>
                  </div>
                  <h3>{item.tenViTri}</h3>
                </Link>
              );
            })
          )}
        </ul>
      );
    }
  };
  const handleBlurPicker = () => {
    if (pickerRef.current && !pickerRef.current.contains(event.relatedTarget)) {
      setIsFocused(null);
    }
  };
  const handleBlur = () => {
    setIsFocused(null);
  };
  const handleBlurSignIn = (event) => {
    if (signInRef.current && !signInRef.current.contains(event.target)) {
      setIsFocusSignIn(false);
    }
  };
  const springProps = useSpring({
    height: isScrollingDown
      ? windowWidth < 1024
        ? "80px"
        : "80px"
      : windowWidth < 1024
      ? "240px"
      : "167px",
    config: {
      tension: 200,
      friction: 20,
      duration: 200,
    }, // Điều chỉnh tension và friction để làm cho hoạt ảnh mượt mà hơn
  });
  const springProps1 = useSpring({
    opacity: isScrollingDown ? 0 : 1,
    transform: isScrollingDown
      ? windowWidth < 1024 ? "scale(0.3990243902439024,0.875) translateY(-145px) translateX(-200px)" : "scale(0.4990243902439024,0.875) translateY(-75px) translateX(-30px)"
      : "scale(1,1) translateY(0px) translateX(0px)",
    visibility: isScrollingDown ? "hidden" : "visible",
    config: { duration: 200 },
  });
  const springProps2 = useSpring({
    transform: isScrollingDown
      ? "scale(1,1) translateY(0px) translateX(0px)"
      : windowWidth < 1024
      ? "scale(2.5, 1.375) translate(80px, 102px)"
      : "scale(2.4390243902439024,1.375) translateY(58px) translateX(-40px)",
    visibility: isScrollingDown ? "visible" : "hidden",
    config: { duration: 200 },
  });
  const springProps3 = useSpring({
    opacity: responsiveActive ? 1 : 0,
    transform: responsiveActive ? " translateY(0px)" : "translateY(-100px)",
    config: { duration: 300 },
  });
  const handleActive = (active = true) => {
    setIsActive(active);
  };
  const showActive = () => {
    return isActive ? (
      <div
        className={`${
          isFocused ? "bg-[#DDDDDD]" : "box-shadow-header"
        } rounded-full border flex items-center justify-between`}
      >
        <div
          tabIndex={0} // Cho phép <div> nhận focus
          onFocus={() => handleFocus(1)}
          onBlur={handleBlur}
          className={`${
            isFocused === 1
              ? "box-shadow-header bg-white"
              : "hover:bg-gray-200 hover-input"
          } w-[250px] py-3 pl-8 hover:rounded-full hover:border-none rounded-full `}
        >
          <h3 className="font-medium text-[0.75rem]">Địa điểm</h3>
          <div className="relative" ref={inputRef}>
            <input
              type="text"
              onFocus={handleFocusInput}
              onChange={handleChange}
              value={inputValue}
              onKeyDown={handleKeyDown}
              placeholder="Tìm kiếm điểm đến"
              className={`${
                isFocused !== 1 && isFocused !== null ? "bg-[#DDDDDD]" : ""
              } text-[0.875rem] font-normal text-[#222222] opacity-70 focus:outline-none w-[140px]`}
            />
            {isOpen && (
              <div className="absolute left-[-30px] top-[40px] mt-2 w-[450px] bg-white border border-gray-200 rounded-3xl shadow-lg z-10">
                {getDropdownContent()}
              </div>
            )}
          </div>
        </div>
        <div className="w-[1px] h-[30px] bg-gray-300"></div>
        <div
          tabIndex={0} // Cho phép <div> nhận focus
          onFocus={() => handleFocus(2)}
          onBlur={handleBlurPicker}
          className={`${
            isFocused === 2
              ? "box-shadow-header bg-white"
              : "hover:bg-gray-200 hover-input"
          } text-left text-[14px] w-[130px] h-[66px] py-3 px-5 hover:rounded-full hover:border-none rounded-full`}
        >
          <h3 className="font-medium text-[0.75rem]">Nhận phòng</h3>
          <div
            className={`text-[0.875rem] font-normal text-[#222222] opacity-70 focus:outline-none w-[80px]`}
          >
            {isSelect ? formatDateString(startDate, false) : "Thêm ngày"}
          </div>
        </div>
        <div className="w-[1px] h-[30px] bg-gray-300"></div>
        <div
          tabIndex={0} // Cho phép <div> nhận focus
          onFocus={() => handleFocus(3)}
          onBlur={handleBlurPicker}
          className={`relative ${
            isFocused === 3
              ? "box-shadow-header bg-white"
              : "hover:bg-gray-200 hover-input"
          } text-left text-[14px] w-[120px] h-[66px] py-3 px-5 hover:rounded-full hover:border-none rounded-full`}
        >
          <h3 className="font-medium text-[0.75rem]">Trả phòng</h3>
          <div
            className={`text-[0.875rem] font-normal text-[#222222] opacity-70 focus:outline-none w-[80px]`}
          >
            {isSelect ? formatDateString(endDate, false) : "Thêm ngày"}
          </div>
          {(isFocused === 2 || isFocused === 3) && (
            <div
              ref={pickerRef}
              className="absolute left-[-350px] lg:left-[-430px] top-[70px] mt-2  w-[650px] lg:w-[850px] bg-white border border-gray-200 rounded-3xl shadow-lg z-10"
            >
              <div className="p-7 flex justify-center items-center">
                <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  rangeColors={["#FD5B61"]}
                  onChange={handleSelect}
                />
              </div>
            </div>
          )}
        </div>
        <div className="w-[1px] h-[30px] bg-gray-300"></div>
        <div
          tabIndex={0} // Cho phép <div> nhận focus
          onFocus={() => handleFocus(4)}
          onBlur={handleBlur}
          className={`relative ${
            isFocused === 4
              ? "box-shadow-header bg-white"
              : "hover:bg-gray-200 hover-input"
          } text-left text-[14px] w-[270px] h-[66px] pl-[20px] pr-[8px] hover:rounded-full hover:border-none rounded-full flex items-center justify-between`}
        >
          <div className="w-[100px]">
            <h3 className="font-medium text-[0.75rem]">Khách</h3>
            <div
              className={`text-[0.875rem] font-normal text-[#222222] opacity-70 w-[100px]`}
            >
              {guest == 0
                ? "Thêm khách"
                : `${guest + childGuest} khách${
                    babyGuest == 0 ? "" : `,${babyGuest} e...`
                  }`}
            </div>
            {isFocused === 4 && (
              <div className="absolute right-[0px] top-[70px] mt-2 w-[450px] bg-white border border-gray-200 rounded-3xl shadow-lg z-10">
                <div className="p-7">
                  <div className="flex items-center justify-between pb-5 border-b">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">Người lớn</h3>
                      <p className="opacity-70">Từ 13 tuổi trở lên</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => {
                          dispatch(decreaseGuest());
                        }}
                        className="rounded-full py-2 px-2 border"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m.75 6.75h10.5v-1.5h-10.5z" />
                        </svg>
                      </div>
                      <p>{guest}</p>
                      <div
                        onClick={() => {
                          dispatch(increaseGuest());
                        }}
                        className="rounded-full py-2 px-2 border"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-5 border-b">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">Trẻ em</h3>
                      <p className="opacity-70">Độ tuổi từ 2-12</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => {
                          dispatch(decreaseChildGuest());
                        }}
                        className="rounded-full py-2 px-2 border"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m.75 6.75h10.5v-1.5h-10.5z" />
                        </svg>
                      </div>
                      <p>{childGuest}</p>
                      <div
                        onClick={() => {
                          dispatch(increateChildGuest());
                        }}
                        className="rounded-full py-2 px-2 border"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-5 border-b">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">Em bé</h3>
                      <p className="opacity-70">Dưới 2 tuổi</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => dispatch(decreaseBabyGuest())}
                        className="rounded-full py-2 px-2 border"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m.75 6.75h10.5v-1.5h-10.5z" />
                        </svg>
                      </div>
                      <p>{babyGuest}</p>
                      <div
                        onClick={() => dispatch(increaseBabyGuest())}
                        className="rounded-full py-2 px-2 border"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="text-left space-y-3 py-5">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">Thú cưng</h3>
                      <p className="opacity-70 font-semibold underline text-[16px]">
                        Bạn sẽ mang theo động vật phục vụ?
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full py-2 px-2 border">
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m.75 6.75h10.5v-1.5h-10.5z" />
                        </svg>
                      </div>
                      <p>0</p>
                      <div className="rounded-full py-2 px-2 border">
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={`transition-all duration-500 ease-in-out ${
              isFocused !== null ? "lg:w-full" : "w-[48px]"
            } p-4 bg-[#FF385C] rounded-full text-white flex items-center gap-5 `}
          >
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
                  height: 16,
                  width: 16,
                  stroke: "currentcolor",
                  strokeWidth: 4,
                  overflow: "visible",
                }}
              >
                <path
                  fill="none"
                  d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                />
              </svg>
            </div>
            <h3
              className={`hidden lg:block font-semibold transition-all duration-500 ease-in-out ${
                isFocused !== null ? "text-[16px]" : "text-[0px]"
              }`}
            >
              Tìm kiếm
            </h3>
          </div>
        </div>
      </div>
    ) : (
      <div
        className={`${
          isFocused ? "bg-[#DDDDDD]" : "box-shadow-header"
        } rounded-full border flex items-center justify-between`}
      >
        <div
          tabIndex={0} // Cho phép <div> nhận focus
          onFocus={() => handleFocus(1)}
          onBlur={handleBlur}
          className={`${
            isFocused === 1
              ? "box-shadow-header bg-white"
              : "hover:bg-gray-200 hover-input"
          } w-[250px] py-3 pl-8 hover:rounded-full hover:border-none rounded-full `}
        >
          <h3 className="font-medium text-[0.75rem]">Địa điểm</h3>
          <div className="relative" ref={inputRef}>
            <input
              type="text"
              onFocus={handleFocusInput}
              onChange={handleChange}
              value={inputValue}
              placeholder="Tìm kiếm điểm đến"
              className={`${
                isFocused !== 1 && isFocused !== null ? "bg-[#DDDDDD]" : ""
              } text-[0.875rem] font-normal text-[#222222] opacity-70 focus:outline-none w-[140px]`}
            />
            {isOpen && (
              <div className="absolute left-[-30px] top-[40px] mt-2 w-[450px] bg-white border border-gray-200 rounded-3xl shadow-lg z-10">
                {getDropdownContent()}
              </div>
            )}
          </div>
        </div>
        <div className="w-[1px] h-[30px] bg-gray-300"></div>
        <div
          tabIndex={0} // Cho phép <div> nhận focus
          onFocus={() => handleFocus(2)}
          onBlur={handleBlurPicker}
          className={`relative ${
            isFocused === 2
              ? "box-shadow-header bg-white"
              : "hover:bg-gray-200 hover-input"
          } text-left text-[14px] w-[276px] h-[66px] py-3 px-5 hover:rounded-full hover:border-none rounded-full`}
        >
          <h3 className="font-medium text-[0.75rem]">Ngày</h3>
          <div
            className={`text-[0.875rem] font-normal text-[#222222] opacity-70 focus:outline-none w-[80px]`}
          >
            Thêm ngày
          </div>
          {isFocused === 2 && (
            <div
              ref={pickerRef}
              className="absolute left-[-350px] lg:left-[-280px] top-[70px] mt-2  w-[650px] lg:w-[850px] bg-white border border-gray-200 rounded-3xl shadow-lg z-10"
            >
              <div className="p-7 flex justify-center items-center">
                <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  rangeColors={["#FD5B61"]}
                  onChange={handleSelect}
                />
              </div>
            </div>
          )}
        </div>
        <div className="w-[1px] h-[30px] bg-gray-300"></div>
        <div
          tabIndex={0} // Cho phép <div> nhận focus
          onFocus={() => handleFocus(4)}
          onBlur={handleBlur}
          className={`relative ${
            isFocused === 4
              ? "box-shadow-header bg-white"
              : "hover:bg-gray-200 hover-input"
          } text-left text-[14px] w-[270px] h-[66px] pl-[20px] pr-[8px] hover:rounded-full hover:border-none rounded-full flex items-center justify-between`}
        >
          <div className="w-[100px]">
            <h3 className="font-medium text-[0.75rem]">Khách</h3>
            <div
              className={`text-[0.875rem] font-normal text-[#222222] opacity-70 w-[100px]`}
            >
              {guest == 0
                ? "Thêm khách"
                : `${guest + childGuest} khách${
                    babyGuest == 0 ? "" : `,${babyGuest} e...`
                  }`}
            </div>
            {isFocused === 4 && (
              <div className="absolute right-[0px] top-[70px] mt-2 w-[450px] bg-white border border-gray-200 rounded-3xl shadow-lg z-10">
                <div className="p-7">
                  <div className="flex items-center justify-between pb-5 border-b">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">Người lớn</h3>
                      <p className="opacity-70">Từ 13 tuổi trở lên</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => {
                          dispatch(decreaseGuest());
                        }}
                        className="rounded-full py-2 px-2 border"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m.75 6.75h10.5v-1.5h-10.5z" />
                        </svg>
                      </div>
                      <p>{guest}</p>
                      <div
                        onClick={() => {
                          dispatch(increaseGuest());
                        }}
                        className="rounded-full py-2 px-2 border"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-5 border-b">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">Trẻ em</h3>
                      <p className="opacity-70">Độ tuổi từ 2-12</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => {
                          dispatch(decreaseChildGuest());
                        }}
                        className="rounded-full py-2 px-2 border"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m.75 6.75h10.5v-1.5h-10.5z" />
                        </svg>
                      </div>
                      <p>{childGuest}</p>
                      <div
                        onClick={() => {
                          dispatch(increateChildGuest());
                        }}
                        className="rounded-full py-2 px-2 border"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-5 border-b">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">Em bé</h3>
                      <p className="opacity-70">Dưới 2 tuổi</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => dispatch(decreaseBabyGuest())}
                        className="rounded-full py-2 px-2 border"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m.75 6.75h10.5v-1.5h-10.5z" />
                        </svg>
                      </div>
                      <p>{babyGuest}</p>
                      <div
                        onClick={() => dispatch(increaseBabyGuest())}
                        className="rounded-full py-2 px-2 border"
                      >
                        <svg
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 15,
                            width: 15,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className={`transition-all duration-500 ease-in-out ${
              isFocused !== null ? "lg:w-full" : "w-[48px]"
            } p-4 bg-[#FF385C] rounded-full text-white flex items-center gap-5 `}
          >
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
                  height: 16,
                  width: 16,
                  stroke: "currentcolor",
                  strokeWidth: 4,
                  overflow: "visible",
                }}
              >
                <path
                  fill="none"
                  d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                />
              </svg>
            </div>
            <h3
              className={`hidden lg:block font-semibold transition-all duration-500 ease-in-out ${
                isFocused !== null ? "text-[16px]" : "text-[0px]"
              }`}
            >
              Tìm kiếm
            </h3>
          </div>
        </div>
      </div>
    );
  };
  const showNavAvatar = () => {
    return inforUser ? (
      <div className="absolute bg-white w-[240px] min-h-[243px] rounded-xl box-shadow-date top-[50px] py-[8px] right-0 cursor-pointer">
        <div className="px-4 py-3 hover:bg-gray-100 text-[14px] font-medium block">
          Tin nhắn
        </div>
        <div className="px-4 py-3 hover:bg-gray-100 text-[14px] font-medium block">
          Chuyến đi
        </div>
        <div className="px-4 py-3 hover:bg-gray-100 text-[14px] font-medium block">
          Danh sách yêu thích
        </div>
        <hr className="my-[7px]" />
        <h3 className="px-4 py-3 hover:bg-gray-100 text-[14px]">
          Cho thuê chỗ ở qua Airbnb
        </h3>
        <h3 className="px-4 py-3 hover:bg-gray-100 text-[14px]">
          Tổ chức trải nghiệm
        </h3>
        <h3 className="px-4 py-3 hover:bg-gray-100 text-[14px]">
          Giới thiệu chủ nhà
        </h3>
        <div className="relative">
          <Link
            target="blank"
            to={`${path.inforUser}?id=${inforUser.user.id}`}
            className="px-4 py-3 hover:bg-gray-100 text-[14px] block"
          >
            Tài khoản
          </Link>
          {count > 0 && (
            <span class="absolute top-[10px] left-[78px] block w-[6px] h-[6px] bg-red-500 rounded-full"></span>
          )}
        </div>
        <hr className="my-[7px]" />
        <h3 className="px-4 py-3 hover:bg-gray-100 text-[14px]">
          Trung tâm trợ giúp
        </h3>
        <h3
          onClick={() => {
            localStorage.removeItem("user");
            dispatch(removeInforUser());
            navigate(path.homePage);
            window.location.reload();
          }}
          className="px-4 py-3 hover:bg-gray-100 text-[14px]"
        >
          Đăng xuất
        </h3>
      </div>
    ) : (
      <div className="absolute bg-white w-[240px] min-h-[243px] rounded-xl box-shadow-date top-[50px] py-[8px] right-0 cursor-pointer">
        <Link
          to={path.signIn}
          className="px-4 py-3 hover:bg-gray-100 text-[14px] font-medium block"
        >
          Đăng nhập
        </Link>
        <Link
          to={path.signUp}
          className="px-4 py-3 hover:bg-gray-100 text-[14px] block"
        >
          Đăng ký
        </Link>
        <hr className="my-[7px]" />
        <h3 className="px-4 py-3 hover:bg-gray-100 text-[14px]">
          Cho thuê chỗ ở qua Airbnb
        </h3>
        <h3 className="px-4 py-3 hover:bg-gray-100 text-[14px]">
          Tổ chức trải nghiệm
        </h3>
        <h3 className="px-4 py-3 hover:bg-gray-100 text-[14px]">
          Trung tâm trợ giúp
        </h3>
      </div>
    );
  };
  if (windowWidth > 768 && responsiveActive) setResponsiveActive(false);
  useEffect(() => {
    viTriService
      .phanTrangTimKiem(inputValue)
      .then((res) => {
        const newListViTri = res.data.content.data;
        setListViTri(newListViTri);

        // Lấy tất cả các ID vào một mảng
        const newListIdViTri = newListViTri.map((item) => item.id);
        setListIdViTri(newListIdViTri);


      })
      .catch((err) => console.log(err));
  }, [debouncedValue]);
  useEffect(() => {
    if (!isHandlingClick) {
      if (searchParam.size) {
        setIsScrollingDown(true);
      }
    }
  });
  useEffect(() => {
    if (!searchParam.size) {
      setIsScrollingDown(false);
    }
  }, [searchParam]);
  useEffect(() => {
    const handleResize1 = () => {
      const newWidth = window.innerWidth;
      const newMx = Math.max(
        0,
        initialMx -
          Math.floor(((initialMx / devideMx) * (1924 - newWidth)) / 10)
      ); // Giảm mx
      setMx(newMx);
    };

    // Thêm sự kiện lắng nghe resize
    window.addEventListener("resize", handleResize1);
    handleResize1(); // Gọi lần đầu để thiết lập giá trị đúng

    // Cleanup khi component bị gỡ bỏ
    return () => {
      window.removeEventListener("resize", handleResize1);
    };
  }, [initialMx]);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollY > 550) {
        setIsActiveNavRoom(true);
      } else {
        setIsActiveNavRoom(false);
      }
      if (scrollY > 1950) {
        setIsActiveNavPrice(true);
      } else setIsActiveNavPrice(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    window.addEventListener("mousedown", handleBlurSignIn);

    return () => window.removeEventListener("mousedown", handleBlurSignIn);
  }, []);
  useEffect(() => {
    dispatch(getRoomBooking(inforUser?.user.id));
  }, []);
  return (
    <>
      {scrollOverride && <div className="overlay"></div>}
      {responsiveActive && (
        <div className="responsiveOverLay px-5 relative">
          <animated.div style={{ ...springProps3 }} className="">
            <div className="mt-10 flex items-center justify-center relative">
              <button
                onClick={() => setResponsiveActive(false)}
                className="absolute top-[-5px] left-0 p-3 rounded-full border bg-white border-gray-400"
              >
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
                    strokeWidth: 4,
                    overflow: "visible",
                  }}
                >
                  <path d="m6 6 20 20M26 6 6 26" />
                </svg>
              </button>
              <div className="flex items-center gap-7 text-lg font-medium">
                <h3 className="border-b-2 border-black pb-1">Chỗ ở</h3>
                <h3 className="pb-1 border-b-2 border-[#F7F7F7]">
                  Trải nghiệm
                </h3>
              </div>
            </div>
            <div className="p-5 box-shadow-header rounded-3xl mt-3 bg-[#FFFFFF]">
              <h3 className="text-2xl font-bold">Bạn sẽ đi đâu?</h3>
              <form onSubmit={handleSubmit} className="mt-5">
                <div className="py-4 px-5 border-gray-400 border rounded-lg w-full flex items-center gap-3 relative">
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
                        height: 16,
                        width: 16,
                        stroke: "currentcolor",
                        strokeWidth: 4,
                        overflow: "visible",
                      }}
                    >
                      <path
                        fill="none"
                        d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    onFocus={handleFocusInput}
                    onChange={handleChange}
                    value={inputValue}
                    name=""
                    id=""
                    placeholder="Tìm kiếm điểm đến"
                    className="focus:outline-none text-[15px] w-full"
                  />
                  {isOpen && (
                    <div className="absolute left-[0px] top-[60px] mt-2 w-full bg-white border border-gray-200 rounded-3xl shadow-lg z-10">
                      {getDropdownContent()}
                    </div>
                  )}
                </div>
              </form>
              <div className="flex items-center gap-5 mt-5 overflow-scroll scrollbar-hide">
                {dataLocation.map((item, index) => {
                  return (
                    <div className="flex-shrink-0">
                      <div className="w-[130px]">
                        <img
                          src={item.img}
                          alt=""
                          className="w-full rounded-xl border object-cover"
                        />
                      </div>
                      <h3 className="text-sm mt-2">{item.desc}</h3>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              onClick={() => {
                setResponsivActiveTime(!responsievActiveTime);
              }}
              className="cursor-pointer p-5 box-shadow-header rounded-2xl mt-3 bg-[#FFFFFF]"
            >
              {responsievActiveTime ? (
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-500 text-[15px]">
                    Thời gian
                  </h3>
                  <h3 className="font-medium text-black text-[15px]">
                    Thêm ngày
                  </h3>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold">
                    Chuyến đi của bạn diễn ra khi nào?
                  </h3>
                  <div className="mt-5">
                    <DateRangePicker
                      ranges={[selectionRange]}
                      minDate={new Date()}
                      rangeColors={["#FD5B61"]}
                      onChange={handleSelect}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="p-5 box-shadow-header rounded-2xl mt-3 bg-[#FFFFFF]">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-500 text-[15px]">Khách</h3>
                <h3 className="font-medium text-black text-[15px]">
                  Thêm khách
                </h3>
              </div>
            </div>
          </animated.div>
          <div className="absolute bottom-0 left-0 w-full py-5 mx-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold underline">Xóa tất cả</h3>
              <button className="text-white py-3 px-7 rounded-lg bg-[#FE375B] flex items-center gap-3">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                      display: "block",
                      height: 16,
                      width: 16,
                      fill: "currentcolor",
                    }}
                  >
                    <path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
                  </svg>
                </div>
                <button className="text-lg font-medium">Tìm kiếm</button>
              </button>
            </div>
          </div>
        </div>
      )}
      <animated.div
        ref={containerRef}
        className={`hidden md:block ${
          searchParam.get("maPhong") && !isActiveNavRoom
            ? "relative"
            : "fixed w-full"
        } top-0 right-0 bottom-0 z-[100] box-shadow-header2 bg-white`}
        style={{ ...springProps }}
      >
        <header className={`h-[80px] pl-10 pr-2 xl:px-20`} style={marginStyle}>
          <div
            className={`${
              isActiveNavRoom && searchParam.get("maPhong") ? "hidden" : "flex"
            } items-center justify-between h-full w-full`}
          >
            <Link to={path.homePage} className="z-[200]">
              <div className="hidden lg:block">
                <svg
                  width={102}
                  height={32}
                  style={{ display: "block" }}
                  className="text-red-500"
                >
                  <path
                    d="M29.3864 22.7101C29.2429 22.3073 29.0752 21.9176 28.9157 21.5565C28.6701 21.0011 28.4129 20.4446 28.1641 19.9067L28.1444 19.864C25.9255 15.0589 23.5439 10.1881 21.0659 5.38701L20.9607 5.18316C20.7079 4.69289 20.4466 4.18596 20.1784 3.68786C19.8604 3.0575 19.4745 2.4636 19.0276 1.91668C18.5245 1.31651 17.8956 0.833822 17.1853 0.502654C16.475 0.171486 15.7005 -9.83959e-05 14.9165 4.23317e-08C14.1325 9.84805e-05 13.3581 0.171877 12.6478 0.503224C11.9376 0.834571 11.3088 1.31742 10.8059 1.91771C10.3595 2.46476 9.97383 3.05853 9.65572 3.68858C9.38521 4.19115 9.12145 4.70278 8.8664 5.19757L8.76872 5.38696C6.29061 10.1884 3.90903 15.0592 1.69015 19.8639L1.65782 19.9338C1.41334 20.463 1.16057 21.0102 0.919073 21.5563C0.75949 21.9171 0.592009 22.3065 0.448355 22.7103C0.0369063 23.8104 -0.094204 24.9953 0.0668098 26.1585C0.237562 27.334 0.713008 28.4447 1.44606 29.3804C2.17911 30.3161 3.14434 31.0444 4.24614 31.4932C5.07835 31.8299 5.96818 32.002 6.86616 32C7.14824 31.9999 7.43008 31.9835 7.71027 31.9509C8.846 31.8062 9.94136 31.4366 10.9321 30.8639C12.2317 30.1338 13.5152 29.0638 14.9173 27.5348C16.3194 29.0638 17.6029 30.1338 18.9025 30.8639C19.8932 31.4367 20.9886 31.8062 22.1243 31.9509C22.4045 31.9835 22.6864 31.9999 22.9685 32C23.8664 32.002 24.7561 31.8299 25.5883 31.4932C26.6901 31.0444 27.6554 30.3161 28.3885 29.3804C29.1216 28.4447 29.5971 27.3341 29.7679 26.1585C29.9287 24.9952 29.7976 23.8103 29.3864 22.7101ZM14.9173 24.377C13.1816 22.1769 12.0678 20.1338 11.677 18.421C11.5169 17.7792 11.4791 17.1131 11.5656 16.4573C11.6339 15.9766 11.8105 15.5176 12.0821 15.1148C12.4163 14.6814 12.8458 14.3304 13.3374 14.0889C13.829 13.8475 14.3696 13.7219 14.9175 13.7219C15.4655 13.722 16.006 13.8476 16.4976 14.0892C16.9892 14.3307 17.4186 14.6817 17.7528 15.1151C18.0244 15.5181 18.201 15.9771 18.2693 16.4579C18.3556 17.114 18.3177 17.7803 18.1573 18.4223C17.7661 20.1349 16.6526 22.1774 14.9173 24.377ZM27.7406 25.8689C27.6212 26.6908 27.2887 27.4674 26.7762 28.1216C26.2636 28.7759 25.5887 29.2852 24.8183 29.599C24.0393 29.9111 23.1939 30.0217 22.3607 29.9205C21.4946 29.8089 20.6599 29.5239 19.9069 29.0824C18.7501 28.4325 17.5791 27.4348 16.2614 25.9712C18.3591 23.3846 19.669 21.0005 20.154 18.877C20.3723 17.984 20.4196 17.0579 20.2935 16.1475C20.1791 15.3632 19.8879 14.615 19.4419 13.9593C18.9194 13.2519 18.2378 12.6768 17.452 12.2805C16.6661 11.8842 15.798 11.6777 14.9175 11.6777C14.0371 11.6777 13.1689 11.8841 12.383 12.2803C11.5971 12.6765 10.9155 13.2515 10.393 13.9589C9.94707 14.6144 9.65591 15.3624 9.5414 16.1465C9.41524 17.0566 9.4623 17.9822 9.68011 18.8749C10.1648 20.9993 11.4748 23.384 13.5732 25.9714C12.2555 27.4348 11.0845 28.4325 9.92769 29.0825C9.17468 29.5239 8.34007 29.809 7.47395 29.9205C6.64065 30.0217 5.79525 29.9111 5.0162 29.599C4.24581 29.2852 3.57092 28.7759 3.05838 28.1217C2.54585 27.4674 2.21345 26.6908 2.09411 25.8689C1.97932 25.0334 2.07701 24.1825 2.37818 23.3946C2.49266 23.0728 2.62663 22.757 2.7926 22.3818C3.0274 21.851 3.27657 21.3115 3.51759 20.7898L3.54996 20.7197C5.75643 15.9419 8.12481 11.0982 10.5894 6.32294L10.6875 6.13283C10.9384 5.64601 11.1979 5.14267 11.4597 4.6563C11.7101 4.15501 12.0132 3.68171 12.3639 3.2444C12.6746 2.86903 13.0646 2.56681 13.5059 2.35934C13.9473 2.15186 14.4291 2.04426 14.9169 2.04422C15.4047 2.04418 15.8866 2.15171 16.3279 2.35911C16.7693 2.56651 17.1593 2.86867 17.4701 3.24399C17.821 3.68097 18.1242 4.15411 18.3744 4.65538C18.6338 5.13742 18.891 5.63623 19.1398 6.11858L19.2452 6.32315C21.7097 11.0979 24.078 15.9415 26.2847 20.7201L26.3046 20.7631C26.5498 21.2936 26.8033 21.8419 27.042 22.382C27.2082 22.7577 27.3424 23.0738 27.4566 23.3944C27.7576 24.1824 27.8553 25.0333 27.7406 25.8689Z"
                    fill="currentcolor"
                  />
                  <path
                    d="M41.6847 24.1196C40.8856 24.1196 40.1505 23.9594 39.4792 23.6391C38.808 23.3188 38.2327 22.8703 37.7212 22.2937C37.2098 21.7172 36.8263 21.0445 36.5386 20.3078C36.2509 19.539 36.123 18.7062 36.123 17.8093C36.123 16.9124 36.2829 16.0475 36.5705 15.2787C36.8582 14.51 37.2737 13.8373 37.7852 13.2287C38.2966 12.6521 38.9039 12.1716 39.6071 11.8513C40.3103 11.531 41.0455 11.3708 41.8765 11.3708C42.6756 11.3708 43.3788 11.531 44.0181 11.8833C44.6574 12.2037 45.1688 12.6841 45.5843 13.2927L45.6802 11.7232H48.6209V23.7992H45.6802L45.5843 22.0375C45.1688 22.6781 44.6254 23.1906 43.9222 23.575C43.2829 23.9274 42.5158 24.1196 41.6847 24.1196ZM42.4519 21.2367C43.0272 21.2367 43.5386 21.0765 44.0181 20.7882C44.4656 20.4679 44.8172 20.0515 45.1049 19.539C45.3606 19.0265 45.4884 18.4179 45.4884 17.7452C45.4884 17.0725 45.3606 16.4639 45.1049 15.9514C44.8492 15.4389 44.4656 15.0225 44.0181 14.7022C43.5706 14.3818 43.0272 14.2537 42.4519 14.2537C41.8765 14.2537 41.3651 14.4139 40.8856 14.7022C40.4382 15.0225 40.0866 15.4389 39.7989 15.9514C39.5432 16.4639 39.4153 17.0725 39.4153 17.7452C39.4153 18.4179 39.5432 19.0265 39.7989 19.539C40.0546 20.0515 40.4382 20.4679 40.8856 20.7882C41.3651 21.0765 41.8765 21.2367 42.4519 21.2367ZM53.6392 8.4559C53.6392 8.80825 53.5753 9.12858 53.4154 9.38483C53.2556 9.64109 53.0319 9.86531 52.7442 10.0255C52.4565 10.1856 52.1369 10.2497 51.8173 10.2497C51.4976 10.2497 51.178 10.1856 50.8903 10.0255C50.6026 9.86531 50.3789 9.64109 50.2191 9.38483C50.0592 9.09654 49.9953 8.80825 49.9953 8.4559C49.9953 8.10355 50.0592 7.78323 50.2191 7.52697C50.3789 7.23868 50.6026 7.04649 50.8903 6.88633C51.178 6.72617 51.4976 6.66211 51.8173 6.66211C52.1369 6.66211 52.4565 6.72617 52.7442 6.88633C53.0319 7.04649 53.2556 7.27072 53.4154 7.52697C53.5433 7.78323 53.6392 8.07152 53.6392 8.4559ZM50.2191 23.7672V11.6911H53.4154V23.7672H50.2191V23.7672ZM61.9498 14.8623V14.8943C61.79 14.8303 61.5982 14.7982 61.4383 14.7662C61.2466 14.7342 61.0867 14.7342 60.895 14.7342C60 14.7342 59.3287 14.9904 58.8812 15.535C58.4018 16.0795 58.178 16.8483 58.178 17.8413V23.7672H54.9817V11.6911H57.9223L58.0182 13.517C58.3379 12.8763 58.7214 12.3958 59.2648 12.0435C59.7762 11.6911 60.3835 11.531 61.0867 11.531C61.3105 11.531 61.5342 11.563 61.726 11.595C61.8219 11.6271 61.8858 11.6271 61.9498 11.6591V14.8623ZM63.2283 23.7672V6.72617H66.4247V13.2287C66.8722 12.6521 67.3836 12.2036 68.0229 11.8513C68.6622 11.531 69.3654 11.3388 70.1645 11.3388C70.9635 11.3388 71.6987 11.4989 72.3699 11.8193C73.0412 12.1396 73.6165 12.588 74.128 13.1646C74.6394 13.7412 75.0229 14.4139 75.3106 15.1506C75.5983 15.9194 75.7261 16.7522 75.7261 17.6491C75.7261 18.546 75.5663 19.4109 75.2787 20.1796C74.991 20.9484 74.5755 21.6211 74.064 22.2297C73.5526 22.8063 72.9453 23.2867 72.2421 23.6071C71.5389 23.9274 70.8037 24.0875 69.9727 24.0875C69.1736 24.0875 68.4704 23.9274 67.8311 23.575C67.1918 23.2547 66.6804 22.7742 66.2649 22.1656L66.169 23.7352L63.2283 23.7672ZM69.3973 21.2367C69.9727 21.2367 70.4841 21.0765 70.9635 20.7882C71.411 20.4679 71.7626 20.0515 72.0503 19.539C72.306 19.0265 72.4339 18.4179 72.4339 17.7452C72.4339 17.0725 72.306 16.4639 72.0503 15.9514C71.7626 15.4389 71.411 15.0225 70.9635 14.7022C70.5161 14.3818 69.9727 14.2537 69.3973 14.2537C68.822 14.2537 68.3106 14.4139 67.8311 14.7022C67.3836 15.0225 67.032 15.4389 66.7443 15.9514C66.4886 16.4639 66.3608 17.0725 66.3608 17.7452C66.3608 18.4179 66.4886 19.0265 66.7443 19.539C67 20.0515 67.3836 20.4679 67.8311 20.7882C68.3106 21.0765 68.822 21.2367 69.3973 21.2367ZM76.9408 23.7672V11.6911H79.8814L79.9773 13.2607C80.3289 12.6841 80.8084 12.2357 81.4157 11.8833C82.023 11.531 82.7262 11.3708 83.5253 11.3708C84.4203 11.3708 85.1874 11.595 85.8267 12.0115C86.4979 12.4279 87.0094 13.0365 87.361 13.8053C87.7126 14.574 87.9043 15.5029 87.9043 16.56V23.7992H84.708V16.9764C84.708 16.1436 84.5162 15.4709 84.1326 14.9904C83.7491 14.51 83.2376 14.2537 82.5664 14.2537C82.0869 14.2537 81.6714 14.3498 81.2878 14.574C80.9362 14.7982 80.6486 15.0865 80.4248 15.503C80.2011 15.8873 80.1052 16.3678 80.1052 16.8483V23.7672H76.9408V23.7672ZM89.5025 23.7672V6.72617H92.6989V13.2287C93.1464 12.6521 93.6578 12.2036 94.2971 11.8513C94.9364 11.531 95.6396 11.3388 96.4387 11.3388C97.2378 11.3388 97.9729 11.4989 98.6442 11.8193C99.3154 12.1396 99.8907 12.588 100.402 13.1646C100.914 13.7412 101.297 14.4139 101.585 15.1506C101.873 15.9194 102 16.7522 102 17.6491C102 18.546 101.841 19.4109 101.553 20.1796C101.265 20.9484 100.85 21.6211 100.338 22.2297C99.8268 22.8063 99.2195 23.2867 98.5163 23.6071C97.8131 23.9274 97.0779 24.0875 96.2469 24.0875C95.4478 24.0875 94.7446 23.9274 94.1053 23.575C93.466 23.2547 92.9546 22.7742 92.5391 22.1656L92.4432 23.7352L89.5025 23.7672ZM95.7035 21.2367C96.2788 21.2367 96.7903 21.0765 97.2697 20.7882C97.7172 20.4679 98.0688 20.0515 98.3565 19.539C98.6122 19.0265 98.7401 18.4179 98.7401 17.7452C98.7401 17.0725 98.6122 16.4639 98.3565 15.9514C98.1008 15.4389 97.7172 15.0225 97.2697 14.7022C96.8222 14.3818 96.2788 14.2537 95.7035 14.2537C95.1281 14.2537 94.6167 14.4139 94.1373 14.7022C93.6898 15.0225 93.3382 15.4389 93.0505 15.9514C92.7628 16.4639 92.6669 17.0725 92.6669 17.7452C92.6669 18.4179 92.7948 19.0265 93.0505 19.539C93.3062 20.0515 93.6898 20.4679 94.1373 20.7882C94.6167 21.0765 95.0962 21.2367 95.7035 21.2367Z"
                    fill="currentcolor"
                  />
                </svg>
              </div>
              <div className="block lg:hidden">
                <svg
                  width={30}
                  height={32}
                  style={{ display: "block" }}
                  className="text-red-500"
                >
                  <path
                    d="M29.3864 22.7101C29.2429 22.3073 29.0752 21.9176 28.9157 21.5565C28.6701 21.0011 28.4129 20.4446 28.1641 19.9067L28.1444 19.864C25.9255 15.0589 23.5439 10.1881 21.0659 5.38701L20.9607 5.18316C20.7079 4.69289 20.4466 4.18596 20.1784 3.68786C19.8604 3.0575 19.4745 2.4636 19.0276 1.91668C18.5245 1.31651 17.8956 0.833822 17.1853 0.502654C16.475 0.171486 15.7005 -9.83959e-05 14.9165 4.23317e-08C14.1325 9.84805e-05 13.3581 0.171877 12.6478 0.503224C11.9376 0.834571 11.3088 1.31742 10.8059 1.91771C10.3595 2.46476 9.97383 3.05853 9.65572 3.68858C9.38521 4.19115 9.12145 4.70278 8.8664 5.19757L8.76872 5.38696C6.29061 10.1884 3.90903 15.0592 1.69015 19.8639L1.65782 19.9338C1.41334 20.463 1.16057 21.0102 0.919073 21.5563C0.75949 21.9171 0.592009 22.3065 0.448355 22.7103C0.0369063 23.8104 -0.094204 24.9953 0.0668098 26.1585C0.237562 27.334 0.713008 28.4447 1.44606 29.3804C2.17911 30.3161 3.14434 31.0444 4.24614 31.4932C5.07835 31.8299 5.96818 32.002 6.86616 32C7.14824 31.9999 7.43008 31.9835 7.71027 31.9509C8.846 31.8062 9.94136 31.4366 10.9321 30.8639C12.2317 30.1338 13.5152 29.0638 14.9173 27.5348C16.3194 29.0638 17.6029 30.1338 18.9025 30.8639C19.8932 31.4367 20.9886 31.8062 22.1243 31.9509C22.4045 31.9835 22.6864 31.9999 22.9685 32C23.8664 32.002 24.7561 31.8299 25.5883 31.4932C26.6901 31.0444 27.6554 30.3161 28.3885 29.3804C29.1216 28.4447 29.5971 27.3341 29.7679 26.1585C29.9287 24.9952 29.7976 23.8103 29.3864 22.7101ZM14.9173 24.377C13.1816 22.1769 12.0678 20.1338 11.677 18.421C11.5169 17.7792 11.4791 17.1131 11.5656 16.4573C11.6339 15.9766 11.8105 15.5176 12.0821 15.1148C12.4163 14.6814 12.8458 14.3304 13.3374 14.0889C13.829 13.8475 14.3696 13.7219 14.9175 13.7219C15.4655 13.722 16.006 13.8476 16.4976 14.0892C16.9892 14.3307 17.4186 14.6817 17.7528 15.1151C18.0244 15.5181 18.201 15.9771 18.2693 16.4579C18.3556 17.114 18.3177 17.7803 18.1573 18.4223C17.7661 20.1349 16.6526 22.1774 14.9173 24.377ZM27.7406 25.8689C27.6212 26.6908 27.2887 27.4674 26.7762 28.1216C26.2636 28.7759 25.5887 29.2852 24.8183 29.599C24.0393 29.9111 23.1939 30.0217 22.3607 29.9205C21.4946 29.8089 20.6599 29.5239 19.9069 29.0824C18.7501 28.4325 17.5791 27.4348 16.2614 25.9712C18.3591 23.3846 19.669 21.0005 20.154 18.877C20.3723 17.984 20.4196 17.0579 20.2935 16.1475C20.1791 15.3632 19.8879 14.615 19.4419 13.9593C18.9194 13.2519 18.2378 12.6768 17.452 12.2805C16.6661 11.8842 15.798 11.6777 14.9175 11.6777C14.0371 11.6777 13.1689 11.8841 12.383 12.2803C11.5971 12.6765 10.9155 13.2515 10.393 13.9589C9.94707 14.6144 9.65591 15.3624 9.5414 16.1465C9.41524 17.0566 9.4623 17.9822 9.68011 18.8749C10.1648 20.9993 11.4748 23.384 13.5732 25.9714C12.2555 27.4348 11.0845 28.4325 9.92769 29.0825C9.17468 29.5239 8.34007 29.809 7.47395 29.9205C6.64065 30.0217 5.79525 29.9111 5.0162 29.599C4.24581 29.2852 3.57092 28.7759 3.05838 28.1217C2.54585 27.4674 2.21345 26.6908 2.09411 25.8689C1.97932 25.0334 2.07701 24.1825 2.37818 23.3946C2.49266 23.0728 2.62663 22.757 2.7926 22.3818C3.0274 21.851 3.27657 21.3115 3.51759 20.7898L3.54996 20.7197C5.75643 15.9419 8.12481 11.0982 10.5894 6.32294L10.6875 6.13283C10.9384 5.64601 11.1979 5.14267 11.4597 4.6563C11.7101 4.15501 12.0132 3.68171 12.3639 3.2444C12.6746 2.86903 13.0646 2.56681 13.5059 2.35934C13.9473 2.15186 14.4291 2.04426 14.9169 2.04422C15.4047 2.04418 15.8866 2.15171 16.3279 2.35911C16.7693 2.56651 17.1593 2.86867 17.4701 3.24399C17.821 3.68097 18.1242 4.15411 18.3744 4.65538C18.6338 5.13742 18.891 5.63623 19.1398 6.11858L19.2452 6.32315C21.7097 11.0979 24.078 15.9415 26.2847 20.7201L26.3046 20.7631C26.5498 21.2936 26.8033 21.8419 27.042 22.382C27.2082 22.7577 27.3424 23.0738 27.4566 23.3944C27.7576 24.1824 27.8553 25.0333 27.7406 25.8689Z"
                    fill="currentcolor"
                  />
                </svg>
              </div>
            </Link>
            <div
              className={`${
                searchParam.get("id") ? "hidden" : "block"
              } pl-[20px]`}
            >
              <animated.div
                style={{ ...springProps2 }}
                className={`1 w-[90%] lg:w-full ${
                  isScrollingDown ? "hidden-opacity" : ""
                } small-div`}
              >
                <div
                  onClick={handleClick}
                  className="cursor-pointer py-[6px] pl-6 pr-2 rounded-full xl:translate-x-[100px] border flex items-center gap-3 lg:gap-5 flex-1 box-shadow-header w-[90%] lg:w-full"
                >
                  <div className="text-[14px] w-[30%] font-medium">
                    <h3 className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {searchParam.get("location")
                        ? `${searchParam.get("location")}`
                        : `Địa điểm bất kỳ`}
                    </h3>
                  </div>
                  <div className="w-[1px] h-[25px] bg-gray-300"></div>
                  <h3 className="text-[14px] w-[60%] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                    {isSelect
                      ? `${formatDateString(
                          startDate,
                          false
                        )} - ${formatDateString(endDate, false)}`
                      : "Tuần bất kỳ"}
                  </h3>
                  <div className="w-[1px] h-[25px] bg-gray-300"></div>
                  <div className="flex items-center gap-3 w-[40%]">
                    <p className="text-[14px] opacity-70 overflow-hidden text-ellipsis whitespace-nowrap">
                      {guest == 0
                        ? "Thêm khách"
                        : `${guest + childGuest} khách${
                            babyGuest == 0 ? "" : ``
                          }`}
                    </p>
                    <div className="p-3 bg-red-500 rounded-full text-white">
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
                        <path
                          fill="none"
                          d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </animated.div>
              <animated.div
                style={{ ...springProps1 }}
                className={`2 ${
                  isScrollingDown ? "h-[80px]" : "h-full"
                } absolute w-full top-[60px] px-10 lg:px-0 lg:top-0 left-0 pb-5`}
              >
                <form className="max-w-[850px] mx-auto">
                  <div className="flex text-[17px] font-medium justify-center h-[80px] items-center">
                    <h3
                      className={`py-2 px-4 ${
                        isActive
                          ? ``
                          : `opacity-45 hover:bg-gray-200 rounded-full`
                      }`}
                      onClick={() => handleActive()}
                    >
                      Chỗ ở
                    </h3>
                    <h3
                      className={`py-2 px-4 ${
                        isActive
                          ? `opacity-45 hover:bg-gray-200 rounded-full`
                          : ``
                      }`}
                      onClick={() => handleActive(false)}
                    >
                      Trải nghiệm
                    </h3>
                  </div>
                  <div>{showActive()}</div>
                </form>
              </animated.div>
            </div>
            <div className="flex items-center gap-4 lg:gap-5 flex-shrink-0 translate-x-[-40px] lg:translate-x-0">
              <h3 className="font-medium text-[14px]">
                Cho thuê chỗ ở qua Airbnb
              </h3>
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    height: 16,
                    width: 16,
                    fill: "currentcolor",
                  }}
                >
                  <path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.78-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.16-4.7l-.03-.38zm1.2-6.58-.12.05a6.26 6.26 0 0 0-3.83 5.03h2.75c.09-1.83.48-3.54 1.06-4.81zm2.25-.42c-.7 0-1.78 2.51-1.94 5.5h3.9c-.15-2.9-1.18-5.34-1.89-5.5h-.07zm2.28.43.03.05a12.95 12.95 0 0 1 1.15 5.02h2.75a6.28 6.28 0 0 0-3.93-5.07z" />
                </svg>
              </div>
              <div
                ref={signInRef}
                tabIndex={0}
                onBlur={handleBlurSignIn}
                onClick={() => {
                  setIsFocusSignIn(true);
                }}
                className={`sign_in relative py-[6px] pl-3 pr-2 rounded-full flex gap-4 items-center border ${
                  isFocusSignIn ? "box-shadow-signin" : ""
                }`}
              >
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
                      height: 16,
                      width: 16,
                      stroke: "currentcolor",
                      strokeWidth: 3,
                      overflow: "visible",
                    }}
                  >
                    <g fill="none">
                      <path d="M2 16h28M2 24h28M2 8h28" />
                    </g>
                  </svg>
                </div>
                {inforUser ? (
                  inforUser.user.avatar ? (
                    <img
                      src={inforUser.user.avatar}
                      alt=""
                      className="w-[36px] h-[36px] border rounded-full"
                    />
                  ) : (
                    <div
                      className="p-4 rounded-full bg-black text-white flex items-center justify-center"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <h3 className="text-sm">
                        {inforUser.user.name.charAt(0)}
                      </h3>
                    </div>
                  )
                ) : (
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      style={{
                        display: "block",
                        fill: "currentcolor",
                      }}
                      className="size-8 text-gray-500"
                    >
                      <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z" />
                    </svg>
                  </div>
                )}
                {isFocusSignIn && showNavAvatar()}
                {count > 0 && (
                  <div className="absolute w-[17px] h-[17px] rounded-full bg-[#E00B41] box-shadow-noti top-[0px] border border-white right-[7px] text-white text-[9px] leading-4 text-center">
                    {count}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={`${
              isActiveNavRoom && searchParam.get("maPhong") ? "flex" : "hidden"
            } items-center justify-between  h-full w-full`}
          >
            <div className="flex items-center gap-6">
              <div className="text-sm font-medium py-[28px] border-b-4 border-white hover:border-black transform transition duration-200 ease-out">
                <h3>Ảnh</h3>
              </div>
              <div className="text-sm font-medium py-[28px] border-b-4 border-white hover:border-black transform transition duration-200 ease-out">
                <h3>Tiện nghi</h3>
              </div>
              <div className="text-sm font-medium py-[28px] border-b-4 border-white hover:border-black transform transition duration-200 ease-out">
                <h3>Đánh giá</h3>
              </div>
              <div className="text-sm font-medium py-[28px] border-b-4 border-white hover:border-black transform transition duration-200 ease-out">
                <h3>Vị trí</h3>
              </div>
            </div>
            {isActiveNavPrice && (
              <div className="flex items-center gap-5">
                <div className="">
                  <h3 className="text-sm">
                    <span className="font-medium text-lg">$10</span> / đêm
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
                    <span className="text-sm font-medium">4,87 · </span>
                    <span className="text-sm text-gray-500">157 đánh giá</span>
                  </div>
                </div>
                <div>
                  <button className="px-[34px] py-[12px] rounded-lg text-white font-medium bg-[#E41D55]">
                    Đặt phòng
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>
      </animated.div>
      <div className="md:hidden fixed px-7  w-[100%] mx-0 z-[10] bg-white h-[80px]  py-5">
        <div
          onClick={() => setResponsiveActive(true)}
          className="py-2 px-5 rounded-full box-shadow-header"
        >
          <div className="flex items-center gap-5">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: 20,
                  width: 20,
                  fill: "currentcolor",
                }}
              >
                <path d="M13 0a13 13 0 0 1 10.5 20.67l7.91 7.92-2.82 2.82-7.92-7.91A12.94 12.94 0 0 1 13 26a13 13 0 1 1 0-26zm0 4a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
              </svg>
            </div>
            <div className="space-y-[-3px]">
              <h3 className="text-[15px] font-medium">Bạn sẽ đi đâu?</h3>
              <div className="flex items-center gap-1 text-[12px] text-gray-500">
                <h3>Địa điểm bất kỳ</h3>
                <span>•</span>
                <h3>tuần bất kỳ</h3>
                <span>•</span>
                <h3>Thêm khách</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
