"use client";

import { useMemo } from "react";
import { useApp } from "../../context/AppContext";
import CourseCard from "../../components/CourseCard";

export default function CoursesPage() {
  const { courses, progress, t } = useApp();

  const coursesWithProgress = useMemo(
    () =>
      courses.map((course) => {
        const completedLessons = progress[course.id]?.completedLessons.length ?? 0;
        const totalLessons = course.lessons.length || 1;
        const percentage = Math.round((completedLessons / totalLessons) * 100);
        return { course, percentage };
      }),
    [courses, progress]
  );

  return (
    <div className="space-y-10 py-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t("courses")}</h1>
        <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">{t("coursesDesc")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {coursesWithProgress.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            {t("noCoursesCatalog")}
          </div>
        ) : (
          coursesWithProgress.map(({ course, percentage }) => (
            <CourseCard key={course.id} course={course} progress={percentage} />
          ))
        )}
      </div>
    </div>
  );
}
