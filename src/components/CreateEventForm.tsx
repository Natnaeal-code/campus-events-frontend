
"use client";

import { useState, type FormEvent } from "react";

export default function CreateEventForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      location: formData.get("location"),
      eventDate: formData.get("eventDate"),
      category: formData.get("category"),
      isPublished: formData.has("isPublished"),
    };

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Request failed with status ${response.status}`
        );
      }

      setSuccess("Event created successfully!");
      form.reset();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create event. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          Create Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Event title
            </label>
            <input
              name="title"
              placeholder="Enter event title"
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your event"
              required
              rows={4}
              className={fieldClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Location
            </label>
            <input
              name="location"
              placeholder="Enter event location"
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Date and time
            </label>
            <input
              name="eventDate"
              type="datetime-local"
              required
              className={fieldClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Category
            </label>
            <select
              name="category"
              required
              defaultValue=""
              className={fieldClass}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="academic">Academic</option>
              <option value="sports">Sports</option>
              <option value="social">Social</option>
            </select>
          </div>

          <label className="flex items-center gap-3 text-slate-700">
            <input
              type="checkbox"
              name="isPublished"
              className="h-5 w-5 accent-blue-600"
            />
            Publish this event immediately
          </label>

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </main>
  );
}
