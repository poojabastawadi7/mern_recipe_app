import React from 'react';

const FormWrapper = ({ title, children }) => (
  <div style={{
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px'
  }}>
    <h2>{title}</h2>
    {children}
  </div>
);

export default FormWrapper;
