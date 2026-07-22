"use client"

import { useMemo, useState } from "react"
import {
  Check,
  Clock,
  GraduationCap,
  Lightbulb,
  Mail,
  X,
} from "lucide-react"

const INITIAL_REQUESTS = [
  {
    id: 1,
    name: "Aditi",
    title: "Product Designer",
    initials: "A",
    avatarColor: "bg-blue-600",
    teach: ["UI/UX Design", "Figma", "Illustration"],
    learn: ["React", "TypeScript"],
    status: "pending",
  },
  {
    id: 2,
    name: "Kashika Soni",
    title: "Frontend Engineer",
    initials: "KS",
    avatarColor: "bg-indigo-600",
    teach: ["React", "TypeScript", "Node.js"],
    learn: ["UI/UX Design", "Public Speaking"],
    status: "pending",
  },
  {
    id: 3,
    name: "Disha kushwaha",
    title: "Marketing Lead",
    initials: "DK",
    avatarColor: "bg-sky-600",
    teach: ["Digital Marketing", "SEO", "Writing"],
    learn: ["Data Analysis", "Excel"],
    status: "accepted",
  },
  {
    id: 4,
    name: "Aastha Singh",
    title: "Data Scientist",
    initials: "AS",
    avatarColor: "bg-cyan-700",
    teach: ["Python", "Machine Learning", "Data Analysis"],
    learn: ["Guitar", "Spanish"],
    status: "declined",
  },
  {
    id: 5,
    name: "Vriti",
    title: "Language Tutor",
    initials: "V",
    avatarColor: "bg-blue-500",
    teach: ["Spanish", "French", "Public Speaking"],
    learn: ["Photography", "Video Editing"],
    status: "pending",
  },
]

const TABS = [
  { key: "pending", label: "Pending" },
  { key: "accepted", label: "Accepted" },
  { key: "declined", label: "Declined" },
]

const STATUS_BADGE = {
  accepted: {
    label: "Accepted",
    className: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-200",
    Icon: Check,
  },
  declined: {
    label: "Declined",
    className: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
    Icon: X,
  },
}

export default function Inbox() {
  const [requests, setRequests] = useState(INITIAL_REQUESTS)
  const [activeTab, setActiveTab] = useState("pending")

  const counts = useMemo(() => {
    return requests.reduce(
      (acc, r) => {
        acc[r.status] += 1
        return acc
      },
      { pending: 0, accepted: 0, declined: 0 },
    )
  }, [requests])

  const visible = useMemo(
    () => requests.filter((r) => r.status === activeTab),
    [requests, activeTab],
  )

  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Inbox
            </h1>
            <p className="text-sm leading-relaxed text-slate-500">
              Manage your skill exchange requests.
            </p>
          </div>
        </header>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab.label}
                <span
                  className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {counts[tab.key]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Cards */}
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <Clock className="mx-auto mb-3 h-8 w-8 text-slate-300" />
            <p className="text-sm text-slate-500">
              No {activeTab} requests right now.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visible.map((req) => {
              const badge = STATUS_BADGE[req.status]
              return (
                <article
                  key={req.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  {/* Top: avatar + name + status badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${req.avatarColor}`}
                      >
                        {req.initials}
                      </div>
                      <div className="min-w-0">
                        <h2 className="truncate font-semibold text-slate-900">
                          {req.name}
                        </h2>
                        <p className="truncate text-xs text-slate-500">
                          {req.title}
                        </p>
                      </div>
                    </div>

                    {badge && (
                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}
                      >
                        <badge.Icon className="h-3.5 w-3.5" />
                        {badge.label}
                      </span>
                    )}
                  </div>

                  {/* Teach */}
                  <div className="mt-4">
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                      Can teach
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {req.teach.map((skill) => (
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
                      {req.learn.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions (pending only) */}
                  {req.status === "pending" && (
                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        onClick={() => updateStatus(req.id, "accepted")}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        <Check className="h-4 w-4" />
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(req.id, "declined")}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                        Decline
                      </button>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
