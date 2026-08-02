export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#07192f] px-4">
 
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
 
        <div className="mb-5 text-6xl">
          ✅
        </div>
 
        <h1 className="mb-4 text-2xl font-bold text-[#07192f]">
          ثبت نام با موفقیت انجام شد
        </h1>
 
        <p className="leading-8 text-gray-600">
          اطلاعات شما دریافت شد.
          <br />
          پس از بررسی فیش واریزی،
          ثبت نام شما نهایی خواهد شد.
        </p>
 
 
        <a
          href="/"
          className="mt-8 block rounded-xl bg-[#07192f] py-3 text-white font-bold hover:bg-blue-900 transition"
        >
          بازگشت به صفحه اصلی
        </a>
 
      </div>
 
    </main>
  );
}
 