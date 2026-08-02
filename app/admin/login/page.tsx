"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
 
export default function AdminLoginPage() {
  const router = useRouter();
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
 
    setLoading(true);
    setError("");
 
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
 
      const data = await res.json();
 
      if (!res.ok) {
        setError(data.error || "خطا در ورود");
        setLoading(false);
        return;
      }
 
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("خطا در ارتباط با سرور");
      setLoading(false);
    }
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#04152d] via-[#0b2c55] to-[#03101f] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
 
        <div className="rounded-3xl bg-white shadow-2xl p-8">
 
          <h1 className="text-3xl font-bold text-center text-[#07192f]">
            ورود مدیریت
          </h1>
 
          <p className="text-center text-gray-500 mt-2 mb-8">
            سامانه ثبت‌نام مسابقات شطرنج نیشابور
          </p>
 
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
 
            <div>
              <label className="block mb-2 font-medium">
                نام کاربری
              </label>
 
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Username"
                autoComplete="username"
                required
              />
            </div>
 
            <div>
              <label className="block mb-2 font-medium">
                رمز عبور
              </label>
 
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Password"
                autoComplete="current-password"
                required
              />
            </div>
 
            {error && (
              <div className="rounded-xl bg-red-100 text-red-700 p-3 text-sm">
                {error}
              </div>
            )}
 
            <button
              disabled={loading}
              className="w-full rounded-xl bg-[#0d4ed8] hover:bg-blue-800 transition text-white py-3 font-bold disabled:opacity-50"
            >
              {loading ? "در حال ورود..." : "ورود به پنل مدیریت"}
            </button>
 
          </form>
 
        </div>
 
      </div>
    </div>
  );
}
 