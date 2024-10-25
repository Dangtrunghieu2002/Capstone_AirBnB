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
    actions: 'Actions', // Adding an Actions column
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

  const handleDeleteLocation = async (locationId) => {
    try {
      await api.delete(`/api/vi-tri/${locationId}`);
      console.log('Location deleted successfully');
      fetchLocations(1); // Refetch locations after deletion
    } catch (error) {
      console.error('Failed to delete location:', error);
    }
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
        <AdminSideBar />
        <div className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Location Management</h2>
          <div className="mb-4 flex gap-4">
            <button
              onClick={handleAddLocation}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Location
            </button>
          </div>
          <ManagementTable
            columnMapping={columnMapping}
            fetchData={fetchLocations}
            onEdit={handleEditLocation}
            onDelete={handleDeleteLocation}
            renderActions={(location) => (
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditLocation(location)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteLocation(location.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
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
