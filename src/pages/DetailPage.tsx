import React from 'react';
import '../style/pages/detailpage.css';
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getShowById, ShowDetailType } from "../Api";
import { Card, CardContent, CardMedia, Typography, CircularProgress, createTheme, Paper, ThemeProvider, CardActions } from '@mui/material';
import Header from "../components/Header";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useSelector } from "react-redux";
import ToggleTheme from "../components/ToggleTheme";
import { PaletteTheme } from "../redux/theme/PaletteTheme";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import useFavorites from '../hooks/useFavorites';

const DetailPage = () => {
  const { showId } = useParams();
  const [showDetail, setShowDetail] = useState<ShowDetailType | null>(null);
  const navigate = useNavigate();

  const [favorites, addFavorites, removeFavorites, isFavorites] = useFavorites();

  useEffect(() => {
    if (!!showId) {
      try {
        const showIdNum = parseInt(showId);
        getShowById(showIdNum).then((show: any) => {
          setShowDetail(show);
        });
      } catch (err) {
        console.error("NaN");
      }
    }
  }, [showId]);

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

  return !!showDetail ? (
    <>
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
          <Card sx={{ maxWidth: 500, alignItems: 'center', margin: 1, }} style={{ marginTop: '1em', marginBottom: '1em' }}>
            <CardActions sx={{ justifyContent: 'space-between' }}>
              <div onClick={() => navigate(-1)} className='card-actions'><ArrowBackIosRoundedIcon /></div>
              <div className='card-actions'>
                {isFavorites(showDetail) ? <FavoriteRoundedIcon onClick={() => removeFavorites(showDetail)} />
                  : <FavoriteBorderRoundedIcon onClick={() => addFavorites(showDetail)} />
                }
              </div>
            </CardActions>
            <CardMedia
              component="img"
              sx={{ width: '100%', height: 'auto' }}
              image={showDetail.image}
              alt={showDetail.title}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {showDetail.startDate} - {showDetail.endDate}
              </Typography>
              <hr />
              <Typography gutterBottom variant="h4" component="div" sx={{ marginTop: 1 }}>
                {showDetail.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                {showDetail.summary}
              </Typography>
              <hr />
              <Typography variant="body2" color="text.primary" sx={{ marginTop: 1 }}>
                Genres: {showDetail.genres.join(', ')} <br /> Rating: {showDetail.avgRating}/10
              </Typography>
            </CardContent>

          </Card>
        </Paper>
      </ThemeProvider></>
  ) : (
    <ThemeProvider theme={theme}>
      <Paper
        style={{
          minHeight: "100vh",
          borderRadius: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Paper></ThemeProvider>
  );

}

export default DetailPage;
