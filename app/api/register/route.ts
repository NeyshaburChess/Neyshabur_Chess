import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
 
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
 
 
    const fullName = formData.get("fullName") as string;
    const fideId = formData.get("fideId") as string;
    const phone = formData.get("phone") as string;
    const birthYear = formData.get("birthYear") as string;
    const city = formData.get("city") as string;
    const tournamentName = formData.get("tournamentName") as string;
    const amount = formData.get("amount") as string;
 
    const file = formData.get("receipt") as File | null;
 
 
    let receiptUrl = "";
 
 
 
    // آپلود فیش
    if (file) {
 
      const bytes = await file.arrayBuffer();
 
      const buffer = Buffer.from(bytes);
 
 
      const fileName =
        `receipts/${Date.now()}-${file.name}`;
 
 
 
      const { error: uploadError } =
        await supabaseAdmin.storage
          .from("receipts")
          .upload(
            fileName,
            buffer,
            {
              contentType: file.type,
              upsert: false,
            }
          );
 
 
      if (uploadError) {
 
        console.error(
          "UPLOAD ERROR:",
          uploadError
        );
 
        return NextResponse.json(
          {
            error: uploadError.message,
          },
          {
            status: 500,
          }
        );
      }
 
 
 
      const { data } =
        supabaseAdmin.storage
          .from("receipts")
          .getPublicUrl(fileName);
 
 
      receiptUrl = data.publicUrl;
 
    }
 
 
 
    // ثبت اطلاعات
    const { data, error } =
      await supabaseAdmin
        .from("registrations")
        .insert({
          fullName,
          fideId,
          phone,
          birthYear: Number(birthYear),
          city,
          tournamentName,
          amount: Number(amount),
          receiptUrl,
          status: "pending",
          adminNote: "",
        })
        .select()
        .single();
 
 
 
    if (error) {
 
      console.error(
        "DATABASE ERROR:",
        error
      );
 
 
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
 
    }
 
 
 
    return NextResponse.json({
      success: true,
      data,
    });
 
 
 
  } catch (error: any) {
 
 
    console.error(
      "REGISTER ERROR:",
      error
    );
 
 
    return NextResponse.json(
      {
        error: error.message || "خطای سرور",
      },
      {
        status: 500,
      }
    );
 
  }
}
 