import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ManagementTable = ({ columnMapping, fetchData, onEdit, onView }) => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchData(currentPage, searchTerm);
        setItems(Array.isArray(response.items) ? response.items : []);
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [currentPage, searchTerm, fetchData]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData(1, searchTerm); // Gọi lại hàm fetchData với trang 1 và từ khóa tìm kiếm mới
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
        <p>No data available. Please try a different search term or adjust the filters.</p>
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
                    title="View details"
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
                    title="Edit this item"
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
          onClick={() => handlePageChange(currentPage - 1)}
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
          onClick={() => handlePageChange(currentPage + 1)}
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

ManagementTable.propTypes = {
  columnMapping: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
};

ManagementTable.defaultProps = {
  columnMapping: {},
  fetchData: () => {},
  onEdit: () => {},
  onView: () => {}
};

export default ManagementTable;
