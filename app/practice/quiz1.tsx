'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Divider, IconButton, SnackbarContent } from '@mui/material';
import SimpleSnackbar from './component/snackbar';
import Alert from '@mui/material/Alert';
import DrawIcon from '@mui/icons-material/Draw';
import { Questions } from './data/questions';

const Practice: React.FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarTitle, setSnackbarTitle] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [hasAttemptedIncorrectly, setHasAttemptedIncorrectly] = useState(false);

  const handleChoiceSelect = (index: number) => {
    setSelectedChoice(index);
  };

  const quiz = Questions.questions;
  const { question, choices, answer } = quiz[currentQuestion];

  const handleSubmit = () => {
    if (selectedChoice === null) return;

    if (selectedChoice === quiz[currentQuestion].answer) {
      if (!hasAttemptedIncorrectly) {
        setScore(score + 1);
        setSnackbarTitle('There you go!');
        setSnackbarMessage('Keep it up!');
      } else {
        setSnackbarTitle('You got it right!');
        setSnackbarMessage('Moving to the next question.');
      }

      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedChoice(null);
        setHasAttemptedIncorrectly(false);
      } else {
        setShowResult(true);
      }
    } else {
      setSnackbarTitle('Give it another shot!');
      setSnackbarMessage('Incorrect! Please try again.');
      setOpenSnackbar(true);
      setHasAttemptedIncorrectly(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedChoice(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card sx={{ maxWidth: 600, width: '100%', padding: 2 }}>
        {showResult ? (
          <CardContent>
            <Typography variant="h5" component="div">
              Your Score: {score} / {quiz.length}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRestart}
              sx={{ marginTop: 2 }}
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
                    {/* <ListItemText
                      primary={`${questions[currentQuestion].alphabet[index]}: ${choice}`}
                    /> */}

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
                              backgroundColor: '#e4e6eb', // Background color of the circle
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

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton aria-label="drawing">
                <DrawIcon />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={selectedChoice === null}
                sx={{ marginTop: 2, alignItems: 'flex-end' }}
              >
                Submit
              </Button>
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
