import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import Login from './pages/login';
import Home from './pages/Home';
import About from './pages/About';
import { Day1LearningPage } from './pages/day1';
import { Day2LearningPage } from './pages/day2';
import { Day3LearningPage } from './pages/day3';
import { Day4LearningPage } from './pages/day4';
import { Day5LearningPage } from './pages/day5';
import { UserDataPage } from './pages/userData';
import { FinanceDashboardDay2 } from './day-2/FinanceDashboard';
import { useAppSelector } from './store/store';

function AppContent() {
  const user = useAppSelector((state) => state.auth.user);
  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Box sx={{width:"100%"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/invoices" element={<FinanceDashboardDay2 />} />
          <Route path="/userdata" element={<UserDataPage />} />
          <Route path="/day1" element={<Day1LearningPage />} />
          <Route path="/day2" element={<Day2LearningPage />} />
          <Route path="/day3" element={<Day3LearningPage />} />
          <Route path="/day4" element={<Day4LearningPage />} />
          <Route path="/day5" element={<Day5LearningPage />} />
        </Routes>
      </Box>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
