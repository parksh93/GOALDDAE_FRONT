import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../../userComponent/userContext/UserContext';
import TextField from '@mui/material/TextField';
import styles from './BoardWrite.module.css';

const BoardWritePage = () => {
  const { userInfo } = useUser();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [imgInput, setImgInput] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImgInputChange = async (e) => {
    const selectedImages = Array.from(e.target.files);
  
    try {
      const imageUrlsArray = await Promise.all(
        selectedImages.map(async (img, index) => {

          if(imageUrls.length+index >= 5){
            return null;
          }

          const formData = new FormData();
          formData.append('file', img);
  
          // 이미지 업로드 API 호출
          const response = await axios.post('/board/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          console.log(response);
  
          // 업로드된 이미지의 URL을 반환받음
          return response.data;
        })
      );
  
      // 이미지 URL을 상태에 추가 (null 값 제외)
      const validImageUrls = imageUrlsArray.filter((url) => url !== null);
      setImageUrls([...imageUrls, ...validImageUrls]);
    } catch (error) {
      console.error('이미지 업로드 중 에러 발생:', error);
    }
  
    // 이미지 선택 후 입력 필드 초기화
    setImgInput('');
  };

  const handleRemoveImage = (index) => {
    // 이미지 배열과 이미지 URL 배열에서 이미지 제거
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls.splice(index, 1);
    setImageUrls(updatedImageUrls);
  };

  const handleSave = () => {
    const postData = {
      userId: userInfo.id,
      writer: userInfo.nickname,
      title,
      content,
      img1: imageUrls[0] || null, // 이미지가 없을 경우 null 할당
      img2: imageUrls[1] || null,
      img3: imageUrls[2] || null,
      img4: imageUrls[3] || null,
      img5: imageUrls[4] || null,
    };

    // 글 저장 요청
    axios
      .post('/board/save', postData)
      .then((response) => {
        console.log('글이 성공적으로 저장되었습니다:', response.data);
        window.location.href = '/board';
        // 글 저장 후 필요한 동작 추가
      })
      .catch((error) => {
        console.error('글 저장 중 에러 발생:', error);
        // 에러 처리 로직 추가
      });
  };

  return (
    <div className={styles.container}>
      {userInfo && 
      <div>     
      <h2>글 작성</h2>
      <div>
        <TextField
          color="success"
          fullWidth
          margin="normal"
          value={title}
          onChange={handleTitleChange}
          id="title-area"
          label="제목"
          variant="standard"
        />
      </div>
      <div>
        <TextField
          color="success"
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
        {imageUrls && imageUrls.length < 5 &&
          <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImgInputChange}
          size="512"
          value={imgInput}
          id="imginput"
        />
        }
      </div>
      <div className={styles.imagePreviewContainer}>
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className={styles.imageContainer}>
            <img src={imageUrl} alt={`Image ${index}`} className={styles.image}/>
            <button onClick={() => handleRemoveImage(index)} className={styles.deleteButton}>&times;</button>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        {title && (
          <Link className={styles.listButton}>
            <button onClick={handleSave} className={styles.listButton}>
              작성
            </button>
          </Link>
        )}
        <Link onClick={() => window.location.href = '/board'} className={styles.listButton}>
          <button>취소</button>
        </Link>
      </div>
      </div>
      }
    </div>
  );
};

export default BoardWritePage;
