import React, { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';

import Article from '../../components/Article';
import { getArticles } from './api';
import posterImage from '../../public/images/poster.jpg';
import './styles.scss';

function getTopArticle(articles) {
  const orderedArticles = [...articles].sort((a, b) => b.score - a.score);

  return orderedArticles[0] || '';
}

const ARTICLES = getArticles();

function HomePage() {
  const [articles, setArticles] = useState(ARTICLES);
  const [loading, setLoading] = useState(false);
  const [temp, setTemp] = useState('');

  useEffect(() => {
    setLoading(true);
    const parsedArticles = ARTICLES.map((item) => ({
      ...item,
      score: zxcvbn(item.title).score,
    }));
    setArticles(parsedArticles);
    const t = [...Array(250).fill(250)].map(() => {
      const str = JSON.stringify(parsedArticles);
      return str;
    });
    setTemp(JSON.stringify(t));
    setLoading(false);
    const top = getTopArticle(parsedArticles);
    const updatedArticles = parsedArticles.map((item) => ({
      ...item,
      isTop: item.title === top,
    }));
    setArticles(updatedArticles);
  }, []);

  const onVoteHandler = (t) => {
    const articlesChanged = articles.map((item) => {
      if (item.title === t) {
        return {
          ...item,
          score: item.score + 1,
        };
      }
      return item;
    });

    const top = getTopArticle(articlesChanged);
    const updatedArticles = articlesChanged.map((item) => ({
      ...item,
      isTop: item.title === top.title,
    }));
    setArticles(updatedArticles);
  };

  return (
    <div className="HomePage__root">
      <div
        className="notification"
        style={{
          backgroundImage: `url(${posterImage})`,
          height: 480,
          color: '#006aa2',
          fontSize: 14,
          marginTop: 20,
        }}
      >
        <h1 className="title is-1">Star Wars - be on the green side!</h1>
        <p style={{ color: 'white', fontSize: 24 }}>
          There are many reasons why George Lucas’ story of a young man, an evil Empire and a galaxy far,
          far away captured the imaginations of the generation who grew up on that original trilogy,
          and why it still reels in younger viewers weaned on prequels, sequels and other canonical spin-offs.
          Yes, its archetypal tale of good vs. bad is mythic and timeless – but it’s the vast universe that saga set up,
          full of alien races and oddball technology, that has arguably kept people coming back to dig into the far corners of Star Wars‘ worlds.
        </p>
      </div>
      <div className="notification">
        {
          loading ? 'loading...'
            : articles.map((item) => (
              <Article
                image={item.image}
                key={item.title}
                onVoteClick={onVoteHandler}
                score={item.score}
                text={item.text}
                title={item.title}
                isTop={item.isTop}
              />
            ))
        }
      </div>
      <div style={{ display: 'none' }}>{JSON.stringify(temp)}</div>
    </div>
  );
}

export default HomePage;
