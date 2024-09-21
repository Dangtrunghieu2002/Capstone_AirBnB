import React, { Component } from "react";
import ComponentCard from "../Card/IndexPageCard/ComponentCard";
import KhungCanhTuyetVoi from "../../assets/datajson/KhungCanhTuyetVoi.json";
const Landmark = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 gap-y-7">
      {KhungCanhTuyetVoi.map((item,index) => {
        return <ComponentCard item={item} />
      })}
    </div>
  );
};

export default Landmark;
