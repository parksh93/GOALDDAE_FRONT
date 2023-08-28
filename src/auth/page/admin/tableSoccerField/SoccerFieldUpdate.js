import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Snackbar, Paper, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SoccerFieldUpdate = () => {
    const [soccerField, setSoccerField] = useState([]);
    const [selectFieldId, setSelectFieldId] = useState('');
    const [previewImages, setPreviewImages] = useState({ fieldImg1: '', fieldImg2: '', fieldImg3: '' });
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const [selectSoccerField, setSelectSoccerField] = useState({
        fieldName: '',
        toiletStatus: '',
        showerStatus: '',
        parkingStatus: '',
        fieldSize: '',
        fieldImg1: '',
        fieldImg2: '',
        fieldImg3: '',
        inOutWhether: '',
        grassWhether: '',
        region: '',
        reservationFee: ''
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

   const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setSelectSoccerField({ ...selectSoccerField, [event.target.name]: reader.result });
      setPreviewImages({ ...previewImages, [event.target.name]: reader.result });
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await axios.put(`/soccerField/update`, selectSoccerField);
      setSuccessMessage(`${selectSoccerField.fieldName} 수정되었습니다.`);
      setOpenSuccessSnackbar(true);
      fetchSoccerField();
    } catch (error) {
      console.error(`Error: ${error}`);
      setErrorMessage(`${selectSoccerField.fieldName} 수정에 실패하였습니다.`);
      setOpenErrorSnackbar(true);
    }
  };
  
   const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50', 
      },
    },
  });

  const navigate = useNavigate();
  
  return (
    <ThemeProvider theme={theme}>
      <h1 style={{ textAlign: 'center' }}>구장 수정</h1>
      <div style={{ textAlign: 'center', margin: '20px'}}>수정할 구장을 선택해주세요.</div>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
            <select value={selectFieldId} onChange={(e) => setSelectFieldId(e.target.value)}>
                <option value="">-- 구장 선택 --</option>
                {soccerField.map(field => (
                  <option key={field.id} value={field.id}>{field.fieldName}</option>
                ))}
              </select>
          </Box>
          {selectFieldId && (
                <>
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
                      <Paper sx={{ display :'flex' , flexDirection :'column' , gap :2 , padding :'50px'}} elevation ={3}>
                          <TextField
                              label="구장 이름"
                              name="fieldName"
                              value={selectSoccerField.fieldName}
                              onChange={handleChange}
                              sx={{width:700}}
                          />
                          <TextField
                              label="지역"
                              name="region"
                              value={selectSoccerField.region}
                              onChange={handleChange}
                              sx={{width:700}}
                          />
                          <TextField
                            label="구장크기"
                            name="fieldSize"
                            value={selectSoccerField.fieldSize}
                            onChange={handleChange}
                            sx={{width:700}}
                          />
                          <TextField
                            label="대관비"
                            name="reservationFee"
                            value={selectSoccerField.reservationFee}
                            onChange={handleChange}
                            sx={{width:700}}
                          />
                        </Paper>
                        <Paper sx={{ display :'flex' , flexDirection :'column' , gap :2, padding : '85px', width: '630px'}} elevation ={3}>
                          <FormControl component="fieldset">
                            <FormLabel component="inout">실내/실외</FormLabel>
                            <RadioGroup row aria-label="inOutWhether" name="inOutWhether" value={selectSoccerField.inOutWhether} onChange={e => setSelectSoccerField({...selectSoccerField, inOutWhether: e.target.value})}>
                              <FormControlLabel value="실내" control={<Radio />} label="실내구장" />
                              <FormControlLabel value="실외" control={<Radio />} label="실외구장" />
                            </RadioGroup>
                          </FormControl>
                          <FormControl component="fieldset">
                            <FormLabel component="jandi">잔디 종류</FormLabel>
                            <RadioGroup row aria-label="grassWhether" name="grassWhether" value={selectSoccerField.grassWhether} onChange={e => setSelectSoccerField({...selectSoccerField, grassWhether: e.target.value})}>
                              <FormControlLabel value="인조" control={<Radio />} label="인조잔디" />
                              <FormControlLabel value="천연" control={<Radio />} label="천연잔디" />
                            </RadioGroup>
                          </FormControl>
                          <FormControl component="fieldset">
                            <FormLabel component="toilet">화장실 유무</FormLabel>
                            <RadioGroup row aria-label="toiletStatus" name="toiletStatus" value={selectSoccerField.toiletStatus} onChange={e => setSelectSoccerField({...selectSoccerField, toiletStatus: e.target.value})}>
                              <FormControlLabel value="1" control={<Radio />} label="있음" />
                              <FormControlLabel value="0" control={<Radio />} label="없음" />
                            </RadioGroup>
                          </FormControl>
                          <FormControl component="fieldset">
                            <FormLabel component="shower">샤워실 유무</FormLabel>
                            <RadioGroup row aria-label="showerStatus" name="showerStatus" value={selectSoccerField.showerStatus} onChange={e => setSelectSoccerField({...selectSoccerField, showerStatus: e.target.value})}>
                              <FormControlLabel value="1" control={<Radio />} label="있음" />
                              <FormControlLabel value="0" control={<Radio />} label="없음" />
                            </RadioGroup>
                          </FormControl>
                          <FormControl component="fieldset">
                            <FormLabel component="parking">주차장 여부</FormLabel>
                            <RadioGroup row aria-label="parkingStatus" name="parkingStatus" value={selectSoccerField.parkingStatus} onChange={e => setSelectSoccerField({...selectSoccerField, parkingStatus: e.target.value})}>
                              <FormControlLabel value="1" control={<Radio />} label="있음" />
                              <FormControlLabel value="0" control={<Radio />} label="없음" />
                            </RadioGroup>
                          </FormControl>
                        </Paper>
                        <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '50px', width: 700 }} elevation={3}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                            <TextField
                                label="구장 이미지1"
                                type="file"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{width:500}}
                                name="fieldImg1"
                                onChange={handleFileChange}
                            />
                            {previewImages.fieldImg1 && (
                              <Box sx={{ width: 200, height: 100, overflow: 'hidden' }}>
                                  <img src={previewImages.fieldImg1} alt="" style={{ maxWidth:'100%', maxHeight:'100%' }} />
                              </Box>
                            )}
                         </Box>
                         <Box sx={{ display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                            <TextField
                                label="구장 이미지2"
                                type="file"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{width:500}}
                                name="fieldImg2"
                                onChange={handleFileChange}
                            />
                            {previewImages.fieldImg2 && (
                              <Box sx={{ width: 200, height: 100, overflow: 'hidden' }}>
                                  <img src={previewImages.fieldImg2} alt="" style={{ maxWidth:'100%', maxHeight:'100%' }} />
                              </Box>
                            )}
                         </Box>
                         <Box sx={{ display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                            <TextField
                                label="구장 이미지3"
                                type="file"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{width:500}}
                                name="fieldImg3"
                                onChange={handleFileChange}
                            />
                            {previewImages.fieldImg3 && (
                              <Box sx={{ width: 200, height: 100, overflow: 'hidden' }}>
                                  <img src={previewImages.fieldImg3} alt="" style={{ maxWidth:'100%', maxHeight:'100%' }} />
                              </Box>
                            )}
                         </Box>
                        </Paper>
                        <Box>
                          <Button variant="contained" color="primary" type="submit" className="submit-button" style={{ color: '#fff', margin: '25px' }}>
                            수정
                          </Button>
                          <Button variant="outlined" color="secondary" onClick={() => navigate('/admin')} style={{ borderColor: 'green', color: 'green', margin: '25px' }}>
                            취소
                          </Button>    
                          <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={() => setOpenSuccessSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                            <Alert severity="success">{successMessage}</Alert>
                          </Snackbar>
                          <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={() => setOpenErrorSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                            <Alert severity="error">{errorMessage}</Alert>
                          </Snackbar>
                        </Box>  
                      </Box>          
                </form> 
             </>
         )}
      </ThemeProvider>
  )
}

export default SoccerFieldUpdate;