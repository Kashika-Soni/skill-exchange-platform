"use client"

import { useMemo, useState } from "react"

/**
 * SkillTagInput
 *
 * A reusable, controlled multi-select skill picker.
 *
 * Props:
 * - title: string            Heading shown above the input (e.g. "Skills I Can Teach")
 * - selectedSkills: string[] Currently selected skills (controlled)
 * - setSelectedSkills: fn    Setter to update the selected skills
 * - availableSkills: string[] Full list of predefined skills to choose from
 */
export default function SkillTagInput({
  title = "Skills",
  selectedSkills = [],
  setSelectedSkills = () => {},
  availableSkills = [],
}) {
  const [query, setQuery] = useState("")

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return availableSkills
    return availableSkills.filter((skill) => skill.toLowerCase().includes(q))
  }, [query, availableSkills])

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {selectedSkills.length > 0 && (
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
            {selectedSkills.length} selected
          </span>
        )}
      </div>

      {/* Selected skills */}
      {selectedSkills.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              {skill}
              <span aria-hidden="true" className="text-blue-100">
                &times;
              </span>
              <span className="sr-only">Remove {skill}</span>
            </button>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="relative mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Available skills */}
      {filteredSkills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkills.includes(skill)
            return (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                aria-pressed={isSelected}
                className={
                  isSelected
                    ? "rounded-full border border-blue-600 bg-blue-600 px-3 py-1 text-sm font-medium text-white transition-colors"
                    : "rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                }
              >
                {skill}
              </button>
            )
          })}
        </div>
      ) : (
        <p className="py-4 text-center text-sm text-slate-400">
          No skills match &quot;{query}&quot;
        </p>
      )}
    </div>
  )
}
