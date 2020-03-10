import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

function Article({
  image,
  onVoteClick,
  score,
  text,
  title,
  isTop,
}) {
  const [temp, setTemp] = useState('');

  useEffect(() => {
    async function asyncCall() {
      const t = [...Array(200).fill(200)].map(() => {
        const str = JSON.stringify(text);
        return str;
      });
      setTemp(JSON.stringify(t));
    }
    asyncCall();
  }, [text]);

  return (
    <>
      <article className="media">
        {
        score < 3 && (
          <figure className={`media-left${isTop ? ' Article__border' : ''}`}>
            <p className="image is-128x128">
              <img alt={title} src={image} />
            </p>
          </figure>
        )
      }
        <div className="media-content">
          <div className="content">
            <p>
              <strong style={{ color: score < 3 ? 'black' : '#006aa2' }}>
                {title}
                {' '}
                -
                {' strength ('}
                {score}
                {')'}
              </strong>
              <br />
              {text}
              <br />
              <button type="button" className="button" onClick={() => { onVoteClick(title); }}>
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </span>
                <span>Like</span>
              </button>
            </p>
          </div>
        </div>
        {
        score >= 3 && (
          <figure className={`media-right${isTop ? ' Article__border' : ''}`}>
            <p className="image is-128x128">
              <img alt={title} src={image} />
            </p>
          </figure>
        )
      }
      </article>
      <div className="media-content" style={{ fontSize: 1, marginTop: 8, marginBottom: 8 }}>{JSON.stringify(temp)}</div>
    </>
  );
}

Article.propTypes = {
  image: PropTypes.string,
  isTop: PropTypes.bool,
  onVoteClick: PropTypes.func.isRequired,
  score: PropTypes.number,
  text: PropTypes.string,
  title: PropTypes.string,
};

Article.defaultProps = {
  image: '',
  isTop: false,
  score: 0,
  text: '',
  title: '',
};


export default Article;
