import React, { useMemo } from 'react';
import '../style/pages/searchpage.css';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardMedia, Button, FormControl, Grid, InputBase, Paper, ThemeProvider, createTheme } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import { getShowsBySearch, ShowType } from "../Api";
import Header from '../components/Header';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ToggleTheme from '../components/ToggleTheme';
import { useSelector } from 'react-redux';
import { PaletteTheme } from '../redux/theme/PaletteTheme';

const SearchPage = () => {

  const [currentSearch, setCurrentSearch] = useSearchParams();
  const [shows, setShows] = useState<ShowType[]>([]);

  const handleOnSearchChange = useCallback(
    (query: string) => {
      setCurrentSearch({ search: query });
    }, [setCurrentSearch]
  );

  const isSearchButtonDisable = () => currentSearch.get("search")?.trim().length === 0;

  const handleOnSearch = useCallback(() => {
    getShowsBySearch(currentSearch?.get("search") || "").then((res: any) => setShows(res));
  }, [currentSearch]);

  useEffect(() => {
    const currentSearchStr = currentSearch?.get("search")?.trim();
    if (!!currentSearchStr && currentSearchStr.length > 0) {
      handleOnSearch();
    }
  }, []);

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
          <Grid item style={{ padding: "2em", width: "100%" }}>
            <Paper
              component="form"
              style={{ padding: "2em" }}
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <SearchRoundedIcon color="action" fontSize="small" sx={{ marginRight: 0.5 }} />
                <InputBase
                  placeholder="Search by title..."
                  onChange={(e) => handleOnSearchChange(e.target.value)}
                  value={currentSearch.get("search") || ''}
                  autoFocus
                />
                <Button disabled={isSearchButtonDisable()} onClick={handleOnSearch}>Search</Button>
              </FormControl>
            </Paper>
          </Grid>

          {shows.map((el) => (
            <Link to={el.id.toString()} key={el.id} style={{ textDecoration: 'none', margin: '2em' }}>
              <Card sx={{ display: 'flex', alignItems: 'center' }} className='image-container'>
                <CardMedia component='img' sx={{ height: 350, width: 275 }} image={el.image} alt={el.title} />
                <div className='overlay'>{el.title}</div>
              </Card>
            </Link>
          ))}

        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default SearchPage;