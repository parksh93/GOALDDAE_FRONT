import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ImageIcon from '@mui/icons-material/Image';
import styles from './BoardList.module.css'; // CSS 모듈 가져오기
import { formatDate } from '../dateUtils';
import { useUser } from "../../userComponent/userContext/UserContext";
import BestBoard from '../../auth/page/main/bestBoard/BestBoard';
import Article from '../../auth/page/main/article/Article';

function BoardListPage() {

  const { userInfo } = useUser();
    
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
      setTotalPageNum(response.data.pageInfo.totalPages)
    });
  }, [searchParams]);

  const handleSearch = () => {
    // 검색 버튼 클릭 시 페이지를 1로 초기화하고 요청
    setSearchType(searchType);
    setSearchName(searchName);
  };

  const { currentPageNum, startPageNum, endPageNum } = pageData;

  const pageButtons = [];
  for (let pageNum = startPageNum; pageNum <= endPageNum; pageNum++) {
    if(pageNum === currentPageNum){
      pageButtons.push(
        <span
          key={pageNum}
          className={styles.currentPageButton}
        >
          {pageNum}
        </span>
      );
      continue;
    }
    pageButtons.push(
      <Link
        to={`/board?type=${searchType}&name=${searchName}&page=${pageNum}`}
        key={pageNum}
        className={styles.numButton}
      >
        {pageNum}
      </Link>
    );
  }

  return (
    <div className={styles.container}>
      <div className="article-board-container">
        <div className="Article">
            <Article />
        </div>
        <div className="BestBoard">
            <BestBoard />
        </div>
      </div>
      <table className={styles.listContainer}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>글번호</th>
            <th className={styles.tableHeader}>제목</th>
            <th className={styles.tableHeader}>글쓴이</th>
            <th className={styles.tableHeader}>작성일</th>
            <th className={styles.tableHeader}>조회수</th>
            <th className={styles.tableHeader}>좋아요</th>
          </tr>
        </thead>
        <tbody>
          {pageData.pageInfo && pageData.pageInfo.content.map((board) => (
            <tr key={board.id} className={styles.listTable}>
              <td className={styles.listTable}>{board.id}</td>
              <td className={styles.tableTitle}>
                {board.img1 !== "" && board.img1 !== null ? <ImageIcon fontSize="small" color="success" className={styles.imgIcon} /> 
                : <TextsmsOutlinedIcon fontSize="small" color="success" className={styles.imgIcon}/>}{" "}
                <Link to={`/board/detail/${board.id}`}>{board.title}</Link>
                {board.replyCount !== 0 && ` [${board.replyCount}]`}
              </td>
              <td className={styles.listTable}>{board.writer}</td>
              <td className={styles.tableDate}>{formatDate(board.writeDate)}</td>
              <td className={styles.listTable}>{board.count}</td>
              <td className={styles.listTable}>{board.heart}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {userInfo ? 
          <Link to={`/board/write`} className={styles.writeButton}>
            <button>글 작성</button>
          </Link>  
          :
          <Link to={`/login`} className={styles.writeButton}>
            <button>글 작성</button>
          </Link>     
      }
      
      
      <div className={styles.pageButtons}>
        {startPageNum > 1 && (
          <Link
            to={`/board?type=${searchType}&name=${searchName}&page=${startPageNum - 1}`}
            className={styles.prevButton}
          >
            이전
          </Link>
        )}
        {pageButtons}
        {endPageNum < totalPageNum && (
          <Link
            to={`/board?type=${searchType}&name=${searchName}&page=${endPageNum + 1}`}
            className={styles.nextButton}
          >
            다음
          </Link>
        )}
      </div>

      <div className={styles.searchContainer}>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="title">제목</option>
          <option value="writer">작성자</option>
        </select>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <Link to={`/board?type=${searchType ? searchType : "title"}&name=${searchName}&page=1`}>
          <button onClick={handleSearch}>검색</button>
        </Link>
      </div>
    </div>
  );
}

export default BoardListPage;