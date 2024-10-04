import React from "react";

export const ContentLeft = ({ user }) => {
  return (
    <div className="sticky top-0 flex flex-col gap-[32px] justify-center">
      <div className="flex flex-col items-start justify-center gap-[32px] min-w-[395px]">
        <div className="max-w-[340px] min-h-[230px] w-full flex items-center gap-[26px] rounded-[24px] box-shadow-date">
          <div className="flex flex-col gap-3 justify-between items-center flex-grow min-h-full">
            <div className="w-[104px] h-[104px] relative">
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  alt=""
                  className="w-full h-full border rounded-full"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-black text-white text-3xl flex items-center justify-center">
                  {user?.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-[32px] font-bold">{user?.name}</h3>
              <div className="flex items-center gap-[5px]">
                <span className="text-sm font-medium">Khách</span>
              </div>
            </div>
          </div>
          <div className="flex gap-[1px] flex-col w-[96px]">
            <h3 className="text-2xl font-bold">1</h3>
            <p className="text-[10px] font-semibold ">
              Tháng hoạt động trên Airbnb
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-[342px] py-[32px] px-[24px] border rounded-3xl">
        <div>
          <h3 className="text-[1.375rem] font-semibold mb-[24px]">
            Thông tin đã được xác nhận của {user?.name}
          </h3>
          <div className="flex items-center gap-[12px]">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                style={{
                  display: "block",
                  fill: "none",
                  height: 24,
                  width: 24,
                  stroke: "currentColor",
                  strokeWidth: "2.6666666666666665",
                  overflow: "visible",
                }}
                aria-hidden="true"
                role="presentation"
                focusable="false"
              >
                <path fill="none" d="m4 16.5 8 8 16-16" />
              </svg>
            </div>
            <h3>Địa chỉ email</h3>
          </div>
        </div>
        <hr className="my-[40px]" />
        <div>
          <h3 className="text-[1.375rem] font-semibold mb-[24px]">
            Xác minh danh tính của bạn
          </h3>
          <div className="flex items-start flex-col gap-[24px]">
            <p className="text-sm">
              Bạn cần hoàn tất bước này trước khi đặt phòng/đặt chỗ hoặc đón
              tiếp khách trên Airbnb.
            </p>
            <button className="py-[13px] px-[23px] border rounded-lg border-black hover:bg-gray-100 font-medium">
              Xác minh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
