
import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle, Plus, Users, MapPin, Zap } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  duration: number;
  type: 'meeting' | 'focus' | 'break' | 'personal';
  participants?: number;
  location?: string;
  aiSuggested?: boolean;
  conflict?: boolean;
}

const SmartCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Standup',
      time: '9:00 AM',
      duration: 30,
      type: 'meeting',
      participants: 6,
      location: 'Conference Room A'
    },
    {
      id: '2',
      title: 'Deep Work: Q4 Analysis',
      time: '10:00 AM',
      duration: 120,
      type: 'focus',
      aiSuggested: true
    },
    {
      id: '3',
      title: 'Client Call - Project Review',
      time: '11:30 AM',
      duration: 60,
      type: 'meeting',
      participants: 3,
      conflict: true
    },
    {
      id: '4',
      title: 'Mindfulness Break',
      time: '2:00 PM',
      duration: 15,
      type: 'break',
      aiSuggested: true
    },
    {
      id: '5',
      title: 'Project Planning Session',
      time: '3:00 PM',
      duration: 90,
      type: 'meeting',
      participants: 4
    }
  ]);

  const getEventColor = (type: string, aiSuggested?: boolean, conflict?: boolean) => {
    if (conflict) return 'bg-red-100 border-red-300 text-red-700';
    if (aiSuggested) return 'bg-blue-100 border-blue-300 text-blue-700';
    
    switch (type) {
      case 'meeting': return 'bg-purple-100 border-purple-300 text-purple-700';
      case 'focus': return 'bg-green-100 border-green-300 text-green-700';
      case 'break': return 'bg-orange-100 border-orange-300 text-orange-700';
      case 'personal': return 'bg-pink-100 border-pink-300 text-pink-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const aiSuggestions = [
    "Schedule 15-min break after your 2-hour focus session",
    "Move client call to avoid overlap with team standup",
    "Add 30-min prep time before important presentations"
  ];

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Smart Calendar</h2>
          <p className="text-gray-600">AI-optimized schedule for maximum productivity</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* AI Suggestions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">AI Schedule Optimization</h3>
        </div>
        <div className="space-y-2">
          {aiSuggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-gray-700">{suggestion}</p>
            </div>
          ))}
        </div>
        <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm">
          Apply All Suggestions
        </button>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Schedule</h3>
        
        <div className="space-y-3">
          {events.map((event) => (
            <div 
              key={event.id}
              className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${getEventColor(event.type, event.aiSuggested, event.conflict)}`}
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium text-sm">{event.time}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">{event.title}</h4>
                  {event.aiSuggested && (
                    <span className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full">
                      AI
                    </span>
                  )}
                  {event.conflict && (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-xs mt-1">
                  <span>{event.duration} min</span>
                  {event.participants && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{event.participants}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Focus Time Blocks */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Focus Blocks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { time: '7:00-9:00 AM', type: 'Deep Work', available: true },
            { time: '1:00-2:00 PM', type: 'Planning', available: true },
            { time: '4:00-5:00 PM', type: 'Learning', available: false }
          ].map((block, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl border-2 transition-colors ${
                block.available 
                  ? 'bg-green-50 border-green-200 hover:bg-green-100 cursor-pointer' 
                  : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              }`}
            >
              <div className="text-center">
                <h4 className="font-semibold text-gray-900">{block.type}</h4>
                <p className="text-sm text-gray-600">{block.time}</p>
                <p className="text-xs mt-2 text-green-600">
                  {block.available ? 'Available' : 'Blocked'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartCalendar;
