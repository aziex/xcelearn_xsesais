'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import StopWatch from '@/app/practice/component/stopwatch';
import { useState } from 'react';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const QuizComponent: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
    // Other logic to start the quiz
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            CN
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Cikgu Nad"
        subheader="September 14, 2024"
      />
      <CardMedia
        component="img"
        height="194"
        image="assets/math.jpeg"
        alt="math"
      />
      <CardContent>
        <Typography fontWeight="40px" fontFamily="">
          MATEMATIK TAHUN 1
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Jom belajar Matematik dengan Cikgu Nad!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <div style={{ flex: 1 }}></div>

        {!quizStarted ? (
          <Button onClick={startQuiz} variant="contained" href="../practice">
            Start
          </Button>
        ) : null}

        {/* <Button variant="contained" href="../practice">
          Start
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default QuizComponent;
