import React from 'react';
import PropTypes from 'prop-types';
import { StaticRouter } from 'react-router';

import Routes from './Routes';

import './main.scss';
import './polyfills';

function App({ route }) {
  return (
    <StaticRouter location={route}>
      <Routes />
    </StaticRouter>
  );
}

App.propTypes = {
  route: PropTypes.string,
};

App.defaultProps = {
  route: '/',
};

export default App;
