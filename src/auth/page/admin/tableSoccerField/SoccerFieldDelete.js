import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SoccerFieldDelete = () => {
    const [soccerFields, setSoccerFields] = useState([]);
    const [selectedFieldId, setSelectedFieldId] = useState('');
  
    useEffect(() => {
      fetchSoccerFields();
    }, []);
  
    const fetchSoccerFields = async () => {
      try {
        const response = await axios.get('/SoccerField/search');
        setSoccerFields(response.data);
      } catch (error) {
        console.error('Failed to fetch soccer fields:', error);
      }
    };
  
    const handleDelete = async () => {
      if (!selectedFieldId) return;
      
      const confirmation = window.confirm('정말로 이 구장을 제거하시겠습니까?');
      
      if (confirmation) {
        try {
          await axios.post('/SoccerField/delete', { id: selectedFieldId });
          alert('구장이 성공적으로 제거되었습니다.');
          setSelectedFieldId(''); // 선택된 필드 초기화
          fetchSoccerFields(); // Delete 후 다시 리스트를 불러옵니다.
        } catch (error) {
          console.error(error);
          alert('구장 제거 중 오류가 발생했습니다.');
        }
      }
    };
  
    return (
      <div>
        <h1>구장 목록</h1>
  
        {/* Dropdown for field selection */}
         <select value={selectedFieldId} onChange={(e) => setSelectedFieldId(e.target.value)}>
           <option value="">-- 구장 선택 --</option>
           {soccerFields.map(field => (
             <option key={field.id} value={field.id}>{field.fieldName}</option>
           ))}
         </select>
  
         {/* Delete button */}
         {selectedFieldId && (
           <>
             <button onClick={handleDelete}>선택한 구장 제거</button>
           </>
         )}
         
       </div>
     );
  };

export default SoccerFieldDelete;
