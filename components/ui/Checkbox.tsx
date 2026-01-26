import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    return (
      <div>
        <div className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={`
              h-6 w-6 rounded-xl border-2 border-gray-300 text-white
              focus:ring-2 focus:ring-red-500 focus:ring-offset-0
              checked:bg-red-600 checked:border-red-600 checked:hover:bg-red-700
              accent-red-600
              cursor-pointer transition-all
              ${hasError ? 'border-red-300' : ''}
              ${className}
            `}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="ml-2 block text-sm text-gray-700 cursor-pointer select-none"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
