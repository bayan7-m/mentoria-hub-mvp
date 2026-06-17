'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function OpportunitiesPage() {
  const { opportunities, favorites, toggleFavorite, profile } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Егер оқушы онбордингтен өткен болса, оның қызығушылықтары бойынша басымдық береміз
  const categories = ['All', 'STEM', 'Business', 'Programming', 'Science', 'Social Influence', 'Finance'];

  const filteredOpps = opportunities.filter(opp => {
    const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory;
    return matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Білім Беру Мүмкіндіктері</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {profile.interests.length > 0 ? `Сіздің таңдаған бағыттарыңыз: ${profile.interests.join(', ')}` : 'Өзіңізге ыңғайлы конкурстар мен олимпиадаларды табыңыз'}
          </p>
        </div>

        {/* Категория сүзгісі (Filters) */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Каталог карталары */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpps.map(opp => {
          const isFav = favorites.includes(opp.id);
          return (
            <div key={opp.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full">
                    {opp.category}
                  </span>
                  <button
                    onClick={() => toggleFavorite(opp.id)}
                    className="text-xl transition-transform active:scale-75"
                    aria-label="Bookmark"
                  >
                    {isFav ? '❤️' : '🤍'}
                  </button>
                </div>
                <h3 className="text-xl font-bold tracking-tight">{opp.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">{opp.description}</p>
                <div className="text-xs space-y-1 pt-2 border-t border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  <div><strong>Формат:</strong> {opp.format}</div>
                  <div><strong>Сыныптар:</strong> {opp.grades.join(', ')}-сыныптар</div>
                  <div className="text-rose-500 font-medium"><strong>Дедлайн:</strong> {opp.deadline}</div>
                </div>
              </div>
              <button className="w-full mt-4 py-2 text-sm font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors">
                Подать заявку
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}