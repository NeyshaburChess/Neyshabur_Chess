"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
import FileDropzone from "./FileDropzone";
 
export default function RegistrationForm() {
  const router = useRouter();
 
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
 
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
 
    if (!receiptFile) {
      alert("ابتدا فیش واریزی را انتخاب کنید.");
      return;
    }
 
    setLoading(true);
 
    try {
      const formData = new FormData(e.currentTarget);
 
      formData.append("receipt", receiptFile);
 
      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });
 
      const result = await response.json();
 
      if (!response.ok) {
        console.error("REGISTER ERROR:", result);
 
        alert(
          result.error || "خطا در ثبت نام"
        );
 
        return;
      }
 
      alert("ثبت نام با موفقیت انجام شد");
 
      router.push("/success");
 
    } catch (error) {
      console.error("SERVER ERROR:", error);
 
      alert("خطا در ارتباط با سرور");
 
    } finally {
      setLoading(false);
    }
  }
 
 
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      dir="rtl"
    >
 
      <input
        name="fullName"
        placeholder="نام و نام خانوادگی"
        className="input"
        required
      />
 
      <input
        name="fideId"
        placeholder="آیدی فیده"
        className="input"
      />
 
      <input
        name="phone"
        placeholder="شماره موبایل"
        className="input"
        required
      />
 
      <input
        name="birthYear"
        type="number"
        placeholder="سال تولد"
        className="input"
        required
      />
 
      <input
        name="city"
        placeholder="شهر"
        className="input"
      />
 
 
      <select
        name="tournamentName"
        className="input"
        defaultValue=""
        required
      >
        <option value="" disabled>
          انتخاب مسابقه
        </option>
 
        <option value="ششمین دوره مسابقات قهرمانان شطرنج نیشابور">
          ششمین دوره مسابقات قهرمانان شطرنج نیشابور
        </option>
 
        <option value="هفتمین دوره مسابقات قهرمانان شطرنج نیشابور">
          هفتمین دوره مسابقات قهرمانان شطرنج نیشابور
        </option>
 
        <option value="هر دو">
          ثبت نام هر دو دوره
        </option>
 
      </select>
 
 
      <input
        name="amount"
        type="number"
        placeholder="مبلغ واریزی (ریال)"
        className="input"
        required
      />
 
 
      <FileDropzone
        onUpload={async (file: File) => {
          setReceiptFile(file);
        }}
      />
 
 
      {receiptFile && (
        <div
          className="
          rounded-xl
          bg-green-100
          border
          border-green-300
          text-green-700
          text-center
          py-3
          "
        >
          ✅ فیش انتخاب شد
        </div>
      )}
 
 
      <button
        type="submit"
        disabled={loading}
        className="
        w-full
        rounded-xl
        bg-[#07192F]
        py-3
        font-bold
        text-white
        disabled:opacity-50
        "
      >
        {loading
          ? "در حال ثبت..."
          : "ثبت نام"}
      </button>
 
    </form>
  );
}
 