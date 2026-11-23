
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between border-b bg-white px-8 py-5">
        <h1 className="text-2xl font-bold text-slate-900">
          CampusEvents
        </h1>

        <Link
          href="/events"
          className="font-medium text-blue-600 hover:text-blue-800"
        >
          All Events
        </Link>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-4xl font-bold text-slate-900">
          Welcome to Campus Events
        </h2>

        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Discover upcoming campus events, explore activities,
          and stay connected with your campus community.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/events"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Explore Events
          </Link>

          <Link
            href="/create-event"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Create Event
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold text-slate-900">
          Discover More
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Explore Events
            </h3>
            <p className="mt-3 text-slate-600">
              Browse campus events and find activities that interest you.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Event Details
            </h3>
            <p className="mt-3 text-slate-600">
              Learn about event locations, dates, categories, and sessions.
            </p>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Create Events
            </h3>
            <p className="mt-3 text-slate-600">
              Create and share events with your campus community.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
