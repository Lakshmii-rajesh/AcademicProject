import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'btn-' + variant;
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
