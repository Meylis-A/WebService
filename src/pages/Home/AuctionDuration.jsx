import { Grid, Stack, Button, InputLabel, OutlinedInput, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';

const AuctionDuration = () => {
    const [durationMax, setDurationMax] = useState();
    const [durationMin, setDurationMin] = useState();

    const [data, setData] = useState()
    
    const myChangeHandler = (event) => {
        setDurationMax(event.target.value);
    };

    const myChangeHandler2 = (event) => {
        setDurationMin(event.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(durationMax);
        console.log(durationMin);
        var content = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ''
            },
            body: ''
        };

        content.body = JSON.stringify({
            max_duration: durationMax,
            min_duration: durationMin
        });
        

        await fetch('http://localhost:8080/auction_durations', content)
            .then((response) => response.json())
            .then((json) => {
                if ('error' in json) {
                    alert(json.error);
                } else {
                    console.log('ok');
                    window.location.href='/auction_duration';
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

        
        fetch('http://localhost:8080/auction_durations/last/' , content)
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
    return (
        <Grid container marginTop={5} marginBottom={5}>
            <Grid xs={4}>
                
                <MainLayout />
            </Grid>
            <Grid xs={8}>
                <Grid item xs={5}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="duration-min">Duration Min
                            <Alert variant='standard' severity='info'>{data?.min_duration}</Alert>
                        </InputLabel>
                        <OutlinedInput
                            id="duration-min"
                            type="number"
                            name="duration_auction_min"
                            onChange={myChangeHandler2}
                            placeholder="Enter duration min"
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="duration-max">Duration max
                            <Alert variant='standard' severity='info'>{data?.max_duration}</Alert>
                        </InputLabel>
                        <OutlinedInput
                            id="duration-max"
                            type="number"
                            name="duration_auction_max"
                            onChange={myChangeHandler}
                            placeholder="Enter duration max"
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

export default AuctionDuration;
