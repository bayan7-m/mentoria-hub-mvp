'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Opportunity } from '../../types';

export default function AdminPage() {
  const { opportunities, addOpportunity } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'STEM' | 'Business' | 'Programming' | 'Science' | 'Social Influence' | 'Finance'>('STEM');
  const [format, setFormat] = useState<'Online' | 'Offline' | 'Hybrid'>('Online');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !deadline || !description) return;

    const newOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      title,
      category,
      format,
      grade: [8, 9, 10, 11],
      deadline,
      description,
      requirements: 'Барлық тілек білдірушілерге ашық.',
      applyUrl: '#'
    };

    addOpportunity(newOpp);
    setTitle('');
    setDeadline('');
    setDescription('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in py-4">
      <div>
        <h1 className="text-3xl font-bold">Басқару Панелі (Admin)</h1>
        <p className="text-sm text-slate-500">Mentoria Hub платформасына жаңа мүмкіндіктер мен контентті нақты уақытта қосу[cite: 1].</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Шағын Статистика */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 text-center shadow-sm">
          <div className="text-2xl font-bold text-indigo-600">{opportunities.length}</div>
          <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider mt-1">Жалпы мүмкіндіктер</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 text-center shadow-sm">
          <div className="text-2xl font-bold text-green-600">2</div>
          <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider mt-1">Белсенді курстар</div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 text-center shadow-sm">
          <div className="text-2xl font-bold text-purple-600">Пайдаланушы</div>
          <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider mt-1">Студент рөлі</div>
        </div>
      </div>

      {/* Жаңа мүмкіндік қосу формасы */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Жаңа білім беру мүмкіндігін (Олимпиада/Хакатон) қосу</h3>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Шараның атауы</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Мысалы: Жазғы зерттеу мектебі" className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Дедлайн уақыты</label>
              <input type="date" required value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all"/>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Категория</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 outline-none">
                {['STEM', 'Business', 'Programming', 'Science', 'Social Influence', 'Finance'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Формат</label>
              <select value={format} onChange={(e) => setFormat(e.target.value as any)} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 outline-none">
                {['Online', 'Offline', 'Hybrid'].map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Толық сипаттамасы</label>
            <textarea required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Шараның мақсаты мен талаптары туралы қысқаша жазыңыз..." className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all"></textarea>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button type="submit" className="px-6 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transition-all">
              Платформаға жариялау
            </button>
            {success && <span className="text-sm font-bold text-green-600 animate-bounce">Сәтті қосылды! Мүмкіндіктер каталогын тексеріңіз. 🚀</span>}
          </div>
        </form>
      </div>
    </div>
  );
}