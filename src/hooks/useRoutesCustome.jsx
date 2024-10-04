import React, { Suspense, useRef, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import UserTemplate from "../template/UserTemplate/UserTemplate";
import { path } from "../common/path/path";
import DelayedRender from "../components/DelayedRender/DelayedRender";
import { Skeleton } from "antd";
import SkeletonIndexPage from "../components/Skeleton/SkeletionIndexPage/SkeletonIndexPage";
import SkeletonLeftListRoom from "../components/Skeleton/SkeletonListRoomPage/SkeletonLeftListRoom";
import SkeletonDetailPage from "../components/Skeleton/SkeletonDetailPage/SkeletonDetailPage";
import InforUserPage from "../pages/InforUserPage/InforUserPage";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import { getLocalStorage } from "../utils/utils";

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
              <Skeleton active />
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
              <Skeleton active />
            </div>
          }
        >
          <SignUpPage />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return routes;
};

export default useRoutesCustome;
