import React from "react";
import { useRoutes } from "react-router-dom";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import IndexPage from "../pages/IndexPage/IndexPage";
import { path } from "../common/path/path";
import ListRoomPage from "../pages/ListRoomPage/ListRoomPage";
import RoomDetailPage from "../pages/RoomDetailPage/RoomDetailPage";
const useRoutesCustome = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <UserTemplate />,
      children: [
        {
          index: true,
          element: <IndexPage />,
        },
        {
          path: path.listRoomPage,
          element: <ListRoomPage />,
        },
        {
          path: path.roomDetail,
          element: <RoomDetailPage />,
        },
      ],
    },
  ]);
  return routes;
};

export default useRoutesCustome;
