import React from "react";

const ComponentCard = ({ item,delay }) => {
  console.log(item);
  return (
    <div
      className={`relative signature-card`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="h-[256px] relative">
        <img
          src={item["HinhAnh-src"]}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute top-[15px] right-[20px] hover:scale-105 transform transition duration-200 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{
              display: "block",
              fill: "rgba(0, 0, 0, 0.5)",
              height: 24,
              width: 24,
              stroke: "#FFFFFF",
              strokeWidth: 2,
              overflow: "visible",
            }}
          >
            <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
          </svg>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-medium w-[75%] text-ellipsis whitespace-nowrap overflow-hidden">
            {item["DiaDiem"]}
          </h3>
          {item["DanhGia"] !== "" && (
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
              <h3 className="text-sm">{item["DanhGia"]}</h3>
            </div>
          )}
        </div>
        <h4 className="text-gray-500 text-[15px]">{item["KhoangCach"]}</h4>
        <h4 className="text-gray-500 text-[15px]">{item["ThoiGian"]}</h4>
        <h3 className="mt-1">
          <span className="font-medium">{item["Gia"]}</span>/ đêm
        </h3>
      </div>
    </div>
  );
};

export default ComponentCard;
