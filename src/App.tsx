import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { Background } from './components/Background/Background'
import HomeScreen from './components/HomeScreen'
import ReactGA from 'react-ga';
import './App.scss'

ReactGA.initialize(`${process.env.REACT_APP_TRACKING_ID}`);
React.useEffect(() => {
  ReactGA.pageview(window.location.pathname + window.location.search);
}, []);

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
