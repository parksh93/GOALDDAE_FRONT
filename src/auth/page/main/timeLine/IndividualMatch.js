import React from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  divider: {
    height: '0.4px',
    backgroundColor: 'rgb(200, 200, 200)',
    width: '100%',
    marginTop: 10,
    marginBottom: 5,
  },
});

  const IndividualMatch = ({ match }) => {

  const getPlayerFormat = (playerNumber) => {
    const teamSize = playerNumber / 2;
    return teamSize + "대" + teamSize;
  };

  
  const classes = useStyles();

  let buttonStyle, isDisabled;
    switch(match.status) {
      case '신청가능':
      buttonStyle = {backgroundColor:'green', color:'white', fontSize:'10px', width:'100px'};
      isDisabled = false;
      break;

      case '마감임박': 
      buttonStyle = {backgroundColor:'red', color:'white', fontSize:'10px', width:'100px'};
      isDisabled = false;
      break;
      
      default:
      buttonStyle ={backgroundColor:'grey', color:'black', fontSize:'10px', width:'100px'};
      isDisabled = true; 
      }

  return (
    <>
      <Box sx={{ display:'flex', marginTop:'16px' }}>
        <Box sx={{ marginLeft:['10px','40px'], marginRight:'20px', marginTop:'8px',fontWeight:'bold', fontSize:'13px'}}>
          {new Date(match.startTime).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', hour12:false })}
        </Box>
        <Box sx={{ paddingX:[2,5],width:['100%', '500px'] ,  fontSize:'13px'}}>
          <div>{match.fieldName}</div>
          <div> &middot; {getPlayerFormat(match.playerNumber)} &middot; {match.gender} &middot;</div>
        </Box>
          <Button style={buttonStyle} disabled={isDisabled}>
            {match.status}
          </Button>
        </Box>
      <div className={classes.divider}></div>
    </>
  );
}

export default IndividualMatch;