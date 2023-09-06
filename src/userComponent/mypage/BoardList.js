import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./MyPage.css";
import line from '../mypage/img/Untitled_line.png';

function BoardList({ userId }) {
  const [board, setBoard] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`/board/mylist/${userId}`)
      .then(response => {
        const sortedBoard = response.data.sort((a, b) => new Date(b.writeDate) - new Date(a.writeDate));
        setBoard(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('에러가 발생했습니다!', error);
      });
  }, [userId]);


  // 컨텐츠 10글자 넘어가면 자르기 
  const truncateContent = (content) => {
    if (content.length > 10) {
      return content.slice(0, 10) + '...';
    }
    return content;
  };

  // 클릭하면 해당 게시물로 이동
  const handlePostClick = (boardId) => {
    navigate(`/board/detail/${boardId}`);
  };


  return (
    <div>
      <div className='user-card-board'>
      {board.slice(0, 5).map(post => (
        <div key={post.id} onClick={() => handlePostClick(post.id)}>

            <div className='my-board-list'>
            <p> <b>{post.title}</b> | {truncateContent(post.content)} | {post.writeDate} </p>
            <p><img src={line} ></img></p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardList;
