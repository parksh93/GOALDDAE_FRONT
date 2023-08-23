import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from "../../userComponent/userContext/UserContext";
import TextField from '@mui/material/TextField';
import styles from './BoardWrite.module.css'

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
    <div className={styles.container}>
      <h1>글 작성</h1>
      <div>        
        <TextField fullWidth margin="normal" value={title} onChange={handleTitleChange} id="title-area" label="제목" variant="standard" />
      </div>
      <div>        
        <TextField
          fullWidth
          margin="normal"
          value={content}
          onChange={handleContentChange}
          id="content-area"
          multiline
          rows={10}
        />
      </div>
      <div>    
        <TextField fullWidth margin="normal" value={img1} onChange={handleImg1Change} id="img-area" placeholder="이미지1" variant="standard" />
      </div>
      <div className={styles.buttonContainer}>
        <Link to={`/board?page=&type=&name=`} className={styles.listButton}>
          <button onClick={handleSave}>작성</button>
        </Link>
        <Link to={`/board?page=&type=&name=`} className={styles.listButton}>
          <button>취소</button>
        </Link>
      </div>
    </div>
  );
};

export default BoardWritePage;
