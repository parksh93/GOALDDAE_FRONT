import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeamFilter() {
  const [area, setArea] = useState('');
  const [recruiting, setRecruiting] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleFilterChange = (e) => {
    if (e.target.name === 'area') {
      setArea(e.target.value);
    } else if (e.target.name === 'recruiting') {
      setRecruiting(e.target.value === 'true');
    }
  };

  useEffect(() => {
    axios.get(`/team/list/areaAndrecruting?area=${area}&recruiting=${recruiting}`)
      .then(response => {
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('정보를 가져올 수 없습니다. :', error);
      });
  }, [area, recruiting]);

  return (
    <div>
      <h3>필터</h3>
      <div>
        <label>지역</label>
        <select name="area" value={area} onChange={handleFilterChange}>
          <option value="Area1">모든지역</option>
          <option value="Area2">서울</option>
          <option value="Area3">경기</option>
          <option value="Area4">인천</option>
          <option value="Area5">강원</option>
          <option value="Area6">대전</option>
          <option value="Area7">충남/세종</option>
          <option value="Area8">충북</option>
          <option value="Area9">대구</option>
          <option value="Area10">경북</option>
          <option value="Area11">부산</option>
          <option value="Area12">울산</option>
          <option value="Area13">경남</option>
          <option value="Area14">광주</option>
          <option value="Area15">전남</option>
          <option value="Area16">전북</option>
          <option value="Area17">제주</option>
        </select>
      </div>
      <div>
        <label>모집여부</label>
        <select name="recruiting" value={recruiting} onChange={handleFilterChange}>
          <option value="true">모집중</option>
          <option value="false">모집종료</option>
        </select>
      </div>
      <div>
        <h2>필터링 결과</h2>
        <ul>
          {filteredData.map(team => (
            <li key={team.id}>{team.name} - {team.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TeamFilter;
