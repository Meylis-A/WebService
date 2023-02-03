import { Button, Grid, InputLabel, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import AnimateButton from '../../components/@extended/AnimateButton';
import { useState, useEffect, useRef } from 'react';
import { set } from 'lodash';

const Field = ({setSearchValue}) => {
    const [data, setData] = useState([]);


    useEffect(() => {
        var content = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch('http://localhost:8080/categories', content)
            .then((response) => {
                if (response.status === 400) {
                    alert('Erreur');
                } else return response.json();
            })
            .then((json) => {
                if ('error' in json) {
                    console.log(json);
                    alert(json.error.message);
                } else {
                    setData(json.data);
                }
            });
    }, []);

    const [keyword, setkeyword] = useState()
    const [date, setdate] = useState()
    const [prix, setprix] = useState()
    const [ctg, setctg] = useState()
    const [status, setstatus] = useState()

    const search = (event) => {
        event.preventDefault();

        setSearchValue({keyword: keyword,date: date,prix:prix,ctg: ctg,status: status});

        // const filtered= auctions.filter(item => {

        //     // console.log("ctg id: "+item.auction.category.id+ " <- "+ctg);
        //     const matchedUndefined= keyword===undefined && date===undefined && prix===undefined && (ctg===undefined || ctg==="") && (status===undefined || status==="")
        //     const matchesCategory = item.auction.category.id == ctg || ctg === "" || ctg===undefined;
        //     const matchesKeyword = (item.auction.title.toLowerCase().includes(keyword?keyword.toLowerCase():keyword) || keyword === undefined)
        //       && (item.auction.description.toLowerCase().includes(keyword?keyword.toLowerCase():keyword) || keyword === undefined);
        //     const matchesStartDate = item.auction.start_date <= date || date === undefined;
        //     const matchesPrice = item.auction_bid?.bid_amount <= prix || prix === undefined;
        //     const matchesStatus = item.status === status || status === "" || status===undefined;
          
        //     return matchedUndefined || (matchesCategory && matchesKeyword && matchesStartDate && matchesPrice && matchesStatus);
        //   });


        
    }
    
    return (
        <>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h2">Recherches avancées</Typography>
                </Grid>
                <Grid item />
            </Grid>
            <Grid container spacing={3}>
                <Grid item={true} xs={3} md={3}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="firstname-signup">Mot clé</InputLabel>
                        <OutlinedInput id="firstname-login" onChange={(e)=>setkeyword(e.target.value)} type="firstname" name="firstname" placeholder="key" fullWidth />
                    </Stack>
                </Grid>
                <Grid item={true} xs={3} md={3}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="lastname-signup">Date</InputLabel>
                        <OutlinedInput fullWidth id="lastname-signup" onChange={(e)=>setdate(e.target.value)} type="date" name="email" placeholder="Date" inputProps={{}} />
                    </Stack>
                </Grid>
                <Grid item={true} xs={3} md={3}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="1">Categorie</InputLabel>
                        <select onChange={(e)=>setctg(e.target.value)} id="1">
                            <option value="">Tout</option>

                            {data.map((element, index) => {
                                return (
                                    <option key={index} value={element.id}> {element.category_name} </option>
                                );
                            })}
                        </select>
                    </Stack>
                </Grid>
                <Grid item={true} xs={3} md={3}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="2">Statut</InputLabel>
                        <select id="2" onChange={(e)=>setstatus(e.target.value)} >
                            <option value="">Tout</option>
                            <option value="in progress">en cours</option>
                            <option value="sold">vendue</option>
                            <option value="not sold">non vendue</option>
                        </select>
                    </Stack>
                </Grid>
                <Grid item={true} xs={3} md={3}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="lastname-signup">Prix max</InputLabel>
                        <OutlinedInput onChange={(e)=>setprix(e.target.value)} fullWidth id="lastname-signup" type="number" name="number" placeholder="prix max" inputProps={{}} />
                    </Stack>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item={true} xs={3} md={3}></Grid>
                    <Grid item={true} xs={3}>
                        <AnimateButton>
                            <Button fullWidth size="large" type="submit" variant="contained" onClick={search} color="primary">
                                Search
                            </Button>
                        </AnimateButton>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Field;
