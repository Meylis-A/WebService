import { useState, useEffect } from 'react';
import {
    Button,
    Grid,
    ListItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import AnimateButton from '../../components/@extended/AnimateButton';
import MainLayout from '../../layout/MainLayout';

const RechargeToValid = () => {
    const header = ['#', 'Date de rechargement','Montant', 'Utilisateur', 'Adresse e-mail'];
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

        
        fetch('http://localhost:8080/account_recharges', content)
            .then((response) => {
                if (response.status === 400) {
                    alert('Erreur');
                } else return response.json();
            })
            .then((json) => {
                if ('error' in json) {
                    console.log(json);
                    alert(json.error);
                    window.location.href = '/login';
                } else {
                    setData(json.data);
                    
                }
            });
    },[]);


    const valid = (row_id,status) => {


        var user = sessionStorage.getItem('bearer');
        user=JSON.parse(user);
    
        var content = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };


        
        content.headers.Authorization = user ? "Bearer "+user.token : '';

        console.log(user);

        content.body = JSON.stringify({
            account_recharge_id: row_id,admin:{id: user.admin.id},status: status
        });

        console.log(content.body);
        fetch('http://localhost:8080/account_recharges/'+row_id+'/valid', content)
            .then((response) => {
                if (response.status === 400) {
                    alert('Error');
                } else return response.json();
            })
            .then((json) => {
                if ('error' in json) {
                    alert(json.error);
                } else {
                    window.location.href = '/recharge_tovalid';
                }
            });
        
    }
    return (
        <>
            <Grid container>
                <Grid item={true} xs={2}>
                    <MainLayout />
                </Grid>
                <Grid>
                    <br />

                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h2">Validation du rechargement de comptes</Typography>
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
                                    {data.map((row, index) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell component="th" scope="row" align="left">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left">{row.recharge_date}</TableCell>
                                            <TableCell align="left">{row.recharge_amount}</TableCell>
                                            <TableCell align="left">{row.user_account.username}</TableCell>
                                            <TableCell align="left">{row.user_account.email}</TableCell>
                                            <TableCell align="left">
                                                <AnimateButton>
                                                    <Button type="submit" variant="contained" onClick={()=>valid(row.id,-5)} color="warning">
                                                        Refuser
                                                    </Button>
                                                </AnimateButton>
                                            </TableCell>
                                            <TableCell align="left">
                                                <AnimateButton>
                                                    <Button type="submit" variant="contained" onClick={()=>valid(row.id,5)} color="success">
                                                        Valider
                                                    </Button>
                                                </AnimateButton>
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

export default RechargeToValid;
