import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import axios from 'axios';

const ProfileImageEdit = ({ teamId, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);


    //사진 수정
    const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImageUrl(URL.createObjectURL(file));
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

        await axios.post(`/team/teamProfileImg`, formData, {params: teamInfo});
        console.log('파일 전송 성공');
        setImageUrl(URL.createObjectURL(selectedFile));

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

    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>저장</button>
      <button onClick={onCancel}>취소</button>
    </div>

    </ThemeProvider>
  );
};

export default ProfileImageEdit;
