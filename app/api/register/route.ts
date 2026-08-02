import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
 
export async function POST(req: Request) {
  try {
    console.log("REGISTER START");
 
    console.log(
      "SUPABASE URL:",
      process.env.NEXT_PUBLIC_SUPABASE_URL
    );
 
    console.log(
      "SERVICE KEY:",
      process.env.SUPABASE_SERVICE_ROLE_KEY
        ? "FOUND"
        : "MISSING"
    );
 
 
    const formData = await req.formData();
 
    const fullName = String(
      formData.get("fullName") || ""
    );
 
    const fideId = String(
      formData.get("fideId") || ""
    );
 
    const phone = String(
      formData.get("phone") || ""
    );
 
    const birthYear = Number(
      formData.get("birthYear") || 0
    );
 
    const city = String(
      formData.get("city") || ""
    );
 
    const tournamentName = String(
      formData.get("tournamentName") || ""
    );
 
    const amount = Number(
      formData.get("amount") || 0
    );
 
 
    console.log({
      fullName,
      fideId,
      phone,
      birthYear,
      city,
      tournamentName,
      amount
    });
 
 
    const { data, error } = await supabaseAdmin
      .from("registrations")
      .insert({
        fullName,
        fideId,
        phone,
        birthYear,
        city,
        tournamentName,
        amount,
        status: "pending",
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
          error: error.message
        },
        {
          status: 500
        }
      );
    }
 
 
    console.log("REGISTER SUCCESS");
 
 
    return NextResponse.json({
      success: true,
      data
    });
 
 
  } catch (error: any) {
 
    console.error(
      "SERVER ERROR:",
      error
    );
 
 
    return NextResponse.json(
      {
        error:
          error.message ||
          "خطای سرور"
      },
      {
        status: 500
      }
    );
 
  }
}
 