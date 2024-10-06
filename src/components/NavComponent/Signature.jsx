import React, { useState, useEffect, Suspense } from "react";
import SignatureCard from "../Card/IndexPageCard/SignatureCard";
import SkeletonComponent from "../Skeleton/SkeletionIndexPage/SkeletonComponent";

const Signature = () => {
  const data = [
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4OTQ5ODA0MDcwMTE4Mw%3D%3D/original/4f7a276e-9995-4b32-bda6-300de0619b25.png?im_w=1440&im_q=highq",
      desc: "Ở trong ngôi nhà Purple Rain của Prince",
      owner: "Wendy và Lisa",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjMyMzc5Mzc2MTc3OTEzMg%3D%3D/original/01819c16-43a1-4aee-9957-9edce6eb8e16.png?im_w=1440&im_q=highq",
      desc: "Thư giãn tại phòng khách cùng Doja",
      owner: "Doja Cat",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE3NzY2MTYzNDg4MjE2ODY1Nw%3D%3D/original/a332d020-4315-4f63-af71-444d46474939.png?im_w=1440&im_q=highq",
      desc: "Tiệc ngủ ở Nhà búp bê Polly Pocket",
      owner: "Polly Pocket",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE4NzE3Nzg1NDA2MjM5NzY2NQ%3D%3D/original/6989d581-3f67-4cd9-8cb6-5f5c226aedc6.png?im_w=1440&im_q=highq",
      desc: "Buổi hẹn chơi chung ở Nhà búp bê Polly Pocket",
      owner: "Polly Pocket",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4NzY0ODgzNzUzNjQzNw%3D%3D/original/1077cfcd-29d5-42b7-adab-19e0b620e492.jpeg?im_w=1440&im_q=highq",
      desc: "Thăng hạng VIP cùng Kevin Hart",
      owner: "Kevin Hart",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjIzMTk3NDU3MjE4Nzg2NA%3D%3D/original/f4cbe542-3ce0-4c6f-a8f1-d2120c1b2420.jpeg?im_w=1440&im_q=highq",
      desc: "Huấn luyện tại dinh thự X-Mansion",
      owner: "Jubilee",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4NjI3OTI1MjIxNDQyOA%3D%3D/original/bc989f2d-eca8-4bcf-a9b0-b70b8e685a64.jpeg?im_w=1440&im_q=highq",
      desc: "Sống như ngôi sao Bollywood Janhvi Kapoor",
      owner: "Janhvi Kapoor",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE2MjI1MjI0NDQ0MzYzMjM4Mg%3D%3D/original/ae3426d1-fba4-44d4-bed2-690426f25f7a.jpeg?im_w=1440&im_q=highq",
      desc: "Đón xem khai mạc Olympic tại Bảo tàng Orsay",
      owner: "Mathieu Lehanneur",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNTQ0NTEyMzEwMTI3NDg1MQ%3D%3D/original/bd73f0f8-9057-4bbc-ad70-1db13eb5c03f.png?im_w=1440&im_q=highq",
      desc: "Thức dậy trong Bảo tàng d’Orsay",
      owner: "Mathieu Lehanneur",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA4MzUyMzk5Mjc3MDU5Nw%3D%3D/original/ced15ffe-0ab5-48cf-a189-dbdeaaf04387.jpeg?im_w=1440&im_q=highq",
      desc: "Tạo nên những ký ức khó quên với Những mảnh ghép cảm xúc 2",
      owner: "Joy",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTE0ODQ2MDI1NTE4MDMzOTQ4MQ%3D%3D/original/c92634d0-4964-439a-905d-b9129af14d34.jpeg?im_w=1440&im_q=highq",
      desc: "Tự thiết kế bộ Supersuit Gia đình siêu nhân cho mình",
      owner: "Edna Mode",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjI0NzUwMDUwMTg2Mzg5MA%3D%3D/original/99417998-fa44-4c75-ae77-287c1468977b.jpeg?im_w=1440&im_q=highq",
      desc: "Lưu diễn cùng Feid",
      owner: "Feid",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTA3NzgxMzcwNzcxOTUzNQ%3D%3D/original/872f434b-9348-4ff1-8c6f-754fdbab4010.jpeg?im_w=1440&im_q=highq",
      desc: "Chơi game cùng Khaby Lame",
      owner: "Khaby Lame",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEzMTg2NzMzNDc0MDk1Nzg4NA%3D%3D/original/b676fc8d-8250-4df0-a7cb-728b0486e371.jpeg?im_w=1440&im_q=highq",
      desc: "Nghỉ đêm tại dinh thự X-Mansion",
      owner: "Jubilee",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyMzIwMTE1Njc3Njg0MTIzOQ%3D%3D/original/fb9dcb8d-7fa5-402f-91ae-fa2a26e9f097.png?im_w=1440&im_q=highq",
      desc: "Nghỉ đêm tại Bảo tàng Ferrari",
      owner: "Marc Gené",
    },
    {
      img: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjE4NTg5MzIzNjI0NjI2MA%3D%3D/original/e6b26733-2c15-47d9-b097-6968b39bb697.jpeg?im_w=1440&im_q=highq",
      desc: "Trôi nổi trong ngôi nhà của bộ phim Vút bay (Up)",
      owner: "Carl Fredricksen",
    },
    {
      img: "https://a0.muscache.com/im/pictures/miso/Hosting-881808599061267756/original/b16970cf-1d55-4edd-bb1f-e1735d0a228e.jpeg?im_w=1440&im_q=highq",
      desc: "Đầm lầy của Shrek",
      owner: "Donkey",
    },
    {
      img: "https://a0.muscache.com/im/pictures/miso/Hosting-857387972692815761/original/d106e0ef-f825-4ff8-baf7-86256a54fbd5.jpeg?im_w=1440&im_q=highq",
      desc: "Malibu DreamHouse của Barbie theo phong cách của Ken",
      owner: "Ken",
    },
    {
      img: "https://a0.muscache.com/im/pictures/miso/Hosting-694055224756906854/original/76f85a0c-b3e2-4f1d-9aa9-d7838f2393c6.jpeg?im_w=1440&im_q=highq",
      desc: "Quán rượu yêu thích của Ted Lasso",
      owner: "Mae",
    },
    {
      img: "https://a0.muscache.com/im/pictures/miso/Hosting-782615921189136934/original/c67f78f1-5807-449a-9a88-753b7fa62d6a.jpeg?im_w=1440&im_q=highq",
      desc: "Chốn nghỉ ngơi mang âm hưởng Houseplant",
      owner: "Seth Rogen",
    },
    {
      img: "https://a0.muscache.com/im/pictures/miso/Hosting-53274539/original/365299e3-f926-47ee-bcbf-606d6a0370b9.jpeg?im_w=1440&im_q=highq",
      desc: `Nghỉ lễ theo phong cách "Ở nhà một mình"`,
      owner: "Buzz",
    },
    {
      img: "https://a0.muscache.com/im/pictures/be0957a9-da56-47d6-89ca-223b6e75321a.jpg?im_w=1440&im_q=highq",
      desc: `The Last Blockbuster`,
      owner: "Sandi",
    },
  ];
  const [loadedCards, setLoadedCards] = useState([]);
  useEffect(() => {
    const loadCards = async () => {
      for (let i = 0; i < data.length; i++) {
        setLoadedCards((prev) => [...prev, i]); // Thêm card vào danh sách đã tải
        await new Promise((resolve) => setTimeout(resolve, 70)); // Đợi 0.2 giây
      }
    };

    loadCards();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
        {data.slice(0, 6).map((item, index) => (
          <div key={index}>
            {loadedCards.includes(index) ? (
              <SignatureCard item={item} />
            ) : (
              <SkeletonComponent />
            )}
          </div>
        ))}
      </div>
      <div className="mt-10 space-y-5">
        <h3 className="text-[32px] font-medium">Trải nghiệm đã qua</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 gap-y-10">
          {data.slice(6).map((item, index) => (
            <div key={index}>
              {loadedCards.includes(index + 6) ? (
                <SignatureCard item={item} />
              ) : (
                <SkeletonComponent />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signature;
