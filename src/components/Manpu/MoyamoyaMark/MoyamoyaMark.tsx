import React, { useMemo } from 'react';
import styles from './MoyamoyaMark.module.css';

export interface MoyamoyaMarkProps {
    /**
     * Size of the mark.
     * @default 100
     */
    size?: number | string;
    /**
     * Primary color (usually dark/purple for gloomy).
     * @default '#555555'
     */
    color?: string;
    /**
     * Visual style: '2d' or '3d'.
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

export const MoyamoyaMark: React.FC<MoyamoyaMarkProps> = ({
    size = 100,
    color = '#555555',
    mode = '2d',
    variant = 'static',
    angle = 0,
    className = '',
    style,
}) => {
    const gradientId = useMemo(() => `moyamoya-grad-${Math.random().toString(36).substr(2, 9)}`, []);

    const animationClass = useMemo(() => {
        if (variant === 'anime') return styles['animate-float'];
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
            aria-label="Moyamoya Mark"
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
                                <linearGradient id={`${gradientId}-body`} x1="20%" y1="20%" x2="80%" y2="80%">
                                    <stop offset="0%" stopColor={color} style={{ stopOpacity: 1 }} />
                                    <stop offset="100%" stopColor="#222" style={{ stopOpacity: 0.8 }} />
                                </linearGradient>
                                <filter id={`${gradientId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.5" />
                                </filter>
                            </>
                        )}
                    </defs>

                    <path
                        d="M 20 65 
                           Q 10 65 10 50 
                           Q 10 35 25 35 
                           Q 30 20 50 20 
                           Q 70 20 75 35 
                           Q 90 35 90 50 
                           Q 90 65 80 65 
                           Q 80 80 60 80 
                           Q 40 80 35 70 
                           Q 20 75 20 65 Z"
                        fill={is3D ? `url(#${gradientId}-body)` : color}
                        stroke={is3D ? 'none' : color}
                        filter={is3D ? `url(#${gradientId}-shadow)` : 'none'}
                    />

                    {/* Scribble effect lines for 2D to look more like 'moyamoya' */}
                    {!is3D && (
                        <path
                            d="M 30 40 Q 40 30 50 40 T 70 40"
                            fill="none"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="2"
                        />
                    )}
                </svg>
            </div>
        </div>
    );
};
