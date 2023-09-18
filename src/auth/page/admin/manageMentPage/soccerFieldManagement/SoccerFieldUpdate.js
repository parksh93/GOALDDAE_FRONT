import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Snackbar, Paper, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';

const SoccerFieldUpdate = ({selectSoccerField, setSelectSoccerField, setPageState}) => {
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [availableAreas, setAvailableAreas] = useState([]);
    const [modalState, setModalState] = useState(false);

    const [operatingHours, setOperatingHours] = useState(6);
    const [closingTime, setClosingTime] = useState(22);

    const seoulAreas = ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구",];
    const gyeonggiAreas = ["가평군","고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","양평군","여주시","연천군","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","하남시","화성시",];
    const incheonAreas = ["강화군","계양구","남동구","동구","미추홀구","부평구","서구","연수구","옹진군","중구"];
    const gangwonAreas = ["춘천시","원주시","강릉시","동해시","태백시","속초시","삼척시","홍천군","횡성군","영월군","평창군","정선군","철원군","화천군","양구군","인제군","고성군","양양군"];
    const daejeonAreas = ["동구", "중구", "서구", "유성구", "대덕구"];
    const chungnamAreas = ["천안시","공주시","보령시","아산시","서산시","논산시","계룡시","당진시","금산군","연기군","부여군","서천군","청양군","홍성군","예산군","태안군"];
    const chungbukAreas = ["청주시","충주시","제천시","보은군","옥천군","영동군","증평군","진천군","괴산군","음성군","단양군",];
    const daeguAreas = ["중구","동구","서구","남구","북구","수성구","달서구","달성군",];
    const gyeongbukAreas = ["포항시","경주시","김천시","안동시","구미시","영주시","영천시","상주시", "문경시","경산시","군위군","의성군","청송군","영양군","영덕군","청도군","고령군","성주군","칠곡군","예천군","봉화군","울진군","울릉군"];
    const busanAreas = ["중구","서구","동구","영도구","부산진구","동래구","남구","북구","해운대구","사하구","금정구","강서구","연제구","수영구","사상구","기장군",];
    const ulsanAreas = ["중구", "남구", "동구", "북구", "울주군"];
    const gyeongnamAreas = ["창원시","진주시","통영시","사천시","김해시","밀양시","거제시","양산시","의령군","함안군","창녕군","고성군","남해군","하동군","산청군","함양군","거창군","합천군",];
    const gwangjuAreas = ["동구", "서구", "남구", "북구", "광산구"];
    const jeonnamAreas = ["목포시","여수시","순천시","나주시","광양시","담양군","곡성군","구례군","고흥군","보성군","화순군","장흥군","강진군","해남군","영암군","무안군","함평군","영광군","장성군","완도군","진도군","신안군",];
    const jeonbukAreas = ["전주시","군산시","익산시","정읍시","남원시","김제시","완주군","진안군","무주군","장수군","임실군","순창군","고창군","부안군",];
    const jejuAreas = ["제주시", "서귀포시"];

    useEffect(() => {
      setAvailable(selectSoccerField.region);
    },[]);

    const onchangeCity = useCallback((e) => {
      setSelectSoccerField({ ...selectSoccerField, province: "" });
      setSelectSoccerField({ ...selectSoccerField, region: e.target.value });
      const preferredCity = e.target.value;
      setAvailable(preferredCity);
    });

    const setAvailable = ( preferredCity ) => {
      let availableAreas = [];
      if (preferredCity === "서울") {
        availableAreas = seoulAreas;
      } else if (preferredCity === "경기") {
        availableAreas = gyeonggiAreas;
      } else if (preferredCity === "인천") {
        availableAreas = incheonAreas;
      } else if (preferredCity === "강원") {
        availableAreas = gangwonAreas;
      } else if (preferredCity === "대전") {
        availableAreas = daejeonAreas;
      } else if (preferredCity === "충남") {
        availableAreas = chungnamAreas;
      } else if (preferredCity === "충북") {
        availableAreas = chungbukAreas;
      } else if (preferredCity === "대구") {
        availableAreas = daeguAreas;
      } else if (preferredCity === "경북") {
        availableAreas = gyeongbukAreas;
      } else if (preferredCity === "부산") {
        availableAreas = busanAreas;
      } else if (preferredCity === "울산") {
        availableAreas = ulsanAreas;
      } else if (preferredCity === "경남") {
        availableAreas = gyeongnamAreas;
      } else if (preferredCity === "광주") {
        availableAreas = gwangjuAreas;
      } else if (preferredCity === "전남") {
        availableAreas = jeonnamAreas;
      } else if (preferredCity === "전북") {
        availableAreas = jeonbukAreas;
      } else if (preferredCity === "제주") {
        availableAreas = jejuAreas;
      } else {
        availableAreas = [];
      }
      setAvailableAreas(availableAreas);
    }

    const onChangeArea = useCallback((e) => {
      setSelectSoccerField({ ...selectSoccerField, province : e.target.value });
    });

   const handleChange = (event) => {
      setSelectSoccerField({ ...selectSoccerField, [event.target.name]: event.target.value });
   }

   const handleFileChange = async (e, setter) => {
    try {
      const file = e.target.files[0];
  
      if (!file) {
        // 파일이 선택되지 않은 경우 처리
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      // 파일 업로드 API 호출
      const response = await axios.post('/field/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // 업로드된 파일의 URL을 반환받음
      const imageUrl = response.data;
  
      // URL을 setter에 저장
      setSelectSoccerField({ ...selectSoccerField, [setter]: imageUrl });
      } catch (error) {
        console.error('파일 업로드 중 에러 발생:', error);
        // 에러 처리 로직 추가
      }
    };

    const handleRemoveImage = (setter) => {
      setSelectSoccerField({ ...selectSoccerField, [setter]: null });
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSelectSoccerField({ ...selectSoccerField, operatingHours: numberToTimeString(operatingHours), closingTime : numberToTimeString(closingTime) });

    try {
      await axios.patch(`/field/update`, selectSoccerField);
      setSuccessMessage(`${selectSoccerField.fieldName} 수정되었습니다.`);
      setOpenSuccessSnackbar(true);
      setTimeout(() => setPageState(0), 1000);
    } catch (error) {
      console.error(`Error: ${error}`);
      setErrorMessage(`${selectSoccerField.fieldName} 수정에 실패하였습니다.`);
      setOpenErrorSnackbar(true);
    }
  };
  
   const theme = createTheme({
    palette: {
      primary: {
        main: '#black', 
      },
    },
  });

  const onCompletePost = data => {
    setSelectSoccerField({ ...selectSoccerField, address : data.address });
    setModalState(false);
  };

  const clickAdress = () => {
    setModalState(!modalState)
  }

  const numberToTimeString = (number) => {
    if(number){
      // 시간을 두 자리 문자열로 변환하는 함수
      const pad2 = (number) => (number < 10 ? '0' + number : '' + number);
  
      // 시간만 구합니다.
      const hours = Math.floor(number);
  
      // 'hh:00:00' 형식의 문자열로 반환
      return `${pad2(hours)}:00:00`;
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <h1 style={{ textAlign: 'center' }}>구장 수정</h1>
                <>
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2, justifyContent: 'center', alignItems: 'center' }}>
                      <Paper sx={{ display :'flex' , flexDirection :'column' , gap :2 , padding :'50px'}} elevation ={3}>
                      <Box mb={2}>                                      
                        <TextField
                                label="구장 이름"
                                name="fieldName"
                                value={selectSoccerField.fieldName}
                                onChange={handleChange}
                                sx={{width:700}}
                            />
                      </Box>
                      <Box mb={2}>
                        <TextField
                          value={selectSoccerField.address}
                          InputProps={{
                            readOnly: true,
                          }}
                          label="주소"
                          variant="outlined"
                          sx={{width:700}}
                          onClick={clickAdress}
                        />
                        {modalState && 
                          <div>
                            <br/>
                            <DaumPostcode onComplete={onCompletePost} />
                          </div>                    
                        }
                      </Box>
                      <Box mb={2}>
                      <FormControl fullWidth>
                        <InputLabel>도시</InputLabel>
                        <Select
                          value={selectSoccerField.region}
                          color="success"
                          onChange={onchangeCity}
                          label="도시"
                        >
                          <MenuItem value={"서울"}>서울</MenuItem>
                          <MenuItem value={"경기"}>경기</MenuItem>
                          <MenuItem value={"인천"}>인천</MenuItem>
                          <MenuItem value={"강원"}>강원</MenuItem>
                          <MenuItem value={"대전"}>대전</MenuItem>
                          <MenuItem value={"충남"}>충남</MenuItem>
                          <MenuItem value={"충북"}>충북</MenuItem>
                          <MenuItem value={"대구"}>대구</MenuItem>
                          <MenuItem value={"경북"}>경북</MenuItem>
                          <MenuItem value={"부산"}>부산</MenuItem>
                          <MenuItem value={"울산"}>울산</MenuItem>
                          <MenuItem value={"경남"}>경남</MenuItem>
                          <MenuItem value={"광주"}>광주</MenuItem>
                          <MenuItem value={"전남"}>전남</MenuItem>
                          <MenuItem value={"전북"}>전북</MenuItem>
                          <MenuItem value={"제주"}>제주</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box mb={2}>
                      <FormControl fullWidth>
                        <InputLabel>지역</InputLabel>
                        <Select
                          value={selectSoccerField.province}
                          color="success"
                          onChange={onChangeArea}
                          style={{ outline: "1px solid #f4f4f4", outlineOffset: "-2px" }}
                          label="지역"
                        >
                          {availableAreas.map((area) => (
                            <MenuItem key={area} value={area}>
                              {area}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box mb={2}>
                      <TextField
                              label="구장크기"
                              name="fieldSize"
                              value={selectSoccerField.fieldSize}
                              onChange={handleChange}
                              sx={{width:700}}
                            />
                    </Box>
                    <Box mb={2}>
                      <TextField
                              label="대관비"
                              name="reservationFee"
                              value={selectSoccerField.reservationFee}
                              onChange={handleChange}
                              sx={{width:700}}
                            />
                    </Box>
                    <Box mb={2} sx={{display : 'flex'}}>
                      <TextField
                        color="success"
                        type="number"
                        label="영업시작"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={operatingHours}
                        onChange={(e) => e.target.value > 6 ? setOperatingHours(e.target.value) : setOperatingHours(6)}
                      />
                      <div style={{width : '50px'}}></div>
                      <TextField
                        color="success"
                        type="number"
                        label="영업종료"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={closingTime}
                        onChange={(e) => e.target.value < operatingHours ?
                          setClosingTime(operatingHours+1) : e.target.value > 23 ? setClosingTime(23) : setClosingTime(e.target.value)}
                      />
                    </Box>
                  </Paper>
                  <Paper sx={{ display :'flex' , flexDirection :'column' , gap :2 , padding :'50px', width: '700px'}} elevation ={3}>
                      <Box mb={2}>
                        <TextField
                          value={selectSoccerField.content}
                          name='content'
                          onChange={handleChange}                          
                          label="특이사항 / 공지"
                          variant="outlined"
                          multiline
                          sx={{width:700}}
                        />
                      </Box>
                    </Paper>
                        <Paper sx={{ display :'flex' , flexDirection :'column' , gap :2 , padding :'50px', width: '700px'}} elevation ={3}>
                          <FormControl component="fieldset">
                            <FormLabel component="inout">실내/실외</FormLabel>
                            <RadioGroup row aria-label="inOutWhether" name="inOutWhether" value={selectSoccerField.inOutWhether} onChange={e => setSelectSoccerField({...selectSoccerField, inOutWhether: e.target.value})}>
                              <FormControlLabel value={0} control={<Radio />} label="실내구장" />
                              <FormControlLabel value={1} control={<Radio />} label="실외구장" />
                            </RadioGroup>
                          </FormControl>
                          <FormControl component="fieldset">
                            <FormLabel component="jandi">잔디 종류</FormLabel>
                            <RadioGroup row aria-label="grassWhether" name="grassWhether" value={selectSoccerField.grassWhether} onChange={e => setSelectSoccerField({...selectSoccerField, grassWhether: e.target.value})}>
                              <FormControlLabel value={0} control={<Radio />} label="인조잔디" />
                              <FormControlLabel value={1} control={<Radio />} label="천연잔디" />
                            </RadioGroup>
                          </FormControl>
                          <FormControl component="fieldset">
                            <FormLabel component="toilet">화장실 유무</FormLabel>
                            <RadioGroup row aria-label="toiletStatus" name="toiletStatus" value={selectSoccerField.toiletStatus} onChange={e => setSelectSoccerField({...selectSoccerField, toiletStatus: e.target.value})}>
                              <FormControlLabel value="true" control={<Radio />} label="있음" />
                              <FormControlLabel value="false" control={<Radio />} label="없음" />
                            </RadioGroup>
                          </FormControl>
                          <FormControl component="fieldset">
                          <FormLabel component="legend">샤워실 유무</FormLabel>
                          <RadioGroup
                            row
                            aria-label="showerStatus"
                            name="showerStatus"
                            value={selectSoccerField.showerStatus}
                            onChange={(e) => setSelectSoccerField({...selectSoccerField, showerStatus: e.target.value === "true"})}
                          >
                            <FormControlLabel value={true} control={<Radio />} label="있음" />
                            <FormControlLabel value={false} control={<Radio />} label="없음" />
                          </RadioGroup>
                        </FormControl>
                          <FormControl component="fieldset">
                            <FormLabel component="parking">주차장 여부</FormLabel>
                            <RadioGroup row aria-label="parkingStatus" name="parkingStatus" value={selectSoccerField.parkingStatus} onChange={e => setSelectSoccerField({...selectSoccerField, parkingStatus: e.target.value})}>
                              <FormControlLabel value="true" control={<Radio />} label="있음" />
                              <FormControlLabel value="false" control={<Radio />} label="없음" />
                            </RadioGroup>
                          </FormControl>
                        </Paper>
                        <Paper sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '50px', width: 700 }} elevation={3}>
                        <Box mb={2}>
                          <label htmlFor="fieldImg1">구장 이미지1 </label>
                            <input
                              type="file"
                              onChange={(e) => handleFileChange(e, 'fieldImg1')}
                              className="input-field"
                            />
                            {selectSoccerField.fieldImg1 &&
                            <>
                            <img src={selectSoccerField.fieldImg1} alt="" className="preview-image" />
                            <button onClick={() => handleRemoveImage('fieldImg1')} className='deleteImgBtn'>&times;</button>
                            </>}
                        </Box>
                        <Box mb={2}>
                          <label htmlFor="fieldImg1">구장 이미지2 </label>
                            <input
                              type="file"
                              onChange={(e) => handleFileChange(e, 'fieldImg2')}
                              className="input-field"
                            />
                            {selectSoccerField.fieldImg2 &&
                            <>
                            <img src={selectSoccerField.fieldImg2} alt="" className="preview-image" />
                            <button onClick={() => handleRemoveImage('fieldImg2')} className='deleteImgBtn'>&times;</button>
                            </>}
                        </Box>
                        <Box mb={2}>
                          <label htmlFor="fieldImg1">구장 이미지3 </label>
                            <input
                              type="file"
                              onChange={(e) => handleFileChange(e, 'fieldImg3')}
                              className="input-field"
                            />
                            {selectSoccerField.fieldImg3 &&
                            <>
                            <img src={selectSoccerField.fieldImg3} alt="" className="preview-image" />
                            <button onClick={() => handleRemoveImage('fieldImg3')} className='deleteImgBtn'>&times;</button>
                            </>}
                        </Box>
                        </Paper>
                        <Box>
                          <Button variant="contained" color="primary" type="submit" className="submit-button" style={{ color: '#fff', margin: '25px', background: "black"}}>
                            수정
                          </Button>
                          <Button variant="outlined" color="secondary" onClick={() => setPageState(0)} style={{ borderColor: 'black', color: 'black', margin: '25px' }}>
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
      </ThemeProvider>
  )
}

export default SoccerFieldUpdate;