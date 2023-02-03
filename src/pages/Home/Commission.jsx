import { Grid, Stack, Button, InputLabel, OutlinedInput, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';

const Commission = () => {
    const [commission, setCommission] = useState();
    const [data, setData] = useState()
    

    const myChangeHandler = (event) => {
        setCommission(event.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        var content = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ''            
            },
            body: '',            
        };

        content.body = JSON.stringify({
            commission_rate: commission
        });


        await fetch('http://localhost:8080/auction_commissions', content)
            .then((response) => response.json())
            .then((json) => {
                if ('error' in json) {
                    alert(json.error);
                } else {
                    console.log('ok');
                    window.location.href='/commission';
                }
            });
    };

    useEffect(() => {
        var content = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        
        fetch('http://localhost:8080/auction_commissions/last/' , content)
            .then((response) => {
                if (response.status === 400) {
                    alert('Erreur');
                } else return response.json();
            })
            .then((json) => {
                if ('error' in json) {
                    console.log('error');
                } else {
                    setData(json.data);
                    
                }
            });
    }, []);

    console.log(data);

    return (
        <Grid container marginTop={5} marginBottom={5}>
            <Grid xs={4}>

                
                <MainLayout />
            </Grid>
            <Grid xs={8}>
                <Grid item xs={5}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="commission-name">Commission<Alert variant='standard' severity='info'>{data?.commission_rate}</Alert></InputLabel>
                        <OutlinedInput
                            id="commission-name"
                            type="number"
                            name="commission"
                            onChange={myChangeHandler}
                            placeholder="Enter commission rate"
                        />
                    </Stack>
                </Grid>
                <Grid item xs={5} marginTop={1}>
                    <Button fullWidth size="large" onClick={handleClick} type="submit" variant="contained" color="success">
                        Inserer
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Commission;
