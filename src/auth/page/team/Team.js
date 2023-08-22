import React, { useState } from 'react';
import axios from 'axios';
import './Team.css';
import Modal from 'react-modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

Modal.setAppElement('#root');

const Team = () => {
  const [teamName, setTeamName] = useState('');
  const [area, setArea] = useState('');
  const [averageAge, setAverageAge] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [entryGender, setEntryGender] = useState('');
  const [preferredDay, setPreferredDay] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [recruiting, sertRecruiting] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamData = {
      teamName,
      area,
      averageAge,
      entryFee,
      entryGender,
      preferredDay,
      preferredTime,
      recruiting
    };

    try {
      const response = await axios.post('/team/save', teamData);
      if (response.status === 200) {
        alert('팀 생성이 완료되었습니다.');
      }
    } catch (error) {
      console.error('팀 생성 에러:', error);
      alert('팀 생성 도중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  return (
    <div>
        <h1>팀페이지</h1>
        <button onClick={() => setModalIsOpen(true)}>팀 생성</button>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="팀 생성 모달"
            className="custom-modal"
        >

        <div className="modal-content">
            <form onSubmit={handleSubmit}>
            <div className="input-wrapper">

            <Box mb={2}>
                <TextField
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    label="팀 이름"
                    variant="outlined"
                    className="input-field"
                />
            </Box>

            <Box mb={2}>
                <TextField
                    value={averageAge}
                    onChange={(e) => setAverageAge(e.target.value)}
                    label="나이대"
                    variant="outlined"
                    className="input-field"
                />
            </Box>
            

            <Box mb={2}>
                <TextField
                    value={entryFee}
                    onChange={(e) => setEntryFee(e.target.value)}
                    label="입단비"
                    variant="outlined"
                    className="input-field"
                />
            </Box>

            <Box mb={2}>
                <TextField
                    value={entryGender}
                    onChange={(e) => setEntryGender(e.target.value)}
                    label="입단 가능 성별"
                    variant="outlined"
                    className="input-field"
                />
            </Box>

            <Box mb={2}>
                <TextField
                    value={preferredDay}
                    onChange={(e) => setPreferredDay(e.target.value)}
                    label="선호 요일"
                    variant="outlined"
                    className="input-field"
                />
            </Box>
            
            <Box mb={2}>
                <TextField
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    label="선호 시간"
                    variant="outlined"
                    className="input-field"
                />
            </Box>
          
            <Box mb={2}>
                <TextField
                    value={recruiting}
                    onChange={(e) => sertRecruiting(e.target.value)}
                    label="모집 중 (0 or 1)"
                    variant="outlined"
                    className="input-field"
                />
            </Box>

        </div>
            <div className="buttons-container">
                <button type="submit" className="submit-button">팀 생성</button>
                <button onClick={closeModal} className="close-modal-button">닫기</button>
            </div>
            </form>
        </div>
        </Modal>
    </div>
  );
};


export default Team;
