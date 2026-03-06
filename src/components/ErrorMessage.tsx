import React from 'react';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return <div>Error: {message}</div>;
};

export default ErrorMessage;