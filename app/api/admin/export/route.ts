import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import * as XLSX from "xlsx-js-style";
 
type Registration = {
  id: string | number;
  createdAt: string | null;
  fideId: string | null;
  receiptUrl: string | null;
  adminNote: string | null;
  amount: number | string | null;
  birthYear: number | string | null;
  city: string | null;
  email: string | null;
  fullName: string | null;
  phone: string | null;
  status: string | null;
  updatedAt: string | null;
  tournamentName: string | null;
};
 
const HEADERS = [
  "شناسه",
  "نام و نام خانوادگی",
  "شماره تماس",
  "ایمیل",
  "آیدی فیده",
  "سال تولد",
  "شهر",
  "مبلغ",
  "وضعیت",
  "نام مسابقه",
  "رسید",
  "یادداشت مدیر",
  "تاریخ ثبت",
  "آخرین بروزرسانی",
];
 
const HEADER_STYLE: XLSX.CellStyle = {
  font: {
    bold: true,
    color: { rgb: "FFFFFF" },
    name: "Tahoma",
  },
  fill: {
    fgColor: { rgb: "07192F" },
  },
  alignment: {
    horizontal: "center",
    vertical: "center",
    wrapText: true,
  },
  border: {
    top: { style: "thin", color: { rgb: "000000" } },
    bottom: { style: "thin", color: { rgb: "000000" } },
    left: { style: "thin", color: { rgb: "000000" } },
    right: { style: "thin", color: { rgb: "000000" } },
  },
};
 
const BODY_STYLE: XLSX.CellStyle = {
  alignment: {
    horizontal: "center",
    vertical: "center",
    wrapText: true,
  },
  border: {
    top: { style: "thin", color: { rgb: "D9D9D9" } },
    bottom: { style: "thin", color: { rgb: "D9D9D9" } },
    left: { style: "thin", color: { rgb: "D9D9D9" } },
    right: { style: "thin", color: { rgb: "D9D9D9" } },
  },
  font: {
    name: "Tahoma",
  },
};
 
function formatDate(value: string | null) {
  if (!value) return "";
 
  try {
    return new Date(value).toLocaleString("fa-IR");
  } catch {
    return value;
  }
}
 
function toRows(data: Registration[]) {
  return data.map((item) => [
    item.id ?? "",
    item.fullName ?? "",
    item.phone ?? "",
    item.email ?? "",
    item.fideId ?? "",
    item.birthYear ?? "",
    item.city ?? "",
    item.amount ?? "",
    item.status ?? "",
    item.tournamentName ?? "",
    item.receiptUrl ?? "",
    item.adminNote ?? "",
    formatDate(item.createdAt),
    formatDate(item.updatedAt),
  ]);
}
 
function createSheet(title: string, rows: Registration[]) {
  const sheetData = [HEADERS, ...toRows(rows)];
 
  const ws = XLSX.utils.aoa_to_sheet(sheetData);
 
  ws["!cols"] = [
    { wch: 10 },
    { wch: 30 },
    { wch: 18 },
    { wch: 30 },
    { wch: 15 },
    { wch: 12 },
    { wch: 18 },
    { wch: 14 },
    { wch: 15 },
    { wch: 22 },
    { wch: 45 },
    { wch: 35 },
    { wch: 24 },
    { wch: 24 },
  ];
 
  const range = XLSX.utils.decode_range(ws["!ref"]!);
 
  ws["!autofilter"] = {
    ref: ws["!ref"]!,
  };
 
  ws["!views"] = [
    {
      rightToLeft: true,
    },
  ];
  for (let r = range.s.r; r <= range.e.r; r++) {
    for (let c = range.s.c; c <= range.e.c; c++) {
      const cellAddress = XLSX.utils.encode_cell({ r, c });
 
      if (!ws[cellAddress]) continue;
 
      ws[cellAddress].s = r === 0 ? HEADER_STYLE : BODY_STYLE;
    }
  }
 
  return {
    name: title,
    sheet: ws,
  };
}
 
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("registrations")
      .select("*")
      .order("createdAt", { ascending: true });
 
    if (error) {
      throw error;
    }
 
    const registrations = (data ?? []) as Registration[];
 
    const sixth = registrations.filter((item) => {
      const tournament = item.tournamentName ?? "";
 
      return (
        tournament.includes("ششمین") ||
        tournament.includes("هر دو")
      );
    });
 
    const seventh = registrations.filter((item) => {
      const tournament = item.tournamentName ?? "";
 
      return (
        tournament.includes("هفتمین") ||
        tournament.includes("هر دو")
      );
    });
 
    const workbook = XLSX.utils.book_new();
 
    const sheet1 = createSheet("ششمین دوره", sixth);
    const sheet2 = createSheet("هفتمین دوره", seventh);
    const sheet3 = createSheet(
      "همه ثبت نام ها",
      registrations
    );
 
    XLSX.utils.book_append_sheet(
      workbook,
      sheet1.sheet,
      sheet1.name
    );
 
    XLSX.utils.book_append_sheet(
      workbook,
      sheet2.sheet,
      sheet2.name
    );
 
    XLSX.utils.book_append_sheet(
      workbook,
      sheet3.sheet,
      sheet3.name
    );
 
    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
      compression: true,
    });
 
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
 
        "Content-Disposition":
          'attachment; filename="Neyshabur-Chess-Registrations.xlsx"',
      },
    });
    
  } catch (error) {
    console.error(error);
 
    return NextResponse.json(
      {
        error: "Failed to export registrations.",
      },
      {
        status: 500,
      }
    );
  }
}
 