import RegistrationForm from "@/components/RegistrationForm";
 
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07192f]">
 
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07192f] via-[#0b2c55] to-[#03101d]" />
 
      {/* Glow Effects */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-700/20 blur-3xl" />
 
      {/* Chess Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
 
      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-12">
 
        <div className="w-full max-w-4xl">
 
          <div className="mb-10 text-center text-white">
 
            <span className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300">
              هیأت شطرنج شهرستان نیشابور
            </span>
 
            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
              ثبت‌نام
              <br />
              ششمین و هفتمین دوره
              <br />
              مسابقات شطرنج جام قهرمانان نیشابور
            </h1>
 
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              لطفاً اطلاعات خود را به‌صورت کامل وارد کرده و تصویر فیش واریزی را
              بارگذاری نمایید. پس از بررسی، ثبت‌نام شما توسط هیأت شطرنج تأیید
              خواهد شد.
            </p>
 
          </div>
 
          <div className="rounded-3xl border border-white/15 bg-white/95 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
 
            <div className="mb-8 text-center">
 
              <h2 className="text-3xl font-bold text-[#07192f]">
                فرم ثبت‌نام شرکت‌کننده
              </h2>
 
              <p className="mt-2 text-gray-500">
                لطفاً تمامی اطلاعات را با دقت تکمیل کنید.
              </p>
 
            </div>
 
            <RegistrationForm />
 
          </div>
 
        </div>
 
      </section>
 
    </main>
  );
}
 