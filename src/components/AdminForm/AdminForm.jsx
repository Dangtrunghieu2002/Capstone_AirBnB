import React, { useState } from 'react';

const AdminForm = ({ data, onSubmit, fields }) => {
    const [formData, setFormData] = useState(data || {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);  // Submit the form data
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
                <div key={field.name} className="form-group">
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder={field.placeholder}
                    />
                </div>
            ))}
            <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
                Save
            </button>
        </form>
    );
};

export default AdminForm;
