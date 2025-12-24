import type { Meta, StoryObj } from '@storybook/react';
import { Placeholder } from './Placeholder';

const meta = {
    title: 'Components/Placeholder',
    component: Placeholder,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        text: 'Default Placeholder Text',
    },
};

export const CustomText: Story = {
    args: {
        text: 'Thinking Agent in Action!',
    },
};
