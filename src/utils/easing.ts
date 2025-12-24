import { EasingFunction } from "../types";

export const linear: EasingFunction = (t) => t;
export const easeIn: EasingFunction = (t) => t * t;
export const easeOut: EasingFunction = (t) => t * (2 - t);
export const easeInOut: EasingFunction = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export const easings = {
    linear,
    easeIn,
    easeOut,
    easeInOut,
};

export const getEasing = (easing?: string | EasingFunction): EasingFunction => {
    if (typeof easing === 'function') return easing;
    if (typeof easing === 'string' && easing in easings) {
        return easings[easing as keyof typeof easings];
    }
    return easeInOut;
};
