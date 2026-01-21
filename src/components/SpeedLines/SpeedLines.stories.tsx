import type { Meta, StoryObj } from '@storybook/react';
import { SpeedLines } from './SpeedLines';
import React from 'react';

const meta = {
    title: 'Effects/SpeedLines',
    component: SpeedLines,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        lineCount: {
            control: { type: 'range', min: 10, max: 300, step: 10 },
            description: 'Number of lines to render',
            table: {
                category: 'Appearance',
                defaultValue: { summary: '60' },
            },
        },
        minLength: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Minimum line length (% of radius)',
            table: {
                category: 'Appearance',
                defaultValue: { summary: '30' },
            },
        },
        maxLength: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Maximum line length (% of radius)',
            table: {
                category: 'Appearance',
                defaultValue: { summary: '60' },
            },
        },
        innerRadius: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Radius of the clear center area (%)',
            table: {
                category: 'Appearance',
                defaultValue: { summary: '0' },
            },
        },
        color: {
            control: 'color',
            description: 'Color of the lines (rgba recommended)',
            table: {
                category: 'Appearance',
                defaultValue: { summary: 'rgba(0, 0, 0, 0.6)' },
            },
        },
        center: {
            control: 'object',
            description: 'Center point {x, y} in %',
            table: {
                category: 'Positioning',
                defaultValue: { summary: '{ x: 50, y: 50 }' },
            },
        },
        animated: {
            control: 'boolean',
            description: 'Enable opacity/pulse animation',
            table: {
                category: 'Animation',
                defaultValue: { summary: 'false' },
            },
        },
        animationSpeed: {
            control: { type: 'range', min: 0.1, max: 5, step: 0.1 },
            description: 'Animation speed multiplier',
            table: {
                category: 'Animation',
                defaultValue: { summary: '1' },
            },
        },
    },
} satisfies Meta<typeof SpeedLines>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generic Wrapper for visual context
const Wrapper = ({ children, bg = '#fff', text = 'ACTION!' }: { children: React.ReactNode, bg?: string, text?: string }) => (
    <div style={{ width: '100vw', height: '100vh', background: bg, position: 'relative', overflow: 'hidden' }}>
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            padding: '2rem',
            background: 'white',
            border: '2px solid black',
            fontWeight: 'bold',
            fontSize: '2rem',
            boxShadow: '10px 10px 0px rgba(0,0,0,0.2)'
        }}>
            {text}
        </div>
        {children}
    </div>
);

// --- Standard Options ---

export const Default: Story = {
    args: {
        lineCount: 60,
        minLength: 30,
        maxLength: 60,
        innerRadius: 0,
        animated: false,
        animationSpeed: 1,
        color: 'rgba(0, 0, 0, 0.6)',
        center: { x: 50, y: 50 },
    },
    render: (args) => <Wrapper>{/* Default implies SpeedLines is passed implicitly? No, we need to render it. */}
        <SpeedLines {...args} />
    </Wrapper>
};

// --- Property Variations ---

export const PropMinLength: Story = {
    name: 'Option: Line Lengths',
    args: {
        minLength: 60,
        maxLength: 90,
        lineCount: 80,
    },
    render: (args) => <Wrapper text="LONG LINES"><SpeedLines {...args} /></Wrapper>
};

export const PropInnerRadius: Story = {
    name: 'Option: Inner Radius',
    args: {
        innerRadius: 30,
        lineCount: 100,
    },
    render: (args) => <Wrapper text="CENTER CLEAR"><SpeedLines {...args} /></Wrapper>
};

export const PropColor: Story = {
    name: 'Option: Color',
    args: {
        color: 'rgba(0, 0, 255, 0.5)',
        lineCount: 50,
    },
    render: (args) => <Wrapper text="BLUE LINES"><SpeedLines {...args} /></Wrapper>
};

// --- Use Cases ---

export const ActionFast: Story = {
    name: 'UseCase: High Speed Action',
    args: {
        animated: true,
        animationSpeed: 3,
        lineCount: 150,
        minLength: 10,
        maxLength: 40,
        color: 'rgba(0,0,0,0.8)',
    },
    render: (args) => <Wrapper text="SO FAST!!"><SpeedLines {...args} /></Wrapper>
};

export const Horror: Story = {
    name: 'UseCase: Horror',
    parameters: {
        backgrounds: { default: 'dark' }
    },
    args: {
        animated: true,
        animationSpeed: 0.5,
        lineCount: 200,
        minLength: 50,
        maxLength: 100,
        innerRadius: 10,
        color: 'rgba(200, 0, 0, 0.7)', // Blood red
    },
    render: (args) => (
        <Wrapper bg="#2a0000" text="SCARED...">
            <SpeedLines {...args} />
        </Wrapper>
    )
};

export const Flashback: Story = {
    name: 'UseCase: Flashback',
    args: {
        animated: true,
        animationSpeed: 0.2,
        lineCount: 40,
        minLength: 20,
        maxLength: 80,
        color: 'rgba(255, 255, 255, 0.8)', // White lines
    },
    render: (args) => (
        <Wrapper bg="#d4a574" text="MEMORIES...">
            {/* Adding a sepia tone image background simulation */}
            <div style={{ position: 'absolute', inset: 0, background: '#704214', opacity: 0.5, zIndex: 0 }}></div>
            <SpeedLines {...args} />
        </Wrapper>
    )
};

export const Focus: Story = {
    name: 'UseCase: Focus',
    args: {
        lineCount: 300,
        innerRadius: 40,
        minLength: 0, // start from edge of innerRadius effectively? 
        // Wait, minLength is % of radius. 
        // if innerRadius is 40, lines start at 40. 
        // minLength/maxLength are length OF the line relative to radius? 
        // Usually line starts at some random point. 
        // Logic check: SpeedLines utils might handle this.
        maxLength: 20,
        color: 'rgba(0,0,0,1)',
    },
    render: (args) => <Wrapper text="LOOK HERE"><SpeedLines {...args} /></Wrapper>
};
