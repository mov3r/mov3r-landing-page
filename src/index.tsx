import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './store';
import './fonts/ppeiko-heavy.otf';
import './fonts/Nunito-Regular.ttf';
import './index.scss';
import './fonts/text-styles.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
