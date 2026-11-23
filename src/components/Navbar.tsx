
import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const cookieStore = await cookies();
  const rolesCookie = cookieStore.get("user_roles")?.value;

  let roles: string[] = [];

  try {
    roles = rolesCookie ? JSON.parse(rolesCookie) : [];
  } catch {
    roles = [];
  }

  const isAdmin = roles.includes("admin");
  const isAttendee = roles.includes("attendee");
  const isLoggedIn = isAdmin || isAttendee;

  return (
    <nav className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          Campus Events
        </Link>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="font-medium text-slate-700 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/events"
            className="font-medium text-slate-700 hover:text-blue-600"
          >
            Events
          </Link>

          {isAdmin && (
            <>
              <Link
                href="/admin"
                className="font-medium text-slate-700 hover:text-blue-600"
              >
                Admin Dashboard
              </Link>

              <Link
                href="/create-event"
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Create Event
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
