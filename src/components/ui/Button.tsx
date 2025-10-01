import React from "react";

type ButtonSize = 'sm' | 'md' | 'lg';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  size?: ButtonSize;
  variant?: 'primary' | 'secondary' | 'outline' | 'muted' | 'white';
};

const sizeStyles: Record<ButtonSize, string> = { sm: 'btn-sm', md: 'btn-md', lg: 'btn-lg' };
const variantStyles = { primary: 'btn-primary', secondary: 'btn-secondary', outline: 'btn-outline', muted: 'btn-muted', white: 'btn-white' };

export default function Button({ loading, children, size = 'md', variant = 'primary', className, ...rest }: Props) {
  const merged = [
  'btn-base',
  sizeStyles[size],
  variantStyles[variant],
  'disabled:opacity-50 disabled:cursor-not-allowed',
    className ?? ''
  ].join(' ');
  return (
    <button
      {...rest}
      className={merged}
      disabled={loading || rest.disabled}
    >
      {loading ? "Buscando..." : children}
    </button>
  );
}
