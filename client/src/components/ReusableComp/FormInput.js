import React from 'react';

const FormInput = ({ label, type = 'text', value, onChange, required = true }) => (
  <div style={{ marginBottom: '10px' }}>
    <label>{label}</label><br />
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      style={{ padding: '8px', width: '100%' }}
    />
  </div>
);

export default FormInput;
