import type { Meta, StoryObj } from '@storybook/react';
import { SpeedLines } from './SpeedLines';
import React from 'react';

const meta = {
    title: 'Effects/SpeedLines',
    component: SpeedLines,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SpeedLines>;

export default meta;
type Story = StoryObj<typeof meta>;

const Wrapper = (props: React.ComponentProps<typeof SpeedLines>) => (
    <div style={{ width: '100vw', height: '100vh', background: '#fff', position: 'relative' }}>
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            padding: '2rem',
            background: 'white',
            border: '2px solid black',
            fontWeight: 'bold',
            fontSize: '2rem'
        }}>
            ACTION!
        </div>
        <SpeedLines {...props} />
    </div>
);

export const Default: Story = {
    render: (args) => <Wrapper {...args} />
};

export const Dense: Story = {
    args: {
        lineCount: 120,
    },
    render: (args) => <Wrapper {...args} />
};

export const Sparse: Story = {
    args: {
        lineCount: 30,
    },
    render: (args) => <Wrapper {...args} />
};

export const AnimatedPulse: Story = {
    args: {
        animated: true,
        animationSpeed: 1,
    },
    render: (args) => <Wrapper {...args} />
};

export const AnimatedFast: Story = {
    args: {
        animated: true,
        animationSpeed: 3,
    },
    render: (args) => <Wrapper {...args} />
};

export const CustomColor: Story = {
    args: {
        color: 'rgba(255, 0, 0, 0.5)',
    },
    render: (args) => <Wrapper {...args} />
};

export const ClearCenter: Story = {
    args: {
        innerRadius: 30,
        lineCount: 100,
    },
    render: (args) => <Wrapper {...args} />
};

export const OffCenter: Story = {
    args: {
        center: { x: 30, y: 70 },
        innerRadius: 20,
    },
    render: (args) => <Wrapper {...args} />
};
