// components/Quiz.tsx

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

interface Question {
  question: string;
  choices: string[];
  answer: number;
}

const questions: Question[] = [
  {
    question: 'What is 2 + 2?',
    choices: ['3', '4', '5', '6'],
    answer: 1,
  },
  {
    question: 'What is the capital of France?',
    choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 2,
  },
  {
    question: 'Which planet is known as the Red Planet?',
    choices: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    answer: 1,
  },
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleChoiceSelect = (index: number) => {
    setSelectedChoice(index);
  };

  const handleSubmit = () => {
    if (selectedChoice === null) return;

    if (selectedChoice === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedChoice(null);
    } else {
      setShowResult(true);
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
              Your Score: {score} / {questions.length}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRestart}
              sx={{ marginTop: 2 }}
            >
              Restart Quiz
            </Button>
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="h5" component="div">
              {questions[currentQuestion].question}
            </Typography>
            <List>
              {questions[currentQuestion].choices.map((choice, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    selected={selectedChoice === index}
                    onClick={() => handleChoiceSelect(index)}
                  >
                    <ListItemText primary={choice} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={selectedChoice === null}
              sx={{ marginTop: 2 }}
            >
              Submit
            </Button>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default Quiz;
