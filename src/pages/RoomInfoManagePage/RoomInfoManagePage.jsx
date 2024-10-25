import React, { useState } from 'react';
import AdminTopBar from '../../components/AdminTopBar/AdminTopBar.jsx';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar.jsx';
import ManagementTable from '../../components/ManagementTable/ManagementTable.jsx';
import AdminModal from '../../components/AdminModal/AdminModal.jsx';
import AdminForm from '../../components/AdminForm/AdminForm.jsx';
import api from '../../service/api.js';

const RoomInfoManagePage = () => {
  // Column mapping for room management
  const columnMapping = {
    id: 'ID',
    tenPhong: 'Room Name',
    khach: 'Guests',
    phongNgu: 'Bedrooms',
    giuong: 'Beds',
    phongTam: 'Bathrooms',
    moTa: 'Description',
    giaTien: 'Price',
    mayGiat: 'Washing Machine',
    banLa: 'Iron',
    tivi: 'TV',
    dieuHoa: 'Air Conditioner',
    wifi: 'Wi-Fi',
    bep: 'Kitchen',
    doXe: 'Parking',
    hoBoi: 'Swimming Pool',
    banUi: 'Ironing Board',
    maViTri: 'Location ID',
    hinhAnh: 'Image URL',
    actions: 'Actions', // Adding an Actions column
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch rooms data function
  const fetchRooms = async (currentPage) => {
    try {
      const response = await api.get('/phong-thue', {
        params: { pageIndex: currentPage, pageSize: 10, keyword: searchTerm },
      });
      return {
        items: response.data.content,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
      return { items: [], totalPages: 1 };
    }
  };

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setShowModal(true);
  };

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await api.delete(`/phong-thue/${roomId}`);
      console.log('Room deleted successfully');
      fetchRooms(1); // Refetch rooms after deletion
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  const handleFormSubmit = async (roomData) => {
    try {
      if (selectedRoom) {
        await api.put(`/phong-thue/${selectedRoom.id}`, roomData);
        console.log('Room updated successfully');
      } else {
        await api.post('/phong-thue', roomData);
        console.log('Room added successfully');
      }
      setShowModal(false);
    } catch (error) {
      console.error('Failed to submit room data:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <AdminTopBar />
      <div className="flex flex-1">
        <AdminSideBar />
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Room Management</h2>
          <div className="mb-4 flex gap-4">
            <button
              onClick={handleAddRoom}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Room
            </button>
          </div>

          {/* Thêm div bao bọc với overflow-x auto */}
          <div className="overflow-x-container">
            <ManagementTable
              columnMapping={columnMapping}
              fetchData={fetchRooms}
              onEdit={handleEditRoom}
              renderActions={(room) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditRoom(room)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            />
          </div>

          {showModal && (
            <AdminModal isOpen={showModal} onClose={() => setShowModal(false)}>
              <AdminForm
                data={selectedRoom}
                onSubmit={handleFormSubmit}
                fields={[
                  { name: 'tenPhong', label: 'Room Name', type: 'text' },
                  { name: 'giaTien', label: 'Price', type: 'number' },
                  { name: 'khach', label: 'Guests', type: 'number' },
                  { name: 'phongNgu', label: 'Bedrooms', type: 'number' },
                  { name: 'giuong', label: 'Beds', type: 'number' },
                  { name: 'phongTam', label: 'Bathrooms', type: 'number' },
                  { name: 'moTa', label: 'Description', type: 'text' },
                  { name: 'mayGiat', label: 'Washing Machine', type: 'checkbox' },
                  { name: 'banLa', label: 'Iron', type: 'checkbox' },
                  { name: 'tivi', label: 'TV', type: 'checkbox' },
                  { name: 'dieuHoa', label: 'Air Conditioner', type: 'checkbox' },
                  { name: 'wifi', label: 'Wi-Fi', type: 'checkbox' },
                  { name: 'bep', label: 'Kitchen', type: 'checkbox' },
                  { name: 'doXe', label: 'Parking', type: 'checkbox' },
                  { name: 'hoBoi', label: 'Swimming Pool', type: 'checkbox' },
                  { name: 'banUi', label: 'Ironing Board', type: 'checkbox' },
                  { name: 'maViTri', label: 'Location ID', type: 'number' },
                  { name: 'hinhAnh', label: 'Image URL', type: 'text' },
                ]}
              />
            </AdminModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomInfoManagePage;
