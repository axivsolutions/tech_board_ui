import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  padding = 'md',
  shadow = 'md',
  onClick,
  draggable = false,
  onDragStart
}) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  const cardClasses = `
    bg-white rounded-lg border border-gray-200 transition-shadow duration-200
    ${shadowClasses[shadow]} ${paddingClasses[padding]}
    ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}
    ${className}
  `;

  return (
    <div 
      className={cardClasses} 
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;