import React, { useMemo } from 'react';
import styles from './SparkleMark.module.css';

export interface SparkleMarkProps {
    /**
     * Size of the mark.
     * @default 100
     */
    size?: number | string;
    /**
     * Primary color.
     * @default '#ffd700' (Gold)
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

export const SparkleMark: React.FC<SparkleMarkProps> = ({
    size = 100,
    color = '#ffd700',
    mode = '2d',
    variant = 'static',
    angle = 0,
    className = '',
    style,
}) => {
    const gradientId = useMemo(() => `sparkle-grad-${Math.random().toString(36).substr(2, 9)}`, []);

    const animationClass = useMemo(() => {
        if (variant === 'anime') return styles['animate-twinkle'];
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
            aria-label="Sparkle Mark"
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
                                <radialGradient id={`${gradientId}-body`} cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="white" style={{ stopOpacity: 1 }} />
                                    <stop offset="20%" stopColor={color} style={{ stopOpacity: 0.8 }} />
                                    <stop offset="100%" stopColor={color} style={{ stopOpacity: 0 }} />
                                </radialGradient>
                                <filter id={`${gradientId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </>
                        )}
                    </defs>

                    {/* Four-pointed star shape */}
                    <path
                        d="M 50 10 
                           C 55 35 65 45 90 50 
                           C 65 55 55 65 50 90 
                           C 45 65 35 55 10 50 
                           C 35 45 45 35 50 10 Z"
                        fill={is3D ? `url(#${gradientId}-body)` : color}
                        stroke={is3D ? 'none' : color}
                        filter={is3D ? `url(#${gradientId}-glow)` : 'none'}
                    />
                </svg>
            </div>
        </div>
    );
};
