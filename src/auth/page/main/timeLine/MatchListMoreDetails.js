import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import TimeLine from './TimeLine';

const MatchListMoreDetails = ({ matches }) => {
    const navigate = useNavigate();
  
    return (
      <Box sx={{ marginTop: '20px', Display: 'flex', flexDirection: 'column' }}>
        {matches && matches.map((match) => (
          <TimeLine key={match.id} match={match} />
        ))}
          <div style={{ display:'flex', justifyContent:'center' }}>
            <Button onClick={() => navigate('/match/individual')} style={{ background: "#E2E2E2" }}>
              매치 더보기
            </Button>
          </div>      
      </Box>
    );
  };

export default MatchListMoreDetails;
