"use client";

import { Heart } from "lucide-react";
import type { Opportunity } from "../types";
import { useApp } from "../context/AppContext";

interface OpportunityCardProps {
  opportunity: Opportunity;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function OpportunityCard({ opportunity, isFavorite, onToggleFavorite }: OpportunityCardProps) {
  const { t } = useApp();

  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-200">
            {opportunity.category}
          </span>
          <button
            type="button"
            onClick={onToggleFavorite}
            aria-label={t("toggleFavorite")}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl border transition ${
              isFavorite
                ? "border-rose-200 bg-rose-50 text-rose-500 dark:border-rose-900/60 dark:bg-rose-950/30"
                : "border-slate-200 bg-white text-slate-400 hover:text-rose-500 dark:border-slate-700 dark:bg-slate-900"
            }`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{opportunity.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{opportunity.description}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>{t("deadline")}</span>
          <span className="font-semibold text-slate-900 dark:text-white">{opportunity.deadline}</span>
        </div>
        <a
          href={opportunity.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          {t("applyNow")}
        </a>
      </div>
    </article>
  );
}
