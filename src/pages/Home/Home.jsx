import { useRef, useState, useEffect } from 'react';
import {
    Alert,
    Box,
    Button,
    Grid,
    InputLabel,
    ListItem,
    OutlinedInput,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import Field from './Field';
import RencherirForm from './RencherirForm';
import Badge from '../../themes/overrides/Badge';

const Home = () => {
    const header = ['IdEnchere', 'Titre', 'Description', 'Categorie', 'Status', 'Dernière prix'];
    // const value = [{ id: 1, prod: 'vdv', categorie: 'sccc', status: 'vscd', montant: 2000 }];
    const [data, setData] = useState([]);

    const [searchValue, setSearchValue] = useState();
    var user = sessionStorage.getItem('bearer');
    user=JSON.parse(user);

    const [filtered, setFiltered] = useState([])


    useEffect(() => {
        var content = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        
        content.headers.Authorization = user ? "Bearer "+user.token : '';

        
        fetch('http://localhost:8080/auctions', content)
            .then((response) => {
                if (response.status === 400) {
                    alert('Erreur');
                } else return response.json();
            })
            .then((json) => {
                if ('error' in json) {
                    console.log(json);
                    alert(json.error.message);
                    window.location.href = '/signin';
                } else {
                    setData(json.data);


                    if(searchValue!==undefined){

                        var dataF=data.filter(item => {
            
                            const matchedUndefined= searchValue.keyword===undefined && searchValue.date===undefined && searchValue.prix===undefined && (searchValue.ctg===undefined || searchValue.ctg==="") && (searchValue.status===undefined || searchValue.status==="")
                            const matchesCategory = item.auction.category.id == searchValue.ctg || searchValue.ctg === "" || searchValue.ctg===undefined;
                            const matchesKeyword = (item.auction.title.toLowerCase().includes(searchValue.keyword?searchValue.keyword.toLowerCase():searchValue.keyword) || searchValue.keyword === undefined)
                            && (item.auction.description.toLowerCase().includes(searchValue.keyword?searchValue.keyword.toLowerCase():searchValue.keyword) || searchValue.keyword === undefined);
                            const matchesStartDate = item.auction.start_date <= searchValue.date || searchValue.date === undefined;
                            const matchesPrice = item.auction_bid?.bid_amount <= searchValue.prix || searchValue.prix === undefined || searchValue.prix==='';
                            const matchesStatus = item.status === searchValue.status || searchValue.status === "" || searchValue.status===undefined;

                        
                            return matchedUndefined || (matchesCategory && matchesKeyword && matchesStartDate && matchesPrice && matchesStatus);
                        });

                        setFiltered(dataF);
                        }else{

                            setFiltered(json.data);
                        }
            
                    
                }
            });


    });


    return (
        <>
            <Grid container >
                <Grid item={true} xs={2}>
                    <MainLayout />
                </Grid>
                <Grid>
                    <Field setSearchValue={setSearchValue}/>
                    <br />

                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h2">Listes encheres</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>

                    <Grid>
                        <ListItem>
                            <Table
                                aria-labelledby="tableTitle"
                                sx={{
                                    '& .MuiTableCell-root:first-child': {
                                        pl: 2
                                    },
                                    '& .MuiTableCell-root:last-child': {
                                        pr: 3
                                    }
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        {header.map((e, index) => (
                                            <TableCell key={index}>{e}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filtered.map((row, index) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell component="th" scope="row" align="left">
                                                <Link color="secondary" component={Link} to={`/detailsenchere/${row.auction.id}`}>
                                                    {row.auction.id}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left">{row.auction.title}</TableCell>
                                            <TableCell align="left">{row.auction.description}</TableCell>
                                            <TableCell align="left">{row.auction.category.category_name}</TableCell>
                                            <TableCell align="left">
                                                {row.status=='sold'&&<Alert variant='filled' severity='success'>{row.status}</Alert>}
                                                {row.status=='not sold'&&<Alert variant='filled' severity='warning'>{row.status}</Alert>}
                                                {row.status=='in progress'&&<Alert variant='filled' severity='info'>{row.status}</Alert>}
                                            </TableCell>
                                            <TableCell align="left">{row.auction_bid?row.auction_bid.bid_amount:row.auction.min_price}</TableCell>
                                            <TableCell><RencherirForm auctions={row}/></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ListItem>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
