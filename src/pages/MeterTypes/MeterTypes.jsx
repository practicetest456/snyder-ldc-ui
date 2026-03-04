import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import apiService from '../../services/apiService';
import './MeterTypes.css';

const MeterTypes = () => {
  const [meterTypes, setMeterTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    meterTypeCode: '',
    meterTypeName: '',
    description: '',
    pressureCategory: 'LOW',
    maxCapacity: '',
    status: 'ACTIVE'
  });

  const columns = [
    { key: 'meterTypeCode', label: 'Type Code' },
    { key: 'meterTypeName', label: 'Type Name' },
    { key: 'pressureCategory', label: 'Pressure Category' },
    { 
      key: 'maxCapacity', 
      label: 'Max Capacity',
      render: (value) => value ? `${value} MCF` : '-'
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <span className={`status-badge status-${value.toLowerCase()}`}>
          {value}
        </span>
      )
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAll('/meter-types');
      setMeterTypes(response.data._embedded.ldcMeterTypeModelList || []);
    } catch (error) {
      console.error('Error fetching meter types:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        await apiService.update('/meter-types', editingItem.id, formData);
        toast.success('Meter type updated successfully');
      } else {
        await apiService.create('/meter-types', formData);
        toast.success('Meter type created successfully');
      }
      
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error saving meter type:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      meterTypeCode: item.meterTypeCode,
      meterTypeName: item.meterTypeName,
      description: item.description || '',
      pressureCategory: item.pressureCategory,
      maxCapacity: item.maxCapacity,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.meterTypeName}?`)) {
      try {
        await apiService.delete('/meter-types', item.id);
        toast.success('Meter type deleted successfully');
        fetchData();
      } catch (error) {
        console.error('Error deleting meter type:', error);
      }
    }
  };

  const openModal = () => {
    setEditingItem(null);
    setFormData({
      meterTypeCode: '',
      meterTypeName: '',
      description: '',
      pressureCategory: 'LOW',
      maxCapacity: '',
      status: 'ACTIVE'
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Meter Types</h1>
          <p>Define and manage different meter categories</p>
        </div>
        <Button onClick={openModal} icon={<FiPlus />}>
          Add New Meter Type
        </Button>
      </div>

      <Table
        columns={columns}
        data={meterTypes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? 'Edit Meter Type' : 'Add New Meter Type'}
      >
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="meterTypeCode">Meter Type Code *</label>
              <input
                type="text"
                id="meterTypeCode"
                name="meterTypeCode"
                value={formData.meterTypeCode}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="meterTypeName">Meter Type Name *</label>
              <input
                type="text"
                id="meterTypeName"
                name="meterTypeName"
                value={formData.meterTypeName}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="pressureCategory">Pressure Category *</label>
              <select
                id="pressureCategory"
                name="pressureCategory"
                value={formData.pressureCategory}
                onChange={handleInputChange}
                required
                className="form-input"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="VERY_HIGH">VERY HIGH</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="maxCapacity">Max Capacity (MCF) *</label>
              <input
                type="number"
                id="maxCapacity"
                name="maxCapacity"
                value={formData.maxCapacity}
                onChange={handleInputChange}
                step="0.01"
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="form-input"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <div className="form-actions">
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingItem ? 'Update' : 'Create'} Meter Type
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MeterTypes;
