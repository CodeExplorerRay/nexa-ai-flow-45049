
import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Server, Smartphone, Download, Trash2 } from 'lucide-react';

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: 'processing' | 'storage' | 'sharing';
}

const PrivacyControls: React.FC = () => {
  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
    {
      id: 'local-processing',
      title: 'Local AI Processing',
      description: 'Process data on your device instead of cloud servers',
      enabled: true,
      category: 'processing'
    },
    {
      id: 'encrypted-storage',
      title: 'End-to-End Encryption',
      description: 'Encrypt all data with your personal key',
      enabled: true,
      category: 'storage'
    },
    {
      id: 'no-third-party',
      title: 'Block Third-Party Access',
      description: 'Prevent sharing data with external services',
      enabled: true,
      category: 'sharing'
    },
    {
      id: 'anonymous-analytics',
      title: 'Anonymous Usage Analytics',
      description: 'Help improve the app with anonymous usage data',
      enabled: false,
      category: 'sharing'
    },
    {
      id: 'auto-delete',
      title: 'Auto-Delete Old Data',
      description: 'Automatically delete data older than 90 days',
      enabled: false,
      category: 'storage'
    }
  ]);

  const [dataRetention, setDataRetention] = useState('90-days');

  const toggleSetting = (id: string) => {
    setPrivacySettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'processing': return Server;
      case 'storage': return Lock;
      case 'sharing': return Eye;
      default: return Shield;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'processing': return 'bg-blue-100 text-blue-600';
      case 'storage': return 'bg-green-100 text-green-600';
      case 'sharing': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Privacy Overview */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Privacy Dashboard</h2>
            <p className="text-gray-600">Your data, your control</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Smartphone className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Local Processing</h3>
            </div>
            <p className="text-green-700 text-sm">85% of AI processing happens on your device</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Lock className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Encrypted Storage</h3>
            </div>
            <p className="text-blue-700 text-sm">All data encrypted with your personal key</p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center space-x-2 mb-2">
              <EyeOff className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-800">Zero Knowledge</h3>
            </div>
            <p className="text-purple-700 text-sm">We can't access your personal data</p>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Privacy Controls</h3>
        
        <div className="space-y-4">
          {privacySettings.map((setting) => {
            const IconComponent = getCategoryIcon(setting.category);
            return (
              <div 
                key={setting.id}
                className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-white/20"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(setting.category)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{setting.title}</h4>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleSetting(setting.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    setting.enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      setting.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Data Management</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Retention Period
            </label>
            <select
              value={dataRetention}
              onChange={(e) => setDataRetention(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="30-days">30 days</option>
              <option value="90-days">90 days</option>
              <option value="1-year">1 year</option>
              <option value="forever">Keep forever</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export My Data</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Trash2 className="w-4 h-4" />
              <span>Delete All Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance & Certifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'GDPR Compliant', status: 'Certified', color: 'green' },
            { name: 'CCPA Compliant', status: 'Certified', color: 'green' },
            { name: 'SOC 2 Type II', status: 'Pending', color: 'yellow' },
            { name: 'ISO 27001', status: 'Certified', color: 'green' }
          ].map((cert, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
              <span className="font-medium text-gray-900">{cert.name}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                cert.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {cert.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;
