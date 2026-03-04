import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiDollarSign, FiCpu, FiBarChart2, 
  FiMapPin, FiDatabase, FiTag, FiTrendingUp, 
  FiShoppingCart, FiMenu, FiX 
} from 'react-icons/fi';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/charges', icon: FiDollarSign, label: 'LDC Charges' },
    { path: '/meter-types', icon: FiCpu, label: 'Meter Types' },
    { path: '/quantities', icon: FiBarChart2, label: 'Quantities' },
    { path: '/pooling-points', icon: FiMapPin, label: 'Pooling Points' },
    { path: '/storage-types', icon: FiDatabase, label: 'Storage Types' },
    { path: '/tariffs', icon: FiTag, label: 'Tariffs' },
    { path: '/monthly-tol', icon: FiTrendingUp, label: 'Monthly TOL' },
    { path: '/price-products', icon: FiShoppingCart, label: 'Price Products' },
  ];

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h1 className="logo">
            {sidebarOpen ? 'Snyder LDC' : 'SL'}
          </h1>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon className="nav-icon" />
                {sidebarOpen && <span className="nav-label">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Header */}
        <header className="header">
          <button 
            className="toggle-btn" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          
          <div className="header-right">
            <span className="user-info">Welcome, Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
