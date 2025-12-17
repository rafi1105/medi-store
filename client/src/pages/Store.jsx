import React from 'react';
import OrderForm from '../components/OrderForm';

const Store = () => {
  return (
    <div>
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h1 style={{ color: 'var(--medical-secondary)' }}>Our Medicine Store</h1>
        <p>Browse our catalog or place a direct order below.</p>
      </div>
      <OrderForm />
    </div>
  );
};

export default Store;
