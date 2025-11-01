
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import DailyOverview from '../components/DailyOverview';
import TaskExtractor from '../components/TaskExtractor';
import FocusMode from '../components/FocusMode';
import EveningWrapUp from '../components/EveningWrapUp';
import MultimodalSummarizer from '../components/MultimodalSummarizer';
import SmartCalendar from '../components/SmartCalendar';
import WellnessCoach from '../components/WellnessCoach';
import PrivacyControls from '../components/PrivacyControls';
import BottomNavigation from '../components/BottomNavigation';
import WebHeader from '../components/WebHeader';
import { useIsMobile } from '../hooks/use-mobile';

const AppContent = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Web Header for desktop/tablet */}
      {!isMobile && <WebHeader />}
      
      {/* Main Content */}
      <div className={`${
        isMobile 
          ? 'w-full min-h-screen bg-white/80 backdrop-blur-sm shadow-xl' 
          : 'max-w-7xl mx-auto px-6 py-8'
      }`}>
        <div className={`${
          isMobile 
            ? 'h-full' 
            : 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 min-h-[calc(100vh-8rem)]'
        }`}>
          <Routes>
            <Route path="/" element={<DailyOverview />} />
            <Route path="/tasks" element={<TaskExtractor />} />
            <Route path="/focus" element={<FocusMode />} />
            <Route path="/evening" element={<EveningWrapUp />} />
            <Route path="/summarizer" element={<MultimodalSummarizer />} />
            <Route path="/calendar" element={<SmartCalendar />} />
            <Route path="/wellness" element={<WellnessCoach />} />
            <Route path="/privacy" element={<PrivacyControls />} />
          </Routes>
        </div>
      </div>
      
      {/* Bottom Navigation - mobile only */}
      {isMobile && <BottomNavigation currentPath={location.pathname} />}
    </div>
  );
};

const Index = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default Index;
