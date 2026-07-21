import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_USERS } from '../utils/mockData';

export default function DashboardPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [requestedUsers, setRequestedUsers] = useState({});

  // Filter out the logged-in user
  const profiles = INITIAL_USERS.filter((u) => u.id !== user?.id);

  // Filter based on search input (matches name, teach skills, or learn skills)
  const filteredProfiles = profiles.filter((profile) => {
    const term = searchTerm.toLowerCase();
    const matchesName = profile.name.toLowerCase().includes(term);
    const matchesTeach = profile.skillsToTeach.some((s) => s.toLowerCase().includes(term));
    const matchesLearn = profile.skillsToLearn.some((s) => s.toLowerCase().includes(term));
    return matchesName || matchesTeach || matchesLearn;
  });

  const handleSendRequest = (userId) => {
    setRequestedUsers((prev) => ({ ...prev, [userId]: true }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Explore Matches</h1>
          <p className="text-sm text-gray-600">Find people who want to swap skills with you</p>
        </div>
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search by skill or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Header: Avatar + Info */}
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                  <p className="text-xs text-gray-500">{profile.email}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{profile.bio}</p>

              {/* Skills Section */}
              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Can Teach:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skillsToTeach.map((skill) => (
                      <span
                        key={skill}
                        className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-md font-medium border border-emerald-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
                    Wants to Learn:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skillsToLearn.map((skill) => (
                      <span
                        key={skill}
                        className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-md font-medium border border-indigo-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleSendRequest(profile.id)}
              disabled={requestedUsers[profile.id]}
              className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                requestedUsers[profile.id]
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {requestedUsers[profile.id] ? 'Request Sent ✓' : 'Connect & Swap'}
            </button>
          </div>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No matching members found for "{searchTerm}".
        </div>
      )}
    </div>
  );
}