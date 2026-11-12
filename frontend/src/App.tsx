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
import { Day6LearningPage } from './pages/day6';
import { UserDataPage } from './pages/userData';
import { Invoices } from './pages/Invoices';
import { useAppSelector } from './store/store';
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

function AppContent() {
  const user = useAppSelector((state) => state.auth.user);
  if (!user) {
    return <Login />;
  }

  return (
    <>
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <Box className=" h-screen" sx={{ width: "100%" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/userdata" element={<UserDataPage />} />
            <Route path="/day1" element={<Day1LearningPage />} />
            <Route path="/day2" element={<Day2LearningPage />} />
            <Route path="/day3" element={<Day3LearningPage />} />
            <Route path="/day4" element={<Day4LearningPage />} />
            <Route path="/day5" element={<Day5LearningPage />} />
          <Route path="/day6" element={<Day6LearningPage />} />
          </Routes>
        </Box>
      </StyledEngineProvider>
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
