import type { Meta, StoryObj } from '@storybook/react';
import { AngerMark } from './AngerMark';
import React from 'react';

const meta = {
    title: 'Manpu/AngerMark',
    component: AngerMark,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'text', table: { category: 'Appearance' } },
        color: { control: 'color', table: { category: 'Appearance' } },
        mode: { control: 'radio', options: ['2d', '3d'], table: { category: 'Appearance' } },
        angle: { control: { type: 'range', min: -180, max: 180 }, table: { category: 'Positioning' } },
        variant: { control: 'radio', options: ['static', 'anime'], table: { category: 'Animation' } },
    },
} satisfies Meta<typeof AngerMark>;

export default meta;
type Story = StoryObj<typeof meta>;

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
    }}>
        <div style={{
            fontSize: '5rem',
            fontWeight: 'bold',
            color: '#333'
        }}>
            #?!
        </div>
        <div style={{ position: 'absolute', top: '10%', right: '10%' }}>
            {children}
        </div>
    </div>
);

export const Default: Story = {
    args: { size: 100, color: '#ff0000' },
};

export const Mode3D: Story = {
    args: { size: 100, mode: '3d', color: '#cc0000' },
};

export const Animated: Story = {
    args: { size: 100, variant: 'anime', color: '#ff0000' },
};

export const Furious: Story = {
    name: 'UseCase: Furious',
    args: {
        size: 150,
        color: '#8b0000',
        mode: '3d',
        variant: 'anime',
        angle: 0
    },
    render: (args) => <ComicWrapper><AngerMark {...args} /></ComicWrapper>
};

export const SideAnger: Story = {
    name: 'UseCase: Side Anger',
    args: {
        size: 100,
        color: '#ff0000',
        mode: '2d',
        variant: 'static',
        angle: -15, // Tilted slightly
    },
    render: (args) => (
        <div style={{ position: 'relative', width: 200, height: 200, border: '1px solid #ccc' }}>
            <div style={{ position: 'absolute', top: 50, left: 50 }}>Character Head</div>
            <AngerMark {...args} style={{ position: 'absolute', top: 20, right: 20 }} />
        </div>
    )
};
