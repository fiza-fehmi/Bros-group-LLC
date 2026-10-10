import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-[#D97706]/20 text-[#D97706] flex items-center justify-center font-extrabold text-2xl">
        404
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight">Page Not Found</h1>
      <p className="text-slate-400 text-sm max-w-md">
        The requested enterprise resource could not be located on the Bros Group LLC platform.
      </p>
      <div>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-[#D97706] hover:bg-amber-600 text-white font-bold text-sm transition-colors inline-block"
        >
          Return to Corporate Home
        </Link>
      </div>
    </main>
  );
}
