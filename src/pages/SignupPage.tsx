import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import logoMobile from '../img/logo-mobile.svg';
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ToggleTheme from "../components/ToggleTheme";
import { PaletteTheme } from '../redux/theme/PaletteTheme';
import { useAuth } from '../hooks/useAuth';

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { handleSignUp } = useAuth();

  const handleSubmit = () => {
    handleSignUp(email, password, name)
    navigate('/search');
  }

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
          minHeight: "100vh",
          borderRadius: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <ToggleTheme />

        <Container component="main" maxWidth="xs">

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 8,
            }}
          >
            <Avatar sx={{ width: 56, height: 56, marginBottom: 1 }} src={logoMobile} />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{mb: 1}}
                  />
                </Grid>
              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link onClick={() => navigate("/")} sx={{ cursor: 'pointer' }} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

        </Container>
      
      </Paper>
    </ThemeProvider>
  );
}

export default SignupPage;