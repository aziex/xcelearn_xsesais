'use client';

import React, { useState } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { IconButton, PaginationItem, styled } from '@mui/material';
import SimpleSnackbar from './component/snackbar';
import DrawIcon from '@mui/icons-material/Draw';
import { Questions } from './data/questions';
import Collapse from '@mui/material/Collapse';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface ExpandMoreProps extends ButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <Button {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Practice: React.FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarTitle, setSnackbarTitle] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [hasAttemptedIncorrectly, setHasAttemptedIncorrectly] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChoiceSelect = (index: number) => {
    setSelectedChoice(index);
  };

  const quiz = Questions.questions;
  const { question, choices, answer, answerscheme } = quiz[currentQuestion];

  const handleSubmit = () => {
    if (selectedChoice === null) return;

    if (selectedChoice === quiz[currentQuestion].answer) {
      if (!hasAttemptedIncorrectly) {
        setSnackbarTitle('You got it right!');
        setSnackbarMessage('Moving to the next question.');
        setOpenSnackbar(true);
        setScore(score + 1);
        setIsCorrect(true);
      } else {
        setSnackbarTitle('There you go!');
        setSnackbarMessage('Keep it up!');
        setOpenSnackbar(true);
        setIsCorrect(true);
      }
    } else {
      setSnackbarTitle('Give it another shot!');
      setSnackbarMessage('Incorrect! Please try again.');
      setOpenSnackbar(true);
      setHasAttemptedIncorrectly(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedChoice(null);
      setHasAttemptedIncorrectly(false);
      setIsCorrect(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedChoice(null);
    setScore(0);
    setShowResult(false);
    setExpanded(false);
    setIsCorrect(false);
    setHasAttemptedIncorrectly(false);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentQuestion(value - 1); // Adjust the index to be zero-based
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {/* <Box>
        <StopWatch autoStart={true} />
      </Box> */}
      <Card sx={{ maxWidth: 600, width: '100%', padding: 2 }}>
        {showResult ? (
          <CardContent>
            <Typography className="font-quiz" variant="h5" component="div">
              Your Score: {score} / {quiz.length}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRestart}
              sx={{ marginTop: 2, textTransform: 'none' }}
            >
              Restart Practice
            </Button>
          </CardContent>
        ) : (
          <CardContent>
            <Typography fontSize="20px" component="div">
              {quiz[currentQuestion].question}
            </Typography>
            <List>
              <Typography fontSize="15px" color="grey">
                Choose 1 answer
              </Typography>
              {quiz[currentQuestion].choices.map((choice, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    selected={selectedChoice === index}
                    onClick={() => handleChoiceSelect(index)}
                    sx={{
                      borderRadius: '15px',
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center">
                          <Box
                            sx={{
                              width: 30,
                              height: 30,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: '50%',
                              border: '2px solid #ababab',
                              color: '#444444',
                              backgroundColor: '#f9f9f9',
                              marginRight: 3,
                            }}
                          >
                            {quiz[currentQuestion].alphabet[index]}
                          </Box>
                          <Typography>{choice}</Typography>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Box>
              {isCorrect ? (
                <Box>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ textTransform: 'none' }}
                  >
                    Show Answer Scheme
                  </ExpandMore>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>
                        {quiz[currentQuestion].answerscheme}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Box>
              ) : null}
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton aria-label="drawing">
                <DrawIcon />
              </IconButton>

              <Stack spacing={2}>
                <Pagination
                  count={5} // Number of questions
                  page={currentQuestion + 1} // Adjust for zero-based index
                  onChange={handlePageChange}
                  siblingCount={0}
                  boundaryCount={1}
                  variant="outlined"
                  renderItem={(item) => (
                    <PaginationItem
                      {...item}
                      component="div"
                      sx={{
                        '& .MuiPaginationItem-root': {
                          backgroundColor: 'grey',
                          color: 'transparent', // Hide the numbers
                          borderRadius: '50%',
                        },
                        '& .Mui-selected': {
                          backgroundColor: 'blue',
                          color: 'transparent', // Hide the selected number
                        },
                      }}
                    />
                  )}
                />
              </Stack>

              {isCorrect ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextQuestion}
                  sx={{
                    marginTop: 2,
                    alignItems: 'flex-end',
                    textTransform: 'none',
                  }}
                >
                  Next question
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={selectedChoice === null}
                  sx={{
                    marginTop: 2,
                    alignItems: 'flex-end',
                    textTransform: 'none',
                  }}
                >
                  Check
                </Button>
              )}
            </Box>
          </CardContent>
        )}
      </Card>
      <SimpleSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        title={snackbarTitle}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Practice;
