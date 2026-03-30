import React, { useState } from 'react';

function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    const pageStyle = {
        backgroundColor: isDark ? '#121212' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        marginTop: '20px',
        backgroundColor: isDark ? '#ffffff' : '#000000',
        color: isDark ? '#000000' : '#ffffff'
    };

    return (
        <div style={pageStyle}>
            <h1>Mode: {isDark ? 'Dark' : 'Light'}</h1>

            <button onClick={toggleTheme} style={buttonStyle}>
                Switch to {isDark ? 'Light' : 'Dark'} Mode
            </button>
        </div>
    );
}

export default ThemeToggle;