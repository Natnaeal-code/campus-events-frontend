
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const apiUrl = process.env.CAMPUS_EVENTS_API_URL;
    const apiKey = process.env.CAMPUS_EVENTS_API_KEY;

    if (!apiUrl || !apiKey) {
      return Response.json(
        { message: "API configuration is missing" },
        { status: 500 }
      );
    }

    const { search } = new URL(request.url);

    const response = await fetch(`${apiUrl}/events${search}`, {
      headers: {
        "x-api-key": apiKey,
      },
      cache: "no-store",
    });

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
    });
  } catch {
    return Response.json(
      { message: "Unable to connect to the events server" },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const apiUrl = process.env.CAMPUS_EVENTS_API_URL;
    const apiKey = process.env.CAMPUS_EVENTS_API_KEY;

    if (!apiUrl || !apiKey) {
      return Response.json(
        { message: "API configuration is missing" },
        { status: 500 }
      );
    }

    // Read the access token from the HttpOnly cookie
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        { message: "Please log in first" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await fetch(`${apiUrl}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
    });
  } catch {
    return Response.json(
      { message: "Unable to create event" },
      { status: 502 }
    );
  }
}
