import React, { useState, useEffect } from "react";
import { nguoiDungService } from "../../service/nguoiDung.service";
import { useSelector } from "react-redux";
import { ContentLeft } from "../../components/InforUserComponent/ContentLeft";
import ContentRight from "../../components/InforUserComponent/ContentRight";

const InforUserPage = () => {
  const initialMx = 293; // Giá trị ban đầu của mx
  const { inforUser } = useSelector((state) => state.authSlice);
  const [user, setUser] = useState();
  const [mx, setMx] = useState(initialMx);
  console.log(user);
  const handleResize = () => {
    const newWidth = window.innerWidth;
    const newMx = Math.max(
      0,
      initialMx - Math.floor(((initialMx / 57) * (1924 - newWidth)) / 10)
    ); // Giảm mx
    setMx(newMx);
  };
  useEffect(() => {
    nguoiDungService
      .layNguoiDungTheoId(inforUser?.user.id)
      .then((res) => {
        setUser(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    // Thêm sự kiện lắng nghe resize
    window.addEventListener("resize", handleResize);
    handleResize();
    // Cleanup khi component bị gỡ bỏ
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className="py-[40px] lg:px-[80px] px-[40px] mt-20 md:mt-0"
      style={{
        marginLeft: mx,
        marginRight: mx,
      }}
    >
      <div className=" flex lg:items-start items-center lg:flex-row flex-col gap-[40px] xl:gap-[80px]">
        <div className="h-full relative flex-shrink w-[342px] ">
          <ContentLeft user={user} />
        </div>
        <div className="lg:self-stretch self-center flex-1 flex-shrink">
          <ContentRight user={user} />
        </div>
      </div>
    </div>
  );
};

export default InforUserPage;
