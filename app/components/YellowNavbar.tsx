import React, { useState, CSSProperties } from 'react';

interface NotificationBarProps {
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    style?: CSSProperties;
}

const NotificationBar: React.FC<NotificationBarProps> = ({ message, actionLabel, onAction, style }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null; // If not visible, render nothing

    return (
        <div
            className="fixed top-12 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg flex items-center justify-between"
            style={{
                backgroundColor: '#facc15', // Default background color
                color: '#000000', // Default text color
                border: '1px solid #fbbf24', // Default border color
                minWidth: '500px',
                zIndex: 50,
                ...style,
            }}
        >
            <span className="font-bold mr-4">{message}</span>
            <div className="flex items-center space-x-3">
                {actionLabel && (
                    <button
                        onClick={onAction}
                        className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                    >
                        {actionLabel}
                    </button>
                )}
                <button onClick={handleClose} className="text-black font-bold hover:text-gray-700">
                    ✕
                </button>
            </div>
        </div>
    );
};

export default NotificationBar;
