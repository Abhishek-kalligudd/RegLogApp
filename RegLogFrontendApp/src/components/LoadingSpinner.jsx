import React from 'react';

const LoadingSpinner = ({ fullScreen }) => {
    return (
        <div className={`spinner-container ${fullScreen ? 'full-screen' : ''}`}>
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingSpinner;
