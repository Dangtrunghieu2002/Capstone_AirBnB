import React, { useState, useEffect } from 'react';
import useImageUpload from '../../hooks/useImageUpload.jsx'; // Hook quản lý ảnh
import useDebounce from '../../hooks/useDebounce.jsx'; // Hook debounce
import AdminTopBar from '../../components/AdminTopBar/AdminTopBar.jsx';
import AdminSideBar from '../../components/AdminSideBar/AdminSideBar.jsx';
import ManagementTable from '../../components/ManagementTable/ManagementTable.jsx';
import AdminModal from '../../components/AdminModal/AdminModal.jsx';
import AdminForm from '../../components/AdminForm/AdminForm.jsx'; // Assuming you have an AdminForm for the modal
import api from '../../service/api';

const UserManagePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // Sử dụng debounce cho search term để tránh gọi API quá nhiều lần
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Định nghĩa hàm fetchUsers
    const fetchUsers = async (page, keyword) => {
        try {
            const response = await api.get('/users', {
                params: { pageIndex: page, pageSize: 10, keyword },
            });
            setUsers(response.data.content); // Assuming 'content' contains the list of users
            setTotalPages(response.data.totalPages); // Adjust based on API response
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    // Sử dụng useEffect để gọi API khi debouncedSearchTerm hoặc currentPage thay đổi
    useEffect(() => {
        fetchUsers(currentPage, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm]);

    // Column mapping for user management
    const columnMapping = {
        id: 'User ID',
        name: 'Full Name',
        email: 'Email',
        phone: 'Phone Number',
        birthday: 'Birthday',
        gender: 'Gender',
        role: 'Role',
    };

    // Sử dụng hook useImageUpload cho việc tải ảnh đại diện
    const {
        imageFile,
        uploading,
        error,
        imageUrl,
        handleImageChange,
        handleUpload,
        resetImage
    } = useImageUpload('/users/upload-avatar', (uploadedUrl) => {
        // Callback sau khi tải lên thành công, cập nhật URL avatar cho người dùng hiện tại
        if (selectedUser) {
            setSelectedUser((prevUser) => ({
                ...prevUser,
                avatar: uploadedUrl
            }));
        }
    });

    // Add a new user
    const addUser = async (userData) => {
        try {
            await api.post('/users', userData);
            console.log('User added successfully');
            setCurrentPage(1); // Reset to first page after adding
            fetchUsers(1, debouncedSearchTerm); // Refresh user list after adding
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };

    // Edit an existing user
    const editUser = async (userId, userData) => {
        try {
            await api.put(`/users/${userId}`, userData);
            console.log('User updated successfully');
            fetchUsers(currentPage, debouncedSearchTerm); // Refresh user list after editing
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    // Delete a user
    const deleteUser = async (userId) => {
        try {
            await api.delete(`/users/${userId}`);
            console.log('User deleted successfully');
            fetchUsers(currentPage, debouncedSearchTerm); // Refresh user list after deletion
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    // Handle adding new user
    const handleAddUser = () => {
        setSelectedUser(null); // Clear the selected user to create a new one
        resetImage(); // Reset image state when adding new user
        setShowModal(true);
    };

    // Handle editing existing user
    const handleEditUser = (user) => {
        setSelectedUser(user); // Set the selected user to edit
        resetImage(); // Reset image state when editing user
        setShowModal(true);
    };

    // Handle deleting user
    const handleDeleteUser = (userId) => {
        deleteUser(userId);
    };

    // Handle form submission for adding/editing user
    const handleFormSubmit = (userData) => {
        if (selectedUser) {
            // Edit user
            editUser(selectedUser.id, userData);
        } else {
            // Add new user
            addUser(userData);
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
                    <h2 className="text-2xl font-semibold mb-4">User Management</h2>
                    <div className="mb-4 flex gap-4">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleAddUser}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add User
                        </button>
                    </div>
                    <ManagementTable
                        columnMapping={columnMapping}
                        data={users} // Dữ liệu người dùng lấy từ API
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onEdit={handleEditUser}
                        onDelete={handleDeleteUser}
                    />
                    {showModal && (
                        <AdminModal isOpen={showModal} onClose={() => setShowModal(false)}>
                            <AdminForm
                                data={selectedUser}
                                onSubmit={handleFormSubmit}
                                fields={[
                                    { name: 'name', label: 'Full Name', type: 'text' },
                                    { name: 'email', label: 'Email', type: 'email' },
                                    { name: 'phone', label: 'Phone Number', type: 'text' },
                                    { name: 'birthday', label: 'Birthday', type: 'date' },
                                    { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
                                    { name: 'role', label: 'Role', type: 'text' },
                                ]}
                            />
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold mb-2">Upload User Avatar</h2>
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
                                            disabled={uploading || !selectedUser}
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
                                        <img src={imageUrl} alt="Uploaded Avatar" className="w-64 h-auto mt-2" />
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

export default UserManagePage;