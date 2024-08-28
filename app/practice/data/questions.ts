interface Question {
  Id: number;
  question: string;
  alphabet: string[];
  choices: string[];
  answer: number;
}

export const Questions: {
  totalQuestion: number;
  questions: Question[];
} = {
  totalQuestion: 5,
  questions: [
    {
      Id: 1,
      question: 'What is 2 + 2?',
      alphabet: ['A', 'B', 'C', 'D'],
      choices: ['3', '4', '5', '6'],
      answer: 1,
    },
    {
      Id: 2,
      question: 'What is 9-1?',
      alphabet: ['A', 'B', 'C', 'D'],
      choices: ['2', '1', '8', '7'],
      answer: 2,
    },
    {
      Id: 3,
      question:
        'Mary has 3 stamps and her sister has 2 stamps. How many stamps do they have together?',
      alphabet: ['A', 'B', 'C', 'D'],
      choices: ['5', '3', '2', '4'],
      answer: 0,
    },
    {
      Id: 4,
      question: 'Complete the missing number: 4, 5, __, 7, 8',
      alphabet: ['A', 'B', 'C', 'D'],
      choices: ['6', '7', '3', '1'],
      answer: 0,
    },
    {
      Id: 5,
      question: 'What month comes after April?',
      alphabet: ['A', 'B', 'C', 'D'],
      choices: ['January', 'May', 'March', 'February'],
      answer: 1,
    },
  ],
};
