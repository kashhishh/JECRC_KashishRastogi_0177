import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);
    const [lastAction, setLastAction] = useState('None');

    const increment = () => {
        setCount(count + step);
        setLastAction('Incremented by ' + step);
    };

    const decrement = () => {
        setCount(count - step);
        setLastAction('Decremented by ' + step);
    };

    const reset = () => {
        setCount(0);
        setStep(1);
        setLastAction('Reset to 0');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>

            <div style={{ fontSize: '24px', margin: '20px' }}>
                <h1>Counter: {count}</h1>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="step">Step: </label>
                <input 
                    type="number" 
                    id="step" 
                    value={step} 
                    onChange={(e) => setStep(Number(e.target.value))} 
                    style={{ width: '60px', textAlign: 'center' }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>
                <button onClick={reset} style={buttonStyle}>Reset</button>
            </div>  

            <div style={{ marginTop: '20px', fontStyle: 'italic' }}>
                Last action: {lastAction}
            </div>

        </div>
    );          
}

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: '#fff',
};

export default Counter;