import React from 'react';
import Button from './components/Button/button';
import './App.css';
import Alert from './components/Alert/alert';

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
      </div>

      <div className="App-header vertical">
        <Alert type="info" title="欢迎使用" />
        <Alert type="danger" title="出现了错误" />
        <Alert type="warning" title="不能这样操作哦" />
        <Alert type="success" title="操作成功" />
      </div>
    </div>
  );
}

export default App;
