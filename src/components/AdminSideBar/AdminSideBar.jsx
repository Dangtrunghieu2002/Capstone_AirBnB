import React from 'react';
import { Link } from 'react-router-dom';

const AdminSideBar = () => {
  return (
    <aside className="w-64 bg-white h-full shadow-lg">
      <nav className="mt-10 px-6 space-y-4">
        <Link
          to="/admin/user-management" // Sync with "/admin/user-management"
          className="block py-2.5 px-4 text-gray-700 rounded hover:bg-gray-200 transition"
        >
          Quản lý người dùng
        </Link>
        <Link
          to="/admin/location-management" // Sync with "/admin/location-information-management"
          className="block py-2.5 px-4 text-gray-700 rounded hover:bg-gray-200 transition"
        >
          Quản lý thông tin vị trí
        </Link>
        <Link
          to="/admin/room-info-management" // Sync with "/admin/room-information-management"
          className="block py-2.5 px-4 text-gray-700 rounded hover:bg-gray-200 transition"
        >
          Quản lý thông tin phòng
        </Link>
        <Link
          to="/admin/booking-management" // Sync with "/admin/booking-management"
          className="block py-2.5 px-4 text-gray-700 rounded hover:bg-gray-200 transition"
        >
          Quản lý đặt phòng
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSideBar;