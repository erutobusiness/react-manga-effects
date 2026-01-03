import type { Meta, StoryObj } from '@storybook/react';
import { SweatMark } from './SweatMark';
import React from 'react';

const meta = {
    title: 'Manpu/SweatMark',
    component: SweatMark,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'text',
            description: 'Size of the mark (e.g. 100px, 50%)',
            table: { category: 'Appearance', defaultValue: { summary: '100' } }
        },
        color: {
            control: 'color',
            description: 'Color of the mark',
            table: { category: 'Appearance', defaultValue: { summary: '#00a0e9' } }
        },
        mode: {
            control: 'radio',
            options: ['2d', '3d'],
            description: 'Render mode',
            table: { category: 'Appearance', defaultValue: { summary: '2d' } }
        },
        angle: {
            control: { type: 'range', min: -180, max: 180 },
            description: 'Rotation angle',
            table: { category: 'Positioning', defaultValue: { summary: '0' } }
        },
        variant: {
            control: 'radio',
            options: ['static', 'anime'],
            description: 'Animation variant',
            table: { category: 'Animation', defaultValue: { summary: 'static' } }
        },
    },
} satisfies Meta<typeof SweatMark>;

export default meta;
type Story = StoryObj<typeof meta>;

// Comic Context Wrapper
const ComicWrapper = ({ children }: { children: React.ReactNode }) => (
    <div style={{
        width: '300px',
        height: '300px',
        border: '3px solid #333',
        borderRadius: '10px',
        position: 'relative',
        background: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '5px 5px 0px rgba(0,0,0,0.1)'
    }}>
        <div style={{
            width: '150px',
            height: '150px',
            background: '#eee',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#999',
            fontSize: '2rem',
            userSelect: 'none'
        }}>
            (°_°;)
        </div>
        <div style={{ position: 'absolute', top: '20%', right: '20%' }}>
            {children}
        </div>
    </div>
);

export const Default: Story = {
    args: {
        size: 100,
    },
};

export const Mode3D: Story = {
    args: {
        size: 100,
        mode: '3d',
    },
};

export const Animated: Story = {
    args: {
        size: 100,
        variant: 'anime',
    },
};

export const ColdSweat: Story = {
    name: 'UseCase: Cold Sweat',
    args: {
        size: 80,
        color: '#a0e0ff',
        mode: '3d',
        variant: 'anime',
        angle: 0
    },
    render: (args) => <ComicWrapper><SweatMark {...args} /></ComicWrapper>
};

export const FlyingSweat: Story = {
    name: 'UseCase: Flying Sweat',
    args: {
        size: 80,
        color: '#00bfff',
        mode: '3d',
        variant: 'anime',
        angle: 45, // Flying off to the right
    },
    render: (args) => <ComicWrapper><SweatMark {...args} /></ComicWrapper>
};
