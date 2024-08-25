import React from 'react';
import Quiz from './quiz';
import { Box, Typography } from '@mui/material';

const page = () => {
  return (
    <div>
      <Box>
        <Typography sx={{ fontWeight: 'bold', fontSize: '25px' }}>
          Welcome to the Quiz
        </Typography>
      </Box>
      <Quiz />
    </div>
  );
};

export default page;
