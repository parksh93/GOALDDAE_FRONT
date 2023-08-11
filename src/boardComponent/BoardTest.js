import React, { useState } from 'react';
import axios from 'axios';

function BoardTest() {
  const [boardId, setBoardId] = useState('');
  const [detailData, setDetailData] = useState(null);
  const [newData, setNewData] = useState({
    id: '', 
    userId: '',
    writer: '',
    title: '',
    content: '',
    boardSortation: 1
  });

  const [pageNum, setPageNum] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);

  const handleDetailClick = async () => {
    try {
      const response = await axios.get(`/board/detail/${boardId}`);
      const data = response.data;
      setDetailData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`/board/${boardId}`);
      alert('게시글이 삭제되었습니다.');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleSaveClick = async () => {
    try {
      await axios.post('/board/save', newData);
      alert('게시글이 저장되었습니다.');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put('/board/update', newData);
      alert('게시글이 수정되었습니다.');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handlePageNumChange = (e) => {
    setPageNum(Number(e.target.value));
  };

  const handlePageClick = async () => {
    try {
      const response = await axios.get(`/board/list/${pageNum}`);
      const data = response.data;
      setPageInfo(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Board Test</h1>
      <div>
        <input
          type="number"
          placeholder="Board ID"
          value={boardId}
          onChange={e => setBoardId(e.target.value)}
        />
        <button onClick={handleDetailClick}>조회</button>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
      {detailData && (
        <div>
          <h2>Detail</h2>
          <p>ID: {detailData.id}</p>
          <p>Title: {detailData.title}</p>
          <p>Writer: {detailData.writer}</p>
        </div>
      )}
      <div>
        <h2>Write / Update</h2>
        <input
          type="text"
          placeholder="ID"
          value={newData.id}
          onChange={e => setNewData({ ...newData, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="User ID"
          value={newData.userId}
          onChange={e => setNewData({ ...newData, userId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Writer"
          value={newData.writer}
          onChange={e => setNewData({ ...newData, writer: e.target.value })}
        />
        <input
          type="text"
          placeholder="Title"
          value={newData.title}
          onChange={e => setNewData({ ...newData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Content"
          value={newData.content}
          onChange={e => setNewData({ ...newData, content: e.target.value })}
        />
        <button onClick={handleSaveClick}>작성</button>
        <button onClick={handleUpdateClick}>수정</button>
      </div>
      <div>
        <h2>Page Info</h2>
        <input
          type="number"
          placeholder="Page Number"
          value={pageNum}
          onChange={handlePageNumChange}
        />
        <button onClick={handlePageClick}>조회</button>
        {pageInfo && (
          <div>
            <p>Current Page: {pageInfo.currentPageNum}</p>
            <p>Start Page: {pageInfo.startPageNum}</p>
            <p>End Page: {pageInfo.endPageNum}</p>
            <h2>글 목록</h2>
            <ul>
                {pageInfo.pageInfo.content.map((item) => (
                    <li key={item.id}>
                    <p>작성자: {item.writer}</p>
                    <p>제목: {item.title}</p>
                    <p>작성시간: {item.writeDate}</p>
                    </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoardTest;