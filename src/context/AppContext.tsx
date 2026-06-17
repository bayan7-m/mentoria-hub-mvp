"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Opportunity, Course, UserProfile, UserProgress, Goal, Interest } from "../types";
import { mockOpportunities, mockCourses } from "../lib/mockData";
import { translations } from "../lib/translations";

export type Language = "kk" | "ru" | "en";

interface AppContextType {
  opportunities: Opportunity[];
  courses: Course[];
  favorites: string[];
  progress: { [courseId: string]: UserProgress };
  profile: UserProfile;
  theme: "light" | "dark";
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  toggleTheme: () => void;
  toggleFavorite: (id: string) => void;
  completeLesson: (
    courseId: string,
    lessonId: string,
    quizAnswers: { [quizId: string]: string }
  ) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addOpportunity: (opp: Opportunity) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [courses] = useState<Course[]>(mockCourses);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [progress, setProgress] = useState<{ [courseId: string]: UserProgress }>({});
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLangState] = useState<Language>("kk");
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    grade: 8,
    interests: [] as Interest[],
    goals: [] as Goal[],
    avatar: "",
    isOnboarded: false,
  });

  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem("mentoria_favs");
      const storedProgress = localStorage.getItem("mentoria_progress");
      const storedProfile = localStorage.getItem("mentoria_profile");
      const storedTheme = localStorage.getItem("mentoria_theme");
      const storedLang = localStorage.getItem("mentoria_lang");
      const storedOpps = localStorage.getItem("mentoria_opps");

      if (storedFavs) setFavorites(JSON.parse(storedFavs));
      if (storedProgress) setProgress(JSON.parse(storedProgress));
      if (storedProfile) setProfile(JSON.parse(storedProfile));
      if (storedTheme) setTheme(JSON.parse(storedTheme) as "light" | "dark");
      if (storedOpps) setOpportunities(JSON.parse(storedOpps));

      const supportedLangs: Language[] = ["kk", "ru", "en"];

      if (storedLang && supportedLangs.includes(storedLang as Language)) {
        setLangState(storedLang as Language);
      } else if (typeof navigator !== "undefined") {
        const browserCode = (navigator.language || "").slice(0, 2) as Language;
        const initialLang = supportedLangs.includes(browserCode) ? browserCode : "kk";
        setLangState(initialLang);
        localStorage.setItem("mentoria_lang", initialLang);
      }
    } catch (e) {
      // ignore localStorage parsing errors
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("mentoria_lang", newLang);
    } catch (e) {}
  };

  const t = (key: string) => {
    return (translations as any)[lang]?.[key] ?? key;
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    try {
      localStorage.setItem("mentoria_theme", JSON.stringify(nextTheme));
    } catch (e) {}
  };

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id) ? favorites.filter((fId) => fId !== id) : [...favorites, id];
    setFavorites(updated);
    try {
      localStorage.setItem("mentoria_favs", JSON.stringify(updated));
    } catch (e) {}
  };

  const completeLesson = (
    courseId: string,
    lessonId: string,
    quizAnswers: { [quizId: string]: string }
  ) => {
    const currentCourseProgress = progress[courseId] || { completedLessons: [], quizAnswers: {} };
    const updatedLessons = currentCourseProgress.completedLessons.includes(lessonId)
      ? currentCourseProgress.completedLessons
      : [...currentCourseProgress.completedLessons, lessonId];

    const updatedProgress = {
      ...progress,
      [courseId]: {
        completedLessons: updatedLessons,
        quizAnswers: { ...currentCourseProgress.quizAnswers, ...quizAnswers },
      },
    };
    setProgress(updatedProgress);
    try {
      localStorage.setItem("mentoria_progress", JSON.stringify(updatedProgress));
    } catch (e) {}
  };

  const updateProfile = (fields: Partial<UserProfile>) => {
    const updated = { ...profile, ...fields };
    setProfile(updated);
    try {
      localStorage.setItem("mentoria_profile", JSON.stringify(updated));
    } catch (e) {}
  };

  const addOpportunity = (opp: Opportunity) => {
    const updated = [opp, ...opportunities];
    setOpportunities(updated);
    try {
      localStorage.setItem("mentoria_opps", JSON.stringify(updated));
    } catch (e) {}
  };

  return (
    <AppContext.Provider
      value={{
        opportunities,
        courses,
        favorites,
        progress,
        profile,
        theme,
        lang,
        setLang,
        t,
        toggleTheme,
        toggleFavorite,
        completeLesson,
        updateProfile,
        addOpportunity,
      }}
    >
      <div className={theme === "dark" ? "dark bg-slate-900 text-white min-h-screen" : "bg-slate-50 text-slate-900 min-h-screen"}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
