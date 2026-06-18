"use client";

<<<<<<< HEAD
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import {
  AppState,
  Course,
  CourseProgress,
  Grade,
  Goal,
  Interest,
  LoginPayload,
  Opportunity,
  RegisterPayload,
  StudentProfile,
} from '@/types';
import { MOCK_COURSES, MOCK_OPPORTUNITIES } from '@/lib/mockData';

const GUEST_PROFILE: StudentProfile = {
  name: '',
  email: '',
  iin: '',
  phone: '',
  school: '',
  city: '',
  language: 'kz',
  dateOfBirth: '',
  parentName: '',
  parentPhone: '',
  grade: null,
  interests: [],
  goals: [],
  avatar: '',
  onboardingCompleted: false,
};

const INITIAL_STATE: AppState = {
  profile: GUEST_PROFILE,
  savedOpportunityIds: [],
  courseProgress: {},
  opportunities: MOCK_OPPORTUNITIES,
  courses: MOCK_COURSES,
  theme: 'light',
  adminAuthenticated: false,
  registeredUsers: [],
  isAuthenticated: false,
  currentUserEmail: null,
};

type Action =
  | { type: 'HYDRATE'; payload: Partial<AppState> }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'COMPLETE_ONBOARDING'; payload: { name: string; grade: Grade; interests: Interest[]; goals: Goal[] } }
  | { type: 'REGISTER'; payload: RegisterPayload }
  | { type: 'LOGIN'; payload: LoginPayload }
  | { type: 'LOGOUT' }
  | { type: 'TOGGLE_SAVE_OPPORTUNITY'; payload: string }
  | { type: 'ENROLL_COURSE'; payload: string }
  | { type: 'COMPLETE_LESSON'; payload: { courseId: string; lessonId: string; quizScore: number } }
  | { type: 'ISSUE_CERTIFICATE'; payload: string }
  | { type: 'ADD_OPPORTUNITY'; payload: Opportunity }
  | { type: 'UPDATE_OPPORTUNITY'; payload: Opportunity }
  | { type: 'DELETE_OPPORTUNITY'; payload: string }
  | { type: 'ADD_COURSE'; payload: Course }
  | { type: 'UPDATE_COURSE'; payload: Course }
  | { type: 'DELETE_COURSE'; payload: string }
  | { type: 'SET_ADMIN'; payload: boolean }
  | { type: 'UPDATE_PROFILE'; payload: Partial<StudentProfile> };

