import React, { useState } from "react";
import ContentRightInfor from "./ContentRightInfor";
import ContentRightContent from "./ContentRightContent";

const ContentRight = ({ user }) => {
  const [infor, setInfor] = useState(false);
  const handleInfor = () => {
    setInfor(true);
  };
  return (
    <div>
      <div className="flex flex-col gap-[40px]">
        <div>
          <h3 className="text-[2rem] text-center md:text-left font-bold">
            Thông tin về {user?.name}
          </h3>
          <div className="mt-[24px] text-center md:text-left">
            <button
              onClick={() => handleInfor()}
              className="py-[7px] px-[15px] border border-black font-medium text-[14px] rounded-lg hover:bg-gray-100"
            >
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </div>
        <div>
          {infor ? (
            <ContentRightInfor setInfor={setInfor} />
          ) : (
            <ContentRightContent user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentRight;
