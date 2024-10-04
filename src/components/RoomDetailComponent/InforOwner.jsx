import React from "react";

const InforOwner = () => {
  return (
    <div>
      <div className="mb-[24px]">
        <h2 className="text-[22px] font-medium">Gặp gỡ Chủ nhà</h2>
      </div>
      <div className="flex items-center gap-[64px] w-full">
        <div className="flex flex-col items-start justify-center gap-[32px] min-w-[395px]">
          <div className="max-w-[380px] min-h-[230px] w-full flex items-center gap-[26px] rounded-[24px] box-shadow-date">
            <div className="flex flex-col gap-3 justify-between items-center flex-grow min-h-full">
              <div className="w-[104px] h-[104px] relative">
                <img
                  src="https://a0.muscache.com/im/pictures/user/859ff25c-c4a3-4aad-8570-1443c6545e45.jpg?im_w=240"
                  alt=""
                  className="w-full h-full rounded-full"
                />
                <div className="absolute bottom-[4px] right-[-4px]">
                  <div className="w-[32px] h-[32px] rounded-full bg-[#E31C5D] flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-label="Chủ nhà/Người tổ chức đã được xác minh"
                      role="img"
                      focusable="false"
                      style={{
                        display: "block",
                        height: 16,
                        width: 16,
                        fill: "white",
                      }}
                    >
                      <path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm7 9.08-9.5 9.5-4.5-4.5L6.88 17l6.62 6.62L25.12 12 23 9.88z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-[32px] font-bold">Kateryna</h3>
                <div className="flex items-center gap-[5px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
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
                    <path d="m8.5 7.6 3.1-1.75 1.47-.82a.83.83 0 0 0 .43-.73V1.33a.83.83 0 0 0-.83-.83H3.33a.83.83 0 0 0-.83.83V4.3c0 .3.16.59.43.73l3 1.68 1.57.88c.35.2.65.2 1 0zm-.5.9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                  </svg>
                  <span className="text-sm font-medium">Chủ nhà siêu cấp</span>
                </div>
              </div>
            </div>
            <div className="flex gap-[12px] flex-col w-[96px]">
              <div className="flex flex-col items-start justify-center">
                <span className="whitespace-nowrap text-2xl font-bold">92</span>
                <span className="whitespace-nowrap text-[10px] text-gray-500 font-medium">
                  Đánh giá
                </span>
              </div>
              <hr className="w-full" />
              <div className="flex flex-col items-start justify-center">
                <span className="whitespace-nowrap text-2xl font-bold">
                  4,92
                </span>
                <span className="whitespace-nowrap text-[10px] text-gray-500 font-medium">
                  Xếp hạng
                </span>
              </div>
              <hr className="w-full" />
              <div className="flex flex-col items-start justify-center">
                <span className="whitespace-nowrap text-2xl font-bold">6</span>
                <span className="text-[10px] text-gray-500 font-medium">
                  Năm kinh nghiệm đón tiếp Khách
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div>
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
                  <path d="M26 2a5 5 0 0 1 5 4.78V21a5 5 0 0 1-4.78 5h-6.06L16 31.08 11.84 26H6a5 5 0 0 1-4.98-4.56L1 21.22 1 21V7a5 5 0 0 1 4.78-5H26zm0 2H6a3 3 0 0 0-3 2.82V21a3 3 0 0 0 2.82 3H12.8l3.2 3.92L19.2 24H26a3 3 0 0 0 3-2.82V7a3 3 0 0 0-2.82-3H26zM16 6a8.02 8.02 0 0 1 8 8.03A8 8 0 0 1 16.23 22h-.25A8 8 0 0 1 8 14.24v-.25A8 8 0 0 1 16 6zm1.68 9h-3.37c.11 1.45.43 2.76.79 3.68l.09.22.13.3c.23.45.45.74.62.8H16c.33 0 .85-.94 1.23-2.34l.11-.44c.16-.67.29-1.42.34-2.22zm4.24 0h-2.23c-.1 1.6-.42 3.12-.92 4.32a6 6 0 0 0 3.1-4.07l.05-.25zm-9.61 0h-2.23a6 6 0 0 0 3.14 4.32c-.5-1.2-.82-2.71-.91-4.32zm.92-6.32-.13.07A6 6 0 0 0 10.08 13h2.23c.1-1.61.42-3.12.91-4.32zM16 8h-.05c-.27.08-.64.7-.97 1.65l-.13.4a13.99 13.99 0 0 0-.54 2.95h3.37c-.19-2.66-1.1-4.85-1.63-5H16zm2.78.69.02.05c.48 1.19.8 2.68.9 4.26h2.21A6.02 6.02 0 0 0 19 8.8l-.22-.12z" />
                </svg>
              </div>
              <h3>Nói Tiếng Anh</h3>
            </div>
            <div className="flex items-center gap-3">
              <div>
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
                  <path d="m5.7 1.3 3 3-.66.72a12 12 0 0 0 16.95 16.94l.72-.67 3 3-1.42 1.42-1.67-1.68A13.94 13.94 0 0 1 18 26.96V29h3v2h-8v-2h3v-2.04a13.95 13.95 0 0 1-8.92-4.08 14 14 0 0 1-1.11-18.5L4.29 2.71zm18.18 4.44.21.21.21.22a10 10 0 1 1-.64-.63zm-9.34 11.13-2.45 2.45a8 8 0 0 0 8.04 1.05 16.7 16.7 0 0 1-5.59-3.5zm4.91-4.91-3.5 3.5c2.85 2.54 6.08 3.82 6.7 3.2.63-.61-.66-3.85-3.2-6.7zm-9.81-2.1-.08.19a8 8 0 0 0 1.12 7.86l2.45-2.45a16.68 16.68 0 0 1-3.5-5.6zM23.32 8.1l-2.45 2.44a16.73 16.73 0 0 1 3.5 5.6 8 8 0 0 0-1.05-8.05zm-11.98-.76c-.62.62.66 3.86 3.2 6.7l3.5-3.5c-2.85-2.54-6.07-3.82-6.7-3.2zm2.54-1.7c1.75.59 3.75 1.83 5.58 3.49l2.44-2.45a8.03 8.03 0 0 0-8.02-1.04z" />
                </svg>
              </div>
              <h3>Sống tại Nha Trang, Việt Nam</h3>
            </div>
            <h3 className="flex items-center gap-1 font-medium underline">
              Hiển thị thêm{" "}
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
            </h3>
          </div>
        </div>
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px] text-[16px]">
            <h3 className="text-lg font-medium">
              Kateryna là một Chủ nhà siêu cấp
            </h3>
            Chủ nhà siêu cấp là những người có kinh nghiệm, được đánh giá cao và
            cam kết mang lại kỳ nghỉ tuyệt vời cho khách.
          </div>
          <div className="flex flex-col gap-[16px] text-[16px]">
            <h3 className="text-lg font-medium">Thông tin Chủ nhà</h3>
            <div className="flex flex-col">
              <p>Tỉ lệ phản hồi: 100%</p>
              <p>Phản hồi trong vòng 1 giờ</p>
            </div>
          </div>
          <div>
            <button className="py-3 px-6 text-white bg-black font-medium rounded-lg">
              Nhắn tin cho Chủ nhà
            </button>
          </div>
          <div className="pt-[24px] border-t flex items-center gap-[12px]">
            <div>
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: 24,
                  width: 24,
                  fill: "rgb(227, 28, 95)",
                  stroke: "currentcolor",
                }}
              >
                <g>
                  <g stroke="none">
                    <path
                      d="m25 5 .5846837.00517475c4.2905015.07574932 8.8374917.98334075 13.644943 2.73687823l.7703733.28794702v27.3705076l-.0084766.1301365c-.0392237.2994207-.2122236.5656263-.4699074.7230756l-.1154775.0605995-11.4234694 5.0774159c.0623636-.7458456-.0433445-1.4943022-.3209346-2.2783707-.2495178-.7044496-.7667703-1.7805075-1.0418654-2.3950548-1.9094732-4.1561789-3.9589781-8.3688465-6.0912876-12.5211487l-.3317555-.6369277c-.4686141-.9115826-.8248653-1.6297768-1.3147672-2.2052384-.743401-.8737317-1.7668654-1.3549948-2.8821508-1.3549948-1.1154695 0-2.1391179.4816323-2.8828868 1.3557332-.6050254.7114646-1.0306408 1.6819288-1.6457867 2.8412431-.4956822.9653459-.9868615 1.9338929-1.47282629 2.9041739l.00159179-19.0721502.769087-.28647781c4.798406-1.75037189 9.3373349-2.65799308 13.6207364-2.73688762z"
                      fillOpacity=".2"
                    />
                    <path d="m25 1c5.5985197 0 11.5175072 1.27473768 17.7548231 3.81642897.7027419.28641855 1.1783863.94329535 1.2386823 1.69066764l.0064946.16143432v28.73197667c0 1.8999458-1.0758761 3.6285379-2.7638433 4.4721215l-.2054644.0969363-15.0427818 6.6856808c-.4614217.2050763-1.8621146.3276624-2.7955525.3430957l-.192358.0016581.0009065-1.0005013c.6483674-.0069073 1.2843321-.1330366 1.8784107-.3747752.8327784-.3388673 1.5457548-.8939986 2.0790671-1.5885618l13.2600311-5.8942194c1.023196-.4547538 1.7028179-1.4383245 1.7751735-2.5449525l.0064111-.1964822v-28.73197667l-.6916987-.27704554c-5.7517231-2.26330416-11.1871718-3.39148539-16.3083013-3.39148539-5.1211255 0-10.5565697 1.12817946-16.3082877 3.39148006l-.6917123.27707479-.00030284 24.49382405c-.68067737 1.4079172-1.34834149 2.8151846-2.00083161 4.2173468l.00113445-28.71117085c0-.81311953.4922453-1.5453083 1.24525131-1.85215622 6.23725069-2.54166294 12.15623339-3.81639863 17.75474869-3.81639863z" />
                  </g>
                  <path
                    d="m15.999908 41.6930234.6867258-.8851772c1.5957359-2.0328613 2.5919668-3.8873951 2.9612752-5.511912.2804314-1.2318637.2318527-2.5167089-.4804505-3.5591688-.6801015-.9952012-1.8642067-1.5894421-3.1673665-1.5894421-1.3033438 0-2.487633.5940563-3.1675505 1.5890729-.7099111 1.039137-.761802 2.3201055-.4810025 3.5580612.3689403 1.6247015 1.3653552 3.4796045 2.9616432 5.5133888l.6867258.8851772.6447715.7192179c1.1495113 1.2599236 2.1735278 2.122579 3.2227536 2.7149739.8151649.4602182 1.6400823.7413704 2.4521191.8358878.8812245.1033783 1.7585848-.0123685 2.559765-.3383795 1.6422905-.6682672 2.8186673-2.1775911 3.0700251-3.9387151.1205267-.8438258.0264975-1.6854363-.2876078-2.572644-.2495178-.7044496-.7667703-1.7805075-1.0418654-2.3950548-1.9094732-4.1561789-3.9589781-8.3688465-6.0912876-12.5211487-.6486357-1.2222643-1.0477537-2.1388241-1.6465227-2.8421661-.743401-.8737317-1.7668654-1.3549948-2.8821508-1.3549948-1.1154695 0-2.1391179.4816323-2.8828868 1.3557332-.6050254.7114646-1.0306408 1.6819288-1.6457867 2.8412431-2.1326775 4.1534098-4.1819984 8.3660775-6.09128759 12.5211487-.28227155.6306079-.79308369 1.6933742-1.04168139 2.3948702-.3141053.8872077-.40813448 1.7288182-.28760784 2.5731978.25117384 1.7609394 1.42736664 3.2700787 3.06965711 3.9385305.81939715.3333951 1.69418134.4397272 2.55958102.3385641.81295679-.0948866 1.63805829-.3760388 2.45248709-.8360724 1.0492258-.5922103 2.0732422-1.4550503 3.2227536-2.7149739z"
                    fill="none"
                    strokeWidth={2}
                  />
                </g>
              </svg>
            </div>
            <div>
              <h3 className="text-xs text-gray-500">
                Để bảo vệ khoản thanh toán của bạn, tuyệt đối không chuyển tiền
                hoặc liên lạc bên ngoài trang web hoặc ứng dụng Airbnb.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforOwner;