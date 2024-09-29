import React, { Component, useState, useEffect } from "react";
import ComponentCard from "../Card/IndexPageCard/ComponentCard";
import Play from "../../assets/datajson/VuiChoi.json";
import SkeletonComponent from "../Skeleton/SkeletionIndexPage/SkeletonComponent";
const Landmark = () => {
  const [loadedCards, setLoadedCards] = useState([]);
  useEffect(() => {
    const loadCards = async () => {
      for (let i = 0; i < Play.length; i++) {
        setLoadedCards((prev) => [...prev, i]); // Thêm card vào danh sách đã tải
        await new Promise((resolve) => setTimeout(resolve, 50)); // Đợi 0.2 giây
      }
    };

    loadCards();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 gap-y-7">
      {Play.map((item, index) => {
        return (
          <div key={index}>
            {loadedCards.includes(index) ? (
              <ComponentCard item={item} />
            ) : (
              <SkeletonComponent />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Landmark;
