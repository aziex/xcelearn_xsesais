'use client';

import React, { useState } from 'react';
import { Questions } from './data/questions';
import { Container, Typography } from '@mui/material';

const quiz: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState({
    score: 0,
    correctAnswer: 0,
    wrongAnswer: 0,
  });

  const quiz = Questions.questions;
  const { question, choices, answer } = quiz[activeQuestion];

  return (
    <Container>
      <Typography fontWeight="bold" fontSize={35}>
        Quiz Page
      </Typography>
      <Typography fontSize={20}>
        Question: {activeQuestion}/{Questions.totalQuestion}
      </Typography>
    </Container>
  );
};

export default quiz;
