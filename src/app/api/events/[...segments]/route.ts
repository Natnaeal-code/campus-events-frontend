
export async function GET(
  request: Request,
  { params }: { params: Promise<{ segments: string[] }> }
) {
  try {
    const apiUrl = process.env.CAMPUS_EVENTS_API_URL;
    const apiKey = process.env.CAMPUS_EVENTS_API_KEY;

    if (!apiUrl || !apiKey) {
      return Response.json(
        { message: "API configuration is missing" },
        { status: 500 }
      );
    }

    const { segments } = await params;
    const path = segments.map(encodeURIComponent).join("/");
    const { search } = new URL(request.url);

    const response = await fetch(`${apiUrl}/events/${path}${search}`, {
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
