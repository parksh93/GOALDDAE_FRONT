import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SoccerFieldUpdate = () => {
    const [soccerField, setSoccerField] = useState([]);
    const [selectFieldId, setSelectFieldId] = useState('');
    const [selectSoccerField, setSelectSoccerField] = useState({
        fieldName: '',
        toiletStatus: '',
        showerStatus: '',
        parkingStatus: '',
        fieldSize: '',
        fieldImg1: '',
        inOutWhether: '',
        grassWhether: '',
        region: ''
    });

    useEffect(() => {
      fetchSoccerField();
    }, []);

    const fetchSoccerField = async () => {
      try {
          const response = await axios.get('/soccerField/search');
          setSoccerField(response.data);
      } catch (error) {
          console.error(`Error: ${error}`);
      }
    };

    useEffect(() => {
      if (selectFieldId) {
          const selectData = soccerField.find(field => field.id === Number(selectFieldId));
          setSelectSoccerField({
              ...selectSoccerField,
              ...selectData
          });
      }
    }, [selectFieldId]);
    

   const handleChange = (event) => {
       setSelectSoccerField({ ...selectSoccerField, [event.target.name]: event.target.value });
   }

   const handleSubmit = async (event) => {
       event.preventDefault();

       try{
           await axios.put(`/soccerField/update`, selectSoccerField);
           alert('구장 정보가 성공적으로 수정되었습니다.');
           fetchSoccerField(); 
       } catch(error){
           console.error(`Error: ${error}`);
       }
   }
   
  return (
     <div>
         <h1>구장 수정</h1>

         <select value={selectFieldId} onChange={(e) => setSelectFieldId(e.target.value)}>
            <option value="">-- 구장 선택 --</option>
            {soccerField.map(field => (
              <option key={field.id} value={field.id}>{field.fieldName}</option>
            ))}
         </select>

         {selectFieldId && (
             <>
                <form onSubmit={handleSubmit}>
                <label style={{ display: 'block' }}>
                    구장 이름:
                    <input type="text" name="fieldName" value={selectSoccerField.fieldName} onChange={handleChange} />
                  </label>

                  <label style={{ display: 'block' }}>
                    화장실 여부:
                    <select value={selectSoccerField.toiletStatus} onChange={e => setSelectSoccerField({...selectSoccerField, toiletStatus: e.target.value})}>
                        <option value="" disabled>선택해주세요</option>
                        <option value="1">있음</option>
                        <option value="0">없음</option>
                      </select>   
                    </label>

                  <label style={{ display: 'block' }}>
                    샤워실 여부:
                    <select value={selectSoccerField.showerStatus} onChange={e => setSelectSoccerField({...selectSoccerField, showerStatus: e.target.value})}>
                        <option value="" disabled>선택해주세요</option>
                        <option value="1">있음</option>
                        <option value="0">없음</option>
                      </select>                
                    </label>

                  <label style={{ display: 'block' }}>
                    주차장 여부:
                    <select value={selectSoccerField.parkingStatus} onChange={e => setSelectSoccerField({...selectSoccerField, parkingStatus: e.target.value})}>
                        <option value="" disabled>선택해주세요</option>
                        <option value="1">있음</option>
                        <option value="0">없음</option>
                      </select>        
                    </label>

                  <label style={{ display: 'block' }}>
                    구장 크기:
                    <input type="text" name="fieldSize" value={selectSoccerField.fieldSize} onChange={handleChange} />
                  </label>

                  <label style={{ display: 'block' }}>
                    구장 이미지1:
                    <input type="text" name="fieldImg1" value={selectSoccerField.fieldImg1} onChange={handleChange} />
                  </label>

                  <label style={{ display: 'block' }}>
                    대관비: 
                    <input type="text" name="reservationFee" value={selectSoccerField.reservationFee} onChange={handleChange} />
                  </label>

                  <label style={{ display: 'block' }}>
                      실내외 여부:
                        <select value={selectSoccerField.inOutWhether} onChange={e => setSelectSoccerField({...selectSoccerField, inOutWhether: e.target.value})}>
                        <option value="" disabled>선택해주세요</option>
                        <option value="실내">실내구장</option>
                        <option value="실외">실외구장</option>
                      </select>                  
                  </label>

                  <label style={{ display: 'block' }}>
                    잔디 여부:
                    <select value={selectSoccerField.grassWhether} onChange={e => setSelectSoccerField({...selectSoccerField, grassWhether: e.target.value})}>
                      <option value="" disabled>선택해주세요</option>
                      <option value="천연">천연잔디</option>
                      <option value="인조">인조잔디</option>
                    </select>
                  </label>

                  <label style={{ display: 'block' }}>
                      지역:
                      <input type="text" name="region" value={selectSoccerField.region} onChange={handleChange} />
                  </label>

                  <button type="submit">수정하기</button>
                </form> 
             </>
         )}
     </div>
  )
}

export default SoccerFieldUpdate;
