import React from 'react';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import './Table.css';

const Table = ({ columns, data, onEdit, onDelete, onView, loading }) => {
  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="no-data">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
              <td>
                <div className="action-buttons">
                  {onView && (
                    <button
                      className="btn-icon btn-view"
                      onClick={() => onView(row)}
                      title="View"
                    >
                      <FiEye />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => onEdit(row)}
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => onDelete(row)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
