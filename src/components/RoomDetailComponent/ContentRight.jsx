import React, { useEffect, useRef, useState } from "react";
import DateRangPicker from "../DateRangePicker/DateRangPicker";
import { calculateDaysBetween, formatDateString } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
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
const ContentRight = ({ room }) => {
  const { startDate, endDate, guest, childGuest, babyGuest } = useSelector(
    (state) => state.InforBookingSlice
  );
  const dispatch = useDispatch();
  const night = calculateDaysBetween(startDate, endDate);
  const containerRef = useRef();
  const [isFocus, setIsFocused] = useState(null);
  const [isSelectRange, setIsSelectRange] = useState(false);
  const [isSelect, setIsSelect] = useState(true);
  const handleClickPickDay = () => {
    setIsFocused(1);
  };
  const handleClickPickGuest = () => {
    setIsFocused(2);
  };
  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target))
        setIsFocused(null);
    };
    window.addEventListener("mousedown", handleClickOutSide);
    return () => window.removeEventListener("mousedown", handleClickOutSide);
  }, []);
  return (
    <div className="my-[32px]">
      <div className="p-[24px] border rounded-[12px] box-shadow-room">
        <div className="flex flex-col">
          <h3 className="mb-5">
            <span className="text-2xl font-medium">${room?.giaTien} </span>/ đêm
          </h3>
          <div
            ref={containerRef}
            className="mb-[16px] rounded-[8px] border border-gray-400 cursor-pointer"
          >
            <div
              onClick={handleClickPickDay}
              className="relative flex w-[100%] text-black bg-transparent text-left"
            >
              <div className="relative overflow-hidden flex-1">
                <div className="absolute top-[12px] left-[12px] text-[0.625rem] leading-[0.75rem] uppercase font-[700] max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                  Nhận phòng
                </div>
                <div className="min-h-[56px] w-[100%] border-none outline-none px-[12px] pt-[26px] pb-[10px] bg-transparent text-[0.875rem] leading-[1.125rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {isSelectRange
                    ? `${formatDateString(startDate, false)}`
                    : "Thêm ngày"}
                </div>
              </div>
              <div className="relative overflow-hidden flex-1 border-l border-gray-400">
                <div className="absolute top-[12px] left-[12px] text-[0.625rem] leading-[0.75rem] uppercase font-[700] max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                  Trả phòng
                </div>
                <div className="min-h-[56px] w-[100%] border-none outline-none px-[12px] pt-[26px] pb-[10px] bg-transparent text-[0.875rem] leading-[1.125rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  {isSelectRange
                    ? `${formatDateString(endDate, false)}`
                    : "Thêm ngày"}
                </div>
              </div>
              {isFocus === 1 && (
                <div className="absolute top-[-24px] right-[-32px] px-[32px] pt-[24px] pb-[16px] border bg-white sha z-[99] box-shadow-date rounded-2xl w-[661px] min-h-[460px]">
                  <div className="mb-10 flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-medium">{night} đêm</h3>
                      <p className="text-[14px] text-gray-500">
                        {formatDateString(startDate, false)} -{" "}
                        {formatDateString(endDate, false)}
                      </p>
                    </div>
                    <div className="relative flex w-[100%] text-black bg-transparent text-left basis-[315px] border border-gray-400 rounded-lg">
                      <div
                        onClick={() => setIsSelect(true)}
                        className={`relative overflow-hidden flex-1 border-2 ${
                          isSelect ? "border-black" : "border-white"
                        } rounded-lg`}
                      >
                        <div className="absolute top-[12px] left-[12px] text-[0.625rem] leading-[0.75rem] uppercase font-[700] max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                          Nhận phòng
                        </div>
                        <div className="min-h-[56px] w-[100%] border-none outline-none px-[12px] pt-[26px] pb-[10px] bg-transparent text-[0.875rem] leading-[1.125rem] overflow-hidden text-ellipsis whitespace-nowrap">
                          {isSelectRange
                            ? `${formatDateString(startDate, false)}`
                            : "Thêm ngày"}
                        </div>
                      </div>
                      <div
                        onClick={() => setIsSelect(false)}
                        className={`relative overflow-hidden flex-1 border-2 ${
                          isSelect ? "border-white" : "border-black"
                        } rounded-lg`}
                      >
                        <div className="absolute top-[12px] left-[12px] text-[0.625rem] leading-[0.75rem] uppercase font-[700] max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                          Trả phòng
                        </div>
                        <div className="min-h-[56px] w-[100%] border-none outline-none px-[12px] pt-[26px] pb-[10px] bg-transparent text-[0.875rem] leading-[1.125rem] overflow-hidden text-ellipsis whitespace-nowrap">
                          {isSelectRange
                            ? `${formatDateString(endDate, false)}`
                            : "Thêm ngày"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DateRangPicker
                    setIsSelectRange={setIsSelectRange}
                  />
                </div>
              )}
            </div>
            <div
              onClick={handleClickPickGuest}
              className="relative border-t border-gray-400 flex items-center justify-between"
            >
              <div className="">
                <div className="absolute top-[12px] left-[12px] text-[0.625rem] leading-[0.75rem] uppercase font-[700] max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                  Khách
                </div>
                <div className="min-h-[56px] w-[100%] border-none outline-none px-[12px] pt-[26px] pb-[10px] bg-transparent text-[0.875rem] leading-[1.125rem] overflow-hidden text-ellipsis whitespace-nowrap">
                  Thêm khách
                </div>
                {isFocus === 2 && (
                  <div className="absolute  mt-2 min-w-[280px] w-full p-[16px] bg-white border border-gray-200 rounded-xl shadow-lg">
                    <div className="">
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
              <div className="px-[12px]">
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
                  <path fill="none" d="M28 12 16.7 23.3a1 1 0 0 1-1.4 0L4 12" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full">
            <button className="w-full px-[24px] py-[14px] bg-[#E51E54] rounded-lg text-center text-white font-medium">
              Đặt Phòng
            </button>
          </div>
        </div>
        <div className="mt-[16px] text-center">
          <h3 className="text-sm text-gray-500">Bạn vẫn chưa bị trừ tiền</h3>
        </div>
        <div className="pt-[24px]">
          <div className="pb-[24px] border-b flex items-center justify-between text-gray-500">
            <h3 className="underline">${room?.giaTien} x 7 đêm</h3>
            <h3>${room?.giaTien * 7}</h3>
          </div>
          <div className="pt-[24px]  flex items-center justify-between font-medium">
            <h3 className="">Tổng trước thuế</h3>
            <h3>${room?.giaTien * 7}</h3>
          </div>
        </div>
      </div>
      <div className="mt-[24px] p-[24px] rounded-xl border">
        <div className="flex items-start gap-5">
          <div>
            <svg
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                height: 32,
                width: 32,
                fill: "rgb(227, 28, 95)",
                stroke: "currentcolor",
              }}
            >
              <g stroke="none">
                <path
                  d="M24.556 8H9a1 1 0 0 0-.993.883L8 9v15.556a1 1 0 0 0 .206.608l.087.1 17.213 17.213a1 1 0 0 0 1.32.083l.094-.083L42.477 26.92a1 1 0 0 0 .083-1.32l-.083-.094L25.263 8.293a1 1 0 0 0-.575-.284L24.556 8z"
                  fillOpacity=".2"
                />
                <path d="M24.556 4A5 5 0 0 1 27.9 5.282l.192.182 17.213 17.214a5 5 0 0 1 .172 6.89l-.172.18L29.75 45.306a5 5 0 0 1-6.89.172l-.181-.172L5.464 28.092a5 5 0 0 1-1.457-3.271L4 24.556V9a5 5 0 0 1 4.783-4.995L9 4h15.556zm0 2H9a3 3 0 0 0-2.995 2.824L6 9v15.556a3 3 0 0 0 .743 1.977l.136.145L24.092 43.89a3 3 0 0 0 4.099.135l.144-.135L43.89 28.335a3 3 0 0 0 .135-4.1l-.135-.143L26.678 6.879a3 3 0 0 0-1.924-.872L24.556 6zM13 10a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </g>
            </svg>
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-lg">Giá thấp hơn</h3>
            <p className="text-sm text-gray-500">
              Những ngày bạn chọn có giá thấp hơn ₫4.513.727 so với mức giá
              trung bình theo đêm trong 60 ngày qua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRight;