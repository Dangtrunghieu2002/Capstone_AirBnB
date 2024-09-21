import React from 'react';
import { useRoutes } from 'react-router-dom';
import UserTemplate from '../template/UserTemplate/UserTemplate';
import IndexPage from '../pages/IndexPage/IndexPage';
import AdminTemplate from '../template/AdminTemplate/AdminTemplate';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import BookingManagementPage from '../pages/BookingManagementPage/BookingManagementPage';
import UserManagePage from '../pages/UserManagePage/UserManagePage';
import LocationManagementPage from '../pages/LocationManagementPage/LocationManagementPage';
import RoomInfoManagementPage from '../pages/RoomInfoManagementPage/RoomInfoManagementPage';
import { path } from '../common/path';

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
                { path: path.locationManage, element: <LocationManagementPage /> },
                { path: path.roomInfoManage, element: <RoomInfoManagementPage /> },
                { path: path.bookingManage, element: <BookingManagementPage /> },
                { path: '*', element: <PageNotFound /> },
            ],
        },
    ]);
    return routes;
};

export default useRoutesCustome;
