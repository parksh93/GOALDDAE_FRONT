import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import './BestBoard.css';  

const BestBoard = () => {
    const [boardTop5, setBoardTop5] = useState([]);

    useEffect(() => {
        const fetchTopBoard = async () => {
            const response = await fetch('/board/top5');
            const data = await response.json();
            setBoardTop5(data);
        };
        fetchTopBoard();
    }, []);


    return (
        <div style={{ display: 'flex', justifyContent: 'start' }}>
    <Box sx={{ 
            height: { xs: '140px', sm:"200px" },
            margin: "1%",
            maxWidth: '100%',
            padding:'1%',
            boxShadow:'2px 2px 3px 3px #ccc',
            borderRadius:'15px'}}
        >                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center'}}>
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
                        margin:"2%",
                        fontSize:  { xs: "10px", sm: "15px"},
                        width: { xs: "360px", sm: "700px"},
                        borderRadius:'10px'}} 
                >
                    {boardTop5.map((communicationBoard) => (
                      <ul key={communicationBoard.id} style={{ margin: '1%' }}>
                          <a href={`/board/detail/${communicationBoard.id}`} className="top5Boards">
                              {communicationBoard.title} [{communicationBoard.replyCount}]
                          </a>
                      </ul>
                    ))}
                </Box>
            </Box>
        </div>
    )
}

export default BestBoard;
