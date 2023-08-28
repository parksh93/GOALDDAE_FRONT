import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const SoccerFieldDelete = () => {
  const [soccerField, setSoccerField] = useState([]);
  const [selectFieldId, setselectFieldId] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchSoccerField();
  }, []);

  const fetchSoccerField = async () => {
    try {
      const response = await axios.get('/soccerField/search');
      setSoccerField(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    if (!selectFieldId) return;

    const confirmation = window.confirm('정말로 해당 구장을 제거하시겠습니까?');

    if (confirmation) {
      try {
        await axios.post('/soccerField/delete', { id: selectFieldId });
        alert('구장이 성공적으로 제거되었습니다.');
        setselectFieldId('');
        fetchSoccerField();
      } catch (error) {
        console.error(error);
        alert('구장 제거 중 오류가 발생했습니다.');
      }
    }
  };

   return (
     <div >
      <h1 style={{ textAlign: 'center' }}>구장 삭제</h1>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
       <select value={selectFieldId} onChange={(e) => setselectFieldId(e.target.value)}>
         <option value="">-- 구장 선택 --</option>
         {soccerField.map(field => (
           <option key={field.id} value={field.id}>{field.fieldName}</option>
         ))}
       </select>

       {selectFieldId && (
         <>
           <Button variant="contained" color="success" onClick={handleOpenDialog}>
            선택한 구장 제거
          </Button>
           <Dialog open={openDialog} onClose={handleCloseDialog}>
             <DialogTitle>구장 제거</DialogTitle>
             <DialogContent>정말로 해당 구장을 제거하시겠습니까?</DialogContent>
             <DialogActions>
               <Button onClick={handleCloseDialog}>취소</Button>
               <Button onClick={handleDelete} autoFocus>제거</Button>
             </DialogActions>
           </Dialog>
         </>
       )}
       </Box>
     </div>
   );
};

export default SoccerFieldDelete;
