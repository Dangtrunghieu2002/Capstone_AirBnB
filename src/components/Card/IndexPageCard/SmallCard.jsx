import React from "react";
import { Link } from "react-router-dom";
import { path } from "../../../common/path/path";
const SmallCard = ({ hinhAnh, tinhThanh, tenViTri, id }) => {
  return (
    <Link
      to={`${path.listRoomPage}?maViTri=${id}&location=${tenViTri}&province=${tinhThanh}`}
      target="_blank"
      className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-in-out"
    >
      <div className="h-16 w-16">
        <img
          src={hinhAnh}
          alt=""
          className="rounded-lg h-full w-full object-cover"
        />
      </div>
      <div>
        <h2 className="font-medium">{tinhThanh}</h2>
        <h3 className="text-gray-500">{tenViTri}</h3>
      </div>
    </Link>
  );
};

export default SmallCard;
