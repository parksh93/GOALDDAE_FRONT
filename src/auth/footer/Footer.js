import { Grid, useMediaQuery, useTheme } from '@mui/material';
import Match from './match/match';
import ServiceField from './serviceField/serviceField';
import Introduce from './introduce/introduce';
import SocialMedia from './socialMedia/SocialMedia';
import Goalddae from './goallddae/goallddae';

const Footer = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div style={{
            background: "#3a3a3a", 
            height : isSmallScreen? "120%" : "360px", 
            paddingBottom:"7%", color:"white",
            paddingLeft : isSmallScreen? '10%' : '3%'
            }}>
        {isSmallScreen ? (
            <div style={{
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
            </div>
        ) : (
            <div style={{
                marginTop: "30%",
                display:"flex", 
                flexDirection: "row", 
                justifyContent:"flex-start",
                width: "1400px",
                marginLeft: '150px'
              }}>
                <Match />
                <ServiceField />
                <Introduce />
                <SocialMedia />
                <Goalddae />
             </div>
        )}
        </div>
    );
}


export default Footer;