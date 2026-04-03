import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <input
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500/10' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 ml-1 text-xs text-red-500 font-medium animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
