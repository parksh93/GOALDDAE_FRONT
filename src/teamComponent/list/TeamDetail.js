import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TeamDetailPage = () => {
  const { id } = useParams();
  const [teamDetail, setTeamDetail] = useState(null);

  useEffect(() => {
    fetch(`/team/detail/${id}`)
      .then(response => response.json())
      .then(data => setTeamDetail(data))
      .catch(error => console.error('팀 정보를 가져올 수 없습니다.:', error));
  }, [id]);

  if (!teamDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{teamDetail.teamName}</h2>
      <p>지역: {teamDetail.area}</p>
      <p>평균나이: {teamDetail.averageAge}</p>
      <p>입단비: {teamDetail.entryfee}</p>
      <p>입단성별: {teamDetail.entryGender}</p>
      <p>선호시간 : {teamDetail.prefferedTime}</p>
      <p>선호요일: {teamDetail.prefferedDay}</p>
      <p>모집여부: {teamDetail.recruiting}</p>
    </div>
  );
};

export default TeamDetailPage;