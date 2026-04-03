import React from 'react';
import UserProfile from '../components/UserProfile';

function Dashboard() {

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        padding: '30px',
        color: '#fff'
    };

    const cardStyle = {
        background: '#fff',
        color: '#333',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
        maxWidth: '900px',
        margin: '0 auto'
    };

    const headingStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '32px',
        fontWeight: 'bold'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Welcome to Dashboard 🚀</h1>

            <div style={cardStyle}>
                <UserProfile />
            </div>
        </div>
    );
}

export default Dashboard;