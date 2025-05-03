import React from 'react';

const Button = ({ text, onClick, type = 'button', style = {} }) => (
  <button type={type} onClick={onClick} style={{ padding: '10px 20px', ...style }}>
    {text}
  </button>
);

export default Button;
