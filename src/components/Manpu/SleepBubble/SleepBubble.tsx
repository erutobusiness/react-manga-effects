import React, { useMemo } from 'react';
import styles from './SleepBubble.module.css';

export interface SleepBubbleProps {
    /**
     * Size of the bubble.
     * @default 100
     */
    size?: number | string;
    /**
     * Primary color (usually white/light blue).
     * @default '#ffffff'
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

export const SleepBubble: React.FC<SleepBubbleProps> = ({
    size = 100,
    color = '#ffffff',
    mode = '2d',
    variant = 'static',
    angle = 0,
    className = '',
    style,
}) => {
    const gradientId = useMemo(() => `sleep-grad-${Math.random().toString(36).substr(2, 9)}`, []);

    const animationClass = useMemo(() => {
        if (variant === 'anime') return styles['animate-breathe'];
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
            aria-label="Sleep Bubble"
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
                                <radialGradient id={`${gradientId}-body`} cx="40%" cy="40%" r="50%">
                                    <stop offset="0%" stopColor="white" style={{ stopOpacity: 0.9 }} />
                                    <stop offset="100%" stopColor="#87ceeb" style={{ stopOpacity: 0.4 }} />
                                </radialGradient>
                                <filter id={`${gradientId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="2" dy="4" stdDeviation="2" floodOpacity="0.1" />
                                </filter>
                            </>
                        )}
                    </defs>

                    {/* Main bubble */}
                    <circle
                        cx="50" cy="50" r="45"
                        fill={is3D ? `url(#${gradientId}-body)` : 'rgba(255,255,255,0.8)'}
                        stroke={color === '#ffffff' ? '#87ceeb' : color}
                        strokeWidth="2"
                        filter={is3D ? `url(#${gradientId}-shadow)` : 'none'}
                    />

                    {/* Highlight */}
                    <circle cx="70" cy="30" r="8" fill="white" opacity="0.8" />
                </svg>
            </div>
        </div>
    );
};
