"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Award, Bookmark, Clock, GraduationCap } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isReady } = useAuth();
  const { profile, favorites, opportunities, courses, progress, t } = useApp();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isReady, router]);

  const favOpportunities = useMemo(
    () => opportunities.filter((opp) => favorites.includes(opp.id)),
    [opportunities, favorites]
  );

  const activeCoursesCount = Object.keys(progress).length;
  const completedLessonsTotal = Object.values(progress).reduce((sum, item) => sum + item.completedLessons.length, 0);

  if (!isReady || !isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-8 py-8">
      <section className="rounded-[32px] bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{profile.name || t("profileGreeting")}</h1>
            <p className="mt-2 text-sm text-indigo-100">
              {profile.grade ? `${profile.grade} ${t("studentGrade")}` : t("studentGrade")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span key={interest} className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                  #{interest}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white/10 p-5 text-center backdrop-blur-xl">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
              <Clock size={18} />
            </div>
            <p className="text-3xl font-bold">{completedLessonsTotal}</p>
            <p className="text-sm text-indigo-100/80">{t("completedLessons")}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <GraduationCap className="text-indigo-600" />
              <h2 className="text-xl font-bold">
                {t("myCourses")} ({activeCoursesCount})
              </h2>
            </div>
            {activeCoursesCount === 0 ? (
              <div className="mt-8 rounded-3xl bg-slate-50 p-8 text-center text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                {t("noCourses")}{" "}
                <Link href="/courses" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  {t("browseCourses")}
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {courses.map((course) => {
                  const courseProg = progress[course.id];
                  if (!courseProg) return null;
                  const pct = Math.round((courseProg.completedLessons.length / course.lessons.length) * 100);
                  return (
                    <div key={course.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                      <div className="flex items-center justify-between gap-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        <span>{course.title}</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div className="h-full bg-indigo-600" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <Bookmark className="text-rose-500" />
              <h2 className="text-xl font-bold">
                {t("favoriteOpportunities")} ({favOpportunities.length})
              </h2>
            </div>
            {favOpportunities.length === 0 ? (
              <div className="mt-8 rounded-3xl bg-slate-50 p-8 text-center text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                {t("noFavorites")}
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {favOpportunities.map((opp) => (
                  <div key={opp.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                    <span className="inline-flex rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-200">
                      {opp.category}
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{opp.title}</h3>
                    <p className="mt-2 text-xs text-rose-500 dark:text-rose-400">
                      {t("deadline")}: {opp.deadline}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white">
              <Award className="text-amber-500" />
              <h2 className="text-xl font-bold">{t("myAchievements")}</h2>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-amber-50 p-4 dark:bg-amber-950/20">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">{t("firstStep")}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t("firstStepDesc")}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
