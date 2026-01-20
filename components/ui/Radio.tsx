import React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
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
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    return (
      <div>
        <div className="flex items-center">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={`
              h-4 w-4 border-gray-300 text-red-600
              focus:ring-2 focus:ring-red-500
              ${hasError ? 'border-red-300' : ''}
              ${className}
            `}
            {...props}
          />
          {label && (
            <label
              htmlFor={radioId}
              className="ml-2 block text-sm text-gray-700"
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

Radio.displayName = 'Radio';
