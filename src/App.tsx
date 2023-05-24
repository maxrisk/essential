import React from 'react';
import Button from './components/Button/button';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Button>确定</Button>
        <Button disabled onClick={() => console.log(123)}>Button</Button>
        <Button round>Button</Button>
        <Button size="sm">确定</Button>
        <Button size="lg">确定</Button>
        <Button btnType="primary">确定</Button>
        <Button btnType="primary" disabled>确定</Button>
        <Button btnType="danger">确定</Button>

        <p>
          Edit
          <code>src/App.tsx</code>
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </div>
  );
}

export default App;
