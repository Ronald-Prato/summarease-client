import { API_URL } from "@/constants";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const response = await fetch(`${API_URL}/upload-audio`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  return NextResponse.json(data);
}
