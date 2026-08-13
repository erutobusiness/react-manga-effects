import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { SpeedLines } from './SpeedLines';

afterEach(cleanup);

const root = (c: HTMLElement) => c.firstElementChild as HTMLElement;

describe('SpeedLines', () => {
    it('renders a canvas inside its container', () => {
        const { container } = render(<SpeedLines />);
        expect(root(container).className).toContain('speed-lines-container');
        expect(container.querySelector('canvas')).not.toBeNull();
    });

    it('keeps a caller className alongside its own', () => {
        const { container } = render(<SpeedLines className="caller-supplied" />);
        expect(root(container).className).toContain('speed-lines-container');
        expect(root(container).className).toContain('caller-supplied');
    });

    it('lets caller styles through', () => {
        const { container } = render(<SpeedLines style={{ opacity: 0.25 }} />);
        expect(root(container).style.opacity).toBe('0.25');
    });

    it('mounts and unmounts cleanly with animation enabled', () => {
        // The component subscribes to ResizeObserver and requestAnimationFrame;
        // an unbalanced teardown here would leak a loop into later tests.
        const { unmount } = render(<SpeedLines animated animationSpeed={2} />);
        expect(() => unmount()).not.toThrow();
    });

    it('accepts the documented tuning props without throwing', () => {
        expect(() =>
            render(
                <SpeedLines
                    center={{ x: 25, y: 75 }}
                    lineCount={12}
                    color="rgb(4, 5, 6)"
                    minLength={5}
                    maxLength={50}
                    innerRadius={20}
                />,
            ),
        ).not.toThrow();
    });
});
