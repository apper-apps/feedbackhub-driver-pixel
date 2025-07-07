import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Textarea = forwardRef(({ 
  className = '',
  error = false,
  rows = 4,
  ...props 
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full px-3 py-2 border rounded-lg transition-all duration-200 resize-none',
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

Textarea.displayName = 'Textarea';

export default Textarea;