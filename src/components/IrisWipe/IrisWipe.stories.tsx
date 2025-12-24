import type { Meta, StoryObj } from '@storybook/react';
import { IrisWipe } from './IrisWipe';
import React, { useState } from 'react';

const meta = {
    title: 'Effects/IrisWipe',
    component: IrisWipe,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        onComplete: { action: 'completed' },
    },
} satisfies Meta<typeof IrisWipe>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper to handle state in stories
const IrisWipeWrapper = (args: React.ComponentProps<typeof IrisWipe>) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#333' }}>
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
                <button onClick={() => setIsOpen(!isOpen)}>
                    Toggle Iris ({isOpen ? 'Open' : 'Closed'})
                </button>
            </div>

            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <IrisWipe {...args} isOpen={isOpen}>
                    <img
                        src="https://picsum.photos/1920/1080"
                        alt="Demo Content"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </IrisWipe>
            </div>
        </div>
    );
};

export const Default: Story = {
    args: {
        isOpen: true,
        children: null, // Overridden by wrapper
    },
    render: (args) => <IrisWipeWrapper {...args} />
};

export const FromCenter: Story = {
    args: {
        isOpen: true,
        center: { x: 50, y: 50 },
        duration: 1000,
        children: null,
    },
    render: (args) => <IrisWipeWrapper {...args} />
};

export const FromTopLeft: Story = {
    args: {
        isOpen: true,
        center: { x: 0, y: 0 },
        duration: 1000,
        children: null,
    },
    render: (args) => <IrisWipeWrapper {...args} />
};

export const FromBottomRight: Story = {
    args: {
        isOpen: true,
        center: { x: 100, y: 100 },
        duration: 1000,
        children: null,
    },
    render: (args) => <IrisWipeWrapper {...args} />
};

export const SlowTransition: Story = {
    args: {
        isOpen: true,
        duration: 2000,
        children: null,
    },
    render: (args) => <IrisWipeWrapper {...args} />
};

export const Interactive: Story = {
    args: {
        isOpen: true,
        duration: 500,
        center: { x: 50, y: 50 },
        easing: 'easeInOut',
        children: null,
    },
    render: (args) => <IrisWipeWrapper {...args} />
};
