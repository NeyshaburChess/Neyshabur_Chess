import { supabaseAdmin } from "@/lib/supabaseAdmin";
 
export default async function RegistrationsPage() {
  const { data: registrations, error } = await supabaseAdmin
    .from("registrations")
    .select("*")
    .order("createdAt", { ascending: false });
 
  if (error) {
    console.error(error);
 
    return (
      <div className="p-6 text-red-600">
        خطا در دریافت اطلاعات ثبت‌نام
        <br />
        {error.message}
      </div>
    );
  }
 
  return (
    <div className="p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">
        لیست ثبت‌نام‌ها
      </h1>
 
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-[#07192F] text-white">
              <th className="p-3 border">نام و نام خانوادگی</th>
              <th className="p-3 border">کد فیده</th>
              <th className="p-3 border">شهر</th>
              <th className="p-3 border">تلفن</th>
              <th className="p-3 border">مسابقه</th>
              <th className="p-3 border">مبلغ</th>
              <th className="p-3 border">وضعیت</th>
            </tr>
          </thead>
 
          <tbody>
            {registrations?.map((item) => (
              <tr key={item.id}>
                <td className="p-3 border text-center">
                  {item.fullName}
                </td>
 
                <td className="p-3 border text-center">
                  {item.fideId}
                </td>
 
                <td className="p-3 border text-center">
                  {item.city}
                </td>
 
                <td className="p-3 border text-center">
                  {item.phone}
                </td>
 
                <td className="p-3 border text-center">
                  {item.tournamentName}
                </td>
 
                <td className="p-3 border text-center">
                  {item.amount}
                </td>
 
                <td className="p-3 border text-center">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 