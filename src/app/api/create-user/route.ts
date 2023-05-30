import { API_URL } from "@/constants";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  const res = await fetch(`${API_URL}/create-user`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
