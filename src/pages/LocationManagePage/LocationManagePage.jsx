import React, { useState, useEffect } from 'react';
import useImageUpload from '../../hooks/useImageUpload.jsx'; // Hook quản lý ảnh
import useDebounce from '../../hooks/useDebounce.jsx'; // Hook debounce
import AdminTopBar from '../../components/AdminTopBar/AdminTopBar.jsx';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar.jsx';
import ManagementTable from '../../components/ManagementTable/ManagementTable.jsx';
import AdminModal from '../../components/AdminModal/AdminModal.jsx';
import AdminForm from '../../components/AdminForm/AdminForm.jsx'; // Assuming you have an AdminForm for the modal
import api from '../../service/api.js';

const LocationManagementPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [locations, setLocations] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // Sử dụng debounce cho search term để tránh gọi API quá nhiều lần
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Sử dụng useEffect để gọi API khi debouncedSearchTerm hoặc currentPage thay đổi
    useEffect(() => {
        const fetchLocations = async (page, keyword) => {
            try {
                const response = await api.get('/vi-tri', {
                    params: { pageIndex: page, pageSize: 10, keyword },
                });
                setLocations(response.data.content); // Assuming 'content' contains the list of locations
                setTotalPages(response.data.totalPages); // Adjust based on API response
            } catch (error) {
                console.error('Failed to fetch locations:', error);
            }
        };

        fetchLocations(currentPage, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm]);

    // Column mapping for location management
    const columnMapping = {
        id: 'Location ID',
        tenViTri: 'Location Name',
        tinhThanh: 'City',
        quocGia: 'Country',
        hinhAnh: 'Image URL',
    };

    // Sử dụng hook useImageUpload cho việc tải ảnh địa điểm
    const {
        imageFile,
        uploading,
        error,
        imageUrl,
        handleImageChange,
        handleUpload,
        resetImage
    } = useImageUpload('/vi-tri/upload-hinh-vitri', (uploadedUrl) => {
        // Callback sau khi tải lên thành công, cập nhật URL ảnh cho địa điểm hiện tại
        if (selectedLocation) {
            setSelectedLocation((prevLocation) => ({
                ...prevLocation,
                hinhAnh: uploadedUrl
            }));
        }
    });

    // Add a new location
    const addLocation = async (locationData) => {
        try {
            await api.post('/vi-tri', locationData);
            console.log('Location added successfully');
            setCurrentPage(1); // Reset to first page after adding
            fetchLocations(1, debouncedSearchTerm); // Refresh location list after adding
        } catch (error) {
            console.error('Failed to add location:', error);
        }
    };

    // Edit an existing location
    const editLocation = async (locationId, locationData) => {
        try {
            await api.put(`/vi-tri/${locationId}`, locationData);
            console.log('Location updated successfully');
            fetchLocations(currentPage, debouncedSearchTerm); // Refresh location list after editing
        } catch (error) {
            console.error('Failed to update location:', error);
        }
    };

    // Delete a location
    const deleteLocation = async (locationId) => {
        try {
            await api.delete(`/vi-tri/${locationId}`);
            console.log('Location deleted successfully');
            fetchLocations(currentPage, debouncedSearchTerm); // Refresh location list after deletion
        } catch (error) {
            console.error('Failed to delete location:', error);
        }
    };

    // Handle adding new location
    const handleAddLocation = () => {
        setSelectedLocation(null); // Clear the selected location to create a new one
        resetImage(); // Reset image state when adding new location
        setShowModal(true);
    };

    // Handle editing existing location
    const handleEditLocation = (location) => {
        setSelectedLocation(location); // Set the selected location to edit
        resetImage(); // Reset image state when editing location
        setShowModal(true);
    };

    // Handle deleting location
    const handleDeleteLocation = (locationId) => {
        deleteLocation(locationId);
    };

    // Handle form submission for adding/editing location
    const handleFormSubmit = async (locationData) => {
        // Gộp dữ liệu địa điểm với URL của ảnh
        const completeLocationData = { ...locationData, hinhAnh: imageUrl };

        if (selectedLocation) {
            // Edit location
            await editLocation(selectedLocation.id, completeLocationData);
        } else {
            // Add new location
            const newLocation = await addLocation(completeLocationData);
            if (imageFile && newLocation) {
                // Tải lên hình ảnh sau khi tạo địa điểm mới
                await handleUpload(newLocation.id, imageFile);
            }
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
                    <h2 className="text-2xl font-semibold mb-4">Location Management</h2>
                    <div className="mb-4 flex gap-4">
                        <input
                            type="text"
                            placeholder="Search locations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleAddLocation}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Location
                        </button>
                    </div>
                    <ManagementTable
                        columnMapping={columnMapping}
                        data={locations} // Dữ liệu địa điểm lấy từ API
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onEdit={handleEditLocation}
                        onDelete={handleDeleteLocation}
                    />
                    {showModal && (
                        <AdminModal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <AdminForm
                                data={selectedLocation}
                                onSubmit={handleFormSubmit}
                                fields={[
                                    { name: 'tenViTri', label: 'Location Name', type: 'text' },
                                    { name: 'tinhThanh', label: 'City', type: 'text' },
                                    { name: 'quocGia', label: 'Country', type: 'text' },
                                    { name: 'hinhAnh', label: 'Image URL', type: 'text' }, // Optional, for manual image URL input
                                ]}
                            />
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">Upload Location Image</h2>
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
                                            disabled={uploading || !selectedLocation}
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
                                        <img src={imageUrl} alt="Uploaded Location" className="w-64 h-auto mt-2" />
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

export default LocationManagementPage;