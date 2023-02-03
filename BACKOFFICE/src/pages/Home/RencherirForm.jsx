import { Alert, Button, Grid, InputLabel, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import AnimateButton from '../../components/@extended/AnimateButton';
import { useState, useEffect, useRef } from 'react';

const RencherirForm = ({auctions}) => {


    const [bid_amount, setbid_amount] = useState()

    var user = sessionStorage.getItem('bearer');
    user=JSON.parse(user);

    const bid = (event) => {
        event.preventDefault();


        var content = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };


        
        content.headers.Authorization = user ? "Bearer "+user.token : '';

        content.body = JSON.stringify({
            user_account: {id: user.user_account.id},
            auction: {
                id: auctions.id
            },
            bid_amount: bid_amount
        });

        console.log(content.body);
        fetch('http://localhost:8080/auction_bids', content)
            .then((response) => {
                if (response.status === 400) {
                    alert('Error');
                } else return response.json();
            })
            .then((json) => {
                if ('error' in json) {
                    alert(json.error);
                } else {
                    window.location.href = '/home';
                }
            });
        
    }

    if(auctions.status==='in progress' && user.user_account.id!=auctions.auction.user_account.id && user.user_account.id!=auctions.auction_bid?.user_account.id){
    
    return (
        <>
                        <OutlinedInput id="firstname-login" onChange={(e)=>setbid_amount(e.target.value)} type="number" name="bid_amount" placeholder="montant" fullWidth />
                        <AnimateButton>
                            <Button type="submit" min={auctions.auction_bid?auctions.auction_bid.bid_amount:auctions.auction.min_price} variant="contained" onClick={bid} color="success">
                                Renchérir
                            </Button>
                        </AnimateButton>
        </>
    );
}else if(user.user_account.id==auctions.auction_bid?.user_account.id){
    return(<Alert variant='filled' severity='info'>Votre mise</Alert>)
}
else{
    return(<></>);
}
};

export default RencherirForm;
