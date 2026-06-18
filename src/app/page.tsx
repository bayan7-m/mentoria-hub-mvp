'use client';

<<<<<<< HEAD
import React from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';

export default function LandingPage() {
  const { state } = useApp();
  const profile = state.profile;
=======
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721

export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
<<<<<<< HEAD
      <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Білім Мүмкіндіктері Мен Асинхронды Оқу Бір Жерде
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {profile.name ? `Қош келдіңіз, ${profile.name}! ` : ''}
          Mentoria Hub көмегімен халықаралық олимпиадаларды, хакатондарды тауып, IELTS пен SAT емтихандарына кез келген уақытта дайындалыңыз.
        </p>
        <div className="flex justify-center space-x-4 pt-2">
          <Link href="/opportunities" className="px-6 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5">
            Мүмкіндіктерді Табу
          </Link>
          <Link href="/courses" className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5">
            Оқуды Бастау
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Неліктен Mentoria Hub?</h2>
          <ul className="space-y-5">
            <li className="flex items-start bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl transition-all hover:scale-[1.01]">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-3 text-lg mt-0.5">✓</span>
              <div>
                <strong className="block text-slate-800 dark:text-slate-200 font-semibold mb-0.5">Асинхронды формат:</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Сабақтарға тікелей қатыса алмасаңыз да, бейне-дәрістер мен тесттер арқылы өз уақытыңызда білім алыңыз.
                </span>
              </div>
            </li>
            <li className="flex items-start bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl transition-all hover:scale-[1.01]">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-3 text-lg mt-0.5">✓</span>
              <div>
                <strong className="block text-slate-800 dark:text-slate-200 font-semibold mb-0.5">Шашыраңқы ақпараттың жиналуы:</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Бүкіл жазғы мектептер, хакатондар мен шәкіртақылар бір орталықтандырылған каталогта жинақталған.
                </span>
              </div>
            </li>
            <li className="flex items-start bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl transition-all hover:scale-[1.01]">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-3 text-lg mt-0.5">✓</span>
              <div>
                <strong className="block text-slate-800 dark:text-slate-200 font-semibold mb-0.5">Ақылды ұсыныстар:</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Профиліңіз бен жеке қызығушылықтарыңызға сай білім беру бағыттарын автоматты түрде таңдау жүйесі.
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white p-8 text-center shadow-md relative overflow-hidden min-h-[260px]">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-purple-400/20 rounded-full blur-lg"></div>
          <p className="text-lg font-medium leading-relaxed relative z-10 italic">
            &quot;Telegram топтары мен шектеулі жанды звоноктардан тыс, халықаралық деңгейде еркін масштабталатын заманауи цифрлық экожүйе.&quot;
          </p>
        </div>
      </div>
=======
      <Hero />
      <FeaturesSection />
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
    </div>
  );
}
