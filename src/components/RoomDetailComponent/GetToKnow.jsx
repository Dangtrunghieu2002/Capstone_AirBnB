import React from "react";

const GetToKnow = () => {
  return (
    <div>
      <h3 className="text-[22px] font-medium pb-[24px]">Những điều cần biết</h3>
      <div className="block md:flex space-y-5 md:space-y-0 justify-start flex-wrap items-stretch">
        <div className="px-[8px] w-full md:w-[33.3333333333%] border-b pb-5 md:border-none md:pb-0">
          <div className="mr-[32px]">
            <div className="mb-[12px] font-medium">Nội quy nhà</div>
            <div className="mb-[12px] text-gray-500">Nhận phòng sau 15:00</div>
            <div className="mb-[12px] text-gray-500">Trả phòng trước 12:00</div>
            <div className="mb-[12px] text-gray-500">Tối đa 14 khách</div>
            <div className="mt-[24px]">
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
                    <path
                      fill="none"
                      d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-[8px] w-full md:w-[33.3333333333%] border-b pb-5 md:border-none md:pb-0">
          <div className="mr-[32px]">
            <div className="mb-[12px] font-medium">An toàn và chỗ ở</div>
            <div className="mb-[12px] text-gray-500">Máy phát hiện khí CO</div>
            <div className="mb-[12px] text-gray-500">Máy báo khói</div>
            <div className="mt-[24px]">
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
                    <path
                      fill="none"
                      d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-[8px] w-full md:w-[33.3333333333%] border-b pb-5 md:border-none md:pb-0">
          <div className="mr-[32px]">
            <div className="mb-[12px] font-medium">Chính sách hủy</div>
            <div className="mb-[12px] text-gray-500">
              Đặt phòng/đặt chỗ này không được hoàn tiền.
            </div>
            <div className="mb-[12px] text-gray-500">
              Xem toàn bộ chính sách của Chủ nhà này để biết chi tiết.
            </div>
            <div className="mt-[24px]">
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
                    <path
                      fill="none"
                      d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetToKnow;
