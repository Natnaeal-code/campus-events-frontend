
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const apiUrl = process.env.CAMPUS_EVENTS_API_URL;
    const apiKey = process.env.CAMPUS_EVENTS_API_KEY;

    if (!apiUrl || !apiKey) {
      return NextResponse.json(
        { message: "API configuration is missing" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to register. Please try again." },
      { status: 500 }
    );
  }
}
