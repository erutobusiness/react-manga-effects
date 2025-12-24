import { Point } from '../../../types';
import { Line, SpeedLinesConfig } from '../types';



// Helper to find intersection with screen bounds
const getDistanceToEdge = (center: Point, angle: number, width: number, height: number): number => {
    // Basic ray casting to find distance from center to box edge
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    // We want to find t > 0 such that point + t*dir is on edge

    let tMin = Infinity;

    // Check vertical edges
    if (Math.abs(dx) > 0.0001) {
        if (dx > 0) {
            const t = (width - center.x) / dx;
            if (t >= 0) tMin = Math.min(tMin, t);
        } else {
            const t = (0 - center.x) / dx;
            if (t >= 0) tMin = Math.min(tMin, t);
        }
    }

    // Check horizontal edges
    if (Math.abs(dy) > 0.0001) {
        if (dy > 0) {
            const t = (height - center.y) / dy;
            if (t >= 0) tMin = Math.min(tMin, t);
        } else {
            const t = (0 - center.y) / dy;
            if (t >= 0) tMin = Math.min(tMin, t);
        }
    }

    return tMin === Infinity ? 0 : tMin;
};

export const generateLines = (config: SpeedLinesConfig): Line[] => {
    return Array.from({ length: config.lineCount }, () => ({
        angle: Math.random() * Math.PI * 2,
        // Convert percentage 0-100 to 0-1
        length: (config.minLength + Math.random() * (config.maxLength - config.minLength)) / 100,
        // Thick at start (outer edge), tapers to thin
        width: 2 + Math.random() * 8,
        opacity: 0.6 + Math.random() * 0.4,
    }));
};

export const drawLine = (
    ctx: CanvasRenderingContext2D,
    line: Line,
    center: Point,
    maxRadius: number,
    innerRadiusPct: number, // 0-100
    color: string,
    width: number,
    height: number
): void => {
    const innerRadius = maxRadius * (innerRadiusPct / 100);

    // Pulse logic removed in favor of frame swapping in SpeedLines component
    const opacity = line.opacity;

    // Determine start distance: The absolute edge of visible area for this angle
    const distToEdge = getDistanceToEdge(center, line.angle, width, height);

    // Start strictly at the edge (plus a small buffer to avoid sub-pixel gaps)
    const startDist = distToEdge + 2;

    // "Length" is interpreted as: factor of total available length (edge to innerRadius)
    // Or simpler: just factor of edge distance.
    // User props minLength/maxLength defaults 10-30.
    // If we map that to "30% of distToEdge", that's reasonable.

    let targetEndDist = startDist - (startDist * line.length);

    // Ensure we don't cross innerRadius
    if (targetEndDist < innerRadius) {
        targetEndDist = innerRadius;
    }

    // If effectively invisible, skip
    if (targetEndDist >= startDist) return;

    const cos = Math.cos(line.angle);
    const sin = Math.sin(line.angle);

    const xStart = center.x + cos * startDist;
    const yStart = center.y + sin * startDist;

    const xEnd = center.x + cos * targetEndDist;
    const yEnd = center.y + sin * targetEndDist;

    const px = -sin;
    const py = cos;

    // Check if wide lines look weird if perpendicular to edge logic slightly off
    // But looks okay for manga lines.

    const halfWidth = line.width / 2;

    ctx.beginPath();
    ctx.moveTo(xStart + px * halfWidth, yStart + py * halfWidth);
    ctx.lineTo(xStart - px * halfWidth, yStart - py * halfWidth);
    ctx.lineTo(xEnd, yEnd);

    ctx.closePath();

    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.fill();
    ctx.globalAlpha = 1.0;
};
