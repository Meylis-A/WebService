import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
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
import { Pie } from 'react-chartjs-2';

const Statistique = () => {
    const [data, setData] = useState([]);


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

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

        
        fetch('http://localhost:8080/statistiques', content)
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
                    
                }
            });
    },[]);


    const chartDataCtg = {
        labels: (data.statistique_categories
            ? data.statistique_categories.map((category) => category.category.category_name)
            : []),
        datasets: [
          {
            label: 'Mise en enchère par categorie',
            data: data.statistique_categories
              ? data.statistique_categories.map((category) => category.bid_amount)
              : [],
            backgroundColor: [
                "#F7464A",
                "#46BFBD",
                "#FDB45C",
                "#949FB1",
                "#4D5360",
              ],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      const chartDataUser = {
            labels: 
            (data.statistique_users
                ? data.statistique_users.map((user) => user.user_account.username)
                : []),
          datasets: [
            {
              label: 'Mise en enchère par utilisateur',
              data: data.statistique_users
                ? data.statistique_users.map((user) => user.bid_amount)
                : [],
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        };

    const chartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Statistique des enchères vendues',
          },
        },
    };

    return (
        <><Grid container>
        <Grid xs={4}>
            
            <MainLayout />
        </Grid>
        <Grid item xs={5}>

            <Line data={chartDataUser} options={chartOptions} />
        </Grid>
        <Grid item xs={3}>

          <Pie data={chartDataCtg} options={chartOptions} />
        </Grid>
      </Grid>
      
        </>
    );
};

export default Statistique;
