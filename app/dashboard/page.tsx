import React from 'react';
import Collection from './component/collection';
import QuizComponent from './component/card';
import ThemeProvider from '../theme'

const Dashboard = () => {
  return (
    <div>
         <ThemeProvider>
         <QuizComponent />
        </ThemeProvider>
    </div>
  );
};

export default Dashboard;
