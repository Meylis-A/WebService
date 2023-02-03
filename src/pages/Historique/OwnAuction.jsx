import { Alert, Grid, Link, ListItem, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useState , useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import Field from '../Home/Field';

const OwnAuction = () => {
    const header = ['IdEnchere', 'Titre', 'Description', 'Categorie', 'Status', 'Dernière prix','Gagnant'];
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
        fetch('http://localhost:8080/auctions/users/'+id , content)
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
                            <Typography variant="h2">Listes de vos encheres</Typography>
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
                                            <TableCell align="left">{row.auction_bid.bid_amount}</TableCell>
                                            <TableCell align="left">{row.auction_bid.user_account.username}</TableCell>
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

export default OwnAuction;
