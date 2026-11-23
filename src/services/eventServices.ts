
import type {
  Event,
  PaginatedEvents,
  Session,
} from "@/types/event";

// Custom error class for API responses
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Filters supported by the backend
export interface EventFilters {
  category?: string;
  location?: string;
  isPublished?: boolean;
  sortBy?: "eventDate" | "title";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

// Get events with filtering, sorting, and pagination
export async function getEvents(
  filters: EventFilters = {}
): Promise<PaginatedEvents> {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });

  const response = await fetch(`/api/events?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new ApiError("Failed to fetch events", response.status);
  }

  const data: PaginatedEvents = await response.json();
  return data;
}

// Get one event by ID
export async function getEventById(id: string): Promise<Event> {
  const baseUrl = process.env.CAMPUS_EVENTS_API_URL;
  const apiKey = process.env.CAMPUS_EVENTS_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error("API configuration is missing");
  }

  const response = await fetch(
    `${baseUrl}/events/${encodeURIComponent(id)}`,
    {
      headers: {
        "x-api-key": apiKey,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new ApiError("Failed to fetch event", response.status);
  }

  const data: Event = await response.json();
  return data;
}

// Get all sessions for an event
export async function getEventSessions(
  eventId: string
): Promise<Session[]> {
  const baseUrl = process.env.CAMPUS_EVENTS_API_URL;
  const apiKey = process.env.CAMPUS_EVENTS_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error("API configuration is missing");
  }

  const response = await fetch(
    `${baseUrl}/events/${encodeURIComponent(eventId)}/sessions`,
    {
      headers: {
        "x-api-key": apiKey,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new ApiError(
      "Failed to fetch event sessions",
      response.status
    );
  }

  const data: Session[] = await response.json();
  return data;
}

// Get one session by ID
export async function getSessionById(
  eventId: string,
  sessionId: string
): Promise<Session> {
  const baseUrl = process.env.CAMPUS_EVENTS_API_URL;
  const apiKey = process.env.CAMPUS_EVENTS_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error("API configuration is missing");
  }

  const response = await fetch(
    `${baseUrl}/events/${encodeURIComponent(eventId)}/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: {
        "x-api-key": apiKey,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new ApiError("Failed to fetch session", response.status);
  }

  const data: Session = await response.json();
  return data;
}
