import React, { useState, useEffect } from 'react';
import useImageUpload from '../../hooks/useImageUpload.jsx'; // Hook for image management
import useDebounce from '../../hooks/useDebounce.jsx'; // Hook for debounce functionality
import AdminTopBar from '../../components/AdminTopBar/AdminTopBar.jsx';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar.jsx';
import ManagementTable from '../../components/ManagementTable/ManagementTable.jsx';
import AdminModal from '../../components/AdminModal/AdminModal.jsx';
import AdminForm from '../../components/AdminForm/AdminForm.jsx'; // Assuming you have an AdminForm for the modal
import api from '../../service/api.js';

const RoomInfoManagePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [rooms, setRooms] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // Debounce the search term to avoid excessive API calls
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Fetch rooms from API whenever debouncedSearchTerm or currentPage changes
    useEffect(() => {
        const fetchRooms = async (page, keyword) => {
            try {
                const response = await api.get('/phong-thue', {
                    params: { pageIndex: page, pageSize: 10, keyword },
                });
                setRooms(response.data.content); // Assuming 'content' contains the list of rooms
                setTotalPages(response.data.totalPages); // Adjust based on API response
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            }
        };

        fetchRooms(currentPage, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm]);

    // Column mapping for room management based on the provided structure
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
    };

    // Use useImageUpload hook for managing room images
    const {
        imageFile,
        uploading,
        error,
        imageUrl,
        handleImageChange,
        handleUpload,
        resetImage
    } = useImageUpload('/api/phong-thue/upload-hinh-phong', (uploadedUrl) => {
        // Callback after successful upload, update image URL for the selected room
        if (selectedRoom) {
            setSelectedRoom((prevRoom) => prevRoom ? { ...prevRoom, hinhAnh: uploadedUrl } : null);
        }
    });

    // Add a new room
    const addRoom = async (roomData) => {
        try {
            await api.post('/api/phong-thue', roomData);
            console.log('Room added successfully');
            setCurrentPage(1); // Reset to first page after adding
            fetchRooms(1, debouncedSearchTerm); // Refresh room list after adding
        } catch (error) {
            console.error('Failed to add room:', error);
        }
    };

    // Edit an existing room
    const editRoom = async (roomId, roomData) => {
        try {
            await api.put(`/api/phong-thue/${roomId}`, roomData);
            console.log('Room updated successfully');
            fetchRooms(currentPage, debouncedSearchTerm); // Refresh room list after editing
        } catch (error) {
            console.error('Failed to update room:', error);
        }
    };

    // Delete a room
    const deleteRoom = async (roomId) => {
        try {
            await api.delete(`/api/phong-thue/${roomId}`);
            console.log('Room deleted successfully');
            fetchRooms(currentPage, debouncedSearchTerm); // Refresh room list after deletion
        } catch (error) {
            console.error('Failed to delete room:', error);
        }
    };

    // Handle adding new room
    const handleAddRoom = () => {
        setSelectedRoom(null); // Clear the selected room to create a new one
        resetImage(); // Reset image state when adding new room
        setShowModal(true);
    };

    // Handle editing existing room
    const handleEditRoom = (room) => {
        setSelectedRoom(room); // Set the selected room to edit
        resetImage(); // Reset image state when editing room
        setShowModal(true);
    };

    // Handle deleting room
    const handleDeleteRoom = (roomId) => {
        deleteRoom(roomId);
    };

    // Handle form submission for adding/editing room
    const handleFormSubmit = (roomData) => {
        if (selectedRoom) {
            // Edit room
            editRoom(selectedRoom.id, roomData);
        } else {
            // Add new room
            addRoom(roomData);
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
                    <h2 className="text-2xl font-semibold mb-4">Room Management</h2>
                    <div className="mb-4 flex gap-4">
                        <input
                            type="text"
                            placeholder="Search rooms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleAddRoom}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Room
                        </button>
                    </div>
                    <ManagementTable
                        columnMapping={columnMapping}
                        data={rooms} // Data fetched from API
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onEdit={handleEditRoom}
                        onDelete={handleDeleteRoom}
                    />
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
                                    { name: 'hinhAnh', label: 'Image URL', type: 'text' }, // Optional, for manual image URL input
                                ]}
                            />
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">Upload Room Image</h2>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={uploading}
                                    className="mb-4"
                                />
                                {imageFile && (
                                    <div>
                                        <p>Selected file: {imageFile.name}</p>
                                        <button
                                            onClick={handleUpload}
                                            disabled={uploading || !selectedRoom}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            {uploading ? 'Uploading...' : 'Upload Image'}
                                        </button>
                                        <button
                                            onClick={resetImage}
                                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                )}
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                                {imageUrl && (
                                    <div className="mt-4">
                                        <p>Image uploaded successfully:</p>
                                        <img src={imageUrl} alt="Uploaded Room" className="w-64 h-auto mt-2" />
                                    </div>
                                )}
                            </div>
                        </AdminModal>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomInfoManagePage;
