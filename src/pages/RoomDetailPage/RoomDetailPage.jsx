import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { phongService } from "../../service/phong.service";
import ContentLeft from "../../components/RoomDetailComponent/ContentLeft";
import ContentRight from "../../components/RoomDetailComponent/ContentRight";
import RatingLayout from "../../components/RoomDetailComponent/RatingLayout";
import { useDispatch, useSelector } from "react-redux";
import { getLocationApiId } from "../../redux/SliceUser/viTriSlice";
import InforOwner from "../../components/RoomDetailComponent/InforOwner";
import GetToKnow from "../../components/RoomDetailComponent/GetToKnow";

const RoomDetailPage = () => {
  const { location } = useSelector((state) => state.viTriSlice);
  const [searchParam] = useSearchParams();
  const initialMx = 312; // Giá trị ban đầu của mx
  const [mx, setMx] = useState(initialMx); // Giá trị ban đầu của mx
  const [room, setRoom] = useState();
  const dispatch = useDispatch();
  console.log(room);
  const handleResize = () => {
    const newWidth = window.innerWidth;
    const newMx = Math.max(
      0,
      initialMx - Math.floor(((initialMx / 63) * (1924 - newWidth)) / 10)
    ); // Giảm mx
    setMx(newMx);
  };
  useEffect(() => {
    // Thêm sự kiện lắng nghe resize
    window.addEventListener("resize", handleResize);
    handleResize();
    // Cleanup khi component bị gỡ bỏ
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const maPhong = searchParam.get("maPhong");
    phongService
      .layPhongTheoId(maPhong)
      .then((res) => {
        setRoom(res.data.content);
        dispatch(getLocationApiId(res.data.content.maViTri));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParam]);
  return (
    <>
      <div
        style={{
          marginLeft: mx,
          marginRight: mx,
        }}
        className="px-10 xl:px-20"
      >
        <div className="pt-[24px] flex items-center justify-between">
          <h3 className="text-3xl font-medium">{room?.tenPhong}</h3>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
              <div>
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    fill: "none",
                    height: 16,
                    width: 16,
                    stroke: "currentcolor",
                    strokeWidth: 2,
                    overflow: "visible",
                  }}
                >
                  <path
                    d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289"
                    fill="none"
                  />
                </svg>
              </div>
              <p className="underline text-[15px] font-medium">Chia sẻ</p>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
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
                    strokeWidth: 2,
                    overflow: "visible",
                  }}
                >
                  <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
                </svg>
              </div>
              <p className="underline text-[15px] font-medium">Lưu</p>
            </div>
          </div>
        </div>
        <div className="pt-[24px]">
          <div className="">
            <div className="">
              <img
                src={room?.hinhAnh}
                alt=""
                className="rounded-xl w-full h-full object-contain hover:brightness-75"
              />
            </div>
          </div>
        </div>
        <div className="flex border-b items-start">
          <div className="w-[58.333333333333336%]">
            <ContentLeft room={room} />
          </div>
          <div className="w-[33.33333333333333%] ml-[8.333333333333332%] flex-grow sticky top-[100px]">
            <ContentRight room={room} />
          </div>
        </div>
        <div className="py-[48px] border-b">
          <RatingLayout maPhong={searchParam.get("maPhong")} />
        </div>
        <div className="py-[48px] border-b">
          <InforOwner />
        </div>
        <div className="pt-[48px]">
          <GetToKnow />
        </div>
      </div>
      <div className="py-[32px] mt-10 bg-[#F7F7F7] border-t">
        <div
          style={{
            marginLeft: mx,
            marginRight: mx,
          }}
          className="px-10 xl:px-20"
        >
          <div className="flex items-center gap-2">
            <h3 className="text-sm">Airbnb</h3>
            <span>
              <svg
                viewBox="0 0 18 18"
                role="presentation"
                aria-hidden="true"
                focusable="false"
                style={{
                  height: 7,
                  width: 7,
                  display: "block",
                  fill: "currentcolor",
                }}
              >
                <path
                  d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            <h3 className="text-sm">Việt Nam</h3>
            <span>
              <svg
                viewBox="0 0 18 18"
                role="presentation"
                aria-hidden="true"
                focusable="false"
                style={{
                  height: 7,
                  width: 7,
                  display: "block",
                  fill: "currentcolor",
                }}
              >
                <path
                  d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"
                  fillRule="evenodd"
                />
              </svg>
            </span>
            <h3 className="text-sm">{location.tinhThanh}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetailPage;
