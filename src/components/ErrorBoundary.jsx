import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div style={{ paddingLeft: 20 }}>
          <h1>Something went wrong.</h1>
          <article>
            Please reload the current page
          </article>
        </div>
      );
    }

    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
