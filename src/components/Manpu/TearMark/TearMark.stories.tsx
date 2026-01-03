import type { Meta, StoryObj } from '@storybook/react';
import { TearMark } from './TearMark';
import React from 'react';

const meta = {
    title: 'Manpu/TearMark',
    component: TearMark,
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
} satisfies Meta<typeof TearMark>;

export default meta;
type Story = StoryObj<typeof meta>;

const ComicWrapper = ({ children }: { children: React.ReactNode }) => (
    <div style={{
        width: '300px',
        height: '300px',
        border: '3px solid #333',
        background: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    }}>
        <div style={{ fontSize: '4rem' }}>T_T</div>
        <div style={{ position: 'absolute', top: 120, right: 80 }}>
            {children}
        </div>
        <div style={{ position: 'absolute', top: 120, left: 80, transform: 'scaleX(-1)' }}>
            {children}
        </div>
    </div>
);

export const Default: Story = { args: { size: 100 } };
export const Mode3D: Story = { args: { size: 100, mode: '3d', color: '#00ccff' } };
export const Animated: Story = { args: { size: 100, variant: 'anime' } };

export const Crying: Story = {
    name: 'UseCase: Crying',
    args: {
        size: 60,
        color: '#89CFF0',
        mode: '3d',
        variant: 'anime',
    },
    render: (args) => <ComicWrapper><TearMark {...args} /></ComicWrapper>
};

export const WindyTears: Story = {
    name: 'UseCase: Windy Tears',
    args: {
        size: 60,
        color: '#89CFF0',
        mode: '3d',
        variant: 'anime',
        angle: 30, // Blowing in wind
    },
    render: (args) => <ComicWrapper><TearMark {...args} /></ComicWrapper>
};
