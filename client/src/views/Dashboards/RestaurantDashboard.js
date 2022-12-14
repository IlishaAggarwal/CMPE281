import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import backendServer from '../../Config'
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../Navbar';
import { NearMeTwoTone } from '@material-ui/icons';
import props from 'prop-types';
import { useHistory } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';

const theme = createTheme();

const styleimg = {
  display: 'block',
  margin: 'auto',
  height: '50',
  width: '25'
}

function RestaurantDashboard() {

  const history = useHistory();
  if(!localStorage.getItem("RestaurantId")){
    history.push("/RestaurantLogin")
  }

  const [cards, setCards] = useState([]);
  //  const [description, getDescription] = useState('');
  //  const [imageURL, getImageUrl] = useState('');
  //  const [res1, setRes1] = useState([]);
  //  const [il,setIl] = useState([]);
  //const [res1, getRes1] = useState('');
  const [cardSearch, setCardSearch] = useState([]);
  const [searchValue, setSearch] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const onSearch = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value);
    let searchTerm = event.target.value;
    // console.log(res1);
    if (searchTerm == '') {
      setCards(cardSearch);
      return;
    }
    if (cards.length != 0) {
      let filter_1 = cards.filter(cards => cards.DishName != null && cards.DishName.includes(searchTerm));
      setCards(filter_1);
    }
  };



 

  useEffect(() => {
    setFilteredPosts(cards.filter((cards) => cards.DishName === searchValue));
  }, [cards, searchValue]);

  console.log("Hello filetered posts", filteredPosts);

  useEffect(async () => {
    const restaurantId = localStorage.getItem('RestaurantId');
    console.log("use effect");

    const response = await axios.get(`${backendServer}/Restaurant/dishes/${restaurantId}`);

    setCards(response.data);
    console.log("Hello cards", cards)

    //  setRes1(response.data);
    setCardSearch(response.data);

    //getRes1({res1: response.data})
    //const data = await response.json();
    //console.log(res2.data);

    // console.log("isss ",res1);
    //  getName(response.data[2].RestaurantName);
    //    getDescription(response.data[2].RestaurantDesc);
    //  getImageUrl(response.data[2].Image)
  }, []);

 
  const onAddDishes = (event) => {
    sessionStorage.removeItem("dishId");
   
    history.push("/AddDish")
    
  }

  const EditDish = (EditDishId)=>{

    sessionStorage.setItem("dishId", EditDishId);
    
    console.log("Dish id is here", EditDishId)
    // if(EditDishId != ''){
    history.push("/AddDish")
    // }
   
  };

  const ViewOrders = () =>{
    history.push("/RestaurantOrder")
  }

  return (
    <div>
      <Navbar handleSearch={onSearch} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 0,
              pb: 3,
            }}
          >
            {<Container maxWidth="sm">
              {/* <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                  >
                    Welcome Uber-Eats
                  </Typography>
                  <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Sell your dishes and maximise profits
                  </Typography>  */}
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" onClick={() => onAddDishes()}>Add Dishes</Button>
                <Button variant="outlined" onClick={ViewOrders}>View Orders</Button>
              </Stack>
            </Container>}
          </Box>
          {/* <input
              type="text"
            
              value={searchValue}
              onChange={handleSearchChange}
            /> */}
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (

                <Grid item key={card.DishId} xs={6} sm={3} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'block', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: '00.25%',
                      }}
                      image={card.DishImage}
                      alt="" style={styleimg}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.DishName}
                      </Typography>
                      <Typography>
                        {card.DishDesc}
                      </Typography>
                      <Typography>
                        {"$"}{card.Price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => EditDish(card.DishId)}><EditIcon></EditIcon>Edit</Button>
                      {/* onClick={() => goToDetails(name)} */}
                      {/* <Button size="small">Edit</Button> */}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>

      </ThemeProvider>
    </div>
  )
}

export default RestaurantDashboard;