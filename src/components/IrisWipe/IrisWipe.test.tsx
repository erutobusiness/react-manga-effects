import { render, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { IrisWipe } from './IrisWipe';

afterEach(cleanup);

const root = (c: HTMLElement) => c.firstElementChild as HTMLElement;

describe('IrisWipe', () => {
    it('renders its children', () => {
        const { getByText } = render(
            <IrisWipe isOpen>
                <span>inside</span>
            </IrisWipe>,
        );
        expect(getByText('inside')).toBeInTheDocument();
    });

    it('exposes the open state as data-state', () => {
        const { container, rerender } = render(<IrisWipe isOpen>x</IrisWipe>);
        expect(root(container).getAttribute('data-state')).toBe('open');

        rerender(<IrisWipe isOpen={false}>x</IrisWipe>);
        expect(root(container).getAttribute('data-state')).toBe('closed');
    });

    it('publishes center, duration and easing as CSS custom properties', () => {
        const { container } = render(
            <IrisWipe isOpen center={{ x: 10, y: 90 }} duration={250} easing="linear">
                x
            </IrisWipe>,
        );
        const style = root(container).style;
        expect(style.getPropertyValue('--iris-cx')).toBe('10%');
        expect(style.getPropertyValue('--iris-cy')).toBe('90%');
        expect(style.getPropertyValue('--iris-duration')).toBe('250ms');
        expect(style.getPropertyValue('--iris-easing')).toBe('linear');
    });

    it('maps easing presets to CSS timing functions', () => {
        for (const [preset, css] of [
            ['easeIn', 'ease-in'],
            ['easeOut', 'ease-out'],
            ['easeInOut', 'ease-in-out'],
        ] as const) {
            const { container, unmount } = render(
                <IrisWipe isOpen easing={preset}>
                    x
                </IrisWipe>,
            );
            expect(root(container).style.getPropertyValue('--iris-easing')).toBe(css);
            unmount();
        }
    });

    it('keeps a caller className alongside its own', () => {
        const { container } = render(
            <IrisWipe isOpen className="caller-supplied">
                x
            </IrisWipe>,
        );
        expect(root(container).className).toContain('iris-wipe');
        expect(root(container).className).toContain('caller-supplied');
    });

    it('calls onComplete when the clip-path transition ends', () => {
        const onComplete = vi.fn();
        const { container } = render(
            <IrisWipe isOpen onComplete={onComplete}>
                x
            </IrisWipe>,
        );

        fireEvent.transitionEnd(root(container), { propertyName: 'clip-path' });
        expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('ignores transitions of other properties', () => {
        const onComplete = vi.fn();
        const { container } = render(
            <IrisWipe isOpen onComplete={onComplete}>
                x
            </IrisWipe>,
        );

        fireEvent.transitionEnd(root(container), { propertyName: 'opacity' });
        expect(onComplete).not.toHaveBeenCalled();

        // Positive control: without this the test would also pass when the
        // handler is never wired up at all.
        fireEvent.transitionEnd(root(container), { propertyName: 'clip-path' });
        expect(onComplete).toHaveBeenCalledTimes(1);
    });

    it('does not throw when onComplete is omitted', () => {
        const { container } = render(<IrisWipe isOpen>x</IrisWipe>);
        expect(() => fireEvent.transitionEnd(root(container), { propertyName: 'clip-path' })).not.toThrow();
    });
});
