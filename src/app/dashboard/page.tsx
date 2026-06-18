<<<<<<< HEAD
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BookOpen, Home, LogOut, Settings } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function DashboardPage() {
  const router = useRouter();
  const {
    state,
    dispatch,
    getCourseProgressPercent,
    getRecommendedOpportunities,
    isSaved,
  } = useApp();

  const { profile, isAuthenticated, courses } = state;

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const recommended = getRecommendedOpportunities();
  const matchedIds = new Set(
    recommended
      .filter((o) =>
        profile.interests.some(
          (i) => o.category === i || o.tags.includes(i)
        )
      )
      .map((o) => o.id)
  );

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/login');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 -mx-4 sm:-mx-6 lg:-mx-8 min-h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <aside className="lg:w-56 shrink-0">
        <div className="bg-indigo-600 text-white rounded-2xl p-4 flex lg:flex-col gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/20 font-medium text-sm"
          >
            <Home size={18} />
            <span className="hidden lg:inline">Басты бет</span>
          </Link>
          <Link
            href="/courses"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 font-medium text-sm transition-colors"
          >
            <BookOpen size={18} />
            <span className="hidden lg:inline">Курстар</span>
          </Link>
          <button
            type="button"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 font-medium text-sm transition-colors"
          >
            <Settings size={18} />
            <span className="hidden lg:inline">Баптаулар</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 font-medium text-sm transition-colors lg:mt-auto"
          >
            <LogOut size={18} />
            <span className="hidden lg:inline">Шығу</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 space-y-8 px-4 sm:px-0">
        {/* Profile header */}
        <div className="flex items-center gap-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow">
            {profile.avatar || 'MH'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {profile.grade ? `${profile.grade} сынып` : ''}
              {profile.city ? `, ${profile.city} қ.` : ''}
            </p>
            {profile.interests.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {profile.interests.map((i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400"
                  >
                    {i}
                  </span>
=======
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
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
                ))}
              </div>
            )}
          </div>
        </div>

<<<<<<< HEAD
        {/* My courses */}
        <section>
          <h2 className="text-xl font-bold mb-4">Менің курстарым</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {courses.map((course) => {
              const percent = getCourseProgressPercent(course.id);
              const isComplete = percent === 100;
              return (
                <Link
                  key={course.id}
                  href="/courses"
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-all group"
                >
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${course.coverGradient} mb-4 opacity-80`}
                  />
                  <h3 className="font-bold group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{course.description}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Оқу прогресі</span>
                      <span className={isComplete ? 'text-green-600' : 'text-indigo-600'}>
                        {percent}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isComplete ? 'bg-green-500' : 'bg-indigo-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        isComplete ? 'text-green-600' : 'text-indigo-600'
                      }`}
                    >
                      {isComplete ? 'Аяқталды' : 'Жалғастыру'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recommended opportunities */}
        <section>
          <h2 className="text-xl font-bold mb-2">Сізге ұсынылған мүмкіндіктер</h2>
          <p className="text-sm text-slate-500 mb-4">
            Қызығушылықтарыңызға сәйкес олимпиадалар мен хакатондар
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommended.map((opp) => {
              const isMatch = matchedIds.has(opp.id);
              const saved = isSaved(opp.id);
              return (
                <div
                  key={opp.id}
                  className={`bg-white dark:bg-slate-800 rounded-2xl border p-5 shadow-sm flex flex-col ${
                    isMatch
                      ? 'border-indigo-300 dark:border-indigo-700 ring-1 ring-indigo-200 dark:ring-indigo-800'
                      : 'border-slate-100 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                      {opp.category}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({ type: 'TOGGLE_SAVE_OPPORTUNITY', payload: opp.id })
                      }
                      className="text-lg"
                      aria-label="Сақтау"
                    >
                      {saved ? '❤️' : '🤍'}
                    </button>
                  </div>
                  {isMatch && (
                    <span className="text-xs text-indigo-600 font-medium mb-1">
                      ★ Сізге ұсынылған
                    </span>
                  )}
                  <h3 className="font-bold text-sm leading-snug">{opp.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 flex-1">
                    {opp.description}
                  </p>
                  <div className="text-xs text-slate-500 mt-3 space-y-0.5">
                    <div>Формат: {opp.format === 'Online' ? 'Онлайн' : opp.format === 'Offline' ? 'Офлайн' : 'Гибрид'}</div>
                    <div className="text-rose-500 font-medium">
                      Дедлайн: {new Date(opp.deadline).toLocaleDateString('kk-KZ')}
                    </div>
                  </div>
                  <a
                    href={opp.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block text-center py-2 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl transition-colors"
                  >
                    Өтініш беру
                  </a>
                </div>
              );
            })}
          </div>
        </section>
=======
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
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
      </div>
    </div>
  );
}
