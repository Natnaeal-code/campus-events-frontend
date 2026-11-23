
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const rolesCookie = cookieStore.get("user_roles")?.value;

  let roles: string[] = [];

  try {
    roles = rolesCookie ? JSON.parse(rolesCookie) : [];
  } catch {
    roles = [];
  }

  if (!roles.includes("admin")) {
    if (roles.includes("attendee")) {
      redirect("/events");
    }

    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-4 text-3xl font-bold text-slate-900">
        Admin Dashboard
      </h1>

      <p className="mb-8 text-slate-600">
        Welcome to the Campus Events administration panel.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Create Event</h2>
          <p className="mb-4 text-slate-600">
            Create and publish new campus events.
          </p>
          <a
            href="/create-event"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Create an Event
          </a>
        </div>

        <div className="rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">View Events</h2>
          <p className="mb-4 text-slate-600">
            Browse existing events and check their publication status.
          </p>
          <a
            href="/events"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Manage Events
          </a>
        </div>
      </div>
    </main>
  );
}
