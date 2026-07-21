import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

const AVAILABLE_SKILLS = [
  "Web Development",
  "Graphic Design",
  "Photography",
  "Spanish",
  "French",
  "Guitar",
  "Piano",
  "Cooking",
  "Baking",
  "Yoga",
  "Public Speaking",
  "Writing",
  "Video Editing",
  "Illustration",
  "Marketing",
  "SEO",
  "Data Analysis",
  "Excel",
  "UI/UX Design",
  "Woodworking",
  "Knitting",
  "Gardening",
  "Chess",
  "Meditation",
  "Digital Marketing",
  "Machine Learning",
  "Drawing",
  "Singing",
  "Dancing",
  "Calligraphy",
]

type PillProps = {
  label: string
  active: boolean
  variant: "teach" | "learn"
  onClick: () => void
}

function SkillPill({ label, active, variant, onClick }: PillProps) {
  const base =
    "group inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 cursor-pointer"

  const variants = {
    teach: active
      ? "border-slate-900 bg-slate-900 text-white shadow-sm focus-visible:ring-slate-400"
      : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-slate-300",
    learn: active
      ? "border-blue-600 bg-blue-600 text-white shadow-sm focus-visible:ring-blue-300"
      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 focus-visible:ring-blue-200",
  }

  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`${base} ${variants[variant]}`}>
      {active && (
        <svg
          className="h-3.5 w-3.5 shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.3 3.29 6.8-6.8a1 1 0 0 1 1.4 0Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {label}
    </button>
  )
}

export default function SkillSelectorPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [teachSkills, setTeachSkills] = useState<Set<string>>(new Set())
  const [learnSkills, setLearnSkills] = useState<Set<string>>(new Set())

  const filteredSkills = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return AVAILABLE_SKILLS
    return AVAILABLE_SKILLS.filter((s) => s.toLowerCase().includes(q))
  }, [query])

  function toggle(set: Set<string>, setState: (s: Set<string>) => void, skill: string) {
    const next = new Set(set)
    if (next.has(skill)) {
      next.delete(skill)
    } else {
      next.add(skill)
    }
    setState(next)
  }

  const handleSave = () => {
    // Perform API save logic here
    console.log("Teaching:", Array.from(teachSkills))
    console.log("Learning:", Array.from(learnSkills))
    navigate("/dashboard")
  }

  const totalSelected = teachSkills.size + learnSkills.size

  return (
    <div className="min-h-screen w-full bg-slate-100 px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-slate-100 px-6 py-7 sm:px-8">
            <p className="text-sm font-medium text-blue-600">Step 2 of 3</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 text-balance">
              What skills do you want to exchange?
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 text-pretty">
              Pick what you can teach others and what you&apos;d love to learn. This helps us match you with the right
              people.
            </p>

            {/* Search */}
            <div className="relative mt-5">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
                <path d="m14 14 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills..."
                aria-label="Search skills"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Grids */}
          <div className="grid gap-px bg-slate-100 sm:grid-cols-2">
            {/* Teach */}
            <div className="bg-white px-6 py-6 sm:px-8">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-900" aria-hidden="true" />
                  <h2 className="text-sm font-semibold text-slate-900">Skills I Can Teach</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {teachSkills.size}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredSkills.length === 0 && (
                  <p className="text-sm text-slate-400">No skills match your search.</p>
                )}
                {filteredSkills.map((skill) => (
                  <SkillPill
                    key={`teach-${skill}`}
                    label={skill}
                    variant="teach"
                    active={teachSkills.has(skill)}
                    onClick={() => toggle(teachSkills, setTeachSkills, skill)}
                  />
                ))}
              </div>
            </div>

            {/* Learn */}
            <div className="bg-white px-6 py-6 sm:px-8">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
                  <h2 className="text-sm font-semibold text-slate-900">Skills I Want to Learn</h2>
                </div>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                  {learnSkills.size}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredSkills.length === 0 && (
                  <p className="text-sm text-slate-400">No skills match your search.</p>
                )}
                {filteredSkills.map((skill) => (
                  <SkillPill
                    key={`learn-${skill}`}
                    label={skill}
                    variant="learn"
                    active={learnSkills.has(skill)}
                    onClick={() => toggle(learnSkills, setLearnSkills, skill)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse items-stretch gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              Skip for now
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={totalSelected === 0}
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save &amp; Continue
              {totalSelected > 0 && <span className="ml-1.5 opacity-80">({totalSelected})</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}