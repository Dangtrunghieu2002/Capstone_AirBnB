import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MapboxComponent = ({ locations }) => {
  const [amounts, setAmounts] = useState([]);
  const [positions, setPositions] = useState([]);
  const { location } = useSelector((state) => state.viTriSlice);
  const mapLocation = locations.find((item) => item.name == location.tinhThanh);
  useEffect(() => {
    // Tạo số tiền ngẫu nhiên
    const generatedAmounts = [];
    for (let i = 0; i < 15; i++) {
      const randomAmount =
        Math.floor(Math.random() * (2000000 - 250000 + 1)) + 250000;
      generatedAmounts.push(randomAmount);
    }
    setAmounts(generatedAmounts);

    // Tạo vị trí ngẫu nhiên
    const generatedPositions = generatedAmounts.map(() => {
      const randomX = Math.floor(Math.random() * (350 - 100 + 1)) + 100; // X trong khoảng 100px đến 500px
      const randomY = Math.floor(Math.random() * (600 - 100 + 1)) + 100; // Y trong khoảng 100px đến 500px
      return { x: `${randomX}px`, y: `${randomY}px` };
    });
    setPositions(generatedPositions);
  }, []);

  return (
    <div className="relative">
      <div className="h-screen w-full">
        {mapLocation?.iframe ? (
          mapLocation.iframe
        ) : (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26366.92686312526!2d106.66877353264934!3d10.775489832278177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1726920424336!5m2!1svi!2s"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className=" h-full xl:w-[450px] 2xl:w-[660px]"
          />
        )}
      </div>
      {amounts.map((item, index) => {
        const position = positions[index];
        return (
          <div
            key={index}
            className="absolute"
            style={{ top: position.y, left: position.x }}
          >
            <p className="relative px-3 py-2 box-shadow-header rounded-full border bg-white text-[15px] font-semibold cursor-pointer hover:scale-105 transform transition duration-100 ease-out">
              ₫{item.toLocaleString()}
              {/* Mũi tên nằm bên trong thẻ p */}
              <span
                className="absolute left-1/2 transform -translate-x-1/2 z-[500]"
                style={{
                  bottom: "-5px", // Đặt mũi tên dưới thẻ
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid white", // Màu nền giống với màu của thẻ
                  width: 0,
                  height: 0,
                }}
              />
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MapboxComponent;
