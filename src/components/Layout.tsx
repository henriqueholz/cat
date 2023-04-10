import { AppBar, Box, CssBaseline } from '@mui/material'
import { Container, ThemeProvider } from '@mui/system'
import React from 'react'
import { useAppTheme } from '../hooks/useAppTheme'
import { Header } from './Header'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, toggleCurrentTheme] = useAppTheme()

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" data-testid="header">
          <Header
            toggle={toggleCurrentTheme}
            theme={currentTheme.palette.mode === 'dark' ? 'dark' : 'light'}
          />
        </AppBar>
        <Container maxWidth="lg" sx={{ my: 12 }}>
          {children}
        </Container>
      </Box>
    </ThemeProvider>
  )
}
