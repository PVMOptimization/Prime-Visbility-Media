import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#00F0FF] text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105',
    secondary: 'bg-[#B026FF] text-white hover:shadow-[0_0_30px_rgba(176,38,255,0.6)] hover:scale-105',
    outline: 'border-2 border-[#B026FF] text-[#B026FF] hover:bg-[#B026FF] hover:text-white hover:shadow-[0_0_30px_rgba(176,38,255,0.4)]'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
