"use client";
 
type Registration = {
  id: string;
  fullName: string;
  fideId: string | null;
  phone: string;
  birthYear: string;
  city: string | null;
  tournamentName: string;
  amount: number;
  receiptUrl: string;
  status: string;
  createdAt: Date;
};
 
 
 
export default function RegistrationTable({
  registrations,
}: {
  registrations: Registration[];
}) {
 
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow">
 
      <table className="w-full min-w-[1100px] border-collapse">
 
        <thead>
          <tr className="bg-[#07192f] text-white">
 
            <th className="p-3 text-center">
              ردیف
            </th>
 
            <th className="p-3 text-center">
              نام و نام خانوادگی
            </th>
 
            <th className="p-3 text-center">
              آیدی فیده
            </th>
 
            <th className="p-3 text-center">
              موبایل
            </th>
 
            <th className="p-3 text-center">
              سال تولد
            </th>
 
            <th className="p-3 text-center">
              شهر
            </th>
 
            <th className="p-3 text-center">
              مسابقه
            </th>
 
            <th className="p-3 text-center">
              مبلغ
            </th>
 
            <th className="p-3 text-center">
              فیش
            </th>
 
            <th className="p-3 text-center">
              تاریخ
            </th>
 
          </tr>
        </thead>
 
 
        <tbody>
 
          {registrations.map(
            (item, index) => (
 
            <tr
              key={item.id}
              className="border-b hover:bg-gray-50"
            >
 
              <td className="p-3 text-center">
                {index + 1}
              </td>
 
 
              <td className="p-3 text-center font-bold">
                {item.fullName}
              </td>
 
 
              <td className="p-3 text-center">
                {item.fideId || "-"}
              </td>
 
 
              <td className="p-3 text-center">
                {item.phone}
              </td>
 
 
              <td className="p-3 text-center">
                {item.birthYear}
              </td>
 
 
              <td className="p-3 text-center">
                {item.city || "-"}
              </td>
 
 
              <td className="p-3 text-center text-sm">
                {item.tournamentName}
              </td>
 
 
              <td className="p-3 text-center">
                {item.amount.toLocaleString()}
                {" "}
                ریال
              </td>
 
 
              <td className="p-3 text-center">
 
                <a
                  href={item.receiptUrl}
                  target="_blank"
                  className="rounded-lg bg-blue-600 px-3 py-2 text-white text-sm"
                >
                  مشاهده
                </a>
 
              </td>
 
 
              <td className="p-3 text-center text-sm">
                {new Date(
                  item.createdAt
                ).toLocaleDateString(
                  "fa-IR"
                )}
              </td>
 
 
            </tr>
 
          ))}
 
 
        </tbody>
 
      </table>
 
 
      {registrations.length === 0 && (
 
        <div className="p-8 text-center text-gray-500">
          هنوز ثبت‌نامی انجام نشده است.
        </div>
 
      )}
 
    </div>
  );
}
 