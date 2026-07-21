import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SkillTagInput from '../components/common/SkillTagInput';
import { AVAILABLE_SKILLS } from '../utils/mockData';

export default function ProfileSetupPage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [bio, setBio] = useState(user?.bio || '');
  const [skillsToTeach, setSkillsToTeach] = useState(user?.skillsToTeach || []);
  const [skillsToLearn, setSkillsToLearn] = useState(user?.skillsToLearn || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      bio,
      skillsToTeach,
      skillsToLearn,
    });
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
        <p className="text-sm text-gray-600 mb-6">
          Tell others about yourself and what skills you want to exchange.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Share a short intro about your background and interests..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills You Can Teach
            </label>
            <SkillTagInput
              selectedSkills={skillsToTeach}
              onChange={setSkillsToTeach}
              availableSkills={AVAILABLE_SKILLS}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills You Want to Learn
            </label>
            <SkillTagInput
              selectedSkills={skillsToLearn}
              onChange={setSkillsToLearn}
              availableSkills={AVAILABLE_SKILLS}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            Save Profile & Continue
          </button>
        </form>
      </div>
    </div>
  );
}