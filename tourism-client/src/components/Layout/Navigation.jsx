import { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import LoginOutlined from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';

import { AuthContext } from '../../shared/context/auth-context';

const pages = [
  {
    name: 'Home',
    url: '/home',
    icon: <HomeOutlinedIcon fontSize="small" />,
    isProtected: false,
  },
  {
    name: 'Museums',
    url: '/museums',
    icon: <MuseumOutlinedIcon fontSize="small" />,
    isProtected: false,
  },
  {
    name: 'Explore',
    url: '/model',
    icon: <ExploreOutlinedIcon fontSize="small" />,
    isProtected: false,
  },
  {
    name: 'Add Museum',
    url: '/new-museum',
    icon: <AddOutlinedIcon fontSize="small" />,
    isProtected: true,
  },
];

function Navigation() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const { token, logout } = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      // style={{ background: 'transparent', boxShadow: 'none' }}
      style={{ backgroundColor: '#000' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              // fontFamily: 'monospace',
              fontWeight: 700,
              // letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MonuTalk
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((link) =>
                link.isProtected && !token ? null : (
                  <MenuItem
                    to={link.url}
                    // textAlign="center"
                    component={RouterLink}
                    key={link.name}
                    onClick={handleCloseNavMenu}
                  >
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <Typography variant="inherit">{link.name}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              // fontFamily: 'monospace',
              fontWeight: 700,
              // letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MonuTalk
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((link) =>
              link.isProtected && !token ? null : (
                <Button
                  key={link.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={RouterLink}
                  to={link.url}
                >
                  {link.name}
                </Button>
              )
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!token && (
              <Button
                endIcon={<LoginOutlined />}
                component={RouterLink}
                to={'/login'}
                color="inherit"
              >
                Login
              </Button>
            )}

            {token && (
              <Button
                onClick={logout}
                endIcon={<LogoutOutlinedIcon />}
                color="inherit"
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;
