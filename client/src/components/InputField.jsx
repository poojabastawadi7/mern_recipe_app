import React, { useState } from 'react';


const InputField = ({ id, name, label, type, value, onChange, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default InputField;
