import { Box, ThemeProvider } from '@mui/system';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { Route, Routes } from 'react-router-dom';
import { Typography } from '@mui/material';
import { BreedList } from './features/breed/BreedList';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Box component="main"
      sx={{
        height: "100vh",
        backgroundColor: (theme) => theme.palette.grey[900],
      }}>
        <Header/>
        <Layout>
          <Routes>
          <Route path="/" element={<BreedList/>} />
            <Route path="/breeds" element={<BreedList/>} />

            <Route path="*" element={
              <Box>
                <Typography variant="h1">
                  404
                </Typography>
            </Box>
            } />
          </Routes>
        </Layout>
      </Box>
    </ThemeProvider>
    );
}

export default App;