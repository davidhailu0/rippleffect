import React, { useState, CSSProperties, useEffect } from 'react';

export interface NotificationBarProps {
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
    style?: CSSProperties;
}

const YellowNotificationBar: React.FC<NotificationBarProps> = ({ message, actionLabel, onAction, style }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(true)
    }, [message, actionLabel, onAction, style])

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible || !message) return null; // If not visible, render nothing

    return (
        <div
            className="fixed top-3 min-w-80 md:w-[700px] right-16 transition-all ease-in-out duration-150 px-4 py-3 rounded shadow-lg flex items-center justify-between"
            style={{
                backgroundColor: '#facc15', // Default background color
                color: '#000000', // Default text color
                border: '1px solid #fbbf24', // Default border color
                zIndex: 999,
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

export default YellowNotificationBar;
