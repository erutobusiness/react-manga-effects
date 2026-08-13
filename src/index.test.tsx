import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import * as api from './index';

/**
 * Guards the published surface of the package.
 *
 * Every component here is reachable from `src/index.ts`, which is what
 * consumers import. Before this file the only test in the repository covered
 * `Placeholder`, which is not exported at all — so nothing that actually ships
 * was checked.
 */

// Marks share one prop contract: size / color / mode / variant / angle /
// className / style, rendering a labelled container.
const MARKS = [
    'HeartMark',
    'AngerMark',
    'SweatMark',
    'MoyamoyaMark',
    'TearMark',
    'SparkleMark',
    'ShockMark',
    'SleepBubble',
] as const;

afterEach(cleanup);

describe('published exports', () => {
    it('exports every documented component', () => {
        for (const name of [...MARKS, 'SpeedLines', 'IrisWipe']) {
            expect(api, `${name} is missing from the package entry point`).toHaveProperty(name);
        }
    });

    it('exports nothing that is not a component or type', () => {
        // Types disappear at runtime, so anything left must be a component.
        for (const [name, value] of Object.entries(api)) {
            expect(typeof value, `${name} should be a component`).toBe('function');
        }
    });
});

describe.each(MARKS)('%s', (name) => {
    const Mark = api[name] as React.ComponentType<Record<string, unknown>>;

    it('renders a labelled element', () => {
        const { container } = render(<Mark />);
        const root = container.firstElementChild;
        expect(root).not.toBeNull();
        expect(root?.getAttribute('role')).toBe('img');
        expect(root?.getAttribute('aria-label')).toBeTruthy();
    });

    it('applies size to both dimensions', () => {
        const { container } = render(<Mark size={42} />);
        const root = container.firstElementChild as HTMLElement;
        expect(root.style.width).toBe('42px');
        expect(root.style.height).toBe('42px');
    });

    it('accepts a string size verbatim', () => {
        const { container } = render(<Mark size="5rem" />);
        const root = container.firstElementChild as HTMLElement;
        expect(root.style.width).toBe('5rem');
    });

    it('applies angle as a rotation', () => {
        const { container } = render(<Mark angle={45} />);
        const root = container.firstElementChild as HTMLElement;
        expect(root.style.transform).toBe('rotate(45deg)');
    });

    it('keeps a caller className alongside its own', () => {
        const { container } = render(<Mark className="caller-supplied" />);
        const root = container.firstElementChild as HTMLElement;
        expect(root.className).toContain('caller-supplied');
        // The component's own class must survive too, otherwise its styles vanish.
        expect(root.className.trim().split(/\s+/).length).toBeGreaterThan(1);
    });

    it('lets caller styles through', () => {
        const { container } = render(<Mark style={{ opacity: 0.5 }} />);
        const root = container.firstElementChild as HTMLElement;
        expect(root.style.opacity).toBe('0.5');
    });

    it('uses the given color somewhere in the drawing', () => {
        const { container } = render(<Mark color="rgb(1, 2, 3)" />);
        expect(container.innerHTML).toContain('rgb(1, 2, 3)');
    });

    it('renders an svg in both 2d and 3d modes', () => {
        for (const mode of ['2d', '3d'] as const) {
            const { container, unmount } = render(<Mark mode={mode} />);
            expect(container.querySelector('svg'), `${mode} mode drew nothing`).not.toBeNull();
            unmount();
        }
    });
});
