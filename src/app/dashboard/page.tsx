'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bookmark, GraduationCap, Clock, Award } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { profile, favorites, opportunities, courses, progress } = useApp();

  // Таңдаулы олимпиадалар тізімі
  const favOpportunities = opportunities.filter(o => favorites.includes(o.id));

  // Оқып жатқан курстар саны мен прогресс
  const activeCoursesCount = Object.keys(progress).length;

  return (
    <div className="space-y-8 animate-fade-in py-4">
      {/* Профиль карточкасы */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">🎯 {profile.name || 'Жас Талант'}</h1>
          <p className="text-indigo-100 text-sm mt-1">{profile.grade ? `${profile.grade}-сынып оқушысы` : 'Мектеп оқушысы'}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {profile.interests.map(interest => (
              <span key={interest} className="bg-white/20 px-3 py-1 text-xs rounded-full font-medium">
                #{interest}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center backdrop-blur-md">
          <div className="text-xs uppercase tracking-wider text-indigo-200 font-semibold">Аяқталған сабақтар</div>
          <div className="text-3xl font-extrabold mt-1">
            {Object.values(progress).reduce((acc, curr) => acc + curr.completedLessons.length, 0)}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Сол жақ: Оқып жатқан курстары */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="text-indigo-600" />
              <h3 className="text-lg font-bold">Менің курстарым ({activeCoursesCount})</h3>
            </div>

            {activeCoursesCount === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                Сіз әлі ешқандай курсты бастамадыңыз. 
                <Link href="/courses" className="text-indigo-600 font-semibold ml-1 underline">Курстар каталогына өту</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {courses.map(course => {
                  const courseProg = progress[course.id];
                  if (!courseProg) return null;
                  const pct = Math.round((courseProg.completedLessons.length / course.lessons.length) * 100);
                  
                  return (
                    <div key={course.id} className="p-4 border border-slate-100 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/40">
                      <div className="flex justify-between text-sm font-semibold mb-2">
                        <span>{course.title}</span>
                        <span className="text-indigo-600">{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Сақталған Олимпиадалар */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Bookmark className="text-pink-500" />
              <h3 className="text-lg font-bold">Таңдаулы мүмкіндіктер ({favOpportunities.length})</h3>
            </div>

            {favOpportunities.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                Сақталған олимпиадалар немесе конкурстар жоқ.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {favOpportunities.map(opp => (
                  <div key={opp.id} className="p-4 border border-slate-100 dark:border-slate-700 rounded-xl relative">
                    <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
                      {opp.category}
                    </span>
                    <h4 className="font-bold text-sm mt-2">{opp.title}</h4>
                    <p className="text-xs text-rose-500 font-semibold mt-2 flex items-center">
                      <Clock size={12} className="mr-1" /> Дедлайн: {opp.deadline}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Оң жақ: Дедлайн Күнтізбесі мен Жетістіктер */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="text-amber-500" />
              <h3 className="text-lg font-bold">Менің жетістіктерім</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl">
                <span className="text-2xl">🚀</span>
                <div>
                  <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400">Алғашқы қадам</h4>
                  <p className="text-[11px] text-slate-500">Платформаға тіркеліп, онбордингтен сәтті өттіңіз.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}