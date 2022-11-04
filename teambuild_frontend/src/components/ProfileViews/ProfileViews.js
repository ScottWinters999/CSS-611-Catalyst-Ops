import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MainContainer from '../layout/MainContainer';
import classes from "./ProfileViews.module.css";
import ProfileViewsCard from './ProfileViewsCard';
import UserContext from '../../shared/context/user-context';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const  ProfileViews = (props) => {

  const userCtx = React.useContext(UserContext)
  console.log(userCtx.userName)

  return (
    <React.Fragment>
      <MainContainer>
      <header className={classes.Header}>Hi {userCtx.userName},See who all are looking at your profile</header>
      <div className={classes.TableWrapper}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(11)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item style={{"borderRadius": "16px"}}><ProfileViewsCard/></Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      </div>
     

      </MainContainer>

     
    </React.Fragment>
  );
}

export default ProfileViews;
