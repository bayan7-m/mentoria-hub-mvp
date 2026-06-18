'use client';

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

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    try {
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
      }
    } catch {
      // ignore parse errors
    }
  }, []);

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

  const isSaved = useCallback(
    (id: string) => state.savedOpportunityIds.includes(id),
    [state.savedOpportunityIds]
  );

  const isEnrolled = useCallback(
    (courseId: string) => !!state.courseProgress[courseId]?.enrolled,
    [state.courseProgress]
  );

  const isLessonCompleted = useCallback(
    (courseId: string, lessonId: string) =>
      !!state.courseProgress[courseId]?.lessons[lessonId]?.completed,
    [state.courseProgress]
  );

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
