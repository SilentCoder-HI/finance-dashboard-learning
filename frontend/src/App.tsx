import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import LearningPage from "./pages/LearningPage";
import DashboardApp from "./dashboard/App";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/dashboard/*" element={<DashboardApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
