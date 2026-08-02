import { supabaseAdmin } from "@/lib/supabaseAdmin";
 
export default async function RegistrationsPage() {
  const {
    data: registrations,
    error,
  } = await supabaseAdmin
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });
 
 
  if (error) {
    console.error("REGISTRATIONS ERROR:", error);
 
    return (
      <div
        className="p-6 text-red-600"
        dir="rtl"
      >
        <h1 className="text-xl font-bold mb-3">
          خطا در دریافت اطلاعات ثبت‌نام
        </h1>
 
        <pre className="bg-red-50 p-4 rounded-xl text-sm">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }
 
 
  return (
    <div
      className="p-6"
      dir="rtl"
    >
 
      <div className="flex justify-between items-center mb-6">
 
        <h1 className="text-2xl font-bold">
          لیست ثبت‌نام‌ها
        </h1>
 
 
        <a
          href="/api/admin/export"
          className="
          bg-[#07192F]
          text-white
          px-5
          py-3
          rounded-xl
          font-bold
          "
        >
          خروجی اکسل
        </a>
 
      </div>
 
 
      <div className="overflow-x-auto">
 
        <table className="w-full border border-gray-300">
 
          <thead>
 
            <tr className="bg-[#07192F] text-white">
 
              <th className="p-3 border">
                نام
              </th>
 
              <th className="p-3 border">
                فیده
              </th>
 
              <th className="p-3 border">
                تلفن
              </th>
 
              <th className="p-3 border">
                شهر
              </th>
 
              <th className="p-3 border">
                مسابقه
              </th>
 
              <th className="p-3 border">
                مبلغ
              </th>
 
              <th className="p-3 border">
                وضعیت
              </th>
 
              <th className="p-3 border">
                فیش
              </th>
 
            </tr>
 
          </thead>
 
 
          <tbody>
 
          {registrations?.map((item:any)=> (
 
            <tr key={item.id}>
 
              <td className="p-3 border text-center">
                {item.fullName}
              </td>
 
 
              <td className="p-3 border text-center">
                {item.fideId || "-"}
              </td>
 
 
              <td className="p-3 border text-center">
                {item.phone}
              </td>
 
 
              <td className="p-3 border text-center">
                {item.city || "-"}
              </td>
 
 
              <td className="p-3 border text-center">
                {item.tournamentName}
              </td>
 
 
              <td className="p-3 border text-center">
                {item.amount?.toLocaleString()}
              </td>
 
 
              <td className="p-3 border text-center">
                {item.status || "pending"}
              </td>
 
 
              <td className="p-3 border text-center">
 
                {
                  item.receiptUrl ? (
                    <a
                      href={item.receiptUrl}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      مشاهده
                    </a>
                  ) : (
                    "-"
                  )
                }
 
              </td>
 
 
            </tr>
 
          ))}
 
 
          </tbody>
 
        </table>
 
      </div>
 
 
      {
        registrations?.length === 0 && (
          <div className="mt-5 text-center text-gray-500">
            هنوز ثبت‌نامی وجود ندارد.
          </div>
        )
      }
 
 
    </div>
  );
}
 