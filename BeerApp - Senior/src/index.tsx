import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router/Router';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import './styles/global.css';
//import App from "./new/app";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
      <Router />
      </ThemeProvider>
    </>
);
