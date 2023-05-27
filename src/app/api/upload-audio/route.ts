import { API_URL, BUCKET_NAME } from "@/constants";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const formData = await request.formData();
  const uid = formData.get("uid");
  const file: any = formData.get("file");
  const fileName = formData.get("fileName");
  const documentId = formData.get("documentId");

  try {
    await fetch(
      `${API_URL}/${BUCKET_NAME}/${uid}-separator-${documentId}-separator-${fileName}`,
      {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      }
    );

    return NextResponse.json("ok", { status: 200 });
  } catch (error) {
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
