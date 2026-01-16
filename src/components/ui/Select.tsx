import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
}

export const Select = ({ label, children, className = '', ...props }: SelectProps) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    className={`w-full appearance-none bg-white border-2 border-black px-4 py-2 font-bold text-gray-800 focus:outline-none focus:ring-0 focus:border-pink-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:shadow-none ${className}`}
                    {...props}
                >
                    {children}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
