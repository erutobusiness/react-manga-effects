import React from 'react';

// Re-export existing types
export type { PlaceholderProps } from '../components/Placeholder/Placeholder';

/**
 * Represents a 2D point with coordinates.
 */
export interface Point {
    /** X coordinate */
    x: number;
    /** Y coordinate */
    y: number;
}

/**
 * A function that maps a time value t (0-1) to an eased value.
 * @param t - The time value between 0 and 1.
 * @returns The eased value.
 */
export type EasingFunction = (t: number) => number;

/**
 * Preset easing names available in the library.
 */
export type EasingPreset = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';

/**
 * Props for the IrisWipe component.
 */
export interface IrisWipeProps {
    /** The content to be revealed/hidden */
    children: React.ReactNode;
    /** Controls the open/close state of the iris. True for open, False for closed. */
    isOpen: boolean;
    /** Center point of the iris (0-100 percentage). Default: { x: 50, y: 50 } */
    center?: Point;
    /** Animation duration in milliseconds. Default: 500 */
    duration?: number;
    /** Easing function or preset name for the animation. Default: 'easeInOut' */
    easing?: EasingPreset | EasingFunction;
    /** Callback fired when animation completes */
    onComplete?: () => void;
    /** Additional CSS class for the container */
    className?: string;
    /** Additional inline styles for the container */
    style?: React.CSSProperties;
}

/**
 * Props for the SpeedLines component.
 */
export interface SpeedLinesProps {
    /** Center point of the speed lines origin (0-100 percentage). Default: { x: 50, y: 50 } */
    center?: Point;
    /** Number of lines to render. Default: 60 */
    lineCount?: number;
    /** Line color (CSS color string). Default: 'rgba(0, 0, 0, 0.6)' */
    color?: string;
    /** Minimum line length as percentage of radius (0-100). Default: 10 */
    minLength?: number;
    /** Maximum line length as percentage of radius (0-100). Default: 30 */
    maxLength?: number;
    /** Radius of the clear center area as percentage of container size (0-100). Default: 0 */
    innerRadius?: number;
    /** Whether to animate the lines (subtle pulse). Default: false */
    animated?: boolean;
    /** Speed of the pulse animation if animated. Default: 1 */
    animationSpeed?: number;
    /** Additional CSS class for the container */
    className?: string;
    /** Additional inline styles for the container */
    style?: React.CSSProperties;
}
