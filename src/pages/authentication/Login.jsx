import { Grid } from '@mui/material';

import { Box } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import MainCard from '../../components/MainCard';
import AuthFooter from '../../components/cards/AuthFooter';
import AuthBackground from '../../assets/images/auth/AuthBackground';
import Logo from '../../components/Logo/Logo';

// ================================|| LOGIN ||================================ //

const Login = () => (
    <Box sx={{ minHeight: '100vh' }}>
        <AuthBackground />
        <Grid
            container
            direction="column"
            justifyContent="flex-end"
            sx={{
                minHeight: '100vh'
            }}
        >
            <Grid item={true} xs={12} sx={{ ml: 3, mt: 3 }}>
                <Logo />
            </Grid>
            <Grid item={true} xs={12}>
                <Grid
                    item={true}
                    xs={12}
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
                >
                    <Grid item={true}>
                        <MainCard
                            sx={{
                                maxWidth: { xs: 400, lg: 475 },
                                margin: { xs: 2.5, md: 3 },
                                '& > *': {
                                    flexGrow: 1,
                                    flexBasis: '50%'
                                }
                            }}
                        >
                            <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
                                <AuthLogin />
                            </Box>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item={true} xs={12} sx={{ m: 3, mt: 1 }}>
                <AuthFooter />
            </Grid>
        </Grid>
    </Box>
);

export default Login;
