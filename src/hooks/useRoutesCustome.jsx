import React from "react";
import { useRoutes } from "react-router-dom";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import IndexPage from "../pages/IndexPage/IndexPage";
import { path } from "../common/path/path";
import ListRoomPage from "../pages/ListRoomPage/ListRoomPage";
import RoomDetailPage from "../pages/RoomDetailPage/RoomDetailPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
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
    {
      path: path.signIn,
      element: <SignInPage />,
    },
    {
      path: path.signUp,
      element:<SignUpPage/>
    }
  ]);
  return routes;
};

export default useRoutesCustome;
