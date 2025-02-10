import React, { ReactNode } from 'react';

interface TooltipProps {
    text: string;
    children: ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position }) => {

    let tooltipPositionClasses = '';
    switch (position) {
        case 'top':
            tooltipPositionClasses = 'group-hover:bottom-full group-hover:mb-2 group-hover:left-1/2 group-hover:-translate-x-1/2';
            break;
        case 'bottom':
            tooltipPositionClasses = 'group-hover:top-full group-hover:mt-2 group-hover:left-1/2 group-hover:-translate-x-1/2';
            break;
        case 'left':
            tooltipPositionClasses = 'group-hover:right-full group-hover:mr-2 group-hover:top-1/2 group-hover:-translate-y-1/2';
            break;
        case 'right':
            tooltipPositionClasses = 'group-hover:left-full group-hover:ml-2 group-hover:top-0 group-hover:translate-y-0';
            break;
        default:
            tooltipPositionClasses = 'group-hover:bottom-full group-hover:mb-2 group-hover:left-1/2 group-hover:-translate-x-1/2'; 
    }

    return (
        <div className="relative group inline-block">
            {children}
            <div
                className={`absolute z-10 bg-gray-800 text-white text-sm rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none ${tooltipPositionClasses}`}
            >
                {text}
            </div>
        </div>
    );
};

export default Tooltip;