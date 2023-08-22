import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../userComponent/userContext/UserContext";

function BoardListPage() {
    
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
    pageButtons.push(
      <Link
        to={`/board?type=${searchType}&name=${searchName}&page=${pageNum}`}
        key={pageNum}
        className={pageNum === currentPageNum ? "active" : ""}
      >
        {pageNum}
      </Link>
    );
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>작성일</th>
            <th>조회수</th>
            <th>좋아요수</th>
          </tr>
        </thead>
        <tbody>
          {pageData.pageInfo && pageData.pageInfo.content.map((board) => (
            <tr key={board.id}>
              <td>{board.id}</td>
              <td>
                {board.img1 ? "O" : "X"}{" "}
                <Link to={`/board/detail/${board.id}`}>{board.title}</Link>
                {board.replyCount !== 0 && ` [${board.replyCount}]`}
              </td>
              <td>{board.writer}</td>
              <td>{board.writeDate}</td>
              <td>{board.count}</td>
              <td>{board.heart}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="page-buttons">
      {startPageNum > 1 && (
        <Link
          to={`/board?type=${searchType}&name=${searchName}&page=${startPageNum - 1}`}
          className="prev-button"
        >
          이전
        </Link>
      )}
      {pageButtons}
      {endPageNum < totalPageNum && (
        <Link
          to={`/board?type=${searchType}&name=${searchName}&page=${endPageNum + 1}`}
          className="next-button"
        >
          다음
        </Link>
      )}
      <Link to={`/board/write`}>
        <button>글 작성</button>
      </Link>
    </div>

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
  );
}

export default BoardListPage;
