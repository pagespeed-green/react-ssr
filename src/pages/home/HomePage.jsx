import React from 'react';

import './styles.scss';

function HomePage() {
  return (
    <div className="AboutPage__root container is-fluid">
      <div className="notification">
        <h1 className="title">Home</h1>
        <p>
        Server-side rendering (SSR) is a popular technique for rendering a normally client-side only single page app (SPA)
         on the server and then sending a fully rendered page to the client.
         ... SSR can also often help with performance because a fully loaded app is sent down from the server on the first request.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
