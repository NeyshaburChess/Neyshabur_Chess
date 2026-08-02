import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
 
export async function POST(req: Request) {
  try {
 
    console.log("REGISTER START");
 
    const formData = await req.formData();
 
    console.log("FORM RECEIVED");
 
 
    const fullName = String(formData.get("fullName") || "");
    const phone = String(formData.get("phone") || "");
 
    console.log({
      fullName,
      phone
    });
 
 
    const { error } = await supabaseAdmin
      .from("registrations")
      .insert({
        fullName,
        phone,
      });
 
 
    if (error) {
      console.error("SUPABASE ERROR:", error);
 
      return NextResponse.json(
        {
          error: error.message
        },
        {
          status:500
        }
      );
    }
 
 
    return NextResponse.json({
      success:true
    });
 
 
  } catch(error:any){
 
    console.error("SERVER ERROR:", error);
 
    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );
 
  }
}
 