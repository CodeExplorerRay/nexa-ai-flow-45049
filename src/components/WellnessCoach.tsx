
import React, { useState } from 'react';
import { Heart, Brain, Activity, Music, Wind, Stretch, Play, Pause } from 'lucide-react';

interface WellnessActivity {
  id: string;
  title: string;
  duration: number;
  type: 'breathing' | 'stretch' | 'meditation' | 'music';
  description: string;
  icon: React.ComponentType<any>;
}

const WellnessCoach: React.FC = () => {
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [workloadLevel, setWorkloadLevel] = useState<'low' | 'medium' | 'high'>('high');

  const activities: WellnessActivity[] = [
    {
      id: 'breathing',
      title: '4-7-8 Breathing',
      duration: 5,
      type: 'breathing',
      description: 'Reduce stress and anxiety with controlled breathing',
      icon: Wind
    },
    {
      id: 'desk-stretch',
      title: 'Desk Stretches',
      duration: 3,
      type: 'stretch',
      description: 'Simple stretches to relieve tension',
      icon: Stretch
    },
    {
      id: 'mindfulness',
      title: 'Mindful Moment',
      duration: 10,
      type: 'meditation',
      description: 'Quick mindfulness meditation',
      icon: Brain
    },
    {
      id: 'focus-music',
      title: 'Focus Playlist',
      duration: 0,
      type: 'music',
      description: 'AI-curated music for concentration',
      icon: Music
    }
  ];

  const getWorkloadColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'breathing': return 'bg-blue-100 text-blue-600';
      case 'stretch': return 'bg-green-100 text-green-600';
      case 'meditation': return 'bg-purple-100 text-purple-600';
      case 'music': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleActivityStart = (activityId: string) => {
    setActiveActivity(activeActivity === activityId ? null : activityId);
  };

  return (
    <div className="space-y-6">
      {/* Workload Assessment */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Wellness Check</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getWorkloadColor(workloadLevel)}`}>
            {workloadLevel.charAt(0).toUpperCase() + workloadLevel.slice(1)} Workload
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-3">How's your energy level today?</p>
          <div className="flex space-x-3">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setWorkloadLevel(level as any)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  workloadLevel === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {workloadLevel === 'high' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold text-red-800">High Stress Detected</h4>
            </div>
            <p className="text-red-700 text-sm">
              Consider taking a break with one of the activities below to recharge your energy.
            </p>
          </div>
        )}
      </div>

      {/* Wellness Activities */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recommended Activities</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((activity) => (
            <div 
              key={activity.id}
              className="bg-white/50 rounded-xl p-4 border border-white/20 hover:bg-white/70 transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                    {activity.duration > 0 && (
                      <span className="text-xs text-gray-500">{activity.duration} min</span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                  
                  <button
                    onClick={() => handleActivityStart(activity.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeActivity === activity.id
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {activeActivity === activity.id ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Start</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Session */}
      {activeActivity && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {activities.find(a => a.id === activeActivity)?.title} in Progress
            </h3>
            <p className="text-gray-600 mb-4">
              Take deep breaths and focus on the present moment
            </p>
            <div className="text-2xl font-bold text-blue-600 mb-4">
              02:30
            </div>
            <button 
              onClick={() => setActiveActivity(null)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Complete Session
            </button>
          </div>
        </div>
      )}

      {/* Weekly Progress */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Wellness</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Breathing Sessions', value: '12', change: '+3' },
            { label: 'Stretch Breaks', value: '8', change: '+2' },
            { label: 'Focus Hours', value: '24', change: '+6' },
            { label: 'Wellness Score', value: '85%', change: '+12%' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white/50 rounded-xl">
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
              <div className="text-xs text-green-600">{stat.change}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WellnessCoach;
