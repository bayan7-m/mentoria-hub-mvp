'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OpportunityCategory } from '@/types';

const CATEGORIES: (OpportunityCategory | 'All')[] = [
  'All',
  'STEM',
  'Business',
  'Programming',
  'Science',
  'Social Influence',
  'Finance',
  'ielts sat дайындықты',
];

export default function OpportunitiesPage() {
  const { state, dispatch, isSaved } = useApp();
  const { opportunities, profile } = state;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredOpps = opportunities.filter((opp) => {
    return selectedCategory === 'All' || opp.category === selectedCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Білім Беру Мүмкіндіктері</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {profile.interests.length > 0
              ? `Сіздің таңдаған бағыттарыңыз: ${profile.interests.join(', ')}`
              : 'Өзіңізге ыңғайлы конкурстар мен олимпиадаларды табыңыз'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'All' ? 'Барлығы' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpps.map((opp) => {
          const saved = isSaved(opp.id);
          return (
            <div
              key={opp.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full">
                    {opp.category}
                  </span>
                  <button
                    onClick={() =>
                      dispatch({ type: 'TOGGLE_SAVE_OPPORTUNITY', payload: opp.id })
                    }
                    className="text-xl transition-transform active:scale-75"
                    aria-label="Сақтау"
                  >
                    {saved ? '❤️' : '🤍'}
                  </button>
                </div>
                <h3 className="text-xl font-bold tracking-tight">{opp.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                  {opp.description}
                </p>
                <div className="text-xs space-y-1 pt-2 border-t border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  <div>
                    <strong>Формат:</strong>{' '}
                    {opp.format === 'Online' ? 'Онлайн' : opp.format === 'Offline' ? 'Офлайн' : 'Гибрид'}
                  </div>
                  <div>
                    <strong>Сыныптар:</strong> {opp.grades.join(', ')}-сыныптар
                  </div>
                  <div className="text-rose-500 font-medium">
                    <strong>Дедлайн:</strong> {opp.deadline}
                  </div>
                </div>
              </div>
              <a
                href={opp.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 py-2 text-sm font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors block"
              >
                Өтініш беру
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