function buildProfileFromRegister(data: RegisterPayload): StudentProfile {
  return {
    name: data.name,
    email: data.email,
    iin: data.iin,
    phone: data.phone,
    school: data.school,
    city: data.city,
    language: data.language,
    dateOfBirth: data.dateOfBirth,
    parentName: data.parentName,
    parentPhone: data.parentPhone,
    grade: data.grade,
    interests: data.interests,
    goals: [],
    avatar: data.name.slice(0, 2).toUpperCase(),
    onboardingCompleted: true,
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        profile: {
          ...state.profile,
          name: action.payload.name,
          grade: action.payload.grade,
          interests: action.payload.interests,
          goals: action.payload.goals,
          onboardingCompleted: true,
          avatar: action.payload.name.slice(0, 2).toUpperCase(),
        },
      };

    case 'REGISTER': {
      const profile = buildProfileFromRegister(action.payload);
      const newUser = {
        email: action.payload.email,
        password: action.payload.password,
        profile,
      };
      const filtered = state.registeredUsers.filter(
        (u) => u.email !== action.payload.email
      );
      return {
        ...state,
        registeredUsers: [...filtered, newUser],
        profile,
        isAuthenticated: true,
        currentUserEmail: action.payload.email,
      };
    }

    case 'LOGIN': {
      const user = state.registeredUsers.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      if (!user) return state;
      return {
        ...state,
        profile: user.profile,
        isAuthenticated: true,
        currentUserEmail: user.email,
      };
    }

    case 'LOGOUT':
      return {
        ...state,
        profile: GUEST_PROFILE,
        isAuthenticated: false,
        currentUserEmail: null,
      };

    case 'UPDATE_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.payload } };

    case 'TOGGLE_SAVE_OPPORTUNITY': {
      const id = action.payload;
      const saved = state.savedOpportunityIds.includes(id)
        ? state.savedOpportunityIds.filter((x) => x !== id)
        : [...state.savedOpportunityIds, id];
      return { ...state, savedOpportunityIds: saved };
    }

    case 'ENROLL_COURSE': {
      const courseId = action.payload;
      if (state.courseProgress[courseId]?.enrolled) return state;
      const newProgress: CourseProgress = {
        courseId,
        enrolled: true,
        enrolledAt: new Date().toISOString(),
        lessons: {},
        certificateIssued: false,
      };
      return {
        ...state,
        courseProgress: { ...state.courseProgress, [courseId]: newProgress },
      };
    }

    case 'COMPLETE_LESSON': {
      const { courseId, lessonId, quizScore } = action.payload;
      const existing = state.courseProgress[courseId] || {
        courseId,
        enrolled: true,
        enrolledAt: new Date().toISOString(),
        lessons: {},
        certificateIssued: false,
      };
      return {
        ...state,
        courseProgress: {
          ...state.courseProgress,
          [courseId]: {
            ...existing,
            lessons: {
              ...existing.lessons,
              [lessonId]: {
                lessonId,
                completed: true,
                quizPassed: quizScore >= 50,
                quizScore,
              },
            },
          },
        },
      };
    }

    case 'ISSUE_CERTIFICATE': {
      const courseId = action.payload;
      if (!state.courseProgress[courseId]) return state;
      return {
        ...state,
        courseProgress: {
          ...state.courseProgress,
          [courseId]: { ...state.courseProgress[courseId], certificateIssued: true },
        },
      };
    }

    case 'ADD_OPPORTUNITY':
      return { ...state, opportunities: [...state.opportunities, action.payload] };

    case 'UPDATE_OPPORTUNITY':
      return {
        ...state,
        opportunities: state.opportunities.map((o) =>
          o.id === action.payload.id ? action.payload : o
        ),
      };

    case 'DELETE_OPPORTUNITY':
      return {
        ...state,
        opportunities: state.opportunities.filter((o) => o.id !== action.payload),
      };

    case 'ADD_COURSE':
      return { ...state, courses: [...state.courses, action.payload] };

    case 'UPDATE_COURSE':
      return {
        ...state,
        courses: state.courses.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case 'DELETE_COURSE':
      return {
        ...state,
        courses: state.courses.filter((c) => c.id !== action.payload),
      };

    case 'SET_ADMIN':
      return { ...state, adminAuthenticated: action.payload };

    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  getCourseProgressPercent: (courseId: string) => number;
  isSaved: (opportunityId: string) => boolean;
  isEnrolled: (courseId: string) => boolean;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  getRecommendedOpportunities: () => Opportunity[];
  getRecommendedCourses: () => Course[];
  login: (payload: LoginPayload) => boolean;
  register: (payload: RegisterPayload) => { success: boolean; error?: string };
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = 'mentoria_hub_state_v3';
=======
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
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721

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

  const supportedLangs: Language[] = ["kk", "ru", "en"];

  useEffect(() => {
    try {
<<<<<<< HEAD
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<AppState>;
        dispatch({
          type: 'HYDRATE',
          payload: {
            profile: saved.profile ?? GUEST_PROFILE,
            savedOpportunityIds: saved.savedOpportunityIds ?? [],
            courseProgress: saved.courseProgress ?? {},
            theme: saved.theme ?? 'light',
            registeredUsers: saved.registeredUsers ?? [],
            isAuthenticated: saved.isAuthenticated ?? false,
            currentUserEmail: saved.currentUserEmail ?? null,
            opportunities: saved.opportunities ?? MOCK_OPPORTUNITIES,
            courses: saved.courses ?? MOCK_COURSES,
          },
        });
=======
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

      if (storedLang && supportedLangs.includes(storedLang as Language)) {
        setLangState(storedLang as Language);
      } else if (typeof navigator !== "undefined") {
        const browserCode = (navigator.language || "").slice(0, 2) as Language;
        const initialLang = supportedLangs.includes(browserCode) ? browserCode : "kk";
        setLangState(initialLang);
        localStorage.setItem("mentoria_lang", initialLang);
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
      }
    } catch (e) {
      // ignore localStorage parsing errors
    }
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    try {
      const toSave: Partial<AppState> = {
        profile: state.profile,
        savedOpportunityIds: state.savedOpportunityIds,
        courseProgress: state.courseProgress,
        theme: state.theme,
        opportunities: state.opportunities,
        courses: state.courses,
        registeredUsers: state.registeredUsers,
        isAuthenticated: state.isAuthenticated,
        currentUserEmail: state.currentUserEmail,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  const getCourseProgressPercent = useCallback(
    (courseId: string): number => {
      const course = state.courses.find((c) => c.id === courseId);
      if (!course) return 0;
      const progress = state.courseProgress[courseId];
      if (!progress) return 0;
      const total = course.lessons.length;
      if (total === 0) return 0;
      const done = course.lessons.filter(
        (l) => progress.lessons[l.id]?.completed
      ).length;
      return Math.round((done / total) * 100);
    },
    [state.courses, state.courseProgress]
  );
=======
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
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721

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

<<<<<<< HEAD
  const getRecommendedOpportunities = useCallback((): Opportunity[] => {
    const { interests } = state.profile;
    if (!interests.length) return state.opportunities;

    const matched = state.opportunities.filter((o) =>
      interests.some(
        (i) => o.category === i || o.tags.includes(i)
      )
    );
    const unmatched = state.opportunities.filter(
      (o) =>
        !interests.some(
          (i) => o.category === i || o.tags.includes(i)
        )
    );
    return [...matched, ...unmatched];
  }, [state.opportunities, state.profile]);

  const getRecommendedCourses = useCallback((): Course[] => {
    const { interests } = state.profile;
    if (!interests.length) return state.courses;
    return state.courses.filter((c) =>
      interests.some((i) => c.tags.includes(i) || c.category === i)
    );
  }, [state.courses, state.profile]);
=======
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
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721

  const login = useCallback(
    (payload: LoginPayload): boolean => {
      const user = state.registeredUsers.find(
        (u) => u.email === payload.email && u.password === payload.password
      );
      if (!user) return false;
      dispatch({ type: 'LOGIN', payload });
      return true;
    },
    [state.registeredUsers]
  );

  const register = useCallback(
    (payload: RegisterPayload): { success: boolean; error?: string } => {
      const exists = state.registeredUsers.some((u) => u.email === payload.email);
      if (exists) {
        return { success: false, error: 'Бұл email тіркелген' };
      }
      dispatch({ type: 'REGISTER', payload });
      return { success: true };
    },
    [state.registeredUsers]
  );

  return (
    <AppContext.Provider
      value={{
<<<<<<< HEAD
        state,
        dispatch,
        getCourseProgressPercent,
        isSaved,
        isEnrolled,
        isLessonCompleted,
        getRecommendedOpportunities,
        getRecommendedCourses,
        login,
        register,
=======
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
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
      }}
    >
      <div className={theme === "dark" ? "dark bg-slate-900 text-white min-h-screen" : "bg-slate-50 text-slate-900 min-h-screen"}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
<<<<<<< HEAD
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
=======
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
}
