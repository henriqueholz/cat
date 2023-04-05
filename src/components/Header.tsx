import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ArrowBack } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

export const Header = () => {
	const location = useLocation();
  
  const isCatDetailsPage = () => location.pathname.split("/")[1] !== ""

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isCatDetailsPage() ?
          <Link to="/">
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
          </Link>
            :
            ""
          }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            { isCatDetailsPage() ? "Cat Details" : "Cat List" }
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>  
    )
}