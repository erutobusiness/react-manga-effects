import type { Meta, StoryObj } from '@storybook/react';
import { SleepBubble } from './SleepBubble';
import React from 'react';

const meta = {
    title: 'Manpu/SleepBubble',
    component: SleepBubble,
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
} satisfies Meta<typeof SleepBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

const ComicWrapper = ({ children }: { children: React.ReactNode }) => (
    <div style={{
        width: '300px',
        height: '200px',
        border: '3px solid #333',
        background: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    }}>
        <div style={{ fontSize: '1.5rem', color: '#333' }}>[ Sleeping... ]</div>
        <div style={{ position: 'absolute', top: -30, right: 30 }}>
            {children}
        </div>
    </div>
);

export const Default: Story = { args: { size: 100 } };
export const Mode3D: Story = { args: { size: 100, mode: '3d' } };
export const Animated: Story = { args: { size: 100, variant: 'anime' } };

export const DeepSleep: Story = {
    name: 'UseCase: Deep Sleep',
    args: {
        size: 120,
        mode: '3d',
        variant: 'anime',
    },
    render: (args) => <ComicWrapper><SleepBubble {...args} /></ComicWrapper>
};
