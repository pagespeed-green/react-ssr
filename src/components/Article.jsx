import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function Article({ title, image, text }) {
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-128x128">
          <img alt={title} src={image} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{title}</strong>
            <br />
            {text}
            <br />
            <button type="button" className="button">
              <span className="icon is-small">
                <FontAwesomeIcon icon={faThumbsUp} />
              </span>
              <span>Like</span>
            </button>
          </p>
        </div>
      </div>
    </article>
  );
}

Article.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  text: PropTypes.string,
};

Article.defaultProps = {
  title: '',
  image: '',
  text: '',
};


export default Article;
