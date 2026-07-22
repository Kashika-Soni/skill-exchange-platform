"use client"

import { useRef, useState } from "react"
import { Camera, Upload, X } from "lucide-react"

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"]
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export default function AvatarUpload({ size = 128, onChange }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState("")

  function validateFile(file) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only JPG, JPEG, and PNG files are allowed."
    }
    if (file.size > MAX_SIZE_BYTES) {
      return "File size must be 5 MB or less."
    }
    return ""
  }

  function handleFile(file) {
    if (!file) return

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setPreview(null)
      if (onChange) onChange(null)
      return
    }

    setError("")
    const url = URL.createObjectURL(file)
    setPreview(url)
    if (onChange) onChange(file)
  }

  function handleInputChange(e) {
    const file = e.target.files && e.target.files[0]
    handleFile(file)
  }

  function openPicker() {
    if (inputRef.current) inputRef.current.click()
  }

  function handleRemove(e) {
    e.stopPropagation()
    setPreview(null)
    setError("")
    if (inputRef.current) inputRef.current.value = ""
    if (onChange) onChange(null)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload profile picture"
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            openPicker()
          }
        }}
        className="group relative cursor-pointer rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500"
        style={{ width: size, height: size }}
      >
        <div
          className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-white bg-blue-50 shadow-md ring-1 ring-blue-100"
        >
          {preview ? (
            <img
              src={preview || "/placeholder.svg"}
              alt="Profile preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <Camera
              className="text-blue-400"
              style={{ width: size * 0.32, height: size * 0.32 }}
            />
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-900/0 opacity-0 transition-all duration-200 group-hover:bg-blue-900/40 group-hover:opacity-100">
          <Upload className="h-6 w-6 text-white" />
        </div>

        {/* Camera badge */}
        <span className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm transition-colors group-hover:bg-blue-700">
          <Camera className="h-4 w-4" />
        </span>

        {/* Remove button */}
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove profile picture"
            className="absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-red-500 text-white shadow-sm transition-colors hover:bg-red-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={openPicker}
        className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
      >
        {preview ? "Change photo" : "Upload photo"}
      </button>

      <p className="text-xs text-slate-400">JPG, JPEG or PNG. Max 5 MB.</p>

      {error && (
        <p className="max-w-xs text-center text-sm font-medium text-red-500" role="alert">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  )
}
