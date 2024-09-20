import React from 'react'

const SignatureCard = ({item}) => {
  return (
    <div className="relative">
    <div className="h-[340px] sm:h-[260px] md:h-[350px] lg:h-[258px]">
      <img
        src={item.img}
        className="h-full w-full rounded-xl object-cover"
        alt=""
      />
    </div>
    <div className="mt-3">
      <h3 className="text-[0.9375rem;] font-medium opacity-85 text-ellipsis overflow-hidden whitespace-nowrap">
        {item.desc}
      </h3>
      <p className="text-[15px] font-medium opacity-60">
        Chủ nhà/Người tổ chức: {item.owner}
      </p>
      <h3 className="text-[0.9375rem;] font-medium opacity-85">
        Nhận đặt phòng từ tháng 9
      </h3>
    </div>
    <div className="absolute top-[10px] right-[10px] p-[10px] rounded-full hover:bg-white duration-150 ease-in-out hover:scale-105 bg-gray-300">
      <span>
        <svg
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            fill: "none",
            height: 14,
            width: 14,
            stroke: "currentcolor",
            strokeWidth: "3.42857",
            overflow: "visible",
          }}
        >
          <path
            d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289"
            fill="none"
          />
        </svg>
      </span>
    </div>
  </div>
  )
}

export default SignatureCard