import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import { Formik } from 'formik';

// project import
import FirebaseSocial from './FirebaseSocial';

import { strengthColor, strengthIndicator } from '../../../utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import AnimateButton from '../../../components/@extended/AnimateButton';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <>
            <Formik>
                <form noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="firstname-signup">Username</InputLabel>
                                <OutlinedInput id="firstname-login" type="firstname" name="firstname" placeholder="John" fullWidth />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastname-signup">Email</InputLabel>
                                <OutlinedInput fullWidth id="lastname-signup" type="email" name="email" placeholder="Doe" inputProps={{}} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="password-signup">Password</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="password-signup"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="******"
                                    inputProps={{}}
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="password-signup">Rewrite Password</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    id="password-signup"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="******"
                                    inputProps={{}}
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                                    Create Account
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider>
                                <Typography variant="caption">Sign up with</Typography>
                            </Divider>
                        </Grid>
                        <Grid item xs={12}>
                            <FirebaseSocial />
                        </Grid>
                    </Grid>
                </form>
            </Formik>
        </>
    );
};

export default AuthRegister;
