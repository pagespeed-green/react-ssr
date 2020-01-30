import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

import './polyfills';

function App() {
  React.useEffect(() => {
    const cssStyles = document.querySelector('#css-server-side');
    if (cssStyles) {
      cssStyles.parentNode.removeChild(cssStyles);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default hot(module)(App);
