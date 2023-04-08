import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { ArrowBack } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import React from 'react'

export const Header = ({
  toggle,
  theme
}: {
  toggle: () => void
  theme: string
}) => {
  const location = useLocation()

  const isCatDetailsPage = () => location.pathname.split('/')[1] !== ''

  return (
    <Box>
      <Toolbar>
        {isCatDetailsPage() ? (
          <Link to="/">
            <IconButton
              size="large"
              edge="start"
              aria-label="back"
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
          </Link>
        ) : (
          ''
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {isCatDetailsPage() ? 'Cat Details' : 'Cat List'}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton sx={{ ml: 1 }} onClick={toggle} color="inherit">
          {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </Box>
  )
}
