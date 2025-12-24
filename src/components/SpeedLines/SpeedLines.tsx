import React, { useRef, useEffect, useCallback } from 'react';
import { SpeedLinesProps, Point } from '../../types';
import { useAnimationLoop } from './hooks/useAnimationLoop';
import { generateLines, drawLine } from './utils/lineGenerator';
import { Line } from './types';

export const SpeedLines: React.FC<SpeedLinesProps> = ({
    center = { x: 50, y: 50 },
    lineCount = 60,
    color = 'rgba(0, 0, 0, 0.6)',
    minLength = 10,  // Percentage
    maxLength = 30,  // Percentage
    innerRadius = 0, // Percentage
    animated = false,
    animationSpeed = 1,
    className = '',
    style,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const linesRef = useRef<Line[]>([]);
    const centerRef = useRef<Point>(center);
    const timeRef = useRef<number>(0);

    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

    // Update center ref
    useEffect(() => {
        centerRef.current = center;
    }, [center.x, center.y]);

    // Generate lines when config changes
    useEffect(() => {
        linesRef.current = generateLines({
            lineCount,
            minLength,
            maxLength
        });
    }, [lineCount, minLength, maxLength]);

    // Handle Resize
    const handleResize = useCallback(() => {
        if (containerRef.current && canvasRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;
            const dpr = window.devicePixelRatio || 1;

            // Only update if dimensions actually changed
            if (canvasRef.current.width !== clientWidth * dpr ||
                canvasRef.current.height !== clientHeight * dpr) {

                canvasRef.current.width = clientWidth * dpr;
                canvasRef.current.height = clientHeight * dpr;

                canvasRef.current.style.width = `${clientWidth}px`;
                canvasRef.current.style.height = `${clientHeight}px`;

                const ctx = canvasRef.current.getContext('2d');
                if (ctx) ctx.scale(dpr, dpr);

                setDimensions({ width: clientWidth, height: clientHeight });
            }
        }
    }, []);

    useEffect(() => {
        handleResize();
        const resizeObserver = new ResizeObserver(handleResize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => resizeObserver.disconnect();
    }, [handleResize]);

    // Draw Frame
    const draw = useCallback((deltaTime: number) => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const ctx = canvas?.getContext('2d');
        // Check for dimensions state to ensure we have valid size
        if (!canvas || !container || !ctx || dimensions.width === 0) return;

        // Reset transform to clear (because of scale)
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        const width = container.clientWidth;
        const height = container.clientHeight;

        // Calculate max radius (diagonal from center to corner)
        const absCenter = {
            x: (centerRef.current.x / 100) * width,
            y: (centerRef.current.y / 100) * height,
        };

        const maxDistX = Math.max(absCenter.x, width - absCenter.x);
        const maxDistY = Math.max(absCenter.y, height - absCenter.y);
        const maxRadius = Math.hypot(maxDistX, maxDistY);

        if (animated) {
            timeRef.current += deltaTime * 0.001;
        }

        linesRef.current.forEach((line) => {
            drawLine(
                ctx,
                line,
                absCenter,
                maxRadius,
                innerRadius,
                color,
                width,
                height,
                timeRef.current,
                animated,
                animationSpeed
            );
        });
    }, [color, innerRadius, animated, animationSpeed, dimensions]);

    // If animated, loop. If static, draw once (or re-draw on change).
    // useAnimationLoop handles the loop.
    // If not animated, we should still draw once initially or on updates.
    // However, useAnimationLoop usually stops callback when !isPlaying.
    // We need to force a draw when static state changes.

    useAnimationLoop(draw, animated);

    // Initial draw for static state or updates
    useEffect(() => {
        if (!animated) {
            draw(0);
        }
    }, [draw, animated, lineCount, minLength, maxLength, innerRadius, color, dimensions]);

    return (
        <div
            ref={containerRef}
            className={`speed-lines-container ${className}`}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                pointerEvents: 'none',
                ...style
            }}
        >
            <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', display: 'block' }}
            />
        </div>
    );
};
