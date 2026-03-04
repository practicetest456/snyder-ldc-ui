import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import apiService from '../../services/apiService';
import './PoolingPoints.css';

const PoolingPoints = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    pointCode: '', pointName: '', location: '', capacity: '', activeContracts: '', serviceAreaId: '', status: 'ACTIVE'
  });

  const columns = [
    { key: 'pointCode', label: 'Point Code' },
    { key: 'pointName', label: 'Point Name' },
    { key: 'location', label: 'Location' },
    { key: 'capacity', label: 'Capacity', render: (v) => `${parseFloat(v).toFixed(2)} MCF` },
    { key: 'status', label: 'Status', render: (value) => <span className={`status-badge status-${value.toLowerCase()}`}>{value}</span> }
  ];

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAll('/pooling-points');
      setData(response.data._embedded.poolingPointModelList || []);
    } catch (error) {
      console.error(error);
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
        await apiService.update('/pooling-points', editingItem.id, formData);
        toast.success('Updated successfully');
      } else {
        await apiService.create('/pooling-points', formData);
        toast.success('Created successfully');
      }
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      pointCode: item.pointCode || '',
      pointName: item.pointName || '',
      location: item.location || '',
      capacity: item.capacity || '',
      activeContracts: item.activeContracts || '',
      serviceAreaId: item.serviceAreaId || '',
      status: item.status || 'ACTIVE'
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm('Delete this item?')) {
      try {
        await apiService.delete('/pooling-points', item.id);
        toast.success('Deleted');
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Pooling Points</h1>
          <p>Manage gas supply aggregation locations</p>
        </div>
        <Button onClick={() => { setEditingItem(null); setFormData({ pointCode: '', pointName: '', location: '', capacity: '', activeContracts: '', serviceAreaId: '', status: 'ACTIVE' }); setIsModalOpen(true); }} icon={<FiPlus />}>Add New</Button>
      </div>
      <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit' : 'Add New'}>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label>Point Code *</label>
              <input type="text" name="pointCode" value={formData.pointCode} onChange={handleInputChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label>Point Name *</label>
              <input type="text" name="pointName" value={formData.pointName} onChange={handleInputChange} required className="form-input" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Location *</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label>Capacity (MCF) *</label>
              <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} step="0.01" required className="form-input" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Active Contracts</label>
              <input type="number" name="activeContracts" value={formData.activeContracts} onChange={handleInputChange} className="form-input" />
            </div>
            <div className="form-group">
              <label>Service Area ID</label>
              <input type="number" name="serviceAreaId" value={formData.serviceAreaId} onChange={handleInputChange} className="form-input" />
            </div>
          </div>
          <div className="form-group">
            <label>Status *</label>
            <select name="status" value={formData.status} onChange={handleInputChange} required className="form-input">
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
          <div className="form-actions">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editingItem ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PoolingPoints;
