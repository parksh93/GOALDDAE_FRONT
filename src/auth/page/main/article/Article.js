import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
const Article = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/article/world')
      .then(response => response.json())
      .then(data => setArticles(data));
  }, []);

  return (
    <div>
      {articles.map((article, index) => (
        <Box sx={{marginTop:"1%", border:"3px"}}>
            <div className='title' key={index}>
                <ul>{article.title}<a href={article.url}>[더보기]</a></ul>
                
            </div>
        </Box>
      ))}
    </div>
  );
}

export default Article;
