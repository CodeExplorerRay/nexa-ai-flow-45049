
import React, { useState } from 'react';
import { Mic, Camera, Video, Save } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const EveningWrapUp: React.FC = () => {
  const isMobile = useIsMobile();
  const [journalText, setJournalText] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const moodOptions = [
    { emoji: '🎉', label: 'Accomplished', value: 'accomplished' },
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😐', label: 'Neutral', value: 'neutral' },
    { emoji: '😔', label: 'Tired', value: 'tired' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
    { emoji: '🤔', label: 'Reflective', value: 'reflective' },
  ];

  const todayStats = {
    focusTime: { hours: 4, minutes: 32 },
    tasksCompleted: 8,
    meetingsAttended: 3,
  };

  return (
    <div className={`${isMobile ? 'p-6 pb-24' : 'max-w-4xl mx-auto'} space-y-8`}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Evening Wrap-Up</h1>
        <p className="text-gray-600">Reflect on your day and prepare for tomorrow</p>
      </div>

      {/* Daily Stats */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Achievements</h2>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-6'}`}>
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2 animate-scale-in">
              {todayStats.focusTime.hours}h {todayStats.focusTime.minutes}m
            </div>
            <div className="text-sm text-gray-600">Focus Time</div>
          </div>
          
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2 animate-scale-in" style={{ animationDelay: '100ms' }}>
              {todayStats.tasksCompleted}
            </div>
            <div className="text-sm text-gray-600">Tasks Completed</div>
          </div>
          
          <div className="text-center p-4 bg-white/50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2 animate-scale-in" style={{ animationDelay: '200ms' }}>
              {todayStats.meetingsAttended}
            </div>
            <div className="text-sm text-gray-600">Meetings Attended</div>
          </div>
        </div>
      </div>

      {/* Mood Journal */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">How was your day?</h2>
        
        {/* Mood Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select your mood</h3>
          <div className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-6'} gap-3`}>
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-all duration-200 ${
                  selectedMood === mood.value 
                    ? 'bg-blue-100 ring-2 ring-blue-500 scale-105' 
                    : 'bg-white/50 hover:bg-white/70 hover:scale-105'
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs text-gray-700 text-center">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Journal Input */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Journal Entry</h3>
          
          {/* Text Input */}
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="What went well today? What would you like to improve tomorrow?"
            className="w-full h-32 p-4 bg-white/50 border border-white/20 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Media Input Options */}
          <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'space-x-4'}`}>
            <button className="flex items-center space-x-2 px-4 py-3 bg-white/50 rounded-xl hover:bg-white/70 transition-colors border border-white/20">
              <Mic className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Record Audio</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-3 bg-white/50 rounded-xl hover:bg-white/70 transition-colors border border-white/20">
              <Camera className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Add Photo</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-3 bg-white/50 rounded-xl hover:bg-white/70 transition-colors border border-white/20">
              <Video className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Record Video</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 animate-fade-in">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 AI Suggestion for Tomorrow</h3>
        <p className="text-gray-700 mb-4">
          Based on your focus patterns today, consider scheduling your most important work between 9-11 AM when you're most productive. 
          Also, try adding a 15-minute stretch break at 3 PM to maintain energy levels.
        </p>
        <button className="text-blue-600 hover:text-blue-700 font-medium">Apply to Tomorrow's Agenda →</button>
      </div>

      {/* Save Button */}
      <div className={`${isMobile ? 'fixed bottom-20 left-0 right-0 px-6' : ''}`}>
        <button className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
          <Save className="w-5 h-5" />
          <span>Save & Close Day</span>
        </button>
      </div>
    </div>
  );
};

export default EveningWrapUp;
