import { Box, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import Match from './match/match';
import ServiceField from './serviceField/serviceField';
import Introduce from './introduce/introduce';
import SocialMedia from './socialMedia/SocialMedia';
import Goalddae from './goallddae/goallddae';

const Footer = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            bgcolor: "#3a3a3a", 
            height : isSmallScreen? "120%" : "28vh", 
            paddingBottom:"7%", color:"white",
            paddingLeft: '5%'
            }}>
        {isSmallScreen ? (
            <Box sx={{
                marginTop: "20%",
                display:"flex", 
                flexDirection: "row", 
                justifyContent:"flex-start",
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={2}>
                                    <Match />
                                    <ServiceField />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={2}>
                                <Introduce />
                                <SocialMedia />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Goalddae />
                        </Grid>
                    </Grid>
            </Box>
        ) : (
            <Box sx={{
                marginTop: "30%",
                display:"flex", 
                flexDirection: "row", 
                justifyContent:"flex-start",
                width: "1400px",
                marginLeft: '250px'
              }}>
                <Match />
                <ServiceField />
                <Introduce />
                <SocialMedia />
                <Goalddae />
             </Box>
        )}
        </Box>
    );
}


export default Footer;