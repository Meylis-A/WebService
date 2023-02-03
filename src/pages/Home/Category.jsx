
import {
    Button,
    Grid,
    ListItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Stack, InputLabel, OutlinedInput,
    Typography
} from '@mui/material';



import { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
const Category = () => {
    const [category, setCategory] = useState();
    const [data, setData] = useState([])


    const header = ['#', 'Catégorie'];

    const myChangeHandler = (event) => {
        setCategory(event.target.value );
    };
    

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(category);
        var content = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: ''
            },
            body: ''
        };

        content.body = JSON.stringify({
            category_name: category
        });

        var user = sessionStorage.getItem('bearer');
        user=JSON.parse(user);


        content.headers.Authorization = user ? "Bearer "+user.token : '';

        console.log(user);

        await fetch('http://localhost:8080/categories/insertion', content)
            .then((response) => response.json())
            .then((json) => {
                if ('error' in json) {
                    alert(json.error);
                } else {
                    console.log('ok');
                    window.location.href='/category';
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

        
        fetch('http://localhost:8080/categories' , content)
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
                        <InputLabel htmlFor="category-name">Category</InputLabel>
                        <OutlinedInput
                            id="category-name"
                            type="text"
                            name="category"
                            onChange={myChangeHandler}
                            placeholder="Enter category name"
                        />
                    </Stack>
                </Grid>
                <Grid item xs={5} marginTop={1}>
                    <Button fullWidth size="large" onClick={handleClick} type="submit" variant="contained" color="success">
                        Inserer
                    </Button>
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
                                            <TableCell align="left">{row.category_name}</TableCell>
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

export default Category;
