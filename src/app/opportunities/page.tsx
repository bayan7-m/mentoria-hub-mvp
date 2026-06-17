"use client";

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
              {cat === "All" ? t("filtersAll") : cat}
            </button>
          ))}
        </div>
      </div>

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
      </div>
    </div>
  );
}
