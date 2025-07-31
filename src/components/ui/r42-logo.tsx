import React from 'react';

interface R42LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const R42Logo: React.FC<R42LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto',
    lg: 'h-10 w-auto'
  };

  return (
    <img 
      src="/r42 logo.png" 
      alt="R42 Logo" 
      className={`${sizeClasses[size]} ${className} object-contain`}
    />
  );
};

export default R42Logo; 