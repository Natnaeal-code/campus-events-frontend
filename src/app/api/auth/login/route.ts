
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const apiUrl = process.env.CAMPUS_EVENTS_API_URL;

    if (!apiUrl) {
      return NextResponse.json(
        { message: "API configuration is missing" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const backendResponse = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data.message || "Login failed" },
        { status: backendResponse.status }
      );
    }

    const response = NextResponse.json({
      message: "Login successful",
      user: data.user,
    });

    response.cookies.set("access_token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });

    response.cookies.set("refresh_token", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
      maxAge: 7 * 24 * 60 * 60,
    });

    // Used for displaying role-based navigation only.
    response.cookies.set("user_roles", JSON.stringify(data.user.roles), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Unable to connect to authentication server" },
      { status: 502 }
    );
  }
}
