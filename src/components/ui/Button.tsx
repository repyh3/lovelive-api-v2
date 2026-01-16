import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) => {
    const baseStyles = "font-black tracking-wide uppercase transition-all duration-200 transform border-2 border-black active:translate-y-1 active:shadow-none";

    const variants = {
        primary: "bg-pink-500 text-white hover:bg-pink-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        secondary: "bg-white text-black hover:bg-rose-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        accent: "bg-rose-500 text-white hover:bg-rose-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-6 py-2 text-base",
        lg: "px-8 py-3 text-lg",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
