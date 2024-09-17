import React from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";

const UserTemplate = () => {
  return (
    <>
      <div className="max-w-[2500px] mx-auto">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserTemplate;
