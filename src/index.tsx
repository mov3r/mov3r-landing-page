import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './fonts/text-styles.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/ppeiko-heavy.otf'
import './fonts/Nunito-Regular.ttf'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
reportWebVitals();
