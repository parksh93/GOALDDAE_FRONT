import React, { useEffect, useState, useRef } from 'react';
import './Article.css'; 
import { Box, Button } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';

const Article = () => {
    const [articles, setArticles] = useState([]);
    const [renderCount, setRenderCount] = useState(0);
    const idxRef = useRef({ start: 0, end: 5 });

    useEffect(() => {
        fetch('/article/world')
            .then(response => response.json())
            .then(data => setArticles(data));
    }, []);

    // 25개 렌더링 다 하면 강제적으로 처음부터 다시 렌더링 진행
    // 15초마다 다음 기사 보여줌
    useEffect(() => {
      console.log("===================" , articles)
        if (articles.length === 0) return;  
        const timerId = setInterval(() => {
            if (idxRef.current.end >= articles.length) {
                idxRef.current.start = 0;
                idxRef.current.end = 5;
            } else {
                idxRef.current.start += 5;
                idxRef.current.end += 5;
            }
            setRenderCount(prevCount => prevCount + 1);
        },15000); 
  
       return () => clearInterval(timerId); 
   }, [articles]); 

   
  return (
    <div style={{ display: 'flex', justifyContent: 'start'}}>
      <Box sx={{ 
        height: { xs: '180px', sm:"204px" },
        width: { xs: '350px', sm:"575px" },
        // margin: "1%",
        maxWidth: '1000px',
        padding:'3%',
        boxShadow:'2px 2px 3px 3px #ccc',
        borderRadius:'15px'
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div className='title'><CampaignIcon color="success" /> <span className="headline">오늘의 핫이슈</span></div>
          <Button 
            variant="contained" 
            href={"https://sports.news.naver.com/wfootball/news/index?isphoto=N"} 
            className="newsButton"
            color="success"
            sx={{
              padding: { xs: '6px 10px', sm: '6px 12px' },
              fontSize: { xs: '8px', sm: '8px' },
            }}
            >전체뉴스보기</Button>
        </div>
        {articles.length !== 0 ?
          articles.slice(idxRef.current.start,idxRef.current.end).map((article) =>
          <Box 
            sx={{
              margin:{ xs: "2%", sm: "2%"},
              width: { xs: "353px", sm: "470px"},
              borderRadius:'10px',
              fontSize: {xs: "", sm: "12px"},
              fontWeight: "bold"
              }} 
              key={article.id}>
              <div className='title'>
                  <ul><a href={article.url} className="newsLink">{article.title}</a></ul>
              </div>
          </Box>
        ): "새로운 기사가 없습니다."}
      </Box>
    </div>
  );
}

export default Article;
