import { useState, useEffect } from 'react';

const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Đặt một timeout để cập nhật giá trị debouncedValue sau delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Hủy timeout nếu value thay đổi trước khi delay kết thúc
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
