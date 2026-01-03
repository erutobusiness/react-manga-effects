import React, { useMemo } from 'react';
import styles from './ShockMark.module.css';

export interface ShockMarkProps {
    /**
     * Size of the mark.
     * @default 100
     */
    size?: number | string;
    /**
     * Primary color.
     * @default '#2c3e50' (Dark Blue/Grey)
     */
    color?: string;
    /**
     * Visual style.
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

export const ShockMark: React.FC<ShockMarkProps> = ({
    size = 100,
    color = '#2c3e50',
    mode = '2d',
    variant = 'static',
    angle = 0,
    className = '',
    style,
}) => {
    const gradientId = useMemo(() => `shock-grad-${Math.random().toString(36).substr(2, 9)}`, []);

    const animationClass = useMemo(() => {
        if (variant === 'anime') return styles['animate-shock'];
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
            aria-label="Shock Mark"
        >
            <div className={animationClass} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                <linearGradient id={`${gradientId}-body`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor={color} style={{ stopOpacity: 1 }} />
                                    <stop offset="100%" stopColor="#000" style={{ stopOpacity: 0.8 }} />
                                </linearGradient>
                                <filter id={`${gradientId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.5" />
                                </filter>
                            </>
                        )}
                    </defs>

                    {/* Vertical Jagged Lines */}
                    {/* A group of sharp triangle-like shapes pointing down */}
                    <path
                        d="M 10 10 L 20 80 L 30 10 
                           M 40 10 L 50 90 L 60 10
                           M 70 10 L 80 80 L 90 10"
                        fill={is3D ? `url(#${gradientId}-body)` : color}
                        stroke={is3D ? 'none' : color}
                        strokeWidth={is3D ? 0 : 2}
                        strokeLinejoin="round"
                        filter={is3D ? `url(#${gradientId}-shadow)` : 'none'}
                    />
                </svg>
            </div>
        </div>
    );
};
