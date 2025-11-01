
import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Plus, Volume2, VolumeX } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const FocusMode: React.FC = () => {
  const isMobile = useIsMobile();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicType, setMusicType] = useState('Lo-Fi');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  const musicOptions = ['Lo-Fi', 'Ambient', 'Nature', 'Silence'];

  return (
    <div className={`${isMobile ? 'p-6 pb-24' : 'max-w-4xl mx-auto'} space-y-8`}>
      {/* Header with AI Badge */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Focus Mode</h1>
        <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>AI capturing 3 incoming messages as tasks</span>
        </div>
      </div>

      {/* Timer Section */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
            <circle 
              cx="100" 
              cy="100" 
              r="80" 
              stroke="#e5e7eb" 
              strokeWidth="8" 
              fill="none" 
            />
            <circle 
              cx="100" 
              cy="100" 
              r="80" 
              stroke="#3b82f6" 
              strokeWidth="8" 
              fill="none"
              strokeDasharray="502.4"
              strokeDashoffset={502.4 - (502.4 * progress) / 100}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Timer Controls */}
        <div className={`flex items-center justify-center ${isMobile ? 'space-x-4' : 'space-x-6'}`}>
          <button
            onClick={handleStartPause}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>
          
          <button
            onClick={handleStop}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
          >
            <Square className="w-5 h-5" />
            <span>Stop</span>
          </button>
        </div>

        {/* Extend Time */}
        <button className="mt-4 flex items-center space-x-2 mx-auto px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>Extend +5 min</span>
        </button>
      </div>

      {/* Music Controls */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Focus Music</h3>
          <button
            onClick={() => setMusicEnabled(!musicEnabled)}
            className={`p-2 rounded-lg transition-colors ${
              musicEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {musicEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-3`}>
          {musicOptions.map((option) => (
            <button
              key={option}
              onClick={() => setMusicType(option)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                musicType === option 
                  ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
        <blockquote className="text-lg italic text-gray-800 mb-2">
          "The way to get started is to quit talking and begin doing."
        </blockquote>
        <cite className="text-gray-600">— Walt Disney</cite>
      </div>

      {/* Session Stats */}
      {isRunning && (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Progress</h3>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-6'}`}>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-gray-600">Pomodoro</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Tasks Captured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Interruptions</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusMode;
