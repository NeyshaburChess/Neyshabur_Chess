import { NextResponse } from "next/server";
import { cookies } from "next/headers";
 
import { createSession } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
 
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
 
    if (!username || !password) {
      return NextResponse.json(
        {
          error: "اطلاعات ناقص است.",
        },
        {
          status: 400,
        }
      );
    }
 
 
    // فقط ادمین مشخص
    if (
      username.trim() !== "admin" ||
      password !== "Mazda2933"
    ) {
      return NextResponse.json(
        {
          error: "نام کاربری یا رمز عبور اشتباه است.",
        },
        {
          status: 401,
        }
      );
    }
 
 
    // پیدا کردن ادمین از دیتابیس
    const { data: admin, error } = await supabaseAdmin
      .from("admins")
      .select("id")
      .eq("username", "admin")
      .single();
 
 
    if (error || !admin) {
      return NextResponse.json(
        {
          error: "ادمین پیدا نشد.",
        },
        {
          status: 401,
        }
      );
    }
 
 
    const token = await createSession(admin.id);
 
 
    const cookieStore = await cookies();
 
    cookieStore.set(
      "admin_session",
      token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }
    );
 
 
    return NextResponse.json({
      success: true,
    });
 
 
  } catch (error) {
 
    console.error(
      "LOGIN ERROR:",
      error
    );
 
    return NextResponse.json(
      {
        error: "SERVER_ERROR",
      },
      {
        status: 500,
      }
    );
  }
}
 