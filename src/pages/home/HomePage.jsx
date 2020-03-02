import React, { useEffect, useState } from 'react';

import Article from '../../components/Article';
import { getArticles } from './api';
import './styles.scss';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function asyncCall() {
      setLoading(true);
      const { payload } = await getArticles();
      setArticles(payload);
      setLoading(false);
    }
    asyncCall();
  }, []);

  return (
    <div className="AboutPage__root container is-fluid">
      <div className="notification">
        <h1 className="title">Star Wars - be on the green side!</h1>
        <p>
        There are many reasons why George Lucas’ story of a young man, an evil Empire and a galaxy far, far away captured the imaginations of the generation who grew up on that original trilogy, and why it still reels in younger viewers weaned on prequels, sequels and other canonical spin-offs. Yes, its archetypal tale of good vs. bad is mythic and timeless – but it’s the vast universe that saga set up, full of alien races and oddball technology, that has arguably kept people coming back to dig into the far corners of Star Wars‘ worlds.
        </p>
      </div>
      <div className="notification">
        {
          loading ? 'loading...' :
            articles.map(item => (
              <Article key={item.title} {...item} />
            ))
        }
      </div>
    </div>
  );
}

export default HomePage;
