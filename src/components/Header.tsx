import React, { useState } from 'react';
import '../style/components/header.css';
import { AppBar, Box, Toolbar, IconButton, Menu, Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import logoMobile from '../img/logo-mobile.svg';
import logoDesktop from '../img/logo-desktop.svg';
import { useNavigate } from 'react-router-dom';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import { useAuth } from '../hooks/useAuth';

function Header() {

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { handleSignOut } = useAuth();
  
  const handleLogOut = () => {
    handleSignOut();
    navigate('/login');
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className='header' >

      <Toolbar>

        <Box sx={{ width: '33%', display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuRoundedIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            <List onClick={handleCloseNavMenu}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText sx={{ textAlign: 'center' }} primary="SEARCH" onClick={() => navigate('/search')} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText sx={{ textAlign: 'center' }} primary="FAVORITES" onClick={() => navigate('/favorites')} />
                </ListItemButton>
              </ListItem>
            </List>
          </Menu>
        </Box>

        <Box sx={{ width: '33%', display: { xs: 'none', md: 'flex' } }} onClick={handleCloseNavMenu}>
          <Button
            onClick={() => navigate('/search')}
            color='inherit'
            sx={{textTransform:'none'}}
          >
            Search
          </Button>
          <Button
            onClick={() => navigate('/favorites')}
            color='inherit' 
            sx={{textTransform:'none'}}>
            Favorites
          </Button>
          
        </Box>

        <Box sx={{ width: '33%', display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'center' }}>
          <img src={logoMobile} alt='logo' />
        </Box>
        <Box sx={{ width: '33%', display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
          <img src={logoDesktop} alt='logo' />
        </Box>

        <Box sx={{ width: '33%', display: { xs: 'none', md: 'flex' }, flexDirection: 'row-reverse' }}>
          <Button
            onClick={handleLogOut}
            color='inherit'
            sx={{textTransform:'none'}}
          ><LogoutRoundedIcon fontSize='small' sx={{ marginRight: 0.5 }} />
            Logout
          </Button>
        </Box>

        <Box sx={{ width: '33%', display: { xs: 'flex', md: 'none' }, flexDirection: 'row-reverse' }}>
          <IconButton size="large" onClick={handleOpenUserMenu} color='inherit' >
            <PermIdentityRoundedIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <List onClick={handleCloseUserMenu}>
              <ListItem disablePadding>
                <ListItemButton>
                  
                  <ListItemText sx={{ textAlign: 'center' }} primary="LOGOUT" onClick={handleLogOut} />
                </ListItemButton>
              </ListItem>
            </List>
          </Menu>
        </Box>
      </Toolbar>

    </AppBar>
  );
}
export default Header;