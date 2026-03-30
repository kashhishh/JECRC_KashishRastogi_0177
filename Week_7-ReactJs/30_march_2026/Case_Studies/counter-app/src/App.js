
import './App.css';
import Counter from './components/counter';
import StateVsPropsDemo from './components/StateVsPropsDemo';
import TemperatureConverter from './components/TemperatureConverter';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} 

// This is the main App component that renders the Counter component. You can replace Counter with StateVsPropsDemo to see the state vs props demonstration in action.

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}*/

// This is the main App component that renders the StateVsPropsDemo component to demonstrate the difference between state and props.
/*
function App() {
  return (
    <div>
      <StateVsPropsDemo />
    </div>
  );
}*/

/// This is the main App component that renders the TemperatureConverter component to demonstrate lifting state up in React.

function App() {
  return (
    <div>
      <TemperatureConverter />
    </div>
  );
}
export default App;


