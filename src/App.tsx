import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { Background } from './components/Background/Background'
import HomeScreen from './components/HomeScreen'
import './App.scss'


function App() {
    return (
    <Router>
      <div className="App">
        <Background />
        <div className="content">
          <HomeScreen />
        </div>
      </div>
    </Router>
  );
}

export default App;
