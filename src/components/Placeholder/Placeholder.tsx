import React from 'react';

export interface PlaceholderProps {
    text?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ text = 'Manga Effect Placeholder' }) => {
    return (
        <div style={{
            padding: '2rem',
            border: '4px dashed #333',
            textAlign: 'center',
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            backgroundColor: '#f0f0f0'
        }}>
            {text}
        </div>
    );
};
