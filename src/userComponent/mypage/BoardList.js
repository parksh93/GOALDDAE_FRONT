import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./MyPage.css";
import line from '../mypage/img/Untitled_line.png';
import { formatDate } from '../../boardComponent/dateUtils';
import heartIcon from '../mypage/img/free-icon-heart-833472.png';

function BoardList({ userId }) {
  const [board, setBoard] = useState([]);
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({});
  const [totalPageNum, setTotalPageNum] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {

    // URL에서 query string 파라미터 추출
    const page = parseInt(searchParams.get("page")) || 1;
    const type = searchParams.get("type") || "";
    const name = searchParams.get("name") || "";
  
    // 상태 업데이트
    setSearchType(type);
    setSearchName(name);
  
    // 페이지 정보를 가져오는 요청
    axios.get(`/board/list?type=${type}&name=${name}&page=${page}`).then((response) => {
      setPageData(response.data);
      setTotalPageNum(response.data.pageInfo.totalPages);
      setBoard(response.data.pageInfo.content);
    });
  }, [searchParams]);


  // 컨텐츠 10글자 넘어가면 자르기 
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

   return (
    
       <div className='user-card-board'>
        
         {board.slice(0,5).map(post =>
             <div className="post-item" key={post.id} onClick={() => handlePostClick(post.id)}>
             <p>
             <span className='my-board-list' style={{ alignItems: 'center' }}> 

              {/* 제목 */}
              <div style={{ flex: 1, marginLeft: '20px'  }}>
                <b>{truncateContent(post.title)}</b>
              </div>

              {/* 댓글 수, 좋아요 수, 조회수 */}
              <div style={{ flex: 1, marginTop: '30px', marginLeft: '20px' }}>
              <span style={{ marginRight: '20px' }}>댓글 {post.replyCount}</span>
              <span style={{ marginRight: '20px' }}><img src={heartIcon} alt="heart" style={{ width: '20px', height: '20px' }}/> {post.heart}</span>
              <span>조회수 {post.count}</span>
              </div>

              {/* 작성일자 */}
              <div style={{ flex: 1, textAlign: 'right', color: 'gray', fontSize: '14px' }}>
                작성일자 {formatDate(post.writeDate)}
              </div>
            </span>
          </p>
          <p><img src={line}></img></p>
        </div>
         )}
       </div>
       
   );
}

export default BoardList;
