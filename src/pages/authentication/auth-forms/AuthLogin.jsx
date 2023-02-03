import React from 'react';
import { Button, Divider, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import FirebaseSocial from './FirebaseSocial';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Admin } from '../../../Model/Admin';
import AnimateButton from '../../../components/@extended/AnimateButton';

const AuthLogin = () => {
    const user = new Admin();

    

    const login = (event) => {
        event.preventDefault();
        console.log(user);

        var content = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        content.body = JSON.stringify({
            email: user.email,
            password: user.password
        });
        fetch('http://localhost:8080/admin/login', content)
            .then((response) => {
                if (response.status === 400) {
                    alert('Please, check your email and password');
                } else return response.json();
            })
            .then((json) => {
                if ('error' in json) {
                    alert(json.error.message);
                } else {
                    const token_resp =JSON.stringify(json.data);
                    sessionStorage.setItem('bearer', token_resp);
                    window.location.href = '/home';
                }
            });
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: 'info@codedthemes.com',
                    password: '123456',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="email-login">Email Address</InputLabel>
                            <OutlinedInput
                                id="email-login"
                                type="email"
                                name="email"
                                onChange={(e) => (user.email = e.target.value)}
                                // defaultValue="johndoe@example.com"
                                placeholder="Enter email address"
                                fullWidth
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="password-login">Password</InputLabel>
                            <OutlinedInput
                                fullWidth
                                id="-password-login"
                                type="password"
                                name="password"
                                // defaultValue={"password123"}
                                onChange={(e) => (user.password = e.target.value)}
                                placeholder="Enter password"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <AnimateButton>
                            <Button fullWidth size="large" type="button" variant="contained" onClick={login} color="primary">
                                Login
                            </Button>
                        </AnimateButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider>
                            <Typography variant="caption"> Login with</Typography>
                        </Divider>
                    </Grid>
                    <Grid item xs={12}>
                        <FirebaseSocial />
                    </Grid>
                </Grid>
            </Formik>
        </>
    );
};

export default AuthLogin;
