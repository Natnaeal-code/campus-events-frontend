
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateEventForm from "@/components/CreateEventForm";

export default async function CreateEventPage() {
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

  return <CreateEventForm />;
}
