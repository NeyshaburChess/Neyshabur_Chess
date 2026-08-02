import { NextResponse } from "next/server";
 
export async function POST(req: Request) {
  try {
    const body = await req.formData();
 
    console.log("FORM RECEIVED");
 
    return NextResponse.json({
      success: true,
      message: "API WORKS",
      data: {
        fullName: body.get("fullName"),
        phone: body.get("phone"),
      },
    });
 
  } catch (error: any) {
 
    console.error("TEST ERROR:", error);
 
    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}
 