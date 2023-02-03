import { Box, Grid } from '@mui/material';
import MainCard from '../components/MainCard';
import Listes from './Home/ListesWithoutLogin';
import { NavLink } from 'react-router-dom';

const Main = () => {
    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item={true} xs={8}>
                <MainCard sx={{ mt: 3 }}>
                    <Listes />
                    <NavLink to="/login">Sign in</NavLink>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Main;
