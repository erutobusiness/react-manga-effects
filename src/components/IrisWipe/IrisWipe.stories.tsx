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
            options: ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'],
            description: 'CSS Easing function',
            table: { category: 'Animation', defaultValue: { summary: 'ease-in-out' } },
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
    overlayColor = null
}: {
    args: React.ComponentProps<typeof IrisWipe>,
    bg?: string,
    text?: string,
    overlayColor?: string | null
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
    render: (args) => <InteractiveWrapper args={args} />
};

export const PropDirection: Story = {
    name: 'Option: From Top Left',
    args: {
        center: { x: 0, y: 0 },
        duration: 1500,
    },
    render: (args) => <InteractiveWrapper args={args} text="CORNER WIPE" />
};

export const PropEasing: Story = {
    name: 'Option: Bouncy Easing',
    args: {
        easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', // Custom bounce-like effect
        duration: 1200,
    },
    render: (args) => <InteractiveWrapper args={args} text="BOUNCE!" />
};

// --- Use Cases ---

export const SceneTransitionStandard: Story = {
    name: 'UseCase: Standard Scene',
    args: {
        duration: 1000,
        easing: 'ease-in-out',
        center: { x: 50, y: 50 },
    },
    render: (args) => <InteractiveWrapper args={args} bg="#000" text="NEXT SCENE" />
};

export const DreamSequence: Story = {
    name: 'UseCase: Dream Reveal',
    args: {
        duration: 3000,
        easing: 'ease-out',
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
        duration: 4000,
        easing: 'ease-in', // Slow start, fast finish? or ease-out? ease-in makes it start slow which builds tension.
        center: { x: 50, y: 80 }, // Starting from bottom
    },
    render: (args) => <InteractiveWrapper args={args} bg="#220000" text="BOSS BATTLE" />
};
