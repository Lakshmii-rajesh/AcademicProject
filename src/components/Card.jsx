import React from 'react';

const Card = ({ children, className = '', title, subtitle, footer, ...props }) => {
  return (
    <div className={`card-premium ${className}`} {...props}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-xl font-bold text-slate-900">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="relative">
        {children}
      </div>
      {footer && (
        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
