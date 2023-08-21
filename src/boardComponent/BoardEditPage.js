import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const BoardEditPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img1, setImg1] = useState('');

  useEffect(() => {
    // 글 상세 정보 가져오기
    axios.get(`/board/detail/${id}`)
      .then((response) => {
        const { title: fetchedTitle, content: fetchedContent, img1: fetchedImg1 } = response.data;
        setTitle(fetchedTitle);
        setContent(fetchedContent);
        setImg1(fetchedImg1);
      })
      .catch((error) => {
        console.error('글 상세 정보를 가져오는 중 에러 발생:', error);
        // 에러 처리 로직 추가
      });
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImg1Change = (e) => {
    setImg1(e.target.value);
  };

  const handleUpdate = () => {
    const postData = {
      id,
      title,
      content,
      img1,
    };

    // 글 수정 요청
    axios.put('/board/update', postData)
      .then(() => {
        console.log('글이 성공적으로 수정되었습니다.');
        // 수정 완료 후 리다이렉트 처리
      })
      .catch((error) => {
        console.error('글 수정 중 에러 발생:', error);
        // 에러 처리 로직 추가
      });
  };

  return (
    <div>
      <h1>글 수정</h1>
      <input type="text" value={title} onChange={handleTitleChange} placeholder="제목" />
      <textarea value={content} onChange={handleContentChange} placeholder="내용" />
      <input type="text" value={img1} onChange={handleImg1Change} placeholder="이미지1" />    
      <Link to={`/board/detail/${id}`}>
        <button onClick={handleUpdate}>수정</button>
      </Link>
    </div>
  );
};

export default BoardEditPage;
