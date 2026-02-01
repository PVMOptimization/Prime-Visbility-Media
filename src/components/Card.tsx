import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  accentColor?: 'blue' | 'purple';
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  accentColor = 'blue',
  className = '',
  hover = false
}: CardProps) {
  const accentColors = {
    blue: 'before:bg-[#00F0FF]',
    purple: 'before:bg-[#B026FF]'
  };

  const hoverEffect = hover ? 'hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] hover:scale-105' : '';

  return (
    <div
      className={`
        relative bg-[#1A1A1A] backdrop-blur-sm bg-opacity-50
        rounded-xl p-8 border border-gray-800
        before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:rounded-t-xl
        ${accentColors[accentColor]}
        transition-all duration-300 ${hoverEffect}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
