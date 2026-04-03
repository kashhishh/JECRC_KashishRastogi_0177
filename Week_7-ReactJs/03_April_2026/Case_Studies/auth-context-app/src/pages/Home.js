import React from 'react';
import LoginForm from '../components/LoginForm';

function Home() {

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #43cea2, #185a9d)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        color: '#fff'
    };

    const cardStyle = {
        background: '#fff',
        color: '#333',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
    };

    const headingStyle = {
        marginBottom: '25px',
        fontSize: '28px',
        fontWeight: 'bold'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={headingStyle}>Welcome to Auth Context App 👋</h1>
                <LoginForm />
            </div>
        </div>
    );
}

export default Home;