import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { Avatar, ListItemIcon, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { UserProps } from '../App';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';

export default function Appbar({ user }: { user: UserProps | null }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await api.auth.logout();
    navigate(0);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 30,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem onClick={() => {
        handleMenuClose();
        if (user) navigate(`/profile/${user._id}`);
      }}>
        <ListItemIcon>
          <AccountCircleOutlinedIcon fontSize='small' />
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <PeopleOutlineOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              display: { xs: 'none', sm: 'block', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Social Network
          </Typography>
          {user ?
            <Tooltip title='Find Users'>
              <IconButton onClick={() => navigate('/users')} sx={{ marginLeft: 1 }}>
                <PersonSearchOutlinedIcon sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip> : null
          }
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            {user ?
              <Tooltip title='Account settings'>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar alt='Profile Image' src={user.profile_image} />
                </IconButton>
              </Tooltip>
              : null}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
