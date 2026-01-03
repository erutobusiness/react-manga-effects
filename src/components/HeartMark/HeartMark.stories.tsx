import type { Meta, StoryObj } from '@storybook/react';
import { HeartMark } from './HeartMark';
import React from 'react';

const meta = {
    title: 'Manpu/HeartMark',
    component: HeartMark,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'text', table: { category: 'Appearance' } },
        color: { control: 'color', table: { category: 'Appearance' } },
        mode: { control: 'radio', options: ['2d', '3d'], table: { category: 'Appearance' } },
        angle: { control: { type: 'range', min: -180, max: 180 }, table: { category: 'Positioning' } },
        variant: {
            control: 'radio',
            options: ['static', 'beat', 'pop', 'float'],
            table: { category: 'Animation' }
        },
    },
} satisfies Meta<typeof HeartMark>;

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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Love it!</div>
        <div style={{
            width: '100px',
            height: '100px',
            background: '#ffc0cb',
            borderRadius: '50%',
            position: 'relative'
        }}>
            {/* Positioning heart relative to this "head" */}
            <div style={{ position: 'absolute', top: -20, right: -20 }}>
                {children}
            </div>
        </div>
    </div>
);

export const Default: Story = { args: { size: 100 } };
export const Mode3D: Story = { args: { size: 100, mode: '3d' } };
export const Beating: Story = { args: { size: 100, variant: 'beat' } };
export const Popping: Story = { args: { size: 100, variant: 'pop' } };
export const Floating: Story = { args: { size: 100, variant: 'float' } };

export const LoveStruck: Story = {
    name: 'UseCase: Love Struck',
    args: {
        size: 80,
        variant: 'beat',
        color: '#ff0066',
    },
    render: (args) => <ComicWrapper><HeartMark {...args} /></ComicWrapper>
};

export const EyesMeme: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {/* Using args implicitly? No, specific usage */}
            <div style={{ position: 'relative', width: 100, height: 100, background: '#eee', borderRadius: '50%' }}>
                <HeartMark {...args} size={60} style={{ position: 'absolute', top: 20, left: 20 }} variant="beat" />
            </div>
            <div style={{ position: 'relative', width: 100, height: 100, background: '#eee', borderRadius: '50%' }}>
                <HeartMark {...args} size={60} style={{ position: 'absolute', top: 20, left: 20 }} variant="beat" />
            </div>
        </div>
    ),
    name: 'UseCase: Meme Eyes',
    args: {
        color: '#ff0000',
    }
};

export const PlayfulHeart: Story = {
    name: 'UseCase: Playful',
    args: {
        size: 100,
        variant: 'beat',
        angle: 15,
        color: '#ff69b4'
    },
    render: (args) => <ComicWrapper><HeartMark {...args} /></ComicWrapper>
};
