import React from 'react';
import {
  FiDollarSign, FiCpu, FiBarChart2, FiMapPin,
  FiDatabase, FiTag, FiTrendingUp, FiShoppingCart
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const cards = [
    {
      title: 'LDC Charges',
      description: 'Manage operational and distribution charges',
      icon: FiDollarSign,
      path: '/charges',
      color: '#3b82f6',
      count: '-'
    },
    {
      title: 'Meter Types',
      description: 'Define and manage meter categories',
      icon: FiCpu,
      path: '/meter-types',
      color: '#8b5cf6',
      count: '-'
    },
    {
      title: 'Quantities',
      description: 'Track gas volume measurements',
      icon: FiBarChart2,
      path: '/quantities',
      color: '#06b6d4',
      count: '-'
    },
    {
      title: 'Pooling Points',
      description: 'Manage gas supply aggregation locations',
      icon: FiMapPin,
      path: '/pooling-points',
      color: '#10b981',
      count: '-'
    },
    {
      title: 'Storage Types',
      description: 'Define gas storage categories',
      icon: FiDatabase,
      path: '/storage-types',
      color: '#f59e0b',
      count: '-'
    },
    {
      title: 'Tariffs',
      description: 'Configure pricing rules per unit',
      icon: FiTag,
      path: '/tariffs',
      color: '#ec4899',
      count: '-'
    },
    {
      title: 'Monthly TOL',
      description: 'Transportation Overrun Limits',
      icon: FiTrendingUp,
      path: '/monthly-tol',
      color: '#f43f5e',
      count: '-'
    },
    {
      title: 'Price Products',
      description: 'Define gas pricing contracts',
      icon: FiShoppingCart,
      path: '/price-products',
      color: '#6366f1',
      count: '-'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Snyder LDC Management System</h1>
        <p>Local Distribution Company Configuration Dashboard</p>
      </div>
      <div className="dashboard-info">
        <div className="info-card">
          <h3>Welcome to Snyder LDC</h3>
          <p>
            This comprehensive management system provides complete control over your
            Local Distribution Company operations. Navigate through different modules
            to manage charges, meter types, quantities, pooling points, storage,
            tariffs, and pricing products.
          </p>
        </div>
      </div>
      <div className="dashboard-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              to={card.path}
              key={card.path}
              className="dashboard-card"
              style={{ '--card-color': card.color }}
            >
              <div className="card-icon-wrapper">
                <Icon className="card-icon" />
              </div>
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
              <div className="card-footer">
                <span className="card-link">Manage →</span>
              </div>
            </Link>
          );
        })}
      </div>


    </div>
  );
};

export default Dashboard;
