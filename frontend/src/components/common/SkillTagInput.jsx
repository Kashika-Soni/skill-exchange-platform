import { useState } from 'react';

export default function SkillTagInput({ selectedSkills = [], onChange, availableSkills = [] }) {
  const [input, setInput] = useState('');

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      onChange([...selectedSkills, trimmed]);
      setInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(selectedSkills.filter((s) => s !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(input);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedSkills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 text-xs px-2.5 py-1 rounded-full font-medium"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="hover:text-indigo-950 font-bold ml-1"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter..."
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {availableSkills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {availableSkills
            .filter((s) => !selectedSkills.includes(s))
            .slice(0, 6)
            .map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addSkill(skill)}
                className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
              >
                + {skill}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}