import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce'; // Hook debounce
import AdminTopBar from '../../components/AdminTopBar/AdminTopBar.jsx';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar.jsx';
import ManagementTable from '../../components/ManagementTable/ManagementTable.jsx';
import AdminModal from '../../components/AdminModal/AdminModal.jsx';
import AdminForm from '../../components/AdminForm/AdminForm.jsx'; // Assuming you have an AdminForm for the modal
import api from '../../service/api.js';

const BookingManagementPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [bookings, setBookings] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // Sử dụng debounce cho search term để tránh gọi API quá nhiều lần
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Sử dụng useEffect để gọi API khi debouncedSearchTerm hoặc currentPage thay đổi
    useEffect(() => {
        const fetchBookings = async (page, keyword) => {
            try {
                const response = await api.get('/dat-phong', {
                    params: { pageIndex: page, pageSize: 10, keyword },
                });
                setBookings(response.data.content); // Assuming 'content' contains the list of bookings
                setTotalPages(response.data.totalPages); // Adjust based on API response
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
            }
        };

        fetchBookings(currentPage, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm]);

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
            fetchBookings(1, debouncedSearchTerm); // Refresh booking list after adding
        } catch (error) {
            console.error('Failed to add booking:', error);
        }
    };

    // Edit an existing booking
    const editBooking = async (bookingId, bookingData) => {
        try {
            await api.put(`/dat-phong/${bookingId}`, bookingData);
            console.log('Booking updated successfully');
            fetchBookings(currentPage, debouncedSearchTerm); // Refresh booking list after editing
        } catch (error) {
            console.error('Failed to update booking:', error);
        }
    };

    // Delete a booking
    const deleteBooking = async (bookingId) => {
        try {
            await api.delete(`/dat-phong/${bookingId}`);
            console.log('Booking deleted successfully');
            fetchBookings(currentPage, debouncedSearchTerm); // Refresh booking list after deletion
        } catch (error) {
            console.error('Failed to delete booking:', error);
        }
    };

    // Handle adding new booking
    const handleAddBooking = () => {
        setSelectedBooking(null); // Clear the selected booking to create a new one
        setShowModal(true);
    };

    // Handle editing existing booking
    const handleEditBooking = (booking) => {
        setSelectedBooking(booking); // Set the selected booking to edit
        setShowModal(true);
    };

    // Handle deleting booking
    const handleDeleteBooking = (bookingId) => {
        deleteBooking(bookingId);
    };

    // Handle form submission for adding/editing booking
    const handleFormSubmit = (bookingData) => {
        if (selectedBooking) {
            // Edit booking
            editBooking(selectedBooking.id, bookingData);
        } else {
            // Add new booking
            addBooking(bookingData);
        }
        setShowModal(false);
    };

    return (
        <div className="h-screen flex flex-col">
            {/* Top Bar */}
            <AdminTopBar />

            <div className="flex flex-1">
                {/* Sidebar */}
                <AdminSideBar />

                {/* Main content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-semibold mb-4">Room Booking Management</h2>
                    <div className="mb-4 flex gap-4">
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleAddBooking}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Booking
                        </button>
                    </div>
                    <ManagementTable
                        columnMapping={columnMapping}
                        data={bookings} // Dữ liệu đặt phòng lấy từ API
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onEdit={handleEditBooking}
                        onDelete={handleDeleteBooking}
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
