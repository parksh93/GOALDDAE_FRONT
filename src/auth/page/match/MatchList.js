import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import IndividualMatch from './IndividualMatch';

const MatchList = ({ matches }) => {
    const navigate = useNavigate();
  
    return (
      <Box sx={{ marginBottom: '30px', display: 'flex', flexDirection: 'column' }}>
        {matches && matches.map((match) => (
          <IndividualMatch key={match.id} match={match} />
        ))}
        <Button onClick={() => navigate('/match/individual')} style={{alignSelf: "center", background: "#E2E2E2"}}>매치 더보기</Button>
      </Box>
    );
  };

export default MatchList;
