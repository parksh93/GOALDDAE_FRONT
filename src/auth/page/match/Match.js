import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FieldReservation from '../tableOperate/tableFieldReservation/FieldReservation';

const Match = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fieldId = searchParams.get('fieldId');
  }, [location]);

  return (
    <>
        <h3>매치 페이지</h3>
        <FieldReservation />
    </>
  )
}

export default Match;
