import React from 'react';
import { useRoutes } from 'react-router-dom';
import UserTemplate from '../template/UserTemplate/UserTemplate';
import IndexPage from '../pages/IndexPage/IndexPage';
import AdminTemplate from '../template/AdminTemplate/AdminTemplate';
import BookingManagePage from '../pages/BookingManagePage/BookingManagePage.jsx';
import UserManagePage from '../pages/UserManagePage/UserManagePage.jsx';
import LocationManagePage from '../pages/LocationManagePage/LocationManagePage.jsx';
import RoomInfoManagePage from '../pages/RoomInfoManagePage/RoomInfoManagePage.jsx';
import { path } from '../common/path/path.js';
import DelayedRender from "../components/DelayedRender/DelayedRender";
import { Skeleton } from "antd";
import SkeletonIndexPage from "../components/Skeleton/SkeletionIndexPage/SkeletonIndexPage";
import SkeletonLeftListRoom from "../components/Skeleton/SkeletonListRoomPage/SkeletonLeftListRoom";
import SkeletonDetailPage from "../components/Skeleton/SkeletonDetailPage/SkeletonDetailPage";

// Hàm helper để trì hoãn import
const lazyWithDelay = (importFunc, delay) => {
    return React.lazy(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(importFunc());
        }, delay);
      });
    });
  };
  
  // Lazy load các trang với trì hoãn
const IndexPage = lazyWithDelay(
    () => import("../pages/IndexPage/IndexPage"),
    2000
);
const ListRoomPage = lazyWithDelay(
    () => import("../pages/ListRoomPage/ListRoomPage"),
    2000
);
const RoomDetailPage = lazyWithDelay(
    () => import("../pages/RoomDetailPage/RoomDetailPage"),
    2000
);
const SignInPage = lazyWithDelay(
    () => import("../pages/SignInPage/SignInPage"),
    500
);
const SignUpPage = lazyWithDelay(
    () => import("../pages/SignUpPage/SignUpPage"),
    500
);
  

const useRoutesCustome = () => {
    const routes = useRoutes([
        {
            path: '/',
            element: <UserTemplate />,
            children: [
                {
                    index: true,
                    element: <IndexPage />
                }
            ]
        },
        {
            path: '/admin',
            element: <AdminTemplate />, // Admin layout
            children: [
                {
                    index: true, // Trang mặc định khi vào "/admin"
                    path: 'user-management',
                    element: <UserManagePage />,
                },
                { path: path.locationManage, element: <LocationManagePage /> },
                { path: path.roomInfoManage, element: <RoomInfoManagePage /> },
                { path: path.bookingManage, element: <BookingManagePage /> },
            ],
        },
    ]);
    return routes;
};

export default useRoutesCustome;
