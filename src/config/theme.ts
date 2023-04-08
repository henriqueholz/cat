import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
  palette: {
    background: { default: "#222222" },
    mode: "dark",
    primary: { main: "#635985" },
    secondary: { main: "#443C68" },
    text: { primary: "#f5f5f1" },
  },
});

export const lightTheme = createTheme({
  palette: {
    background: {},
    mode: "light",
    primary: { main: "#BA90C6" },
    secondary: { main: "#E8A0BF" },
    text: { primary: "#18122B" },
  },
});