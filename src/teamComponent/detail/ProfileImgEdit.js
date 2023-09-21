import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import axios from 'axios';
import { style } from '@mui/system';
import styles from './ProfileImgEdit.module.css'

const ProfileImageEdit = ({ onCancel, teamInfo}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);


  //사진 수정
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const newImageUrl = URL.createObjectURL(file);
    setImageUrl(newImageUrl);

    console.log("New Image URL:", newImageUrl);
  };
  
  const handleUpload = async(e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('이미지를 선택하세요.');
      return;
    }

    try{
        const formData = new FormData();
        formData.append('file', selectedFile);

        console.log("teamInfo: ", teamInfo);
        console.log("selectedFile: ", selectedFile);
        console.log("formData: ", formData);        

        await axios.post(`/team/teamProfileImg`, formData, {params: teamInfo});
        console.log('파일 전송 성공');

        if (imageUrl) {
          URL.revokeObjectURL(imageUrl); // 이미 존재하는 URL을 해제
        }
          setImageUrl(URL.createObjectURL(selectedFile)); // 새 URL 생성
          window.location.reload();

      } catch (error) {
      console.error('파일 전송 실패!', error);
      }
    };

    // 프로필사진 조회
    useEffect(() => {
        async function fetchProfileImageUrl() {
        try {
            const response = await axios.get('/team/teamProfileImg');
            setImageUrl(response.data);
        } catch (error) {
            console.error('Failed to fetch profile image URL', error);
        }
        }

        fetchProfileImageUrl();
    }, []);


  const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50', 
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>

    <div className={styles.modalContainer}>
      <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
       {/* 미리보기 이미지 */}
      {imageUrl && 
        <img 
          src={imageUrl} 
          alt="Profile Preview" 
          className={styles.previewImage}
          style={{ width: '300px', height: '300px', borderRadius: '50%' }}  />}
      
      <button onClick={handleUpload} style={{ marginTop: '20x', marginRight: '5px' }}>저장</button>
      <button onClick={onCancel} style={{ marginTop: '20x'}}>취소</button>
    </div>

    </ThemeProvider>
  );
};

export default ProfileImageEdit;
