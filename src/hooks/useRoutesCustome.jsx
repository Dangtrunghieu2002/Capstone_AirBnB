import React, { Suspense, useRef, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import AdminTemplate from "../template/adminTemplate/AdminTemplate";
import { path } from "../common/path/path";
import DelayedRender from "../components/DelayedRender/DelayedRender";
import { Skeleton } from "antd";
import SkeletonIndexPage from "../components/Skeleton/SkeletionIndexPage/SkeletonIndexPage";
import SkeletonLeftListRoom from "../components/Skeleton/SkeletonListRoomPage/SkeletonLeftListRoom";
import SkeletonDetailPage from "../components/Skeleton/SkeletonDetailPage/SkeletonDetailPage";
import InforUserPage from "../pages/InforUserPage/InforUserPage";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import { getLocalStorage } from "../utils/utils";
import SkeletonSignIn from "../components/Skeleton/SkeletonSignIn/SkeletonSignIn";
import SkeletonSignUp from "../components/Skeleton/SkeletonSignUp/SkeletonSignUp";
// import LocationManagementPage from "../pages/LocationManagePage/LocationManagePage";
// import RoomInfoManagePage from "../pages/RoomInfoManagePage/RoomInfoManagePage";
// import BookingManagementPage from "../pages/BookingManagePage/BookingManagePage";

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

// Admin Pages
const BookingManagementPage = lazyWithDelay(() => import("../pages/BookingManagePage/BookingManagePage"), 500);
const RoomInfoManagePage = lazyWithDelay(() => import("../pages/RoomInfoManagePage/RoomInfoManagePage"), 500);
const LocationManagementPage = lazyWithDelay(() => import("../pages/LocationManagePage/LocationManagePage"), 500);
const UserManagePage = lazyWithDelay(() => import("../pages/UserManagePage/UserManagePage"), 500);


const useRoutesCustome = () => {
  const skeletonRef = useRef(null);

  useEffect(() => {
    if (skeletonRef.current) {
      skeletonRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
  const routes = useRoutes([
    {
      path: "/",
      element: <UserTemplate />,
      children: [
        {
          index: true,
          element: (
            <Suspense
              fallback={
                <div className="h-[1500px]">
                  {" "}
                  <SkeletonIndexPage />
                </div>
              }
            >
              <IndexPage />
            </Suspense>
          ),
        },
        {
          path: path.listRoomPage,
          element: (
            <Suspense
              fallback={
                <div className="h-[1500px]">
                  <SkeletonLeftListRoom />
                </div>
              }
            >
              <ListRoomPage />
            </Suspense>
          ),
        },
        {
          path: path.roomDetail,
          element: (
            <Suspense
              fallback={
                <div className="h-[900px]">
                  <SkeletonDetailPage />
                </div>
              }
            >
              <RoomDetailPage />
            </Suspense>
          ),
        },
        {
          path: path.inforUser,
          element: getLocalStorage("user") ? (
            <InforUserPage />
          ) : (
            <PageNotFound />
          ),
        },
      ],
    },
    {
      path: path.signIn,
      element: (
        <Suspense
          fallback={
            <div className="h-screen">
              <SkeletonSignIn />
            </div>
          }
        >
          <SignInPage />
        </Suspense>
      ),
    },
    {
      path: path.signUp,
      element: (
        <Suspense
          fallback={
            <div className="h-screen">
              <SkeletonSignUp />
            </div>
          }
        >
          <SignUpPage />
        </Suspense>
      ),
    },
    // Admin routes
    {
      path: "/admin",
      element: <AdminTemplate />,
      children: [
        {
          index: true, // Default to user management
          path: "user-management",
          element: (
            <Suspense fallback={<div className="h-screen"><SkeletonSignIn /></div>}>
              <UserManagePage />
            </Suspense>
          ),
        },
        {
          path: "booking-management",
          element: (
            <Suspense fallback={<div className="h-screen"><SkeletonSignIn /></div>}>
              <BookingManagementPage />
            </Suspense>
          ),
        },
        {
          path: "location-management",
          element: (
            <Suspense fallback={<div className="h-screen"><SkeletonSignIn /></div>}>
              <LocationManagementPage />
            </Suspense>
          ),
        },
        {
          path: "room-info-management",
          element: (
            <Suspense fallback={<div className="h-screen"><SkeletonSignIn /></div>}>
              <RoomInfoManagePage />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);



  return routes;
};

export default useRoutesCustome;
