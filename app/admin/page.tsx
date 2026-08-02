import Link from "next/link";
 
export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-100">
 
      <header className="bg-[#07192f] text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold">
          پنل مدیریت مسابقات شطرنج نیشابور
        </h1>
      </header>
 
      <div className="max-w-7xl mx-auto p-8">
 
        <div className="grid md:grid-cols-3 gap-6">
 
          <Link
            href="/admin/registrations"
            className="rounded-2xl bg-white shadow p-8 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold">
              ثبت‌نام‌ها
            </h2>
 
            <p className="text-gray-500 mt-2">
              مشاهده شرکت‌کنندگان
            </p>
          </Link>
 
          <Link
            href="/api/admin/export"
            className="rounded-2xl bg-white shadow p-8 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold">
              خروجی Excel
            </h2>
 
            <p className="text-gray-500 mt-2">
              دانلود فایل اکسل
            </p>
          </Link>
 
          <Link
            href="/"
            className="rounded-2xl bg-white shadow p-8 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold">
              سایت
            </h2>
 
            <p className="text-gray-500 mt-2">
              مشاهده صفحه اصلی
            </p>
          </Link>
 
        </div>
 
      </div>
 
    </main>
  );
}
 