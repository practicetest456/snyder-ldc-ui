import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import apiService from '../../services/apiService';
import { formatDate } from '../../utils/dateUtils';
import './Tariffs.css';

const Tariffs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    tariffCode: '', tariffName: '', ratePerUnit: '', slabFrom: '', slabTo: '', meterTypeId: '', effectiveFrom: '', status: 'ACTIVE'
  });

  const columns = [
    { key: 'tariffCode', label: 'Code' },
    { key: 'tariffName', label: 'Name' },
    { key: 'ratePerUnit', label: 'Rate', render: (v) => `$${parseFloat(v).toFixed(2)}` },
    { key: 'effectiveFrom', label: 'Effective From', render: formatDate },
    { key: 'status', label: 'Status', render: (value) => <span className={`status-badge status-${value.toLowerCase()}`}>{value}</span> }
  ];

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAll('/tariffs');
      setData(response.data._embedded.ldcTariffModelList || []);
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
        await apiService.update('/tariffs', editingItem.id, formData);
        toast.success('Updated');
      } else {
        await apiService.create('/tariffs', formData);
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
    setFormData({ tariffCode: item.tariffCode || '', tariffName: item.tariffName || '', ratePerUnit: item.ratePerUnit || '', slabFrom: item.slabFrom || '', slabTo: item.slabTo || '', meterTypeId: item.meterTypeId || '', effectiveFrom: item.effectiveFrom?.split('T')[0] || '', status: item.status || 'ACTIVE' });
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm('Delete?')) {
      try {
        await apiService.delete('/tariffs', item.id);
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
        <div><h1>LDC Tariffs</h1><p>Configure pricing rules applied per unit of gas</p></div>
        <Button onClick={() => { setEditingItem(null); setFormData({ tariffCode: '', tariffName: '', ratePerUnit: '', slabFrom: '', slabTo: '', meterTypeId: '', effectiveFrom: '', status: 'ACTIVE' }); setIsModalOpen(true); }} icon={<FiPlus />}>Add New</Button>
      </div>
      <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit' : 'Add New'}>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group"><label>Tariff Code *</label><input type="text" name="tariffCode" value={formData.tariffCode} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input" /></div>
            <div className="form-group"><label>Tariff Name *</label><input type="text" name="tariffName" value={formData.tariffName} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Rate Per Unit *</label><input type="number" name="ratePerUnit" value={formData.ratePerUnit} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} step="0.01" required className="form-input" /></div>
            <div className="form-group"><label>Effective From *</label><input type="date" name="effectiveFrom" value={formData.effectiveFrom} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Slab From</label><input type="number" name="slabFrom" value={formData.slabFrom} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} step="0.01" className="form-input" /></div>
            <div className="form-group"><label>Slab To</label><input type="number" name="slabTo" value={formData.slabTo} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} step="0.01" className="form-input" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Meter Type ID</label><input type="number" name="meterTypeId" value={formData.meterTypeId} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} className="form-input" /></div>
            <div className="form-group"><label>Status *</label><select name="status" value={formData.status} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input"><option value="ACTIVE">ACTIVE</option><option value="INACTIVE">INACTIVE</option></select></div>
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

export default Tariffs;
