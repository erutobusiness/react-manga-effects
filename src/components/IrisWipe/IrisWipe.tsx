import React, { CSSProperties, useRef } from 'react';
import { IrisWipeProps } from '../../types';
import './IrisWipe.css';

export const IrisWipe: React.FC<IrisWipeProps> = ({
    children,
    isOpen,
    center = { x: 50, y: 50 },
    duration = 500,
    easing = 'easeInOut',
    onComplete,
    className = '',
    style,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Convert easing function to string if possible, or fallback/custom logic
    // Since CSS transition-timing-function requires a string (bezier/keyword),
    // we primarily support string values. If a function is passed, we might need JS animation,
    // but requirements said "handled entirely by CSS transitions".
    // So we will assume 'easing' prop is primarily a string for CSS, 
    // or mapped to a cubic-bezier if it's a known preset.

    // Note: True JS-based easing functions (t => number) cannot be directly used in CSS.
    // We will respect the string preset names. If a function is passed, we default to ease-in-out
    // for CSS compliance unless we implement a JS-driven animation loop (which contradicts requirements).

    let easingString = 'ease-in-out';
    if (typeof easing === 'string') {
        // Map generic names to CSS equivalents if needed, or pass through
        switch (easing) {
            case 'linear': easingString = 'linear'; break;
            case 'easeIn': easingString = 'ease-in'; break;
            case 'easeOut': easingString = 'ease-out'; break;
            case 'easeInOut': easingString = 'ease-in-out'; break;
            default: easingString = easing; // Allow custom cubic-bezier strings
        }
    }

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        // Only trigger if correct property finished
        if (e.propertyName === 'clip-path' && onComplete) {
            onComplete();
        }
    };

    const dynamicStyles: CSSProperties & Record<string, string | number> = {
        '--iris-cx': `${center.x}%`,
        '--iris-cy': `${center.y}%`,
        '--iris-duration': `${duration}ms`,
        '--iris-easing': easingString,
        ...style,
    };

    return (
        <div
            ref={containerRef}
            className={`iris-wipe ${className}`}
            data-state={isOpen ? 'open' : 'closed'}
            style={dynamicStyles}
            onTransitionEnd={handleTransitionEnd}
        >
            {children}
        </div>
    );
};
