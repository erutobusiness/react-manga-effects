import { useEffect, useRef } from 'react';

export const useAnimationLoop = (
    callback: (deltaTime: number) => void,
    isActive: boolean
) => {
    const requestRef = useRef<number | undefined>(undefined);
    const previousTimeRef = useRef<number | undefined>(undefined);

    // The loop reads the latest callback through a ref. Holding it directly
    // would either restart the animation on every render (callers usually pass
    // an inline function) or force the effect to lie about its dependencies.
    const callbackRef = useRef(callback);
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!isActive) {
            previousTimeRef.current = undefined;
            return;
        }

        // Defined inside the effect so it is not a dependency of it.
        const animate = (time: number) => {
            if (previousTimeRef.current !== undefined) {
                callbackRef.current(time - previousTimeRef.current);
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current !== undefined) {
                cancelAnimationFrame(requestRef.current);
                requestRef.current = undefined;
            }
        };
    }, [isActive]);
};
