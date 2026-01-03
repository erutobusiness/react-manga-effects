import React, { useMemo } from 'react';
import styles from './TearMark.module.css';

export interface TearMarkProps {
    /**
     * Size of the mark.
     * @default 100
     */
    size?: number | string;
    /**
     * Primary color.
     * @default '#00acee' (Sky Blue)
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

export const TearMark: React.FC<TearMarkProps> = ({
    size = 100,
    color = '#00acee',
    mode = '2d',
    variant = 'static',
    angle = 0,
    className = '',
    style,
}) => {
    const gradientId = useMemo(() => `tear-grad-${Math.random().toString(36).substr(2, 9)}`, []);

    const animationClass = useMemo(() => {
        if (variant === 'anime') return styles['animate-flow'];
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
            aria-label="Tear Mark"
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
                                <linearGradient id={`${gradientId}-body`} x1="40%" y1="20%" x2="60%" y2="80%">
                                    <stop offset="0%" stopColor={color} style={{ stopOpacity: 0.6 }} />
                                    <stop offset="100%" stopColor={color} style={{ stopOpacity: 0.9 }} />
                                </linearGradient>
                                <linearGradient id={`${gradientId}-highlight`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="white" style={{ stopOpacity: 0.9 }} />
                                    <stop offset="100%" stopColor="white" style={{ stopOpacity: 0 }} />
                                </linearGradient>
                            </>
                        )}
                    </defs>

                    {/* Tear shape, slightly curved */}
                    <path
                        d="M 50 10 
                           Q 35 40 35 60
                           A 15 15 0 0 0 65 60
                           Q 65 40 50 10 Z"
                        fill={is3D ? `url(#${gradientId}-body)` : color}
                        stroke={is3D ? 'none' : color}
                    />

                    {is3D && (
                        <path
                            d="M 45 30 Q 40 50 40 60"
                            stroke={`url(#${gradientId}-highlight)`}
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.8"
                        />
                    )}
                </svg>
            </div>
        </div>
    );
};
