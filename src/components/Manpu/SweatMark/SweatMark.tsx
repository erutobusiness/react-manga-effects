import React, { useMemo } from 'react';
import styles from './SweatMark.module.css';

export interface SweatMarkProps {
    /**
     * Size of the mark. Can be a number (px) or string (e.g. '5rem').
     * @default 100
     */
    size?: number | string;
    /**
     * Primary color of the mark.
     * @default '#00bfff' (Deep Sky Blue)
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

export const SweatMark: React.FC<SweatMarkProps> = ({
    size = 100,
    color = '#00bfff',
    mode = '2d',
    variant = 'static',
    angle = 0,
    className = '',
    style,
}) => {
    // Generate unique ID for gradients
    const gradientId = useMemo(() => `sweat-grad-${Math.random().toString(36).substr(2, 9)}`, []);

    // Animation class selection
    const animationClass = useMemo(() => {
        if (variant === 'anime') {
            return styles['animate-drop'];
        }
        return '';
    }, [variant]);

    const is3D = mode === '3d';

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
            aria-label="Sweat Mark"
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
                                <linearGradient id={`${gradientId}-body`} x1="30%" y1="20%" x2="70%" y2="80%">
                                    <stop offset="0%" stopColor={color} style={{ stopOpacity: 0.8 }} />
                                    <stop offset="100%" stopColor={color} style={{ stopOpacity: 1 }} />
                                </linearGradient>

                                {/* Refraction/Highlight gradient */}
                                <linearGradient id={`${gradientId}-highlight`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="white" style={{ stopOpacity: 0.9 }} />
                                    <stop offset="40%" stopColor="white" style={{ stopOpacity: 0.1 }} />
                                    <stop offset="100%" stopColor="white" style={{ stopOpacity: 0 }} />
                                </linearGradient>

                                {/* Drop shadow filter */}
                                <filter id={`${gradientId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
                                </filter>
                            </>
                        )}
                    </defs>

                    {/* Sweat Drop Path */}
                    {/* Teardrop shape: Pointier top, round bottom. */}
                    <path
                        d="M 50 5 
                           C 50 5 20 45 20 65 
                           A 30 30 0 0 0 80 65 
                           C 80 45 50 5 50 5 Z"
                        fill={is3D ? `url(#${gradientId}-body)` : color}
                        stroke={is3D ? 'none' : color}
                        strokeWidth="0"
                        filter={is3D ? `url(#${gradientId}-shadow)` : 'none'}
                    />

                    {/* 3D Reflection/Highlight */}
                    {is3D && (
                        <>
                            {/* Top reflection */}
                            <path
                                d="M 45 20 C 35 35 30 50 30 65 A 10 10 0 0 0 32 70"
                                stroke={`url(#${gradientId}-highlight)`}
                                strokeWidth="4"
                                strokeLinecap="round"
                                fill="none"
                                opacity="0.8"
                            />
                            {/* Dot highlight */}
                            <circle cx="65" cy="55" r="4" fill="white" opacity="0.6" />
                        </>
                    )}
                </svg>
            </div>
        </div>
    );
};
