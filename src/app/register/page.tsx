"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { t } = useApp();

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    register();
    router.replace("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-slate-950 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{t("registerButton")}</h1>
          <p className="mt-4 text-sm text-slate-300 sm:text-base">{t("registerSubtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
              {t("nameLabel")}
            </label>
            <input
              id="name"
              type="text"
              placeholder={t("nameLabel")}
              className="w-full rounded-2xl border border-white/15 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
              {t("emailLabel")}
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
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

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-full bg-amber-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
          >
            {t("registerButton")}
          </button>
        </form>
      </div>
    </div>
  );
}
