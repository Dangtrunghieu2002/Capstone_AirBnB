import React, { useState } from 'react';
import AdminTopBar from '../../components/AdminTopBar/AdminTopBar.jsx';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar.jsx';
import ManagementTable from '../../components/ManagementTable/ManagementTable.jsx';
import AdminModal from '../../components/AdminModal/AdminModal.jsx';
import AdminForm from '../../components/AdminForm/AdminForm.jsx';
import api from '../../service/api.js';

const LocationManagementPage = () => {
  // Column mapping for location management
  const columnMapping = {
    id: 'Location ID',
    tenViTri: 'Location Name',
    tinhThanh: 'City',
    quocGia: 'Country',
    hinhAnh: 'Image URL',
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch location data function
  const fetchLocations = async (currentPage) => {
    try {
      const response = await api.get('/api/vi-tri', {
        params: { pageIndex: currentPage, pageSize: 10, keyword: searchTerm },
      });
      return {
        items: response.data.content,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      console.error('Failed to fetch locations:', error);
      return { items: [], totalPages: 1 };
    }
  };

  const handleAddLocation = () => {
    setSelectedLocation(null);
    setShowModal(true);
  };

  const handleEditLocation = (location) => {
    setSelectedLocation(location);
    setShowModal(true);
  };

  const handleFormSubmit = async (locationData) => {
    try {
      if (selectedLocation) {
        await api.put(`/api/vi-tri/${selectedLocation.id}`, locationData);
        console.log('Location updated successfully');
      } else {
        await api.post('/api/vi-tri', locationData);
        console.log('Location added successfully');
      }
      setShowModal(false);
    } catch (error) {
      console.error('Failed to submit location data:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <AdminTopBar />
      <div className="flex flex-1">
        {/* Make the sidebar collapsible on small screens */}
        <div className="hidden lg:block">
          <AdminSideBar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Location Management</h2>

          {/* Search and Add button */}
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full md:w-1/3"
            />
            <button
              onClick={handleAddLocation}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
            >
              Add Location
            </button>
          </div>

          {/* Management table */}
          <ManagementTable
            columnMapping={columnMapping}
            fetchData={fetchLocations}
            onEdit={handleEditLocation}
          />

          {/* Modal for adding/editing location */}
          {showModal && (
            <AdminModal isOpen={showModal} onClose={() => setShowModal(false)}>
              <AdminForm
                data={selectedLocation}
                onSubmit={handleFormSubmit}
                fields={[
                  { name: 'tenViTri', label: 'Location Name', type: 'text' },
                  { name: 'tinhThanh', label: 'City', type: 'text' },
                  { name: 'quocGia', label: 'Country', type: 'text' },
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

export default LocationManagementPage;
