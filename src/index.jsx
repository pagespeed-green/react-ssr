import React from 'react';
import ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component';

import App from './App';
import './main.scss';

loadableReady(() => {
  const root = document.getElementById('app');
  ReactDOM.hydrate(<App />, root);
});
