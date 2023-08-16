import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Match = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fieldId = searchParams.get('fieldId');
  }, [location]);

  return (
    <>
        <div>매치 페이지</div>
    </>
  )
}

export default Match;
