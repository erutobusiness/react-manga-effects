import type { Meta, StoryObj } from '@storybook/react';
import { SparkleMark } from './SparkleMark';
import React from 'react';

const meta = {
    title: 'Manpu/SparkleMark',
    component: SparkleMark,
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
} satisfies Meta<typeof SparkleMark>;

export default meta;
type Story = StoryObj<typeof meta>;

const ComicWrapper = ({ children, bg = '#fff' }: { children: React.ReactNode, bg?: string }) => (
    <div style={{
        width: '300px',
        height: '300px',
        border: '3px solid #333',
        background: bg,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    }}>
        <div style={{ width: 100, height: 100, background: 'gold', borderRadius: '5px' }}></div>
        <div style={{ position: 'absolute', top: 50, right: 50 }}>
            {children}
        </div>
        <div style={{ position: 'absolute', bottom: 50, left: 50 }}>
            {children}
        </div>
    </div>
);

export const Default: Story = { args: { size: 100 } };
export const Mode3D: Story = { args: { size: 100, mode: '3d', color: '#ffd700' } };
export const Animated: Story = { args: { size: 100, variant: 'anime' } };

export const Treasure: Story = {
    name: 'UseCase: Treasure',
    args: {
        size: 80,
        color: '#ffdd00',
        mode: '3d',
        variant: 'anime',
    },
    render: (args) => <ComicWrapper><SparkleMark {...args} /></ComicWrapper>
};

export const MagicSparkle: Story = {
    name: 'UseCase: Magic',
    args: {
        size: 100,
        color: '#9933ff',
        mode: '2d',
        variant: 'anime',
        angle: 45
    },
    render: (args) => <ComicWrapper bg="#1a1a1a"><SparkleMark {...args} /></ComicWrapper>
};
