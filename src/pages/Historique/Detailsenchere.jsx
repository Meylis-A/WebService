import { Grid, ListItem, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout';
import ImageSlider from './ImageSlider';
import { useState, useEffect } from 'react';
const DetailsEnchere = () => {
    const { idauction } = useParams();
    const [slides, setSlides] = useState([]);

    const [product, setProducts] = useState();

    // details auction
    useEffect(() => {
        var content = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: ''
            }
        };

        fetch('http://localhost:8080/auctions/fiche/'+idauction , content)
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
                    setProducts(json.data);
                    
                }
            });
    }, []);
    // // image
    useEffect(() => {
        var content = {
            headers: {
                method : 'GET',
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        };

        (async function () {
            // const response = await fetch('http://localhost:8080/auction/image/' + idauction, content);
            const response = await fetch('/data.json', content);
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData.data[0].images);
                setSlides(responseData.data[0].images);
            } else {
                alert(JSON.stringify(response));
            }
        })();
    }, []);

    const containerStyles = {
        width: '100%',
        height: '100%',
        margin: '0 auto'
    };

    console.log(product);

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
                            <Typography variant="h2">Détails</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                </Grid>
                <br />
                <br />
                <br />
                <br />
                <br />
                <Grid container>
                    <Grid item={true} xs={3}></Grid>
                    <Grid item={true} xs={4} width={20} height={350}>
                        <div style={containerStyles}>
                            <ImageSlider slides={slides} />
                        </div>
                    </Grid>
                    <Grid item={true} xs={1}></Grid>
                    <Grid item={true} xs={3}>
                        <div>
                            <p>Nom : {product?.title}</p>
                        </div>
                        <div>
                            <p>Description : {product?.description}</p>
                        </div>
                        <div>
                            <p>Prix Minimum : {product?.min_price}</p>
                        </div>
                        <div>
                            <p>Duration : {product?.duration} Heure</p>
                        </div>
                        <p></p>
                        <div>
                            <p>Categorie : {product?.category.category_name}</p>
                        </div>
                        {/* <div>
                            <p>Status : {product?.status}</p>
                        </div> */}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default DetailsEnchere;
