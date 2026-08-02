import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth";
 
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
 
    if (
      username !== "admin" ||
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
 
    // تست بدون Supabase
    const token = await createSession("123");
 
    const cookieStore = await cookies();
 
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
 
    return NextResponse.json({
      success: true,
    });
 
  } catch (error: any) {
    console.error("LOGIN ERROR:", error);
 
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      {
        status: 500,
      }
    );
  }
}
 