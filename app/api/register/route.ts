import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
 
export async function POST(req: Request) {
  try {
    const body = await req.json();
 
    const {
      fullName,
      fideId,
      phone,
      birthYear,
      city,
      tournamentName,
      amount,
      receiptUrl,
    } = body;
 
    const { data, error } = await supabaseAdmin
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
      console.error("DATABASE ERROR:", error);
 
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
 
    return NextResponse.json({
      success: true,
      data,
    });
 
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);
 
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
 