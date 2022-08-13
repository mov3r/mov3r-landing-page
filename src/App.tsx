import React from 'react';
import { Background } from './components/Background/Background';
import { HomeScreen } from './components/HomeScreen/HomeScreen';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Background />
      <div className="content">
        <HomeScreen />
      </div>
    </div>
  );
}

export default App;
