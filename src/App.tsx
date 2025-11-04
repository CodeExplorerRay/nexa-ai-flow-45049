import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider";
import Index from "./pages/Index";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SettingsPage from "./pages/SettingsPage";
import DailyOverview from "./components/DailyOverview";
import TaskExtractor from "./components/TaskExtractor";
import FocusMode from "./components/FocusMode";
import EveningWrapUp from "./components/EveningWrapUp";
import MultimodalSummarizer from "./components/MultimodalSummarizer";
import SmartCalendar from "./components/SmartCalendar";
import WellnessCoach from "./components/WellnessCoach";
import PrivacyControls from "./components/PrivacyControls";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // You can replace this with a proper loading spinner component
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />} />
            <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPasswordPage /> : <Navigate to="/" />} />
            <Route path="/reset-password" element={!isAuthenticated ? <ResetPasswordPage /> : <Navigate to="/" />} />
            
            {/* Protected Routes */}
            <Route path="/" element={isAuthenticated ? <Index /> : <Navigate to="/login" />}>
              <Route index element={<DailyOverview />} />
              <Route path="tasks" element={<TaskExtractor />} />
              <Route path="focus" element={<FocusMode />} />
              <Route path="evening" element={<EveningWrapUp />} />
              <Route path="summarizer" element={<MultimodalSummarizer />} />
              <Route path="calendar" element={<SmartCalendar />} />
              <Route path="wellness" element={<WellnessCoach />} />
              <Route path="privacy" element={<PrivacyControls />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
