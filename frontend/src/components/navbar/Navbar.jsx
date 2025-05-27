import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Menu from './Menu';
import ShortMenu from './ShortMenu';
import logo from '../../assets/LOGO CBI App.png'
import { IconButton } from '@mui/material';


const drawerWidth = 240;
const shortDrawerWith = 80

export default function Navbar({content}) {

    const [isBigMenu,setIsBigMenu] = React.useState(false)
    const changeMenu = ()=>{
        setIsBigMenu(!isBigMenu)
    }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <IconButton onClick={changeMenu} sx={{marginRight:'30px',color:'white'}}>
            {isBigMenu ? <MenuOpenIcon></MenuOpenIcon> : <MenuIcon></MenuIcon>}
        </IconButton>

      <img width='10%' src={logo}></img>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width:isBigMenu ?  drawerWidth : shortDrawerWith,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: isBigMenu ?  drawerWidth : shortDrawerWith, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        {isBigMenu ?  <Menu /> : <ShortMenu></ShortMenu>}
       
      
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
       {content}
      </Box>
    </Box>
  );
}
