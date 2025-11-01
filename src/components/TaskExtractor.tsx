
import React, { useState } from 'react';
import { CheckCircle, Edit3, X, Mail, MessageSquare, FileText, Settings, Zap } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import IntegrationManager from './IntegrationManager';

const TaskExtractor: React.FC = () => {
  const isMobile = useIsMobile();
  const [showIntegrations, setShowIntegrations] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Follow up with client about Q4 proposal',
      source: 'Gmail',
      sourceIcon: Mail,
      approved: false,
      ignored: false,
      confidence: 0.95,
      extractedFrom: 'Email: "Re: Q4 Budget Discussion"',
      dueDate: '2024-12-05',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Review marketing budget allocations',
      source: 'Slack',
      sourceIcon: MessageSquare,
      approved: false,
      ignored: false,
      confidence: 0.88,
      extractedFrom: 'Slack message in #marketing',
      dueDate: '2024-12-03',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Schedule team retrospective meeting',
      source: 'Teams',
      sourceIcon: MessageSquare,
      approved: false,
      ignored: false,
      confidence: 0.92,
      extractedFrom: 'Teams chat with Sarah',
      dueDate: '2024-12-02',
      priority: 'low'
    },
    {
      id: 4,
      title: 'Update project timeline documentation',
      source: 'Email',
      sourceIcon: Mail,
      approved: false,
      ignored: false,
      confidence: 0.78,
      extractedFrom: 'Email thread about project delays',
      dueDate: '2024-12-04',
      priority: 'medium'
    },
  ]);

  const handleApprove = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, approved: true, ignored: false } : task
    ));
  };

  const handleIgnore = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ignored: true, approved: false } : task
    ));
  };

  const approvedTasks = tasks.filter(task => task.approved);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (showIntegrations) {
    return (
      <div className={`${isMobile ? 'p-6 pb-24' : 'max-w-4xl mx-auto'} space-y-6`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Integration Settings</h1>
          <button 
            onClick={() => setShowIntegrations(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Tasks
          </button>
        </div>
        <IntegrationManager />
      </div>
    );
  }

  return (
    <div className={`${isMobile ? 'p-6 pb-24' : 'max-w-4xl mx-auto'} space-y-6`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI-Detected Tasks</h1>
          <p className="text-gray-600 mt-1">Review and approve tasks extracted from your communications</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowIntegrations(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Integrations</span>
          </button>
          {approvedTasks.length > 0 && (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Approve All ({approvedTasks.length})
            </button>
          )}
        </div>
      </div>

      {/* AI Processing Status */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-blue-600 animate-pulse" />
          </div>
          <h3 className="font-semibold text-gray-900">AI Task Extraction Active</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-gray-600">Messages Scanned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">4</div>
            <div className="text-gray-600">Tasks Found</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">89%</div>
            <div className="text-gray-600">Confidence Rate</div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div 
            key={task.id}
            className={`bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300 animate-fade-in ${
              task.approved ? 'ring-2 ring-green-500 bg-green-50/50' :
              task.ignored ? 'opacity-50 bg-gray-50/50' : 'hover:bg-white/70'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start space-x-4">
              {/* Source Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                task.source === 'Gmail' || task.source === 'Email' ? 'bg-red-100 text-red-600' :
                task.source === 'Slack' ? 'bg-purple-100 text-purple-600' :
                task.source === 'Teams' ? 'bg-blue-100 text-blue-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                <task.sourceIcon className="w-5 h-5" />
              </div>

              {/* Task Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`text-xs font-medium ${getConfidenceColor(task.confidence)}`}>
                      {Math.round(task.confidence * 100)}% confident
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-4">
                    <span>From: {task.extractedFrom}</span>
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {!task.approved && !task.ignored && (
                <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
                  <button
                    onClick={() => handleApprove(task.id)}
                    className="flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Approve</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    <Edit3 className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                  
                  <button
                    onClick={() => handleIgnore(task.id)}
                    className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span className="text-sm font-medium">Ignore</span>
                  </button>
                </div>
              )}

              {task.approved && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Approved</span>
                </div>
              )}

              {task.ignored && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <X className="w-5 h-5" />
                  <span className="text-sm font-medium">Ignored</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      {approvedTasks.length > 0 && (
        <div className={`${isMobile ? 'fixed bottom-20 left-0 right-0 px-6' : ''}`}>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {approvedTasks.length} task{approvedTasks.length !== 1 ? 's' : ''} approved
            </h3>
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
              Add Approved to Smart Agenda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskExtractor;
