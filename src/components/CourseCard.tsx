import type { Course } from "../types";

interface CourseCardProps {
  course: Course;
  progress: number;
}

export default function CourseCard({ course, progress }: CourseCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="space-y-4">
        <div className="rounded-3xl bg-slate-100 p-4 text-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <span className="text-xs uppercase tracking-[0.2em]">{course.level}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{course.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{course.description}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>Progress</span>
          <span className="font-semibold text-slate-900 dark:text-white">{progress}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <button className="mt-6 w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
          Start course
        </button>
      </div>
    </article>
  );
}
