import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./MyPage.css";
import line from '../mypage/img/Untitled_line.png';
import { formatDate } from '../../boardComponent/dateUtils';
import heartIcon from '../mypage/img/free-icon-heart-833472.png';

function BoardList({ userId }) {
  const [board, setBoard] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("");
  const [searchName, setSearchName] = useState("");
  const location = useLocation();
  
   // 현재 페이지 상태
   const [currentPageNumber,setPageNumber]=useState(1);
  
   // 한 페이지에 보여줄 게시글 수
   const postsPerPage=5;
  

   useEffect(() => {
    let type;
    let name;
  
    const searchParams = new URLSearchParams(location.search);
  
    if (searchParams.has("type")) {
      type = searchParams.get("type");
    } else {
      type = "";
    }
  
    if (searchParams.has("name")) {
      name = searchParams.get("name");
    } else {
      name = "";
    }
  
     setSearchType(type);
     setSearchName(name);

     loadTotalPosts(); 
     loadBoard();

  }, [location]);
  
  function loadTotalPosts() {
    axios.get(`/board/total-posts?type=${searchType}&name=${searchName}`)
      .then((response) => {
        setTotalPosts(response.data.totalPosts);
      });
  }

  function loadBoard() {
    axios.get(`/board/list?type=${searchType}&name=${searchName}&page=${currentPageNumber}&size=${postsPerPage}`)
      .then((response) => {
        if (!Array.isArray(response.data.board)) {
          console.error('Invalid post data:', response.data.board);
          return;
        }
        
        setBoard(response.data.board);
      });
  }
  
  
 
   // 제목 글자 수 제한
   const truncateContent=(content)=>{
     if(content.length>10){
       return content.slice(0,10)+'...';
     }
 
     return content;
   }
 
   
// 클릭하면 해당 게시물로 이동
const handlePostClick=(postId)=>{
navigate(`/board/detail/${postId}`);
}

return (
<div className='user-card-board'>
{board.map((post) => (
<div className="post-item" key={post.id} onClick={() => handlePostClick(post.id)}>
<p>
<span className='my-board-list' style={{ alignItems: 'center' }}>
{/* 제목 */}
<div style={{ flex: 1 }}>
<b>{truncateContent(post.title)}</b>
</div>
{/* 댓글 수 좋아요 수 조회수 */}
<div style={{ flex: 1 }}>
<span style={{ marginRight: '10px' }}>댓글 {post.replyCount}</span>
<span style={{ marginRight: '10px' }}>
<img src={heartIcon} alt="heart" style={{ width:'20px', height:'20px', objectFit:'contain' }} /> {post.heart}
</span>
<span>조회수 {post.count}</span>
</div>

{/* 작성일자 */}
<div style={{flex:1,textAlign:'right',color: 'gray'}}>
작성일자 {formatDate(post.writeDate)}
</div>

</span></p><p><img src={line}></img></p></div>
))}

 {/* 페이지 번호 버튼 */}
 <div style={{ display: 'flex', justifyContent: 'center' }}>
{Array.from({length: Math.ceil(totalPosts/postsPerPage)}, (_, i) => (
<button key={i} onClick={() => setPageNumber(i + 1)} style={{backgroundColor: currentPageNumber === i + 1 ? '#000000': '#ffffff', color: currentPageNumber === i +1 ? '#ffffff': '#000000'}}>
{i + 1}
</button>
))}
 </div>

 </div>);
}

export default BoardList;
