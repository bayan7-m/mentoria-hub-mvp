"use client";

<<<<<<< HEAD
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
=======
import { useMemo, useState } from "react";
import { useApp } from "../../context/AppContext";
import OpportunityCard from "../../components/OpportunityCard";

const categories = ["All", "STEM", "Business", "Programming", "Languages", "Social", "Finance"];

export default function OpportunitiesPage() {
  const { opportunities, favorites, toggleFavorite, profile, t } = useApp();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredOpps = useMemo(
    () =>
      opportunities.filter((opp) => {
        const matchesCategory = selectedCategory === "All" || opp.category === selectedCategory;
        const query = search.toLowerCase();
        const matchesSearch =
          opp.title.toLowerCase().includes(query) ||
          opp.description.toLowerCase().includes(query) ||
          opp.organization.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      }),
    [opportunities, selectedCategory, search]
  );

  return (
    <div className="space-y-10 py-8">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t("opportunitiesTitle")}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
              {profile.interests.length > 0
                ? `${t("interestsSelected")} ${profile.interests.join(", ")}`
                : t("opportunitiesDesc")}
            </p>
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 md:w-80"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              }`}
            >
<<<<<<< HEAD
              {cat === 'All' ? 'Барлығы' : cat}
=======
              {cat === "All" ? t("filtersAll") : cat}
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
            </button>
          ))}
        </div>
      </div>

<<<<<<< HEAD
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
=======
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredOpps.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            {t("noOpportunities")}
          </div>
        ) : (
          filteredOpps.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              isFavorite={favorites.includes(opp.id)}
              onToggleFavorite={() => toggleFavorite(opp.id)}
            />
          ))
        )}
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
      </div>
    </div>
  );
}
