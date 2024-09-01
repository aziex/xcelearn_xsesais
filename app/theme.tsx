'use client';
import { CssBaseline } from '@mui/material';
import { Roboto } from 'next/font/google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, orange } from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: blue,
    secondary: orange,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default function ThemeManager(props: any) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}
