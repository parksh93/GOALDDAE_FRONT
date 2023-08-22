import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

function TeamCreate() {
  const navigate  = useNavigate ();

  const [teamName, setTeamName] = useState('');
  const [area, setArea] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [entryGender, setEntryGender] = useState('');
  const [averageAge, setAverageAge] = useState('');
  const [preferredDay, setPreferredDay] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateTeam = async () => {
    try {
      const newTeam = {
        teamName,
        area,
        entryFee: parseFloat(entryFee),
        entryGender,
        averageAge: parseInt(averageAge),
        preferredDay,
        preferredTime
      };

      const response = await axios.post('/save', newTeam);

      console.log(response.data); // 서버 응답 처리

      setModalVisible(true);

      if (response.data.id) {
        navigate(`/team/detail/${response.data.id}`);
      }
    } catch (error) {
      console.error("저장에 실패하였습니다.", error);
    }
  };

    const handleCloseModal = () => {
      setModalVisible(false);
  };

    return (
        <div>
            <h2>새로운 팀 생성</h2>
            <div>
                <input
                    type="text"
                    placeholder="팀 이름"
                    value={teamName}
                    onChange={e => setTeamName(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="지역"
                    value={area}
                    onChange={e => setArea(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="입단비"
                    value={entryFee}
                    onChange={e => setEntryFee(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="입단 성별"
                    value={entryGender}
                    onChange={e => setEntryGender(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="나이대"
                    value={averageAge}
                    onChange={e => setAverageAge(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="선호요일"
                    value={preferredDay}
                    onChange={e => setPreferredDay(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="선호시간"
                    value={preferredTime}
                    onChange={e => setPreferredTime(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleCreateTeam}>새로운 팀 생성</button>
            </div>
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <p>팀 생성이 완료되었습니다.</p>
                        <button onClick={handleCloseModal}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TeamCreate;
