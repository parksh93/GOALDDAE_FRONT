import React, { useState } from 'react';
import axios from 'axios';

function ReplyTest() {
  const [boardId, setBoardId] = useState('');
  const [reportId, setReportId] = useState('');

  const handleListClick = async () => {
    const response = await axios.get(`/reply/list/${boardId}`);
    console.log('Reply List:', response.data);
  };

  const handleReportListClick = async () => {
    const response = await axios.get('/reply/report');
    console.log('Reported Replies:', response.data);
  };

  const handleReportClick = async () => {
    const reportedReply = {
      replyId: boardId, // 댓글 ID
      reporterUserId: 1, // 신고한 유저 ID
      reportedUserId: 2, // 신고당한 유저 ID
      reason: '부적절한 내용', // 신고 사유
    };

    await axios.post('/reply/report', reportedReply);
    console.log('Report added successfully.');
  };

  const handleRejectReportClick = async () => {
    await axios.delete(`/reply/report/reject/${reportId}`);
    console.log('Report rejected successfully.');
  };

  const handleApproveReportClick = async () => {
    await axios.delete(`/reply/report/approve/${reportId}`);
    console.log('Report approved successfully.');
  };

  return (
    <div>
      <h1>Reply Test Page</h1>
      <input
        type="text"
        placeholder="Board ID"
        value={boardId}
        onChange={(e) => setBoardId(e.target.value)}
      />
      <button onClick={handleListClick}>Get Reply List</button>
      <br />
      <button onClick={handleReportListClick}>Get Reported Replies</button>
      <br />
      <button onClick={handleReportClick}>Add Report</button>
      <br />
      <input
        type="text"
        placeholder="Report ID"
        value={reportId}
        onChange={(e) => setReportId(e.target.value)}
      />
      <button onClick={handleRejectReportClick}>Reject Report</button>
      <button onClick={handleApproveReportClick}>Approve Report</button>
    </div>
  );
}

export default ReplyTest;
