import React, { useState, useEffect } from 'react';

interface ExpandableCardProps {
    title: string;
    content: React.ReactNode;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ title, content }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [spanValue, setSpanValue] = useState(1);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        let intervalId: any;
        if (isExpanded) {
            setSpanValue(6);
        } else {
            intervalId = setInterval(() => {
                setSpanValue((prevSpan) => {
                    if (prevSpan > 1) return prevSpan - 1;
                    clearInterval(intervalId);
                    return 1;
                });
            }, 50);
        }
        return () => clearInterval(intervalId);
    }, [isExpanded]);

    return (
        <div
            className={`border p-4 rounded-lg shadow-md transition-all duration-300 transparent-bg`}
            style={{ gridRowEnd: `span ${spanValue}` }}
        >
            <h3
                onClick={toggleExpand}
                className="cursor-pointer text-lg font-semibold mb-2 flex justify-between items-center"
            >
                <span>{title}</span>
                <span>{isExpanded ? '▼' : '▲'}</span>
            </h3>
            <div
                className={`expandable-content overflow-hidden transition-all duration-700`}
                style={{
                    maxHeight: isExpanded ? '1000px' : '0',
                    opacity: isExpanded ? 1 : 0,
                }}
            >
                {content}
            </div>
        </div>
    );
};
export default ExpandableCard