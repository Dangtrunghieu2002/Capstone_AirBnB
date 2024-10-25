import { useState } from 'react';
import api from '../service/api'; // Import Axios instance đã cấu hình sẵn

// Hook useImageUpload nhận vào endpoint, là URL API mà bạn sẽ tải ảnh lên và một callback tùy chọn để xử lý sau khi tải lên thành công
const useImageUpload = (uploadEndpoint, onSuccessCallback) => {
    const [imageFile, setImageFile] = useState(null); // Trạng thái lưu trữ ảnh được chọn
    const [uploading, setUploading] = useState(false); // Trạng thái đang tải lên
    const [error, setError] = useState(null); // Lỗi trong quá trình tải lên
    const [imageUrl, setImageUrl] = useState(''); // URL của ảnh sau khi tải lên thành công

    // Function để chọn file ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setError(null); // Reset error nếu có
        }
    };

    // Function để tải ảnh lên server
    const handleUpload = async () => {
        if (!imageFile) {
            setError('Please select an image first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', imageFile); // Thêm ảnh vào form data

        try {
            setUploading(true); // Bắt đầu tải lên
            const response = await api.post(uploadEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setImageUrl(response.data.imageUrl); // Lưu URL ảnh sau khi tải lên thành công
            setUploading(false); // Kết thúc tải lên
            setError(null); // Xóa lỗi nếu có
            console.log('Image uploaded successfully:', response.data);

            // Gọi callback tùy chọn nếu có
            if (onSuccessCallback) {
                onSuccessCallback(response.data.imageUrl);
            }
        } catch (err) {
            setUploading(false); // Kết thúc tải lên
            setError('Failed to upload image.'); // Thông báo lỗi
            console.error('Error uploading image:', err);
        }
    };

    // Function để reset trạng thái ảnh
    const resetImage = () => {
        setImageFile(null);
        setImageUrl('');
        setError(null);
    };

    return {
        imageFile,    // Ảnh đã chọn
        uploading,    // Trạng thái tải lên
        error,        // Thông báo lỗi nếu có
        imageUrl,     // URL của ảnh sau khi tải lên
        handleImageChange, // Function để chọn ảnh
        handleUpload, // Function để tải ảnh lên
        resetImage,   // Function để reset trạng thái ảnh
    };
};

export default useImageUpload;