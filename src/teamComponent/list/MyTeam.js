import React, {useState, useEffect} from 'react';
import { useUserContext } from './UserContext';
import axios from 'axios';

const MyTeam = () => {
    const { isLoggedIn } = useUserContext();
    const [teamInfo, setTeamInfo] = useState(null);

 

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>나의 팀 정보</h2>
        </div>
      ) : (
        <p>로그인을 해주세요.</p>
      )}
    </div>
  );
};

export default MyTeam;