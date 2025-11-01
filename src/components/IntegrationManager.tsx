
import React, { useState } from 'react';
import { Mail, MessageSquare, Calendar, Settings, Check, Plus } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  connected: boolean;
  type: 'email' | 'messaging' | 'calendar' | 'storage';
}

const IntegrationManager: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: 'gmail', name: 'Gmail', icon: Mail, connected: false, type: 'email' },
    { id: 'outlook', name: 'Outlook', icon: Mail, connected: false, type: 'email' },
    { id: 'slack', name: 'Slack', icon: MessageSquare, connected: false, type: 'messaging' },
    { id: 'teams', name: 'Microsoft Teams', icon: MessageSquare, connected: false, type: 'messaging' },
    { id: 'gcal', name: 'Google Calendar', icon: Calendar, connected: false, type: 'calendar' },
    { id: 'outlook-cal', name: 'Outlook Calendar', icon: Calendar, connected: false, type: 'calendar' },
  ]);

  const handleConnect = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Connected Services</h3>
          <p className="text-sm text-gray-600">{connectedCount} of {integrations.length} services connected</p>
        </div>
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => (
          <div 
            key={integration.id}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
              integration.connected 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                integration.type === 'email' ? 'bg-red-100 text-red-600' :
                integration.type === 'messaging' ? 'bg-purple-100 text-purple-600' :
                integration.type === 'calendar' ? 'bg-blue-100 text-blue-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                <integration.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{integration.name}</h4>
                <p className="text-xs text-gray-600 capitalize">{integration.type}</p>
              </div>
            </div>
            
            <button
              onClick={() => handleConnect(integration.id)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                integration.connected
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {integration.connected ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Connected</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Connect</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationManager;
