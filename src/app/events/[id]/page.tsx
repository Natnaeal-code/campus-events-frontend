
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ApiError,
  getEventById,
  getEventSessions,
} from "@/services/eventServices";

type EventDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  let event;
  let sessions;

  try {
    // Fetch the event and its sessions concurrently
    [event, sessions] = await Promise.all([
      getEventById(id),
      getEventSessions(id),
    ]);
  } catch (error) {
    // If the event does not exist, show the 404 page
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    // Other errors should show the error page
    throw error;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link
          href="/events"
          className="inline-block font-semibold text-blue-600 hover:underline"
        >
          ← Back to Events
        </Link>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
          <h1 className="text-3xl font-bold text-slate-900">
            {event.title}
          </h1>

          <p className="mt-4 leading-7 text-gray-700">
            {event.description}
          </p>

          <p className="mt-4 text-sm text-slate-600">
            Location: {event.location}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Date: {new Date(event.eventDate).toLocaleString()}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Category: {event.category}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Status: {event.isPublished ? "Published" : "Not published"}
          </p>
        </div>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Event Sessions
          </h2>

          {sessions.length === 0 ? (
            <p className="rounded-lg bg-white p-5 text-slate-600">
              No sessions available for this event.
            </p>
          ) : (
            <div className="grid gap-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-xl border bg-white p-5 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-slate-900">
                    {session.title}
                  </h3>

                  <p className="mt-2 text-slate-600">
                    Room: {session.room}
                  </p>

                  <p className="mt-2 text-sm text-slate-600">
                    Starts: {new Date(session.startsAt).toLocaleString()}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    Ends: {new Date(session.endsAt).toLocaleString()}
                  </p>

                  <Link
                    href={`/events/${id}/sessions/${session.id}`}
                    className="mt-4 inline-block font-semibold text-blue-600 hover:underline"
                  >
                    View Session Details →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
