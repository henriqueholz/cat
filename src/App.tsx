import { Box } from '@mui/system'
import { Layout } from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import { Typography } from '@mui/material'
import { CatList } from './features/cat/CatList'
import { CatInfo } from './features/cat/CatInfo'
import React from 'react'

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CatList />} />
        <Route path="/:id" element={<CatInfo />} />
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
