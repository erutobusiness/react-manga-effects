import type { Meta, StoryObj } from '@storybook/react';
import { IrisWipe } from './IrisWipe';
import React, { useState, useEffect } from 'react';

const meta = {
    title: 'Effects/IrisWipe',
    component: IrisWipe,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        isOpen: {
            control: 'boolean',
            description: 'State of the iris (open = children visible)',
            table: { category: 'State', defaultValue: { summary: 'true' } },
        },
        duration: {
            control: { type: 'range', min: 100, max: 5000, step: 100 },
            description: 'Transition duration in ms',
            table: { category: 'Animation', defaultValue: { summary: '1000' } },
        },
        easing: {
            control: 'select',
            options: ['linear', 'easeIn', 'easeOut', 'easeInOut'],
            description: 'Easing preset',
            table: { category: 'Animation', defaultValue: { summary: 'easeInOut' } },
        },
        center: {
            control: 'object',
            description: 'Center point {x, y} in %',
            table: { category: 'Positioning', defaultValue: { summary: '{ x: 50, y: 50 }' } },
        },
        onComplete: { action: 'transition completed' },
    },
} satisfies Meta<typeof IrisWipe>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for interactivity
const InteractiveWrapper = ({
    args,
    bg = '#000',
    text = 'SCENE 1',
}: {
    args: React.ComponentProps<typeof IrisWipe>,
    bg?: string,
    text?: string,
}) => {
    const [isOpen, setIsOpen] = useState(args.isOpen ?? true);

    // Sync state if args change (e.g. from controls)
    useEffect(() => {
        setIsOpen(args.isOpen ?? true);
    }, [args.isOpen]);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            background: bg, // Background represents "outside" or "before" content
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Control UI */}
            <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                zIndex: 100,
                background: 'rgba(255,255,255,0.8)',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        border: 'none',
                        background: isOpen ? '#ff4d4f' : '#52c41a',
                        color: 'white',
                        borderRadius: '4px'
                    }}
                >
                    {isOpen ? 'Close Iris' : 'Open Iris'}
                </button>
                <div style={{ marginTop: '5px', fontSize: '0.8rem', color: '#666' }}>
                    Click to toggle transition
                </div>
            </div>

            {/* Content Area */}
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <IrisWipe
                    {...args}
                    isOpen={isOpen}
                // If overlayColor is set, we might simulate an overlay, but IrisWipe masks itself.
                // If we want a solid color wipe, we wrap a solid color div.
                >
                    {args.children || (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#fff',
                            backgroundImage: 'radial-gradient(circle, #e6f7ff 0%, #91d5ff 100%)'
                        }}>
                            <h1 style={{ fontSize: '4rem', color: '#0050b3' }}>{text}</h1>
                            <img
                                src="https://picsum.photos/800/600"
                                alt="Random Scene"
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: 0.3,
                                    zIndex: -1
                                }}
                            />
                        </div>
                    )}
                </IrisWipe>
            </div>
        </div>
    );
};

// --- Standard Stories ---

export const Default: Story = {
    args: {
        isOpen: true,
        children: null,
    },
    render: (args) => <InteractiveWrapper args={args} />
};

export const PropDirection: Story = {
    name: 'Option: From Top Left',
    args: {
        isOpen: true,
        children: null,
        center: { x: 0, y: 0 },
        duration: 1500,
    },
    render: (args) => <InteractiveWrapper args={args} text="CORNER WIPE" />
};

export const PropEasing: Story = {
    name: 'Option: Custom Easing',
    args: {
        isOpen: true,
        children: null,
        easing: 'easeOut',
        duration: 1200,
    },
    render: (args) => <InteractiveWrapper args={args} text="EASE OUT" />
};

// --- Use Cases ---

export const SceneTransitionStandard: Story = {
    name: 'UseCase: Standard Scene',
    args: {
        isOpen: true,
        children: null,
        duration: 1000,
        easing: 'easeInOut',
        center: { x: 50, y: 50 },
    },
    render: (args) => <InteractiveWrapper args={args} bg="#000" text="NEXT SCENE" />
};

export const DreamSequence: Story = {
    name: 'UseCase: Dream Reveal',
    args: {
        isOpen: true,
        children: null,
        duration: 3000,
        easing: 'easeOut',
        center: { x: 50, y: 50 },
    },
    render: (args) => (
        <InteractiveWrapper
            args={args}
            bg="#fff"
            text="DREAM..."
        />
    )
};

export const DramaticEntry: Story = {
    name: 'UseCase: Dramatic Entry',
    args: {
        isOpen: true,
        children: null,
        duration: 4000,
        easing: 'easeIn',
        center: { x: 50, y: 80 },
    },
    render: (args) => <InteractiveWrapper args={args} bg="#220000" text="BOSS BATTLE" />
};
