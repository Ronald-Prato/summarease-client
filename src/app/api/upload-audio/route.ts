import { API_URL } from "@/constants";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const uid = formData.get("uid");
  const file: any = formData.get("file");
  const fileName = formData.get("fileName");
  const documentId = formData.get("documentId");

  try {
    await fetch(
      `${API_URL}/upload-audio/${uid}-separator-${documentId}-separator-${fileName}`,
      {
        method: "POST",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      }
    );

    return NextResponse.json("ok", { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Error uploading file",
      },
      {
        status: 500,
      }
    );
  }
}
