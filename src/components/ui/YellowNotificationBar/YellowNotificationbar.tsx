import React, { useState, CSSProperties, useEffect } from "react";

export interface NotificationBarProps {
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
    style?: CSSProperties;
}

const YellowNotificationBar: React.FC<NotificationBarProps> = ({
    message,
    actionLabel,
    onAction,
    style,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(true);
    }, [message, actionLabel, onAction, style]);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible || !message) return null; // If not visible, render nothing

    return (
        <div
            className="fixed top-2 right-[20%] w-[400px] flex-col gap-3 transition-all ease-in-out duration-150 px-4 py-3 rounded shadow-lg flex z-[999]"
            style={{
                backgroundColor: "#facc15", // Default background color
                color: "#000000", // Default text color
                border: "1px solid #fbbf24", // Default border color
                zIndex: 999,
                ...style,
            }}
        >
            <span className="font-bold w-[] max-w-[94%]">{message}</span>
            <div className="flex  w-full">
                {actionLabel && (
                    <button
                        onClick={onAction}
                        className="bg-black w-full text-white px-5 py-3 rounded hover:bg-gray-800 transition"
                    >
                        {actionLabel}
                    </button>
                )}
                <button
                    onClick={handleClose}
                    className="text-black absolute right-3 text-xl top-3 font-bold hover:text-gray-700"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default YellowNotificationBar;
