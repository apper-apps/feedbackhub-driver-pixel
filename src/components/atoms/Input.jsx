import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(({ 
  type = 'text',
  className = '',
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'w-full px-3 py-2 border rounded-lg transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
        'placeholder:text-gray-400',
        error 
          ? 'border-red-300 focus:ring-red-500' 
          : 'border-gray-300 hover:border-gray-400',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;