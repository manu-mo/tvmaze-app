import React, { useMemo, useState } from 'react';
import '../style/pages/favoritespage.css';
import { Card, CardMedia, createTheme, Grid, Paper, ThemeProvider } from '@mui/material';
import ToggleTheme from '../components/ToggleTheme';
import { PaletteTheme } from '../redux/theme/PaletteTheme';
import Header from '../components/Header';
import useFavorites from '../hooks/useFavorites';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {

  /* toggle favorites */
  const [favorites, addFavorites, removeFavorites, isFavorites] = useFavorites();


  /* toggle theme */
  const [mode, setMode] = useState("light");
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  useMemo(() => {
    if (darkMode) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [darkMode]);
  const theme = useMemo(() => createTheme(PaletteTheme(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        style={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          borderRadius: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <ToggleTheme />
        <Header />
        <Grid container justifyContent="center">

          {favorites !== null ? favorites.map((show) => ( isFavorites(show) && (
            <Link to={show.id.toString()} key={show.id} style={{ textDecoration: 'none', margin: '2em' }}>
            <Card sx={{ display: 'flex', alignItems: 'center' }} className='image-container'>
              <CardMedia component='img' sx={{ width: 175, height: 250 }} image={show.image} alt={show.title} />
              <div className='overlay'>{show.title}</div>
            </Card>
          </Link>)
          )) : <h2 style={{ margin: 50 }}>No favorites :(</h2>}

        </Grid>
      </Paper>
    </ThemeProvider>
  )
}

export default FavoritesPage;