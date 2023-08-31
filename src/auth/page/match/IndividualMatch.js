import React from "react";
import { Box } from "@material-ui/core";
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

return (
  <>
    <Box sx={{ display: 'flex', marginTop: 8, paddingRight: 0}}>
      <Box sx={{ marginLeft: 40, marginTop: 8, fontWeight: 'bold'}}>
        {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', hour12: false })}
      </Box>
      <Box sx={{ paddingX: 5, width: 200 }}>
        <div>{match.fieldName}</div>
        <div>{getPlayerFormat(match.playerNumber)}</div>
      </Box>
      <Box sx={{ marginTop: 8, width: 70, marginLeft: 600, marginRight: 50 }}>
        {match.status}
      </Box>
      </Box>
    <Box className={classes.divider} />
  </>
);
}

export default IndividualMatch;