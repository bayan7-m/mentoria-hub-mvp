"use client";

import type { Course } from "../types";
import { useApp } from "../context/AppContext";

interface CourseCardProps {
  course: Course;
  progress: number;
}

export default function CourseCard({ course, progress }: CourseCardProps) {
  const { t } = useApp();

  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="space-y-4">
        <div className={`rounded-3xl bg-gradient-to-r ${course.coverGradient} p-4 text-white`}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em]">{course.level}</span>
          <p className="mt-8 text-sm text-white/80">{course.totalDuration}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{course.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{course.description}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>{t("progress")}</span>
          <span className="font-semibold text-slate-900 dark:text-white">{progress}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <button className="mt-6 w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
          {t("startCourse")}
        </button>
      </div>
    </article>
  );
}
