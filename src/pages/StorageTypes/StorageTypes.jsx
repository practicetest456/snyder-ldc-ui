import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import apiService from '../../services/apiService';
import './StorageTypes.css';

const StorageTypes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    storageCode: '', storageName: '', storageCategory: 'UNDERGROUND', totalCapacity: '', injectionRate: '', withdrawalRate: '', status: 'ACTIVE'
  });

  const columns = [
    { key: 'storageCode', label: 'Code' },
    { key: 'storageName', label: 'Name' },
    { key: 'storageCategory', label: 'Category' },
    { key: 'totalCapacity', label: 'Capacity', render: (v) => `${parseFloat(v).toFixed(2)} MCF` },
    { key: 'status', label: 'Status', render: (value) => <span className={`status-badge status-${value.toLowerCase()}`}>{value}</span> }
  ];

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAll('/storage-types');
      setData(response.data._embedded.ldcStorageTypeModelList || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await apiService.update('/storage-types', editingItem.id, formData);
        toast.success('Updated');
      } else {
        await apiService.create('/storage-types', formData);
        toast.success('Created');
      }
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({ storageCode: item.storageCode || '', storageName: item.storageName || '', storageCategory: item.storageCategory || 'UNDERGROUND', totalCapacity: item.totalCapacity || '', injectionRate: item.injectionRate || '', withdrawalRate: item.withdrawalRate || '', status: item.status || 'ACTIVE' });
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm('Delete?')) {
      try {
        await apiService.delete('/storage-types', item.id);
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
        <div><h1>Storage Types</h1><p>Define and manage gas storage categories</p></div>
        <Button onClick={() => { setEditingItem(null); setFormData({ storageCode: '', storageName: '', storageCategory: 'UNDERGROUND', totalCapacity: '', injectionRate: '', withdrawalRate: '', status: 'ACTIVE' }); setIsModalOpen(true); }} icon={<FiPlus />}>Add New</Button>
      </div>
      <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit' : 'Add New'}>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group"><label>Storage Code *</label><input type="text" name="storageCode" value={formData.storageCode} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input" /></div>
            <div className="form-group"><label>Storage Name *</label><input type="text" name="storageName" value={formData.storageName} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Category *</label><select name="storageCategory" value={formData.storageCategory} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input"><option value="UNDERGROUND">UNDERGROUND</option><option value="LNG">LNG</option><option value="LINE_PACK">LINE_PACK</option></select></div>
            <div className="form-group"><label>Total Capacity *</label><input type="number" name="totalCapacity" value={formData.totalCapacity} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} step="0.01" required className="form-input" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Injection Rate</label><input type="number" name="injectionRate" value={formData.injectionRate} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} step="0.01" className="form-input" /></div>
            <div className="form-group"><label>Withdrawal Rate</label><input type="number" name="withdrawalRate" value={formData.withdrawalRate} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} step="0.01" className="form-input" /></div>
          </div>
          <div className="form-group"><label>Status *</label><select name="status" value={formData.status} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input"><option value="ACTIVE">ACTIVE</option><option value="INACTIVE">INACTIVE</option></select></div>
          <div className="form-actions">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editingItem ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StorageTypes;
