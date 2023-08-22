import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from "../userComponent/userContext/UserContext";

const BoardWritePage = () => {

  const { userInfo } = useUser();


  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img1, setImg1] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImg1Change = (e) => {
    setImg1(e.target.value);
  };

  const handleSave = () => {
    const postData = {
      userId : userInfo.id,
      writer : userInfo.nickname,
      title,
      content,
      img1,
    };

    // 글 저장 요청
    axios.post('/board/save', postData)
      .then((response) => {
        console.log('글이 성공적으로 저장되었습니다:', response.data);
        // 글 저장 후 필요한 동작 추가
      })
      .catch((error) => {
        console.error('글 저장 중 에러 발생:', error);
        // 에러 처리 로직 추가
      });
  };

  return (
    <div>
      <h1>글 작성</h1>
      <input type="text" value={title} onChange={handleTitleChange} placeholder="제목" />
      <textarea value={content} onChange={handleContentChange} placeholder="내용" />
      <input type="text" value={img1} onChange={handleImg1Change} placeholder="이미지1" />
      <Link to={`/board`}>
        <button onClick={handleSave}>작성</button>
      </Link>
    </div>
  );
};

export default BoardWritePage;
