import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
 
export async function GET() {
  try {
 
    const { data, error } = await supabaseAdmin
      .from("registrations")
      .select("*")
      .limit(5);
 
 
    if (error) {
      console.error("SUPABASE ERROR:", error);
 
      return NextResponse.json(
        {
          step: "supabase",
          error: error.message
        },
        {
          status:500
        }
      );
    }
 
 
    return NextResponse.json({
      success:true,
      count:data?.length,
      data
    });
 
 
  } catch(error:any){
 
    console.error("SERVER ERROR:", error);
 
    return NextResponse.json(
      {
        step:"server",
        error:error.message
      },
      {
        status:500
      }
    );
 
  }
}
 