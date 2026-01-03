import React, { useMemo } from 'react';
import styles from './HeartMark.module.css';

export interface HeartMarkProps {
    /**
     * Size of the heart. Can be a number (px) or string (e.g. '5rem').
     * @default 100
     */
    size?: number | string;
    /**
     * Primary color of the heart.
     * @default '#ff4081' (Pink)
     */
    color?: string;
    /**
     * Visual style: '2d' (Flat) or '3d' (_Glossy_/Gradient).
     * @default '2d'
     */
    mode?: '2d' | '3d';
    /**
     * Animation preset.
     * @default 'static'
     */
    variant?: 'static' | 'beat' | 'pop' | 'float';
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

export const HeartMark: React.FC<HeartMarkProps> = ({
    size = 100,
    color = '#ff4081',
    mode = '2d',
    variant = 'static',
    angle = 0,
    className = '',
    style,
}) => {
    // Generate unique ID for gradients to avoid conflicts if multiple hearts are on screen
    const gradientId = useMemo(() => `heart-grad-${Math.random().toString(36).substr(2, 9)}`, []);

    // Animation class selection
    const animationClass = useMemo(() => {
        switch (variant) {
            case 'beat': return styles['animate-beat'];
            case 'pop': return styles['animate-pop'];
            case 'float': return styles['animate-float'];
            default: return '';
        }
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
            aria-label="Heart Mark"
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
                                {/* Main body gradient for 3D fullness */}
                                <linearGradient id={`${gradientId}-body`} x1="20%" y1="20%" x2="80%" y2="80%">
                                    <stop offset="0%" stopColor={color} style={{ stopOpacity: 1 }} />
                                    <stop offset="100%" stopColor={color} style={{ stopOpacity: 0.6 }} />
                                    {/* Slightly darkening/fading at bottom right for volume */}
                                </linearGradient>

                                {/* Highlight gradient */}
                                <linearGradient id={`${gradientId}-highlight`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="white" style={{ stopOpacity: 0.8 }} />
                                    <stop offset="100%" stopColor="white" style={{ stopOpacity: 0 }} />
                                </linearGradient>

                                {/* Drop shadow filter */}
                                <filter id={`${gradientId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="2" dy="4" stdDeviation="2" floodOpacity="0.3" />
                                </filter>
                            </>
                        )}
                    </defs>

                    {/* Heart Path */}
                    {/* M50 90 C10 60 -10 30 10 10 C30 -10 50 10 50 20 C50 10 70 -10 90 10 C110 30 90 60 50 90 Z */}
                    {/* Adjusted standard heart path to fit 0-100 box nicely. Top enters around 20-30, bottom at 90. */}
                    <path
                        d="M50 85 C20 60 5 40 5 25 A22 22 0 0 1 50 25 A22 22 0 0 1 95 25 C95 40 80 60 50 85 Z"
                        fill={is3D ? `url(#${gradientId}-body)` : color}
                        stroke={is3D ? 'none' : color} // Stroke helps smoothing in 2d
                        strokeWidth="1"
                        filter={is3D ? `url(#${gradientId}-shadow)` : 'none'}
                    />

                    {/* 3D Highlight Overlay */}
                    {is3D && (
                        <path
                            d="M25 25 A12 12 0 0 1 45 20"
                            stroke={`url(#${gradientId}-highlight)`}
                            strokeWidth="5"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.8"
                        />
                    )}
                    {is3D && (
                        <circle cx="75" cy="22" r="3" fill="white" opacity="0.6" />
                    )}
                </svg>
            </div>
        </div>
    );
};
