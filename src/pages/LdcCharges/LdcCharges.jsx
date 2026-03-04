import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import apiService from '../../services/apiService';
import { formatDate } from '../../utils/dateUtils';
import './LdcCharges.css';

const LdcCharges = () => {
  const [charges, setCharges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCharge, setEditingCharge] = useState(null);
  const [formData, setFormData] = useState({
    chargeCode: '',
    chargeName: '',
    chargeType: 'FIXED',
    amount: '',
    effectiveFrom: '',
    effectiveTo: '',
    serviceAreaId: '',
    status: 'ACTIVE'
  });

  const columns = [
    { key: 'chargeCode', label: 'Charge Code' },
    { key: 'chargeName', label: 'Charge Name' },
    { key: 'chargeType', label: 'Type' },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (value) => `$${parseFloat(value).toFixed(2)}`
    },
    { 
      key: 'effectiveFrom', 
      label: 'Effective From',
      render: (value) => formatDate(value)
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
    fetchCharges();
  }, []);

  const fetchCharges = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAll('/charges');
      setCharges(response.data._embedded.ldcChargeModelList || []);
    } catch (error) {
      console.error('Error fetching charges:', error);
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
      if (editingCharge) {
        await apiService.update('/charges', editingCharge.id, formData);
        toast.success('Charge updated successfully');
      } else {
        await apiService.create('/charges', formData);
        toast.success('Charge created successfully');
      }
      
      fetchCharges();
      closeModal();
    } catch (error) {
      console.error('Error saving charge:', error);
    }
  };

  const handleEdit = (charge) => {
    setEditingCharge(charge);
    setFormData({
      chargeCode: charge.chargeCode,
      chargeName: charge.chargeName,
      chargeType: charge.chargeType,
      amount: charge.amount,
      effectiveFrom: charge.effectiveFrom?.split('T')[0] || '',
      effectiveTo: charge.effectiveTo?.split('T')[0] || '',
      serviceAreaId: charge.serviceAreaId || '',
      status: charge.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (charge) => {
    if (window.confirm(`Are you sure you want to delete ${charge.chargeName}?`)) {
      try {
        await apiService.delete('/charges', charge.id);
        toast.success('Charge deleted successfully');
        fetchCharges();
      } catch (error) {
        console.error('Error deleting charge:', error);
      }
    }
  };

  const openModal = () => {
    setEditingCharge(null);
    setFormData({
      chargeCode: '',
      chargeName: '',
      chargeType: 'FIXED',
      amount: '',
      effectiveFrom: '',
      effectiveTo: '',
      serviceAreaId: '',
      status: 'ACTIVE'
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCharge(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>LDC Charges</h1>
          <p>Manage operational and distribution charges applied by LDC</p>
        </div>
        <Button 
          onClick={openModal} 
          icon={<FiPlus />}
        >
          Add New Charge
        </Button>
      </div>

      <Table
        columns={columns}
        data={charges}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCharge ? 'Edit Charge' : 'Add New Charge'}
      >
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="chargeCode">Charge Code *</label>
              <input
                type="text"
                id="chargeCode"
                name="chargeCode"
                value={formData.chargeCode}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="chargeName">Charge Name *</label>
              <input
                type="text"
                id="chargeName"
                name="chargeName"
                value={formData.chargeName}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="chargeType">Charge Type *</label>
              <select
                id="chargeType"
                name="chargeType"
                value={formData.chargeType}
                onChange={handleInputChange}
                required
                className="form-input"
              >
                <option value="FIXED">FIXED</option>
                <option value="VARIABLE">VARIABLE</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount *</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                step="0.01"
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="effectiveFrom">Effective From *</label>
              <input
                type="date"
                id="effectiveFrom"
                name="effectiveFrom"
                value={formData.effectiveFrom}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="effectiveTo">Effective To</label>
              <input
                type="date"
                id="effectiveTo"
                name="effectiveTo"
                value={formData.effectiveTo}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="serviceAreaId">Service Area ID</label>
              <input
                type="number"
                id="serviceAreaId"
                name="serviceAreaId"
                value={formData.serviceAreaId}
                onChange={handleInputChange}
                className="form-input"
              />
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
          </div>

          <div className="form-actions">
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingCharge ? 'Update' : 'Create'} Charge
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LdcCharges;
