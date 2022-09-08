import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { Background } from './components/Background/Background'
import HomeScreen from './components/HomeScreen'
import ReactGA from 'react-ga';
import './App.scss'

ReactGA.initialize('G-HQVR1RQ0EQ');

function App() {
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
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
