export interface Line {
    angle: number;
    length: number;    // 0-1 (percentage of max distance)
    width: number;
    opacity: number;
}

export interface SpeedLinesConfig {
    lineCount: number;
    minLength: number; // 0-100
    maxLength: number; // 0-100
}
