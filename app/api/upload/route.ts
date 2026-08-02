import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
 
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
 
    const file = formData.get("file") as File;
 
    if (!file) {
      return NextResponse.json(
        { error: "فایلی ارسال نشده" },
        { status: 400 }
      );
    }
 
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
 
    const fileName = `${Date.now()}-${file.name}`;
 
    const { error } = await supabaseAdmin.storage
      .from("receipts")
      .upload(fileName, buffer, {
        contentType: file.type,
      });
 
    if (error) {
      throw error;
    }
 
    const { data } = supabaseAdmin.storage
      .from("receipts")
      .getPublicUrl(fileName);
 
    return NextResponse.json({
      url: data.publicUrl,
    });
 
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
 