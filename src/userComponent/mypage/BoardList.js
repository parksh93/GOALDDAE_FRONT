import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./MyPage.css";
import line from '../mypage/img/Untitled_line.png';
import { formatDate } from '../../boardComponent/dateUtils';
import heartIcon from '../mypage/img/free-icon-heart-833472.png';

function BoardList({ userId }) {
  const [board, setBoard] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const navigate = useNavigate();

  // 현재 페이지 상태
  const [currentPageNumber, setPageNumber] = useState(1);

  // 한 페이지에 보여줄 게시글 수
  const postsPerPage = 5;

  useEffect(() => {
    // 게시물 목록을 가져오는 요청
    axios.get(`/board/mylist/${userId}`)
      .then((response) => {
        if (!Array.isArray(response.data)) {
          console.error('Invalid post data:', response.data);
          return;
        }

        // 최신 글부터 정렬
        const sortedBoard = response.data.sort((a, b) => {
          const dateA = new Date(a.writeDate);
          const dateB = new Date(b.writeDate);
          return dateB - dateA;
        });

        setBoard(sortedBoard);
        setTotalPosts(sortedBoard.length); // 총 게시글 수 업데이트
      })
      .catch((error) => {
        console.error('게시물 목록을 가져오는 중 오류 발생:', error);
      });
  }, [userId]);

  const startIndex = (currentPageNumber - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  // 컨텐츠 글자 수 제한 함수
  const truncateContent = (content) => {
    if (content.length > 10) {
      return content.slice(0, 10) + '...';
    }
    return content;
  };

  // 클릭하면 해당 게시물로 이동
  const handlePostClick = (postId) => {
    navigate(`/board/detail/${postId}`);
  };

  // 페이지 번호 버튼을 렌더링하는 함수
  const renderPaginationButtons = () => {
    return Array.from({ length: Math.ceil(totalPosts / postsPerPage) }, (_, i) => (
      <button
        key={i}
        onClick={() => setPageNumber(i + 1)}
        style={{
          backgroundColor: 'transparent',
          color: '#000',
          fontWeight: currentPageNumber === i + 1 ? 'bold' : 'normal', // 선택된 페이지 볼드 처리
          padding: '5px 10px',
        }}
      >
        {i + 1}
      </button>
    ));
  };

  return (
    <div className='user-card-board'>
      {board.slice(startIndex, endIndex).map((post, index) =>
        <div className="post-item" key={post.id} onClick={() => handlePostClick(post.id)}>
          <p> <span className='my-board-list' style={{ alignItems: 'center' }}>
            {/* 제목 */}
            <div style={{ flex: 1 }}> <b>{truncateContent(post.title)}</b> </div>

            {/* 댓글 수 좋아요 수 조회수 */}
            <div style={{ flex: 1 }}>
              <span style={{ flex: 1, marginRight: '10px' }}>댓글 {post.replyCount}</span>
              <span><img src={heartIcon} alt="heart" style={{ width: '20px', height: '20px', objectFit: 'contain' }} /> {post.heartCount}</span>
              <span style={{ flex: 1, marginLeft: '10px' }}>조회수 {post.count}</span> </div>

            {/* 작성일자 */}
            <div style={{ flex: 1, textAlign: 'right', color: 'grey' }}> 작성일자 {formatDate(post.writeDate)} </div>
          </span></p><p><img src={line} alt="line" /></p>
        </div>
      )}

      {/* 게시물이 없는 경우 텍스트를 표시 */}
        {board.length === 0 && (
        <h2 className="no-boards-message" style={{ color: 'grey' }}>아직 쓴 글이 없네요 .. 😞</h2>
      )}

      {/* 페이지 번호 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {renderPaginationButtons()}
      </div>
    </div>
  );
}

export default BoardList;