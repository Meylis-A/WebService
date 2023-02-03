import { Alert, Grid, ListItem, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Listes = () => {
    const header = ['IdEnchere', 'Titre','Description', 'Categorie', 'Status', 'Dernier prix'];
    const value = [{ id: 1, prod: 'vdv', categorie: 'sccc', status: 'vscd', montant: 2000 }];
    const [product, setProducts] = useState([]);

    useEffect(() => {
        var content = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ''
            }
        };

        (async function () {
            const response = await fetch('http://localhost:8080/auctions', content);
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData.data);
                setProducts(responseData.data);
            } else {
                alert(JSON.stringify(response));
            }
        })();
    });

    return (
        <Grid container>
            <Grid item={true} xs={2}></Grid>
            <Grid item={true} xs={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h2">Listes encheres</Typography>
                    </Grid>
                    <Grid item />
                </Grid>

                <Grid item={true} xs={12}>
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
                                {product.map((row, index) => (
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </ListItem>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Listes;
