import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_USERS } from '../utils/mockData';

export default function InboxPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'active'

  // Mock data for requests
  const mockPendingRequests = [
    {
      id: 'req_1',
      sender: INITIAL_USERS[1], // Sarah Chen
      message: "Hey! I'd love to learn React from you. I can help you with Figma!",
      status: 'pending',
    },
  ];

  const mockActiveConnections = [
    {
      id: 'conn_1',
      partner: INITIAL_USERS[2], // Marcus Johnson
      status: 'active',
      startedAt: '2 days ago',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Inbox</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('pending')}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'pending'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Pending Requests (1)
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'active'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Active Connections
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'pending' && (
          <>
            {mockPendingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={req.sender.avatar}
                    alt={req.sender.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {req.sender.name} wants to connect
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 italic">"{req.message}"</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                        Offers: {req.sender.skillsToTeach[0]}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 sm:flex-col">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1.5 px-4 rounded-lg transition-colors">
                    Accept
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-1.5 px-4 rounded-lg transition-colors">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'active' && (
          <>
            {mockActiveConnections.map((conn) => (
              <div
                key={conn.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={conn.partner.avatar}
                    alt={conn.partner.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{conn.partner.name}</h3>
                    <p className="text-sm text-gray-500">Connected {conn.startedAt}</p>
                  </div>
                </div>
                <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-1.5 px-4 rounded-lg transition-colors">
                  Message
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}