export interface Line {
    angle: number;      // Radians
    length: number;     // Length as 0-1 percentage of max radius
    width: number;      // Width at the outer edge
    opacity: number;    // Opacity
    pulseOffset: number; // Random offset for pulse animation
    pulseSpeed: number;  // Random speed multiplier for pulse
}

export interface SpeedLinesConfig {
    lineCount: number;
    minLength: number; // 0-100
    maxLength: number; // 0-100
}
