import React from "react";
import { Box } from "@material-ui/core";

const IndividualMatch = ({ match }) => {
  
  const getPlayerFormat = (playerNumber) => {
    const teamSize = playerNumber / 2;
    return teamSize + "대" + teamSize;
  };

  return (
    <div className="individual-match">
      {`경기 시작 시간: ${new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}`}
      {`구장 이름: ${match.fieldName}`}
      {`성별 구분: ${match.gender}`}
      {`플레이어 수: ${getPlayerFormat(match.playerNumber)}`}
      {`신청 가능 상태: ${match.status}`}
    </div>
   );
};
export default IndividualMatch;