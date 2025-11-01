
import React, { useState } from 'react';
import { Plus, Mic, Camera, Calendar, Clock, CheckCircle, FileText, Heart } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const DailyOverview: React.FC = () => {
  const [mood, setMood] = useState<string>('');
  const isMobile = useIsMobile();

  const agendaItems = [
    { id: 1, type: 'meeting', title: 'Team Standup', time: '9:00 AM', icon: Calendar },
    { id: 2, type: 'task', title: 'Review Q4 Budget Proposal', time: '10:30 AM', icon: FileText },
    { id: 3, type: 'wellness', title: 'Mindfulness Break', time: '2:00 PM', icon: Heart },
    { id: 4, type: 'task', title: 'Client Presentation Prep', time: '3:30 PM', icon: CheckCircle },
  ];

  const moodIcons = [
    { emoji: '😊', value: 'happy' },
    { emoji: '😐', value: 'neutral' },
    { emoji: '😔', value: 'sad' },
    { emoji: '😴', value: 'tired' },
  ];

  return (
    <div className={`${isMobile ? 'p-6 pb-24' : 'max-w-4xl mx-auto'} space-y-8`}>
      {/* Header Section */}
      <div className={`${isMobile ? 'space-y-6' : 'grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'}`}>
        {/* Greeting & Avatar */}
        <div className={`${isMobile ? '' : 'lg:col-span-2'} space-y-4`}>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-semibold">A</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Good Morning, Alex</h1>
              <p className="text-gray-600">Ready to make today productive?</p>
            </div>
          </div>

          {/* Mood Check-in */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How are you feeling today?</h3>
            <div className="flex space-x-4">
              {moodIcons.map((moodItem) => (
                <button
                  key={moodItem.value}
                  onClick={() => setMood(moodItem.value)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
                    mood === moodItem.value 
                      ? 'bg-blue-100 scale-110 ring-2 ring-blue-500' 
                      : 'bg-gray-100 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {moodItem.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Focus Score */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Focus Score</h3>
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  stroke="#3b82f6" 
                  strokeWidth="8" 
                  fill="none"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">75%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Great focus today!</p>
          </div>
        </div>
      </div>

      {/* Smart Agenda */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Today's Smart Agenda</h2>
          <span className="text-sm text-gray-600">{agendaItems.length} items</span>
        </div>
        
        <div className="space-y-4">
          {agendaItems.map((item, index) => (
            <div 
              key={item.id}
              className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                item.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                item.type === 'task' ? 'bg-green-100 text-green-600' :
                'bg-pink-100 text-pink-600'
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{item.time}</span>
                </div>
              </div>
              
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`${isMobile ? 'fixed bottom-20 left-0 right-0 px-6' : ''}`}>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
            <button className="flex flex-col items-center space-y-2 p-4 bg-white/50 rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-200 hover:scale-105 active:scale-95">
              <Plus className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Add Task</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 p-4 bg-white/50 rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-200 hover:scale-105 active:scale-95">
              <Mic className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Voice Note</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 p-4 bg-white/50 rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-200 hover:scale-105 active:scale-95">
              <Camera className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">Snap & Summarize</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 p-4 bg-white/50 rounded-xl border border-white/20 hover:bg-white/70 transition-all duration-200 hover:scale-105 active:scale-95">
              <Calendar className="w-6 h-6 text-orange-600" />
              <span className="text-sm font-medium text-gray-900">Book Focus Time</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyOverview;
