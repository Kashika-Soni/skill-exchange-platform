"use client"

import { useMemo, useState } from "react"
import {
  Check,
  GraduationCap,
  Lightbulb,
  Search,
  SlidersHorizontal,
  UserPlus,
} from "lucide-react"

const PEOPLE = [
  {
    id: 1,
    name: "Aditi",
    title: "Product Designer",
    location: "Austin, TX",
    initials: "A",
    avatarColor: "bg-blue-600",
    teach: ["UI/UX Design", "Figma", "Illustration"],
    learn: ["React", "TypeScript"],
  },
  {
    id: 2,
    name: "Kashika Soni",
    title: "Frontend Engineer",
    location: "Rohini, Delhi",
    initials: "KS",
    avatarColor: "bg-indigo-600",
    teach: ["React", "TypeScript", "Node.js"],
    learn: ["UI/UX Design", "Public Speaking"],
  },
  {
    id: 3,
    name: "Disha Kushwaha",
    title: "Marketing Lead",
    location: "Chicago, IL",
    initials: "DK",
    avatarColor: "bg-sky-600",
    teach: ["Digital Marketing", "SEO", "Writing"],
    learn: ["Data Analysis", "Excel"],
  },
  {
    id: 4,
    name: "Aastha Singh",
    title: "Data Scientist",
    location: "Boston, MA",
    initials: "AS",
    avatarColor: "bg-cyan-700",
    teach: ["Python", "Machine Learning", "Data Analysis"],
    learn: ["Guitar", "Spanish"],
  },
  {
    id: 5,
    name: "Vriti",
    title: "Language Tutor",
    location: "Denver, CO",
    initials: "V",
    avatarColor: "bg-blue-500",
    teach: ["Spanish", "French", "Public Speaking"],
    learn: ["Photography", "Video Editing"],
  },
]

export default function Dashboard() {
  const [query, setQuery] = useState("")
  const [requested, setRequested] = useState([])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PEOPLE
    return PEOPLE.filter((p) => {
      const haystack = [p.name, p.title, ...p.teach, ...p.learn]
        .join(" ")
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query])

  const toggleRequest = (id) => {
    setRequested((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-6">
          <p className="text-sm font-medium text-blue-600">Skill Exchange</p>
          <h1 className="text-balance text-2xl font-bold text-slate-900 sm:text-3xl">
            Suggested Skill Matches
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            People whose skills align with what you want to learn and teach.
          </p>
        </header>

        {/* Search + Filter */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills or users..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-sm text-slate-500">
              No matches found for &ldquo;{query}&rdquo;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((person) => {
              const isRequested = requested.includes(person.id)
              return (
                <article
                  key={person.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  {/* Top: avatar + name */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${person.avatarColor}`}
                    >
                      {person.initials}
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold text-slate-900">
                        {person.name}
                      </h2>
                      <p className="truncate text-xs text-slate-500">
                        {person.title} &middot; {person.location}
                      </p>
                    </div>
                  </div>

                  {/* Teach */}
                  <div className="mt-4">
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                      Can teach
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {person.teach.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Learn */}
                  <div className="mt-3">
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Lightbulb className="h-4 w-4 text-slate-400" />
                      Wants to learn
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {person.learn.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    type="button"
                    onClick={() => toggleRequest(person.id)}
                    className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      isRequested
                        ? "bg-blue-50 text-blue-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isRequested ? (
                      <>
                        <Check className="h-4 w-4" />
                        Request Sent
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" />
                        Send Request
                      </>
                    )}
                  </button>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
