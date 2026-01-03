import type { Meta, StoryObj } from '@storybook/react';
import { MoyamoyaMark } from './MoyamoyaMark';
import React from 'react';

const meta = {
    title: 'Manpu/MoyamoyaMark',
    component: MoyamoyaMark,
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
} satisfies Meta<typeof MoyamoyaMark>;

export default meta;
type Story = StoryObj<typeof meta>;

const ComicWrapper = ({ children }: { children: React.ReactNode }) => (
    <div style={{
        width: '300px',
        height: '300px',
        border: '3px solid #333',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    }}>
        <div style={{ fontSize: '3rem', color: '#666' }}>?</div>
        <div style={{ position: 'absolute', top: '20%', right: '20%' }}>
            {children}
        </div>
    </div>
);

export const Default: Story = { args: { size: 100 } };
export const Mode3D: Story = { args: { size: 100, mode: '3d', color: '#555' } };
export const Animated: Story = { args: { size: 100, variant: 'anime' } };

export const Confusion: Story = {
    name: 'UseCase: Confusion',
    args: {
        size: 150,
        color: '#666666',
        mode: '3d',
        variant: 'anime',
    },
    render: (args) => <ComicWrapper><MoyamoyaMark {...args} /></ComicWrapper>
};
