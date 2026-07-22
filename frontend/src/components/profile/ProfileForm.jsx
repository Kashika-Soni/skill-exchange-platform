"use client"

import { useState } from "react"

export default function ProfileForm({ initialName = "", initialBio = "", onSubmit }) {
  const [fullName, setFullName] = useState(initialName)
  const [bio, setBio] = useState(initialBio)
  const [errors, setErrors] = useState({})

  const BIO_MAX = 240

  function validate() {
    const next = {}

    if (!fullName.trim()) {
      next.fullName = "Full name is required."
    } else if (fullName.trim().length < 2) {
      next.fullName = "Full name must be at least 2 characters."
    }

    if (bio.length > BIO_MAX) {
      next.bio = `Bio must be ${BIO_MAX} characters or fewer.`
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSubmit?.({ fullName: fullName.trim(), bio: bio.trim() })
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Edit Profile</h2>
        <p className="mt-1 text-sm text-slate-500">Update your personal details below.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Doe"
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
              errors.fullName ? "border-red-400 focus:border-red-400" : "border-slate-300 focus:border-blue-500"
            }`}
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1.5 text-sm text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="bio" className="block text-sm font-medium text-slate-700">
              Bio
            </label>
            <span className={`text-xs ${bio.length > BIO_MAX ? "text-red-600" : "text-slate-400"}`}>
              {bio.length}/{BIO_MAX}
            </span>
          </div>
          <textarea
            id="bio"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell others a bit about yourself and the skills you're passionate about..."
            aria-invalid={errors.bio ? "true" : "false"}
            aria-describedby={errors.bio ? "bio-error" : undefined}
            className={`w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
              errors.bio ? "border-red-400 focus:border-red-400" : "border-slate-300 focus:border-blue-500"
            }`}
          />
          {errors.bio && (
            <p id="bio-error" className="mt-1.5 text-sm text-red-600">
              {errors.bio}
            </p>
          )}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => {
            setFullName(initialName)
            setBio(initialBio)
            setErrors({})
          }}
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Reset
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}
