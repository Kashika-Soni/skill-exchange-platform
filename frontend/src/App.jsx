import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import DashboardPage from "./pages/DashboardPage";
import InboxPage from "./pages/InboxPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfileSetupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/inbox" element={<InboxPage />} />

      </Route>

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}

export default App;