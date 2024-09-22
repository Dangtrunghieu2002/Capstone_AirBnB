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
