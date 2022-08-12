import React from 'react';
import Social from './components/Social';
import './App.scss';
import MailChimp from './components/MailChimp';

function App() {
  return (
    <div className="App">
      <div className="bg-layer"/>
      <div className="content">
        <div className="text">
          <div>
            <h1>mover</h1>
            <h2>The first Aptos bridge and cross-chain messaging protocol</h2>
          </div>
          <div>
            <p className="uppercase">Join the WaitList to be the first<br/> to access the platform</p>
          </div>
          <div>
            <MailChimp/>
          </div>
        </div>
        <Social/>
      </div>
    </div>
  );
}

export default App;
