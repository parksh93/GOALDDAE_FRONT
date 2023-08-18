import React, { useState } from "react";
import axios from "axios";

function BoardTest2() {
  const [reportedBoards, setReportedBoards] = useState([]);
  const [newReport, setNewReport] = useState({
    boardId: '',
    reporterUserId: '',
    reportedUserId: '',
    reason: ''
  });
  const [heartInfo, setHeartInfo] = useState(null);

  const [newHeart, setNewHeart] = useState({
    boardId: '',
    userId: ''
  });

    const handleReportedBoardsList = () => {
        try {
            axios.get("/board/report").then((response) => {
                setReportedBoards(response.data);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    const handleSaveReport = async () => {
        try {
          await axios.post('/board/report', newReport);
          alert('신고가 저장되었습니다.');
          setNewReport({
            boardId: '',
            reporterUserId: '',
            reportedUserId: '',
            reason: '',
          });
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };

    const handleRejectReport = async (reportId) => {
        await axios.delete(`/board/report/reject/${reportId}`);
        console.log('Report rejected successfully.');
        await handleReportedBoardsList();
      };
    
      const handleApproveReport = async (reportId) => {
        await axios.delete(`/board/report/approve/${reportId}`);
        console.log('Report approved successfully.');
        await handleReportedBoardsList();
      };


      const handleHeartInfo = () => {
        try {
            axios.post("/board/heart", newHeart).then((response) => {
                setHeartInfo(response.data);
                console.log(heartInfo)
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

      const handleSaveHeart = async () => {
        try {
          await axios.post('/board/heart/save', newHeart);         
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };

      const handleDeleteHeart = async () => {
        try {
          await axios.delete(`/board/heart/delete`, newHeart);
        } catch (error) {
            console.error('Error delete data:', error);
          }
        
      };


  return (
    <div>
      <h1>Board Test Page</h1>
      <button onClick={handleReportedBoardsList}>Report list</button>
      <ul>
        {reportedBoards.map((reportedBoard) => (
          <li key={reportedBoard.id}>
            <p>신고당한글{reportedBoard.boardId}</p>
            <p>신고한유저{reportedBoard.reporterUserId}</p> 
            <p>신고당한유저{reportedBoard.reportedUserId} </p> 
            <p>신고시간{reportedBoard.reportedDate} </p>
            <p>신고사유{reportedBoard.reason} </p>
            <button onClick={() => handleRejectReport(reportedBoard.id)}>반려</button>
            <button onClick={() => handleApproveReport(reportedBoard.id)}>승인</button> 
          </li>
        ))}
      </ul>
      <div>
        <h2>신고하기</h2>
        <input
          type="text"
          placeholder="글번호"
          value={newReport.boardId}
          onChange={e => setNewReport({ ...newReport, boardId: e.target.value })}
        />
        <input
          type="text"
          placeholder="신고자 ID"
          value={newReport.reporterUserId}
          onChange={e => setNewReport({ ...newReport, reporterUserId: e.target.value })}
        />
        <input
          type="text"
          placeholder="신고당한 ID"
          value={newReport.reportedUserId}
          onChange={e => setNewReport({ ...newReport, reportedUserId: e.target.value })}
        />
        <input
          type="text"
          placeholder="신고사유"
          value={newReport.reason}
          onChange={e => setNewReport({ ...newReport, reason: e.target.value })}
        />
        <button onClick={handleSaveReport}>신고</button>
      </div>

      <div>
        <h2>좋아요</h2>
        <input
          type="text"
          placeholder="글번호"
          value={newHeart.boardId}
          onChange={e => setNewHeart({ ...newHeart, boardId: e.target.value })}
        />
        <input
          type="text"
          placeholder="유저 ID"
          value={newHeart.userId}
          onChange={e => setNewHeart({ ...newHeart, userId: e.target.value })}
        />
        <button onClick={handleHeartInfo}>좋아요 상태</button>
        <button onClick={handleSaveHeart}>좋아요</button>
        <button onClick={handleDeleteHeart}>좋아요 취소</button>
      </div>
      {heartInfo && (
        <div>
          <h2>Detail</h2>
            <p>좋아요수{heartInfo.heartCount}</p>
            <p>해당유저의좋아요여부{heartInfo.hearted ? '좋아요' : '싫어요'}</p> 
        </div>
      )}
    </div>
  );
}

export default BoardTest2;