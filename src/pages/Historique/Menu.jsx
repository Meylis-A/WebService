import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import AuthBackground from '../../assets/images/auth/AuthBackground';
import AnimateButton from '../../components/@extended/AnimateButton';
import AuthFooter from '../../components/cards/AuthFooter';
import Logo from '../../components/Logo/Logo';
import MainCard from '../../components/MainCard';

const Menu = () => {
    const navigate = useNavigate();

    const handleClick = (url) => {
        navigate(url);
    };

    return (
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
                <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
                    <Logo />
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                        sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
                    >
                        <Grid item>
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
                                    <Grid item xs={12}>
                                        <AnimateButton>
                                            <Button
                                                fullWidth
                                                size="large"
                                                type="button"
                                                onClick={() => handleClick('/ownauction')}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Vos propres enchers
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <br />

                                    <Grid item xs={12}>
                                        <AnimateButton>
                                            <Button
                                                fullWidth
                                                size="large"
                                                type="button"
                                                onClick={() => handleClick('/otherauction')}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Autres encheres
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Box>
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Menu;
