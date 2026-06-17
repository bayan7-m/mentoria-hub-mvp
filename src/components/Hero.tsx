"use client";

import Link from "next/link";
import { useApp } from "../context/AppContext";

export default function Hero() {
  const { t } = useApp();

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-600">MENTORIAHUB</p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              {t("heroTitle")}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              {t("heroDesc")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/opportunities"
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
              >
                {t("findOpps")}
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:border-indigo-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
              >
                {t("startLearning")}
              </Link>
            </div>
          </div>

          <div className="space-y-6 rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-md dark:border-slate-800 dark:bg-slate-950">
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-indigo-600/10 px-4 py-1 text-sm font-semibold text-indigo-600">
                {t("heroBadge")}
              </span>
              <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                {t("heroPanelText")}
              </p>
            </div>

            <div className="grid gap-4 rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900 dark:text-slate-100">
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200">
                  01
                </span>
                <div>
                  <p className="text-sm font-semibold">{t("heroMetricOneTitle")}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t("heroMetricOneDesc")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-sm font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
                  02
                </span>
                <div>
                  <p className="text-sm font-semibold">{t("heroMetricTwoTitle")}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t("heroMetricTwoDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
