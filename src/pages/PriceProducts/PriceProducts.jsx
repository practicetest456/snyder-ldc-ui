import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import apiService from '../../services/apiService';
import { formatDate } from '../../utils/dateUtils';
import './PriceProducts.css';

const PriceProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    productCode: '', productName: '', pricingType: 'FIXED', basePrice: '', formulaReference: '', effectiveFrom: '', poolingPointId: '', status: 'ACTIVE'
  });

  const columns = [
    { key: 'productCode', label: 'Code' },
    { key: 'productName', label: 'Name' },
    { key: 'pricingType', label: 'Type' },
    { key: 'basePrice', label: 'Base Price', render: (v) => `$${parseFloat(v).toFixed(2)}` },
    { key: 'status', label: 'Status', render: (value) => <span className={`status-badge status-${value.toLowerCase()}`}>{value}</span> }
  ];

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAll('/price-products');
      setData(response.data._embedded.priceProductModelList || []);
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
        await apiService.update('/price-products', editingItem.id, formData);
        toast.success('Updated');
      } else {
        await apiService.create('/price-products', formData);
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
    setFormData({ productCode: item.productCode || '', productName: item.productName || '', pricingType: item.pricingType || 'FIXED', basePrice: item.basePrice || '', formulaReference: item.formulaReference || '', effectiveFrom: item.effectiveFrom?.split('T')[0] || '', poolingPointId: item.poolingPointId || '', status: item.status || 'ACTIVE' });
    setIsModalOpen(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm('Delete?')) {
      try {
        await apiService.delete('/price-products', item.id);
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
        <div><h1>Price Products</h1><p>Define gas pricing contracts</p></div>
        <Button onClick={() => { setEditingItem(null); setFormData({ productCode: '', productName: '', pricingType: 'FIXED', basePrice: '', formulaReference: '', effectiveFrom: '', poolingPointId: '', status: 'ACTIVE' }); setIsModalOpen(true); }} icon={<FiPlus />}>Add New</Button>
      </div>
      <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit' : 'Add New'}>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group"><label>Product Code *</label><input type="text" name="productCode" value={formData.productCode} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input" /></div>
            <div className="form-group"><label>Product Name *</label><input type="text" name="productName" value={formData.productName} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Pricing Type *</label><select name="pricingType" value={formData.pricingType} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input"><option value="FIXED">FIXED</option><option value="FLOATING">FLOATING</option></select></div>
            <div className="form-group"><label>Base Price *</label><input type="number" name="basePrice" value={formData.basePrice} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} step="0.01" required className="form-input" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Formula Reference</label><input type="text" name="formulaReference" value={formData.formulaReference} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} className="form-input" /></div>
            <div className="form-group"><label>Effective From *</label><input type="date" name="effectiveFrom" value={formData.effectiveFrom} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} required className="form-input" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Pooling Point ID</label><input type="number" name="poolingPointId" value={formData.poolingPointId} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})} className="form-input" /></div>
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

export default PriceProducts;
