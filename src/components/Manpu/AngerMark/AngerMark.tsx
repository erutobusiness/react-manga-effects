import React, { useMemo } from 'react';
import styles from './AngerMark.module.css';

export interface AngerMarkProps {
    /**
     * Size of the mark. Can be a number (px) or string (e.g. '5rem').
     * @default 100
     */
    size?: number | string;
    /**
     * Primary color of the mark.
     * @default '#ff0000' (Red)
     */
    color?: string;
    /**
     * Visual style: '2d' (Flat) or '3d' (Gradient/Shadow).
     * @default '2d'
     */
    mode?: '2d' | '3d';
    /**
     * Animation preset.
     * @default 'static'
     */
    variant?: 'static' | 'anime';
    /**
     * Rotation angle in degrees.
     * @default 0
     */
    angle?: number;
    /** Additional CSS class names */
    className?: string;
    /** Inline styles */
    style?: React.CSSProperties;
}

export const AngerMark: React.FC<AngerMarkProps> = ({
    size = 100,
    color = '#ff0000',
    mode = '2d',
    variant = 'static',
    angle = 0,
    className = '',
    style,
}) => {
    // Generate unique ID for gradients
    const gradientId = useMemo(() => `anger-grad-${Math.random().toString(36).substr(2, 9)}`, []);

    // Animation class selection
    const animationClass = useMemo(() => {
        if (variant === 'anime') {
            return styles['animate-pulse'];
        }
        return '';
    }, [variant]);

    const is3D = mode === '3d';

    // Path definitions for 4 separate quadrants to create clearer separation
    // Each part is a curved shape bending outwards

    // Top-Left
    const pathTL = "M 45 15 Q 48 45 15 45 A 5 5 0 0 1 15 35 Q 38 35 35 15 A 5 5 0 0 1 45 15 Z";
    // Top-Right
    const pathTR = "M 55 15 Q 52 45 85 45 A 5 5 0 0 0 85 35 Q 62 35 65 15 A 5 5 0 0 0 55 15 Z";
    // Bottom-Left
    const pathBL = "M 45 85 Q 48 55 15 55 A 5 5 0 0 0 15 65 Q 38 65 35 85 A 5 5 0 0 0 45 85 Z";
    // Bottom-Right
    const pathBR = "M 55 85 Q 52 55 85 55 A 5 5 0 0 1 85 65 Q 62 65 65 85 A 5 5 0 0 1 55 85 Z";


    return (
        <div
            className={`${styles.container} ${className}`}
            style={{
                width: size,
                height: size,
                transform: `rotate(${angle}deg)`,
                ...style
            }}
            role="img"
            aria-label="Anger Mark"
        >
            <div
                className={animationClass}
                style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <svg
                    viewBox="0 0 100 100"
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ overflow: 'visible' }}
                >
                    <defs>
                        {is3D && (
                            <>
                                {/* Main body gradient */}
                                <linearGradient id={`${gradientId}-body`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={color} style={{ stopOpacity: 1 }} />
                                    <stop offset="100%" stopColor={color} style={{ stopOpacity: 0.8 }} />
                                </linearGradient>

                                {/* Highlight gradient */}
                                <linearGradient id={`${gradientId}-highlight`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="white" style={{ stopOpacity: 0.9 }} />
                                    <stop offset="100%" stopColor="white" style={{ stopOpacity: 0 }} />
                                </linearGradient>

                                {/* Drop shadow filter */}
                                <filter id={`${gradientId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="1" dy="1" stdDeviation="1.5" floodOpacity="0.4" />
                                </filter>
                            </>
                        )}
                    </defs>

                    <g
                        fill={is3D ? `url(#${gradientId}-body)` : color}
                        filter={is3D ? `url(#${gradientId}-shadow)` : 'none'}
                    >
                        <path d={pathTL} />
                        <path d={pathTR} />
                        <path d={pathBL} />
                        <path d={pathBR} />
                    </g>

                    {/* 3D Highlights on the outer curves */}
                    {is3D && (
                        <g
                            stroke={`url(#${gradientId}-highlight)`}
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.6"
                        >
                            <path d="M 38 20 Q 40 35 25 38" /> {/* TL Highlight */}
                            <path d="M 62 20 Q 60 35 75 38" /> {/* TR Highlight */}
                        </g>
                    )}
                </svg>
            </div>
        </div>
    );
};
