import { Box, ThemeProvider } from '@mui/system'
import { Header } from './components/Header'
import { Layout } from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import { Typography } from '@mui/material'
import { BreedList } from './features/cat/CatList'
import { BreedInfo } from './features/cat/CatInfo'
import React from 'react'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<BreedList />} />
        <Route path="/:id" element={<BreedInfo />} />
        <Route
          path="*"
          element={
            <Box sx={{ color: 'white' }}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h2">Page not found</Typography>
            </Box>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
