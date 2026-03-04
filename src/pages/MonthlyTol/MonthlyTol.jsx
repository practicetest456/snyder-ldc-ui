import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import apiService from '../../services/apiService';
import './MonthlyTol.css';

const MonthlyTol = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    month: '', year: '', allocatedQuantity: '', deliveredQuantity: '', variancePercentage: '', penaltyAmount: '', meterId: ''
  });

  const columns = [
    { key: 'month', label: 'Month' },
    { key: 'year', label: 'Year' },
    { key: 'allocatedQuantity', label: 'Allocated', render: (v) => parseFloat(v).toFixed(2) },
    { key: 'deliveredQuantity', label: 'Delivered', render: (v) => parseFloat(v).toFixed(2) },
    { key: 'variancePercentage', label: 'Variance %', render: (v) => v ? `${parseFloat(v).toFixed(2)}%` : "-" }
  ];

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAll('/monthly-tol');
      setData(response.data._embedded.monthlyTolModelList || []);
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
        await apiService.update('/monthly-tol', editingItem.id, formData);
        toast.success('Updated');
      } else {
        await apiService.create('/monthly-tol', formData);
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
    setFormData({ month: item.month || '', year: item.year || '', allocatedQuantity: item.allocatedQuantity || '', deliveredQuantity: item.deliveredQuantity || '', variancePercentage: item.variancePercentage || '', penaltyAmount: item.penaltyAmount || '', meterId: item.meterId || '' });
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm('Delete?')) {
      try {
        await apiService.delete('/monthly-tol', item.id);
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
        <div><h1>Monthly TOL</h1><p>Calculate and manage Transportation Overrun Limits</p></div>
        <Button onClick={() => { setEditingItem(null); setFormData({ month: '', year: '', allocatedQuantity: '', deliveredQuantity: '', variancePercentage: '', penaltyAmount: '', meterId: '' }); setIsModalOpen(true); }} icon={<FiPlus />}>Add New</Button>
      </div>
      <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit' : 'Add New'}>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group"><label>Month *</label><input type="text" name="month" value={formData.month} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input" /></div>
            <div className="form-group"><label>Year *</label><input type="number" name="year" value={formData.year} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Allocated Quantity *</label><input type="number" name="allocatedQuantity" value={formData.allocatedQuantity} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} step="0.01" required className="form-input" /></div>
            <div className="form-group"><label>Delivered Quantity *</label><input type="number" name="deliveredQuantity" value={formData.deliveredQuantity} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} step="0.01" required className="form-input" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Variance %</label><input type="number" name="variancePercentage" value={formData.variancePercentage} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} step="0.01" className="form-input" /></div>
            <div className="form-group"><label>Penalty Amount</label><input type="number" name="penaltyAmount" value={formData.penaltyAmount} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} step="0.01" className="form-input" /></div>
          </div>
          <div className="form-group"><label>Meter ID</label><input type="number" name="meterId" value={formData.meterId} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} className="form-input" /></div>
          <div className="form-actions">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editingItem ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MonthlyTol;
