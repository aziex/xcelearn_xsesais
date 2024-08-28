import React from 'react';
import Quiz from './practice';
import { Box, Typography } from '@mui/material';
import Practice from './quiz1';

const Page = () => {
  return (
    <div>
      <Box>
        <Typography sx={{ fontWeight: 'bold', fontSize: '25px' }}>
          Welcome to the Quiz
        </Typography>
      </Box>
      <Practice />
    </div>
  );
};

export default Page;
