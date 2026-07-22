"use client"

import { useMemo, useRef, useState } from "react"
import {
  Camera,
  Check,
  GraduationCap,
  Lightbulb,
  Plus,
  Search,
  User,
  X,
} from "lucide-react"

const SKILL_LIBRARY = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "UI/UX Design",
  "Figma",
  "Photography",
  "Public Speaking",
  "Spanish",
  "French",
  "Guitar",
  "Piano",
  "Cooking",
  "Digital Marketing",
  "SEO",
  "Data Analysis",
  "Machine Learning",
  "Illustration",
  "Video Editing",
  "Yoga",
  "Writing",
  "Excel",
  "Project Management",
]

function TagField({
  label,
  icon,
  placeholder,
  selected,
  onToggle,
  onRemove,
  suggestions,
  accent,
}) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return suggestions
      .filter((s) => !selected.includes(s))
      .filter((s) => (q ? s.toLowerCase().includes(q) : true))
      .slice(0, 6)
  }, [query, suggestions, selected])

  const canAddCustom =
    query.trim().length > 0 &&
    !suggestions.some((s) => s.toLowerCase() === query.trim().toLowerCase()) &&
    !selected.some((s) => s.toLowerCase() === query.trim().toLowerCase())

  const chipClasses =
    accent === "teach"
      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
      : "bg-slate-100 text-slate-700 ring-1 ring-slate-200"

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <span className="text-blue-600">{icon}</span>
        {label}
      </label>

      <div className="rounded-xl border border-slate-200 bg-white p-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
        {selected.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {selected.map((skill) => (
              <span
                key={skill}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${chipClasses}`}
              >
                {skill}
                <button
                  type="button"
                  onClick={() => onRemove(skill)}
                  className="rounded-full p-0.5 transition-colors hover:bg-white/60"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="relative">
          <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              type="text"
              value={query}
              placeholder={placeholder}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          {open && (filtered.length > 0 || canAddCustom) && (
            <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
              {filtered.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onToggle(skill)
                    setQuery("")
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-blue-50"
                >
                  {skill}
                  <Plus className="h-4 w-4 text-blue-500" />
                </button>
              ))}
              {canAddCustom && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onToggle(query.trim())
                    setQuery("")
                  }}
                  className="flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2 text-left text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4" />
                  {`Add "${query.trim()}"`}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProfileSetup() {
  const [photo, setPhoto] = useState(null)
  const [fullName, setFullName] = useState("")
  const [bio, setBio] = useState("")
  const [teachSkills, setTeachSkills] = useState([])
  const [learnSkills, setLearnSkills] = useState([])
  const fileInputRef = useRef(null)

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  const toggle = (list, setList, skill) => {
    setList(list.includes(skill) ? list.filter((s) => s !== skill) : [...list, skill])
  }

  const handleSave = (e) => {
    e.preventDefault()
    console.log("[v0] Profile saved:", { fullName, bio, teachSkills, learnSkills, photo })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl text-balance">
            Set up your profile
          </h1>
          <p className="mt-2 text-sm text-slate-500 text-pretty">
            Tell the community who you are and what skills you want to exchange.
          </p>
        </div>

        <form
          onSubmit={handleSave}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Photo upload */}
          <div className="flex flex-col items-center gap-3 border-b border-slate-100 pb-6">
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-100 ring-4 ring-blue-50">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo || "/placeholder.svg"} alt="Profile preview" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-slate-300" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-colors hover:bg-blue-700"
                aria-label="Upload profile photo"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            <p className="text-xs text-slate-400">JPG or PNG, up to 5MB</p>
          </div>

          {/* Full name */}
          <div className="mt-6 flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Jordan Rivera"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Bio */}
          <div className="mt-5 flex flex-col gap-2">
            <label htmlFor="bio" className="text-sm font-medium text-slate-700">
              Short Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={240}
              placeholder="Share a little about yourself and your learning goals..."
              className="resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
            <span className="self-end text-xs text-slate-400">{bio.length}/240</span>
          </div>

          {/* Skills to teach */}
          <div className="mt-5">
            <TagField
              label="Skills I Can Teach"
              icon={<GraduationCap className="h-4 w-4" />}
              placeholder="Search skills to teach..."
              selected={teachSkills}
              onToggle={(s) => toggle(teachSkills, setTeachSkills, s)}
              onRemove={(s) => toggle(teachSkills, setTeachSkills, s)}
              suggestions={SKILL_LIBRARY}
              accent="teach"
            />
          </div>

          {/* Skills to learn */}
          <div className="mt-5">
            <TagField
              label="Skills I Want to Learn"
              icon={<Lightbulb className="h-4 w-4" />}
              placeholder="Search skills to learn..."
              selected={learnSkills}
              onToggle={(s) => toggle(learnSkills, setLearnSkills, s)}
              onRemove={(s) => toggle(learnSkills, setLearnSkills, s)}
              suggestions={SKILL_LIBRARY}
              accent="learn"
            />
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Skip for now
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <Check className="h-4 w-4" />
              Save &amp; Continue
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}