import React from 'react';

interface JsonViewerProps {
    data: any;
    title?: string;
    className?: string;
}

export const JsonViewer = ({ data, title, className = '' }: JsonViewerProps) => {
    const isString = typeof data === 'string';
    return (
        <div className={`w-full border-2 border-black ${isString ? 'bg-white text-black' : 'bg-gray-900 text-green-400'} font-mono text-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden ${className}`}>
            {title && (
                <div className="bg-black text-white px-4 py-1 text-xs font-bold uppercase tracking-widest border-b-2 border-gray-800 flex justify-between items-center">
                    <span>{title}</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                </div>
            )}
            <div className="p-4 overflow-auto max-h-[500px]">
                {typeof data === 'string' ? (
                    <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-gray-800">{data}</pre>
                ) : (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                )}
            </div>
        </div>
    );
};
