import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import HomeScreen from './components/HomeScreen'

function App() {
    return (
    <Router>
      <div className="App">
        <HomeScreen />
      </div>
    </Router>
  );
}

export default App;
