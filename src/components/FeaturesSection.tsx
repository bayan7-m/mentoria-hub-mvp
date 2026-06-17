"use client";

import FeatureCard from "./FeatureCard";
import { useApp } from "../context/AppContext";

const features = [
  {
    title: "Барлық білім додалары бір жерде",
    description: "Олимпиадалар, конкурстар мен бағдарламалар барлық бір платформада шоғырланған.",
  },
  {
    title: "Тәуелсіз әрі икемді оқу форматы",
    description: "Кез келген уақытта оқу, жеке кесте және мобильді қолжетімділік.",
  },
  {
    title: "Интерактивті білімді тексеру",
    description: "Тесттер арқылы білімді тексеріп, оқуды тиімді әрі қызықты етіңіз.",
  },
  {
    title: "Дедлайндарды бақылау",
    description: "Маңызды даталарды және өтінім беруді уақытында орындау үшін бақылауда ұстаңыз.",
  },
];

export default function FeaturesSection() {
  const { t } = useApp();

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_auto] lg:items-start">
        <div className="space-y-6">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-indigo-600">{t('featuresTitle')}</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {t('featuresHeading')}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center lg:pl-12">
          <span className="text-6xl font-black uppercase tracking-[0.35em] text-slate-100 opacity-50 dark:text-slate-700 sm:text-7xl lg:text-[5rem]">
            MentoriaHub
          </span>
        </div>
      </div>
    </section>
  );
}
