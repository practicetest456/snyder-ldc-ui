import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import apiService from '../../services/apiService';
import { formatDate } from '../../utils/dateUtils';
import './Quantities.css';

const Quantities = () => {
  const [quantities, setQuantities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    quantityType: 'ALLOCATED',
    value: '',
    unit: 'MCF',
    recordedDate: '',
    meterId: '',
    remarks: ''
  });

  const columns = [
    { key: 'quantityType', label: 'Type' },
    { key: 'value', label: 'Value', render: (v) => parseFloat(v).toFixed(2) },
    { key: 'unit', label: 'Unit' },
    { key: 'recordedDate', label: 'Recorded Date', render: formatDate },
    { key: 'meterId', label: 'Meter ID' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAll('/quantities');
      setQuantities(response.data._embedded.ldcQuantityModelList || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiService.update('/quantities', editing.id, formData);
        toast.success('Quantity updated');
      } else {
        await apiService.create('/quantities', formData);
        toast.success('Quantity created');
      }
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setEditing(item);
    setFormData({
      quantityType: item.quantityType,
      value: item.value,
      unit: item.unit,
      recordedDate: item.recordedDate?.split('T')[0] || '',
      meterId: item.meterId || '',
      remarks: item.remarks || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm('Delete this quantity?')) {
      try {
        await apiService.delete('/quantities', item.id);
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
          <h1>LDC Quantities</h1>
          <p>Track and manage gas volume measurements</p>
        </div>
        <Button onClick={() => { setEditing(null); setFormData({ quantityType: 'ALLOCATED', value: '', unit: 'MCF', recordedDate: '', meterId: '', remarks: '' }); setIsModalOpen(true); }} icon={<FiPlus />}>
          Add Quantity
        </Button>
      </div>

      <Table columns={columns} data={quantities} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? 'Edit Quantity' : 'Add Quantity'}>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label>Quantity Type *</label>
              <select name="quantityType" value={formData.quantityType} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input">
                <option value="ALLOCATED">ALLOCATED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="SCHEDULED">SCHEDULED</option>
              </select>
            </div>
            <div className="form-group">
              <label>Value *</label>
              <input type="number" name="value" value={formData.value} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} step="0.01" required className="form-input" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Unit *</label>
              <select name="unit" value={formData.unit} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input">
                <option value="MCF">MCF</option>
                <option value="MMBTU">MMBTU</option>
              </select>
            </div>
            <div className="form-group">
              <label>Recorded Date *</label>
              <input type="date" name="recordedDate" value={formData.recordedDate} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input" />
            </div>
          </div>
          <div className="form-group">
            <label>Meter ID</label>
            <input type="number" name="meterId" value={formData.meterId} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} className="form-input" />
          </div>
          <div className="form-group">
            <label>Remarks</label>
            <textarea name="remarks" value={formData.remarks} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} className="form-textarea" rows="2" />
          </div>
          <div className="form-actions">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{editing ? 'Update' : 'Create'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Quantities;
