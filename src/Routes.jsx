import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';

import ROUTES from './routesList';

const HomePage = loadable(() => import('./pages/home/HomePage'), {
  fallback: <Loading />,
});

const AboutPage = loadable(() => import('./pages/about/AboutPage'), {
  fallback: <Loading />,
});

const ContactPage = loadable(() => import('./pages/contact/ContactPage'), {
  fallback: <Loading />,
});

function Routes() {
  return (
    <ErrorBoundary>
      <Layout>
        <Switch>
          <Route exact path={ROUTES.HOME_PAGE} component={HomePage} />
          <Route exact path={ROUTES.ABOUT} component={AboutPage} />
          <Route exact path={ROUTES.CONTACT} component={ContactPage} />
        </Switch>
      </Layout>
    </ErrorBoundary>
  );
}

export default Routes;
