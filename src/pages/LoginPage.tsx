import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logoMobile from '../img/logo-mobile.svg';
import { Alert, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import ToggleTheme from '../components/ToggleTheme';
import { PaletteTheme } from '../redux/theme/PaletteTheme';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { handleSignInEmailPassword, signInWithGoogle } = useAuth();

  const handleSubmit = () => {
    handleSignInEmailPassword(email, password)
    navigate('/search');
    /* .then(() => {
        navigate('/search');
      })
      .catch((error: any) => {
        setErrorShow(true);
        const errorCode = error.code.slice(5).replace(/-/g,' ');
        setErrorShowCode(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage); 
      }); */
  }

  const handleSignInGoogle = () => {
    signInWithGoogle();
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
          <Avatar sx={{ width: 56, height: 56, marginBottom:1 }} src={logoMobile} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              sx={{mb: 2}}
            />
            {/* {errorShow && <Alert severity="error" sx={{mb:1}}><strong>Error - </strong>{errorShowCode}</Alert> } */}
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt:1, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={handleSignInGoogle} sx={{ cursor: 'pointer' }} variant="body2">
                  Sign in with Google
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => navigate('/signup')} sx={{ cursor: 'pointer' }} variant="body2">
                  Don't have an account? Sign Up
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

export default LoginPage;