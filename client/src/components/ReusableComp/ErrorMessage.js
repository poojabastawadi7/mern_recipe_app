import React from 'react';

const ErrorMessage = ({ message }) => (
  message ? <p style={{ color: 'red', marginBottom: '10px' }}>{message}</p> : null
);

export default ErrorMessage;
