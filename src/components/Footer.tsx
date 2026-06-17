import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contact us</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Phone: +7 (777) 777 77 77</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Email: mentoriaorganization@gmail.com</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Follow</h3>
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <Link href="#" className="block text-slate-600 transition hover:text-indigo-600 dark:text-slate-400">Instagram</Link>
            <Link href="#" className="block text-slate-600 transition hover:text-indigo-600 dark:text-slate-400">TikTok</Link>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © Copyright All Rights Reserved 2026 · MENTORIAHUB
      </div>
    </footer>
  );
}
