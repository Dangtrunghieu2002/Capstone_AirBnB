import React, { useState, useEffect } from 'react';
import AdminTopBar from '../../components/AdminTopBar/AdminTopBar.jsx';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar.jsx';
import ManagementTable from '../../components/ManagementTable/ManagementTable.jsx';
import AdminModal from '../../components/AdminModal/AdminModal.jsx';
import AdminForm from '../../components/AdminForm/AdminForm.jsx';
import api from '../../service/api.js';

const BookingManagementPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch bookings from API whenever searchTerm or currentPage changes
  useEffect(() => {
    const fetchBookings = async (page, keyword) => {
      try {
        const response = await api.get('/dat-phong', {
          params: { pageIndex: page, pageSize: 10, keyword },
        });
        setBookings(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      }
    };

    fetchBookings(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  // Column mapping for booking management
  const columnMapping = {
    id: 'Booking ID',
    maPhong: 'Room ID',
    ngayDen: 'Check-in Date',
    ngayDi: 'Check-out Date',
    soLuongKhach: 'Number of Guests',
    maNguoiDung: 'User ID',
  };

  // Add a new booking
  const addBooking = async (bookingData) => {
    try {
      await api.post('/dat-phong', bookingData);
      console.log('Booking added successfully');
      setCurrentPage(1); // Reset to first page after adding
    } catch (error) {
      console.error('Failed to add booking:', error);
    }
  };

  // Edit an existing booking
  const editBooking = async (bookingId, bookingData) => {
    try {
      await api.put(`/dat-phong/${bookingId}`, bookingData);
      console.log('Booking updated successfully');
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  // Delete a booking
  const deleteBooking = async (bookingId) => {
    try {
      await api.delete(`/dat-phong/${bookingId}`);
      console.log('Booking deleted successfully');
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  // Handle adding new booking
  const handleAddBooking = () => {
    setSelectedBooking(null);
    setShowModal(true);
  };

  // Handle editing existing booking
  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // Handle form submission for adding/editing booking
  const handleFormSubmit = (bookingData) => {
    if (selectedBooking) {
      editBooking(selectedBooking.id, bookingData);
    } else {
      addBooking(bookingData);
    }
    setShowModal(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <AdminTopBar />

      <div className="flex flex-1">
        <AdminSideBar />

        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Room Booking Management</h2>
          <div className="mb-4 flex gap-4">
            <button
              onClick={handleAddBooking}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Booking
            </button>
          </div>
          <ManagementTable
            columnMapping={columnMapping}
            fetchData={() => fetchBookings(currentPage, searchTerm)}
            onEdit={handleEditBooking}
            onDelete={deleteBooking}
          />
          {showModal && (
            <AdminModal isOpen={showModal} onClose={() => setShowModal(false)}>
              <AdminForm
                data={selectedBooking}
                onSubmit={handleFormSubmit}
                fields={[
                  { name: 'maPhong', label: 'Room ID', type: 'number' },
                  { name: 'ngayDen', label: 'Check-in Date', type: 'date' },
                  { name: 'ngayDi', label: 'Check-out Date', type: 'date' },
                  { name: 'soLuongKhach', label: 'Number of Guests', type: 'number' },
                  { name: 'maNguoiDung', label: 'User ID', type: 'number' },
                ]}
              />
            </AdminModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManagementPage;
