import React, { useEffect, useState } from "react";
import ContentComponent from "../../components/ListRoomComponent/ContentComponent";
import { useSearchParams } from "react-router-dom";
import { phongService } from "../../service/phong.service";
import MapboxComponent from "../../components/ListRoomComponent/MapboxComponent";
const ListRoomPage = () => {
  const [searchParam] = useSearchParams();
  const [listRoom, setListRoom] = useState([]);
  useEffect(() => {
    const maViTri = searchParam.get("maViTri");
    phongService
      .layPhongTheoViTri(maViTri)
      .then((res) => {
        setListRoom(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParam]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex pl-10 pr-2 2xl:pl-20 justify-between">
      <div className=" xl:w-[62%] w-full">
        <ContentComponent listRoom={listRoom} />
      </div>
      <div className="sticky top-0 h-screen hidden xl:block">
        <MapboxComponent />
      </div>
    </div>
  );
};

export default ListRoomPage;
