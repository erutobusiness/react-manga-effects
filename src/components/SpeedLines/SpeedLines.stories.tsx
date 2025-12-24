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
    argTypes: {
        lineCount: {
            control: { type: 'range', min: 10, max: 300, step: 10 },
            description: 'Number of lines to render',
            defaultValue: 60,
        },
        minLength: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Minimum line length (% of radius)',
            defaultValue: 10,
        },
        maxLength: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Maximum line length (% of radius)',
            defaultValue: 30,
        },
        innerRadius: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Radius of the clear center area (%)',
            defaultValue: 0,
        },
        animated: {
            control: 'boolean',
            description: 'Enable opacity/pulse animation',
            defaultValue: false,
        },
        animationSpeed: {
            control: { type: 'range', min: 0.1, max: 5, step: 0.1 },
            description: 'Animation speed multiplier',
            defaultValue: 1,
        },
        color: {
            control: 'color',
            description: 'Color of the lines (rgba recommended)',
            defaultValue: 'rgba(0, 0, 0, 0.6)',
        },
        center: {
            control: 'object',
            description: 'Center point {x, y} in %',
            defaultValue: { x: 50, y: 50 },
        },
    },
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
    args: {
        lineCount: 60,
        minLength: 10,
        maxLength: 30,
        innerRadius: 0,
        animated: false,
        animationSpeed: 1,
        color: 'rgba(0, 0, 0, 0.6)',
        center: { x: 50, y: 50 },
    },
    render: (args) => <Wrapper {...args} />
};

export const LongLines: Story = {
    args: {
        lineCount: 80,
        minLength: 40,
        maxLength: 80,
        innerRadius: 10,
        color: 'rgba(0, 0, 0, 0.8)',
    },
    render: (args) => <Wrapper {...args} />
};

export const ShortLines: Story = {
    args: {
        lineCount: 150,
        minLength: 2,
        maxLength: 8,
        innerRadius: 40,
        color: 'rgba(0, 0, 0, 0.5)',
    },
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
