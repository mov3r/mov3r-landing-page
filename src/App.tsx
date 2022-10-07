import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import HomeScreen from './components/HomeScreen'
import './App.scss'


function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <HomeScreen />
        </div>
      </div>
    </Router>
  );
}

export default App;
