import React from 'react'
import { Box, Button } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';

    const BestBoard = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'start' }}>
        <Box sx={{ margin: "1%", maxWidth: '100%', padding:'1%', boxShadow:'2px 2px 3px 3px #ccc', borderRadius:'15px'}}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div className='title'><ModeIcon color="success" /> <span className="headline">오늘의 베스트글</span></div>
            <Button 
              variant="contained" 
              href={"/board"} 
              className="newsButton"
              color="success"
              sx={{
                padding: { xs: '6px 10px', sm: '6px 12px' },
                fontSize: { xs: '8px', sm: '12px' }
              }}
              >전체글보기</Button>
          </div>
            <Box 
              sx={{
                margin:"1%",
                width: { xs: "100%", sm: "700px"},
                borderRadius:'10px'}} 
                >
                <div className='title'>
                    <ul><a href={""} className="">{}</a></ul>
                </div>
            </Box>
        </Box>
      </div>
        )
    }

export default BestBoard;
