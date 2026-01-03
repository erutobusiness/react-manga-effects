import type { Meta, StoryObj } from '@storybook/react';
import { Placeholder } from './Placeholder';

const meta = {
    title: 'Components/Placeholder',
    component: Placeholder,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        text: {
            control: 'text',
            description: 'Text to display',
            table: { category: 'Content' }
        },
    },
} satisfies Meta<typeof Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: 'Placeholder',
    },
};

export const LongText: Story = {
    args: {
        text: 'This is a much longer placeholder text to test wrapping handling.',
    },
};
