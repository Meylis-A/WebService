import { Alert, Grid, Link, ListItem, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useState , useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import Field from '../Home/Field';

const OtherAuction = () => {
    const header = ['IdEnchere', 'Titre', 'Description', 'Categorie', 'Prix misé', 'Date','Etat'];
    // const value = [{ id: 1, prod: 'vdv', categorie: 'sccc', status: 'vscd', montant: 2000 }];

    const [data, setData] = useState([]);

    var token = sessionStorage.getItem('bearer');
    token=JSON.parse(token);
    useEffect(() => {
        var content = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        
        content.headers.Authorization = token ? "Bearer "+token.token : '';

        console.log(content.headers.Authorization);


        var id = (token.user_account.id);
        fetch('http://localhost:8080/auction_bids/vusers/'+id , content)
            .then((response) => {
                if (response.status === 400) {
                    alert('Erreur');
                } else return response.json();
            })
            .then((json) => {
                if ('error' in json) {
                    console.log(json);
                    alert(json);
                } else {
                    setData(json.data);
                    
                }
            });
    }, []);

    console.log(data);

    return (
        <>
            <Grid container>
                <Grid xs={2}>
                    <MainLayout />
                </Grid>
                <Grid xs={8}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h2">Listes des enchères dont vous avez misé</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>

                    <Grid xs={12}>
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
                                    {data.map((row, index) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <Link color="secondary" component={Link} to={`/detailsenchere/${row.auction_bid.auction.id}`}>
                                                {row.auction_bid.auction.id}
                                            </Link>
                                            <TableCell align="left">{row.auction_bid.auction.title}</TableCell>
                                            <TableCell align="left">{row.auction_bid.auction.description}</TableCell>
                                            <TableCell align="left">{row.auction_bid.auction.category.category_name}</TableCell>
                                            <TableCell align="left">{row.auction_bid.bid_amount}</TableCell>
                                            <TableCell align="left">{row.auction_bid.bid_date}</TableCell>
                                            <TableCell align="left">
                                                {row.status=='win'&&<Alert variant='filled' severity='success'>{row.status}</Alert>}
                                            </TableCell>
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

export default OtherAuction;
