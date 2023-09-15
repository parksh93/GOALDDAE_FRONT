import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import styles from './BoardWrite.module.css'
import { useUser } from '../../userComponent/userContext/UserContext';

const BoardEditPage = () => {
  const { id } = useParams();

  const { userInfo } = useUser();

  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [imgInput, setImgInput] = useState('');

  useEffect(() => {
    if (userInfo && userInfo.id !== null) {
      // 글 상세 정보 가져오기
      axios
        .get(`/board/detail/${id}`)
        .then((response) => {
          const {
            userId: fetchedUserId,
            title: fetchedTitle,
            content: fetchedContent,
            img1: fetchedImg1,
            img2: fetchedImg2,
            img3: fetchedImg3,
            img4: fetchedImg4,
            img5: fetchedImg5,
          } = response.data;
  
          setUserId(fetchedUserId);
          setTitle(fetchedTitle);
          setContent(fetchedContent);
  
          // 이미지 URL을 상태에 추가
          const newImageUrls = [];
  
          if (fetchedImg1) newImageUrls.push(fetchedImg1);
          if (fetchedImg2) newImageUrls.push(fetchedImg2);
          if (fetchedImg3) newImageUrls.push(fetchedImg3);
          if (fetchedImg4) newImageUrls.push(fetchedImg4);
          if (fetchedImg5) newImageUrls.push(fetchedImg5);
  
          setImageUrls(newImageUrls);
        })
        .catch((error) => {
          console.error('글 상세 정보를 가져오는 중 에러 발생:', error);
          // 에러 처리 로직 추가
        });
    }
  }, [userInfo, id]);
  

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

  const handleUpdate = () => {
    const postData = {
      id,
      title,
      content,
      img1: imageUrls[0] || null, // 이미지가 없을 경우 null 할당
      img2: imageUrls[1] || null,
      img3: imageUrls[2] || null,
      img4: imageUrls[3] || null,
      img5: imageUrls[4] || null,
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
    <div className={styles.container}>
      {userInfo && userInfo.id === userId &&
      (
        <>
              <h2>글 수정</h2>
      <div>        
        <TextField color="success" fullWidth margin="normal" value={title} onChange={handleTitleChange} id="title-area" label="제목" variant="standard" />
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
            <img src={imageUrl} alt={`${index}`} className={styles.image}/>
            <button onClick={() => handleRemoveImage(index)} className={styles.deleteButton}>&times;</button>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        {title && 
          <Link onClick={() => window.location.href = `/board/detail/${id}`} className={styles.listButton}>
            <button onClick={handleUpdate}>작성</button>
          </Link>
        }
        <Link onClick={() => window.location.href = `/board/detail/${id}`} className={styles.listButton}>
          <button>취소</button>
        </Link>
      </div>
        </>
      )
      }
    </div>
  );
};

export default BoardEditPage;
