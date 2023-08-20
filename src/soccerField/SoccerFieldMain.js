import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Payment from '../paument/Payment';

const SoccerFieldMain = () => {
    let {fieldId} = useParams();
    const [fieldName, setFieldName] = useState('');
    const [reservationFree, setReservationFree] = useState(0);

    useEffect(() => {
       fetch(`/field/getFieldInfo/${fieldId}`, {method: "get"})
        .then(res => res.json())
        .then(data => {
            setFieldName(data.fieldName);
            setReservationFree(data.reservationFree);
        });
    },[]);

    return (
        <div>
            <Payment 
                fieldName={fieldName}
                reservationFree = {reservationFree}
            />
        </div>
    )
}

export default React.memo(SoccerFieldMain);