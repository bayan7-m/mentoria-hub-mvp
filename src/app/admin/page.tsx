"use client";

import { Database, GraduationCap, Heart, ListChecks } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AdminPage() {
  const { opportunities, courses, favorites, t } = useApp();
  const totalLessons = courses.reduce((sum, course) => sum + course.lessons.length, 0);

  const stats = [
    { label: t("totalOpportunities"), value: opportunities.length, icon: ListChecks },
    { label: t("totalCourses"), value: courses.length, icon: GraduationCap },
    { label: t("totalLessons"), value: totalLessons, icon: Database },
    { label: t("savedByStudents"), value: favorites.length, icon: Heart },
  ];

  return (
    <div className="space-y-8 py-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-600">MENTORIAHUB</p>
        <h1 className="mt-4 text-3xl font-black text-slate-900 dark:text-white">{t("adminTitle")}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">{t("adminSubtitle")}</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-slate-400">{item.label}</span>
                <Icon size={18} className="text-indigo-600" />
              </div>
              <p className="mt-4 text-3xl font-black text-slate-900 dark:text-white">{item.value}</p>
            </div>
          );
        })}
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t("adminNoteTitle")}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{t("adminNoteDesc")}</p>
      </section>
    </div>
  );
}
