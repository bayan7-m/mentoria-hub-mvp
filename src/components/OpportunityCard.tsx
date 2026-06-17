import type { Opportunity } from "../types";

interface OpportunityCardProps {
  opportunity: Opportunity;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function OpportunityCard({ opportunity, isFavorite, onToggleFavorite }: OpportunityCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-200">
            {opportunity.category}
          </span>
          <button
            onClick={onToggleFavorite}
            aria-label="Toggle favorite"
            className="text-xl transition-transform hover:scale-110"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{opportunity.title}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{opportunity.description}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>Deadline</span>
          <span className="font-semibold text-slate-900 dark:text-white">{opportunity.deadline}</span>
        </div>
        <a
          href={opportunity.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Apply now
        </a>
      </div>
    </article>
  );
}
