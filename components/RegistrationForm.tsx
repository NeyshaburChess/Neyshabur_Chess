"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
 
export default function RegistrationForm() {
  const router = useRouter();
 
  const [loading, setLoading] = useState(false);
 
  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
 
    setLoading(true);
 
    try {
      const formData = new FormData(
        e.currentTarget
      );
 
 
      const response = await fetch(
        "/api/register",
        {
          method: "POST",
          body: formData,
        }
      );
 
 
      const result = await response.json();
 
 
      if (!response.ok) {
        console.error(result);
 
        alert(
          result.error ||
          "خطا در ثبت نام"
        );
 
        return;
      }
 
 
      alert(
        "ثبت نام با موفقیت انجام شد"
      );
 
      router.push("/success");
 
 
    } catch (error) {
 
      console.error(
        "FETCH ERROR:",
        error
      );
 
      alert(
        "خطا در ارتباط با سرور"
      );
 
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
 
        <option
          value=""
          disabled
        >
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
        {
          loading
            ? "در حال ثبت..."
            : "ثبت نام"
        }
 
      </button>
 
 
    </form>
  );
}
 