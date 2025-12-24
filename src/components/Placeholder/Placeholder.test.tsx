import { render, screen } from '@testing-library/react';
import { Placeholder } from './Placeholder';
import { describe, it, expect } from 'vitest';


describe('Placeholder', () => {
    it('renders default text', () => {
        render(<Placeholder />);
        expect(screen.getByText('Manga Effect Placeholder')).toBeInTheDocument();
    });

    it('renders custom text', () => {
        render(<Placeholder text="Custom" />);
        expect(screen.getByText('Custom')).toBeInTheDocument();
    });
});
