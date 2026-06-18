"use client";

import FeatureCard from "./FeatureCard";
import { useApp } from "../context/AppContext";

export default function FeaturesSection() {
  const { t } = useApp();
  const features = [
    ["featureCatalogTitle", "featureCatalogDesc"],
    ["featureLearningTitle", "featureLearningDesc"],
    ["featureProgressTitle", "featureProgressDesc"],
    ["featureDeadlineTitle", "featureDeadlineDesc"],
  ];

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_auto] lg:items-start">
        <div className="space-y-6">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-600">{t("featuresTitle")}</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {t("featuresHeading")}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map(([titleKey, descKey]) => (
              <FeatureCard key={titleKey} title={t(titleKey)} description={t(descKey)} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center lg:pl-12">
          <span className="text-5xl font-black uppercase tracking-[0.25em] text-slate-100 opacity-70 dark:text-slate-700 sm:text-6xl lg:text-[4.5rem]">
            MentoriaHub
          </span>
        </div>
      </div>
    </section>
  );
}
