import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import Layout from './components/Layout/Layout';

// Pages
import Dashboard from './pages/Dashboard/Dashboard';
import LdcCharges from './pages/LdcCharges/LdcCharges';
import MeterTypes from './pages/MeterTypes/MeterTypes';
import Quantities from './pages/Quantities/Quantities';
import PoolingPoints from './pages/PoolingPoints/PoolingPoints';
import StorageTypes from './pages/StorageTypes/StorageTypes';
import Tariffs from './pages/Tariffs/Tariffs';
import MonthlyTol from './pages/MonthlyTol/MonthlyTol';
import PriceProducts from './pages/PriceProducts/PriceProducts';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/charges" element={<LdcCharges />} />
          <Route path="/meter-types" element={<MeterTypes />} />
          <Route path="/quantities" element={<Quantities />} />
          <Route path="/pooling-points" element={<PoolingPoints />} />
          <Route path="/storage-types" element={<StorageTypes />} />
          <Route path="/tariffs" element={<Tariffs />} />
          <Route path="/monthly-tol" element={<MonthlyTol />} />
          <Route path="/price-products" element={<PriceProducts />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
