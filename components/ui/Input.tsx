
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({ label, error, helperText, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
      <input
        className={`
          w-full px-3 py-2 bg-white border rounded-lg text-sm transition-all
          placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent
          ${error ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:ring-indigo-100 focus:border-indigo-500'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};

export default Input;
