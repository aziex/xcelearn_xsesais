'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Practice from './quiz1';
import Footer from './component/footer';
import Header from '../component/header';
import StopWatch from './component/stopwatch';
import ThemeProvider from '../theme';

const Page = () => {
  return (
    <div>
      <ThemeProvider>
        {/* <Header /> */}
        <Box>
          <Typography
            className="typography"
            sx={{ fontWeight: 'bold', fontSize: '25px' }}
          >
            Welcome to the Quiz
          </Typography>
        </Box>
        {/* <Box>
        <StopWatch autoStart={true} />
      </Box> */}
        <Practice />
        {/* <Footer /> */}
      </ThemeProvider>
    </div>
  );
};

export default Page;
