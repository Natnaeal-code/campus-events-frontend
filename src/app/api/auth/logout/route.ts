
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Logged out successfully",
  });

  response.cookies.set("access_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("refresh_token", "", {
    httpOnly: true,
    path: "/api/auth",
    maxAge: 0,
  });

  response.cookies.set("user_roles", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
