'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Grade, Interest } from '../types';

type Step = 'welcome' | 'profile' | 'interests' | 'goals';
const STEPS: Step[] = ['welcome', 'profile', 'interests', 'goals'];

export default function OnboardingModal() {
  // Ескі const state = useApp() орнына керек нәрселерді тікелей деструктуризация жасаймыз
  const { profile, updateProfile, lang, t } = useApp();
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<Grade>(8);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);

  // Егер қолданушы онбордингтен өтіп қойса (немесе профильде белгіленсе), модалканы көрсетпейміз
  if (profile?.isOnboarded) return null;

  const stepIndex = STEPS.indexOf(step);

  const handleNext = () => {
    if (step === 'welcome') {
      setStep('profile');
    } else if (step === 'profile') {
      if (!name.trim()) return alert(t('onboardingName'));
      setStep('interests');
    } else if (step === 'interests') {
      setStep('goals');
    } else if (step === 'goals') {
      // Соңғы қадамда контекстке сақтаймыз
      updateProfile({
        name,
        grade,
        interests: selectedInterests,
        isOnboarded: true
      });
    }
  };

  const toggleInterest = (interest: Interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

    const interestsList: { id: Interest; kk: string; ru: string; en: string }[] = [
      { id: 'STEM', kk: 'STEM', ru: 'STEM', en: 'STEM' },
      { id: 'Business', kk: 'Бизнестің', ru: 'Бизнес', en: 'Business' },
      { id: 'Programming', kk: 'Бағдарламалау', ru: 'Программирование', en: 'Programming' },
      { id: 'Languages', kk: 'Тілдер', ru: 'Языки', en: 'Languages' },
      { id: 'Social', kk: 'Әлеуметтік', ru: 'Социальное', en: 'Social' },
      { id: 'Finance', kk: 'Қаржы', ru: 'Финансы', en: 'Finance' },
      { id: 'Science', kk: 'Ғылым', ru: 'Наука', en: 'Science' },
      { id: 'Arts', kk: 'Өнер', ru: 'Искусство', en: 'Arts' },
    ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-700 animate-scale-up">
        
        {/* Прогресс бар */}
        <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mb-6">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300" 
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          ></div>
        </div>

        {/* 1-ҚАДАМ: Қош келдіңіз */}
        {step === 'welcome' && (
          <div className="text-center space-y-4">
            <div className="text-4xl">🚀</div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {t('onboardingWelcome')}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('onboardingWelcomeDesc')}
            </p>
          </div>
        )}

        {/* 2-ҚАДАМ: Профиль мәліметтері */}
        {step === 'profile' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('onboardingAboutYou')}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{lang === 'kk' ? 'Есіміңіз' : 'Ваше имя'}</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Bayan"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-indigo-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{lang === 'kk' ? 'Сыныбыңыз (Мектеп)' : 'Ваш класс (Школа)'}</label>
                <select 
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value) as Grade)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none text-sm dark:bg-slate-800"
                >
                  {[7, 8, 9, 10, 11, 12].map(g => (
                    <option key={g} value={g}>{g} {t('studentGrade')}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 3-ҚАДАМ: Қызығушылықтар */}
        {step === 'interests' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('onboardingInterestsQuestion')}
            </h3>
            <p className="text-xs text-slate-400">{t('onboardingSelectInterests')}</p>
            <div className="flex flex-wrap gap-2">
              {interestsList.map(item => {
                const isSelected = selectedInterests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleInterest(item.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
                      isSelected 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {lang === 'kk' ? item.kk : lang === 'ru' ? item.ru : item.en}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4-ҚАДАМ: Мақсаттар */}
        {step === 'goals' && (
          <div className="text-center space-y-4">
            <div className="text-4xl">🎯</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t('onboardingCompleteTitle')}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('onboardingCompleteDesc')}
            </p>
          </div>
        )}

        {/* Төменгі батырма */}
        <button
          onClick={handleNext}
          className="w-full mt-6 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transition-all text-sm"
        >
          {step === 'goals' ? t('onboardingFinish') : t('onboardingContinue')}
        </button>

      </div>
    </div>
  );
}