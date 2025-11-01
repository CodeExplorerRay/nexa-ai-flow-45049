
import React, { useState } from 'react';
import { FileText, Image, Mic, Video, Upload, Brain, Download } from 'lucide-react';

interface SummaryItem {
  id: string;
  title: string;
  type: 'document' | 'image' | 'audio' | 'video';
  summary: string;
  timestamp: Date;
  tags: string[];
}

const MultimodalSummarizer: React.FC = () => {
  const [summaries, setSummaries] = useState<SummaryItem[]>([
    {
      id: '1',
      title: 'Project Meeting Notes',
      type: 'audio',
      summary: 'Discussed Q4 objectives, budget allocation for marketing, and timeline for product launch. Key decisions: increase social media budget by 20%, launch delayed to January.',
      timestamp: new Date('2024-12-01T10:00:00'),
      tags: ['meeting', 'Q4', 'budget', 'marketing']
    },
    {
      id: '2',
      title: 'Whiteboard Strategy Session',
      type: 'image',
      summary: 'Strategic roadmap with 3 phases: Research (Jan-Mar), Development (Apr-Aug), Launch (Sep-Dec). Key milestones and dependencies identified.',
      timestamp: new Date('2024-12-01T14:30:00'),
      tags: ['strategy', 'roadmap', 'planning']
    }
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    // Handle file processing here
    console.log('Files dropped:', e.dataTransfer.files);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'image': return Image;
      case 'audio': return Mic;
      case 'video': return Video;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-600';
      case 'image': return 'bg-green-100 text-green-600';
      case 'audio': return 'bg-purple-100 text-purple-600';
      case 'video': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-white/60 backdrop-blur-sm hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Summarizer</h3>
            <p className="text-gray-600">Drop files here or click to upload documents, images, audio, or video</p>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload Files</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Mic className="w-4 h-4" />
              <span>Record Audio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary History */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Summaries</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>

        <div className="space-y-4">
          {summaries.map((item) => {
            const IconComponent = getTypeIcon(item.type);
            return (
              <div key={item.id} className="bg-white/50 rounded-xl p-4 border border-white/20">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(item.type)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <span className="text-xs text-gray-500">
                        {item.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-3">{item.summary}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MultimodalSummarizer;
