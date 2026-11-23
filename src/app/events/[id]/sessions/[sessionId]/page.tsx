
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ApiError,
  getSessionById,
} from "@/services/eventServices";

type SessionPageProps = {
  params: Promise<{
    id: string;
    sessionId: string;
  }>;
};

export default async function SessionPage({
  params,
}: SessionPageProps) {
  const { id, sessionId } = await params;

  let session;

  try {
    session = await getSessionById(id, sessionId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-2xl rounded-xl border bg-white p-6 shadow-md">
        <Link
          href={`/events/${id}`}
          className="text-blue-600 hover:underline"
        >
          ← Back to Event
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          {session.title}
        </h1>

        <div className="mt-6 space-y-4 text-slate-600">
          <p>
            <strong>Room:</strong> {session.room}
          </p>

          <p>
            <strong>Starts:</strong>{" "}
            {new Date(session.startsAt).toLocaleString()}
          </p>

          <p>
            <strong>Ends:</strong>{" "}
            {new Date(session.endsAt).toLocaleString()}
          </p>
        </div>
      </div>
    </main>
  );
}
