import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const Button = forwardRef(({ 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false,
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-soft hover:shadow-medium',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-soft hover:shadow-medium',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-soft hover:shadow-medium',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-soft hover:shadow-medium',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        'font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;