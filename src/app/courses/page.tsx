'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function CoursesPage() {
  const { courses, progress, completeLesson } = useApp();
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<string | null>(null);

  const currentCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const currentLesson = currentCourse?.lessons[activeLessonIndex];
  const courseProgress = progress[selectedCourseId] || { completedLessons: [], quizAnswers: {} };

  // Курстың жалпы пайыздық прогресін есептеу
  const totalLessons = currentCourse?.lessons.length || 0;
  const completedCount = courseProgress.completedLessons.length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleQuizSubmit = (questionId: string, correctAns: number) => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === correctAns;
    setQuizScore(isCorrect ? "Керемет! Жауап дұрыс. 🎉" : "Қате, қайтадан көріңіз. ❌");

    if (isCorrect) {
      completeLesson(selectedCourseId, currentLesson.id, { [questionId]: selectedOption });
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-fade-in py-4">
      {/* Сол жақ: Курстар мен сабақтар тізімі */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <label className="block text-sm font-semibold mb-2 text-slate-500">Курсты таңдаңыз:</label>
          <select 
            value={selectedCourseId} 
            onChange={(e) => { setSelectedCourseId(e.target.value); setActiveLessonIndex(0); setQuizScore(null); setSelectedOption(null); }}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-medium outline-none"
          >
            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Сабақтар жинағы</h3>
            <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-full">
              {progressPercentage}% бітті
            </span>
          </div>
          {/* Прогресс-бар */}
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
          </div>

          <div className="space-y-2 pt-2">
            {currentCourse?.lessons.map((lesson, idx) => {
              const isCompleted = courseProgress.completedLessons.includes(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => { setActiveLessonIndex(idx); setQuizScore(null); setSelectedOption(null); }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    activeLessonIndex === idx 
                      ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <span className="text-sm truncate">{idx + 1}. {lesson.title}</span>
                  <span className="text-xs shrink-0 ml-2">{isCompleted ? '✅' : lesson.duration}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Оң жақ: Видео Плеер және Тест сұрақтары */}
      <div className="lg:col-span-2 space-y-6">
        {currentLesson ? (
          <>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">{currentLesson.title}</h2>
              
              {/* Видео Ойнатқыш (Сен жіберген YouTube сілтемесі бойынша) */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-inner">
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                ></iframe>
              </div>
            </div>

            {/* Интерактивті Тест Бөлімі */}
            {currentLesson.quiz && currentLesson.quiz.map((q) => (
              <div key={q.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
                <h4 className="font-bold text-base text-slate-800 dark:text-slate-200">🧠 Бекіту тапсырмасы:</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{q.question}</p>
                
                <div className="grid gap-2.5">
                  {q.options.map((option, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => setSelectedOption(oIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                        selectedOption === oIdx
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md font-medium'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => handleQuizSubmit(q.id, q.correctAnswer)}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all"
                  >
                    Жауапты тексеру
                  </button>
                  {quizScore && <span className="text-sm font-bold animate-pulse">{quizScore}</span>}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-12 text-slate-500">Бұл курста әлі сабақтар жоқ.</div>
        )}
      </div>
    </div>
  );
}