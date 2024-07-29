import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { NavLink } from 'react-router-dom';

const NavBar: React.FC<{ darkMode: boolean; handleThemeChange: () => void; }> = ({ darkMode, handleThemeChange }) => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawer = (
        <Box sx={{ width: 180 }}>
            <List>
                <ListItem>
                    <IconButton onClick={handleDrawerToggle} sx={{ marginLeft: 'auto' }} aria-label="close">
                        <CloseIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                </ListItem>
                <ListItem button component={NavLink} to="/character">
                    <ListItemText primary="Characters" />
                </ListItem>
                <ListItem button component={NavLink} to="/episode">
                    <ListItemText primary="Episodes" />
                </ListItem>
                <ListItem button component={NavLink} to="/location">
                    <ListItemText primary="Locations" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, display: { sm: 'none' } }} onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Rick and Morty
                    </Typography>
                    <Button color="inherit" component={NavLink} to="/character" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Characters
                    </Button>
                    <Button color="inherit" component={NavLink} to="/episode" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Episodes
                    </Button>
                    <Button color="inherit" component={NavLink} to="/location" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Locations
                    </Button>
                    <IconButton sx={{ ml: 1 }} onClick={handleThemeChange} color="inherit" aria-label="toggle theme">
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                {drawer}
            </Drawer>
        </>
    );
};

export default NavBar;
