"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useApp();

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    login();
    router.replace("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-slate-950 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{t("loginTitle")}</h1>
          <p className="mt-4 text-sm text-slate-300 sm:text-base">{t("loginSubtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label htmlFor="login" className="mb-2 block text-sm font-medium text-slate-200">
              {t("loginLabel")}
            </label>
            <input
              id="login"
              type="text"
              placeholder={t("loginLabel")}
              className="w-full rounded-2xl border border-white/15 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
              {t("passwordLabel")}
            </label>
            <input
              id="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
              className="w-full rounded-2xl border border-white/15 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <p className="text-center text-slate-300">{t("loginFooter")}</p>

          <div className="space-y-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-full bg-amber-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
            >
              {t("loginButton")}
            </button>
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="inline-flex w-full justify-center rounded-full border border-slate-600 bg-transparent px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-amber-400 hover:text-amber-300"
            >
              {t("registerButton")}
            </button>
          </div>
        </form>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row">
          <span>© 2026 MENTORIAHUB</span>
          <span>404itu</span>
        </div>
      </div>
    </div>
  );
}
