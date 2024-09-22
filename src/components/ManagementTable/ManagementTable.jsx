import React, { useState, useEffect } from 'react';

const ManagementTable = ({ columnMapping, fetchData, onEdit, onView }) => {
  const [items, setItems] = useState([]); // Ensure it's always an array
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true); // Start loading
      setError(null); // Reset any previous error
      try {
        const response = await fetchData(currentPage, searchTerm);
        console.log(response); // Check what the API returns
        setItems(Array.isArray(response.items) ? response.items : []); // Ensure items is an array
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setItems([]); // Fallback to an empty array in case of error
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    loadData();
  }, [currentPage, searchTerm, fetchData]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(currentPage, searchTerm);
  };

  if (isLoading) {
    return <p>Loading data...</p>; // Show a loading message while fetching
  }

  if (error) {
    return <p>{error}</p>; // Show error message if fetching fails
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '300px'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Search
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p>No data available</p> // Show this if items is an empty array
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px'
          }}
        >
          <thead>
            <tr>
              {Object.values(columnMapping).map((header, index) => (
                <th
                  key={index}
                  style={{
                    padding: '10px',
                    borderBottom: '2px solid #ddd',
                    textAlign: 'left'
                  }}
                >
                  {header}
                </th>
              ))}
              <th style={{ padding: '10px', borderBottom: '2px solid #ddd', textAlign: 'left' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                {Object.keys(columnMapping).map((col, colIndex) => (
                  <td key={colIndex} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    {item[col]}
                  </td>
                ))}
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  <button
                    onClick={() => onView(item)}
                    style={{
                      padding: '5px 10px',
                      marginRight: '5px',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#ffc107',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPage === 1 ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: currentPage === 1 ? 'default' : 'pointer'
          }}
        >
          Previous
        </button>
        <span style={{ padding: '10px' }}>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPage === totalPages ? '#ccc' : '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            marginLeft: '10px',
            cursor: currentPage === totalPages ? 'default' : 'pointer'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManagementTable;
