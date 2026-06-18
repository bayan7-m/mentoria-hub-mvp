'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function CoursesPage() {
  const { state, dispatch, getCourseProgressPercent, isLessonCompleted } = useApp();
  const courses = state.courses;
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const currentLesson = currentCourse?.lessons[activeLessonIndex];
  const progressPercentage = currentCourse
    ? getCourseProgressPercent(currentCourse.id)
    : 0;

  const handleQuizSubmit = (questionId: string, correctOptionId: string) => {
    if (!selectedOptionId || !currentCourse || !currentLesson) return;

    const isCorrect = selectedOptionId === correctOptionId;
    setQuizFeedback(
      isCorrect ? 'Керемет! Жауап дұрыс. 🎉' : 'Қате, қайтадан көріңіз. ❌'
    );

    if (isCorrect) {
      dispatch({
        type: 'COMPLETE_LESSON',
        payload: {
          courseId: currentCourse.id,
          lessonId: currentLesson.id,
          quizScore: 100,
        },
      });
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-fade-in py-4">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <label className="block text-sm font-semibold mb-2 text-slate-500">
            Курсты таңдаңыз:
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => {
              setSelectedCourseId(e.target.value);
              setActiveLessonIndex(0);
              setQuizFeedback(null);
              setSelectedOptionId(null);
            }}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-medium outline-none"
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Сабақтар жинағы</h3>
            <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-full">
              {progressPercentage}% бітті
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="space-y-2 pt-2">
            {currentCourse?.lessons.map((lesson, idx) => {
              const completed = isLessonCompleted(currentCourse.id, lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setActiveLessonIndex(idx);
                    setQuizFeedback(null);
                    setSelectedOptionId(null);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    activeLessonIndex === idx
                      ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <span className="text-sm truncate">
                    {idx + 1}. {lesson.title}
                  </span>
                  <span className="text-xs shrink-0 ml-2">
                    {completed ? '✅' : lesson.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        {currentLesson ? (
          <>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">{currentLesson.title}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {currentLesson.description}
              </p>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-inner">
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>

            {currentLesson.quiz.questions.map((q) => (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4"
              >
                <h4 className="font-bold text-base text-slate-800 dark:text-slate-200">
                  🧠 Бекіту тапсырмасы:
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {q.question}
                </p>

                <div className="grid gap-2.5">
                  {q.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOptionId(option.id)}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                        selectedOptionId === option.id
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md font-medium'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => handleQuizSubmit(q.id, q.correctOptionId)}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all"
                  >
                    Жауапты тексеру
                  </button>
                  {quizFeedback && (
                    <span className="text-sm font-bold animate-pulse">{quizFeedback}</span>
                  )}
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
