import type { Meta, StoryObj } from '@storybook/react';
import { ShockMark } from './ShockMark';
import React from 'react';

const meta = {
    title: 'Manpu/ShockMark',
    component: ShockMark,
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
} satisfies Meta<typeof ShockMark>;

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
        overflow: 'hidden'
    }}>
        <div style={{ fontSize: '2rem' }}>OMG!</div>
        <div style={{ position: 'absolute' }}>
            {children}
        </div>
    </div>
);

export const Default: Story = {
    args: { size: 100 },
};

export const Mode3D: Story = {
    args: { size: 100, mode: '3d', color: '#000033' },
};

export const Animated: Story = {
    args: { size: 100, variant: 'anime' },
};

export const DespairDeep: Story = {
    name: 'UseCase: Deep Despair',
    args: {
        size: 250,
        color: '#1a1a40',
        mode: '3d',
        variant: 'anime',
    },
    render: (args) => <ComicWrapper><ShockMark {...args} /></ComicWrapper>
};
