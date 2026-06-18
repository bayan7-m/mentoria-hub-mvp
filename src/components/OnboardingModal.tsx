"use client";

import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import type { Grade, Interest } from "../types";

type Step = "welcome" | "profile" | "interests" | "complete";

const STEPS: Step[] = ["welcome", "profile", "interests", "complete"];

const INTEREST_LABEL_KEYS: Record<Interest, string> = {
  STEM: "interestSTEM",
  Business: "interestBusiness",
  Programming: "interestProgramming",
  Languages: "interestLanguages",
  Social: "interestSocial",
  Finance: "interestFinance",
  Science: "interestScience",
  Arts: "interestArts",
};

export default function OnboardingModal() {
  const { profile, updateProfile, t } = useApp();
  const { isAuthenticated, isReady } = useAuth();
  const [step, setStep] = useState<Step>("welcome");
  const [name, setName] = useState(profile.name || "");
  const [grade, setGrade] = useState<Grade>((profile.grade as Grade) || 8);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>(profile.interests || []);

  if (!isReady || !isAuthenticated || profile?.isOnboarded) return null;

  const stepIndex = STEPS.indexOf(step);

  const handleNext = () => {
    if (step === "welcome") {
      setStep("profile");
      return;
    }

    if (step === "profile") {
      if (!name.trim()) {
        alert(t("onboardingNameRequired"));
        return;
      }
      setStep("interests");
      return;
    }

    if (step === "interests") {
      setStep("complete");
      return;
    }

    updateProfile({
      name: name.trim(),
      grade,
      interests: selectedInterests,
      isOnboarded: true,
    });
  };

  const toggleInterest = (interest: Interest) => {
    setSelectedInterests((current) =>
      current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[28px] border border-slate-100 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {step === "welcome" && (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-black text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-200">
              MH
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t("onboardingWelcome")}</h2>
            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{t("onboardingWelcomeDesc")}</p>
          </div>
        )}

        {step === "profile" && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t("onboardingAboutYou")}</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="onboarding-name" className="mb-1 block text-xs font-semibold text-slate-500">
                  {t("onboardingName")}
                </label>
                <input
                  id="onboarding-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Bayan"
                  className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700"
                />
              </div>
              <div>
                <label htmlFor="onboarding-grade" className="mb-1 block text-xs font-semibold text-slate-500">
                  {t("onboardingGrade")}
                </label>
                <select
                  id="onboarding-grade"
                  value={grade}
                  onChange={(e) => setGrade(Number(e.target.value) as Grade)}
                  className="w-full rounded-xl border border-slate-200 bg-transparent px-4 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
                >
                  {[7, 8, 9, 10, 11, 12].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {step === "interests" && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t("onboardingInterestsQuestion")}</h3>
            <p className="text-xs text-slate-400">{t("onboardingSelectInterests")}</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(INTEREST_LABEL_KEYS) as Interest[]).map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-600 text-white shadow-md"
                        : "border-slate-200 hover:border-slate-400 dark:border-slate-700"
                    }`}
                  >
                    {t(INTEREST_LABEL_KEYS[interest])}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === "complete" && (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-lg font-black text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-200">
              OK
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t("onboardingCompleteTitle")}</h3>
            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{t("onboardingCompleteDesc")}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700"
        >
          {step === "complete" ? t("onboardingFinish") : t("onboardingContinue")}
        </button>
      </div>
    </div>
  );
}
