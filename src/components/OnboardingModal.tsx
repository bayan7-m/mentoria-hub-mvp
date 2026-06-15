'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, User, BookOpen, Target } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Grade, Goal, Interest } from '@/types';

const INTERESTS: { value: Interest; label: string; emoji: string }[] = [
  { value: 'STEM', label: 'STEM', emoji: '🔬' },
  { value: 'Business', label: 'Business', emoji: '💼' },
  { value: 'Programming', label: 'Programming', emoji: '💻' },
  { value: 'Languages', label: 'Languages', emoji: '🌍' },
  { value: 'Finance', label: 'Finance', emoji: '📈' },
  { value: 'Science', label: 'Science', emoji: '⚗️' },
  { value: 'Social', label: 'Social Impact', emoji: '🤝' },
  { value: 'Arts', label: 'Arts & Design', emoji: '🎨' },
];

const GOALS: { value: Goal; label: string; emoji: string }[] = [
  { value: 'University', label: 'Top University', emoji: '🎓' },
  { value: 'Olympiads', label: 'Win Olympiads', emoji: '🏆' },
  { value: 'Scholarships', label: 'Get Scholarship', emoji: '💰' },
  { value: 'Career', label: 'Career Prep', emoji: '🚀' },
  { value: 'Research', label: 'Research', emoji: '📚' },
  { value: 'Entrepreneurship', label: 'Start a Business', emoji: '💡' },
];

const STEPS = ['welcome', 'grade', 'interests', 'goals'] as const;
type Step = typeof STEPS[number];

export default function OnboardingModal() {
  const { state, dispatch } = useApp();
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<Grade | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  if (state.profile.onboardingCompleted) return null;

  const stepIndex = STEPS.indexOf(step);

  const toggleInterest = (v: Interest) =>
    setInterests((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );

  const toggleGoal = (v: Goal) =>
    setGoals((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );

  const canNext = () => {
    if (step === 'welcome') return name.trim().length >= 2;
    if (step === 'grade') return grade !== null;
    if (step === 'interests') return interests.length >= 1;
    return true;
  };

  const next = () => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
    else finish();
  };

  const back = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  const finish = () => {
    dispatch({
      type: 'COMPLETE_ONBOARDING',
      payload: {
        name: name || 'Student',
        grade: grade!,
        interests,
        goals,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[var(--surface)] rounded-3xl shadow-2xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-[var(--surface2)]">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="p-8">
          {/* STEP: welcome */}
          {step === 'welcome' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg">
                <Sparkles size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-[var(--text)]">Welcome to Mentoria Hub</h2>
                <p className="mt-2 text-[var(--text-muted)] text-sm">
                  Your personal platform for opportunities and learning. Let's set up your profile in 60 seconds.
                </p>
              </div>
              <div className="text-left">
                <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  What's your name?
                </label>
                <div className="mt-2 relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && canNext() && next()}
                    placeholder="e.g. Amir, Aigerim..."
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP: grade */}
          {step === 'grade' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-indigo-500" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[var(--text)]">What grade are you in?</h2>
                  <p className="text-xs text-[var(--text-muted)]">We'll filter opportunities by your grade level</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {([8, 9, 10, 11] as Grade[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`py-6 rounded-2xl text-2xl font-black border-2 transition-all ${
                      grade === g
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 scale-105 shadow-lg'
                        : 'border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] hover:border-indigo-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP: interests */}
          {step === 'interests' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Sparkles size={20} className="text-purple-500" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[var(--text)]">What are your interests?</h2>
                  <p className="text-xs text-[var(--text-muted)]">Pick at least one — select multiple for best results</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {INTERESTS.map(({ value, label, emoji }) => (
                  <button
                    key={value}
                    onClick={() => toggleInterest(value)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-sm font-semibold transition-all ${
                      interests.includes(value)
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                        : 'border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] hover:border-indigo-300'
                    }`}
                  >
                    <span className="text-xl">{emoji}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP: goals */}
          {step === 'goals' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Target size={20} className="text-amber-500" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[var(--text)]">What are your goals?</h2>
                  <p className="text-xs text-[var(--text-muted)]">Optional — helps us prioritize recommendations</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {GOALS.map(({ value, label, emoji }) => (
                  <button
                    key={value}
                    onClick={() => toggleGoal(value)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-sm font-semibold transition-all ${
                      goals.includes(value)
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] hover:border-amber-300'
                    }`}
                  >
                    <span className="text-xl">{emoji}</span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {stepIndex > 0 ? (
              <button
                onClick={back}
                className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                <ChevronLeft size={16} /> Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={next}
              disabled={!canNext()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                canNext()
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/30 hover:scale-105 glow-pulse'
                  : 'bg-[var(--surface2)] text-[var(--text-muted)] cursor-not-allowed'
              }`}
            >
              {step === 'goals' ? 'Get Started' : 'Continue'}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}