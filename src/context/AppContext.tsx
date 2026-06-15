'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import { AppState, Course, CourseProgress, Grade, Goal, Interest, Opportunity, StudentProfile } from '@/types';
import { MOCK_COURSES, MOCK_OPPORTUNITIES } from '@/lib/mockData';

// ─── Initial State ────────────────────────────────────────────
const INITIAL_PROFILE: StudentProfile = {
  name: 'Amir Seitkali',
  grade: null,
  interests: [],
  goals: [],
  avatar: 'AS',
  onboardingCompleted: false,
};

const INITIAL_STATE: AppState = {
  profile: INITIAL_PROFILE,
  savedOpportunityIds: [],
  courseProgress: {},
  opportunities: MOCK_OPPORTUNITIES,
  courses: MOCK_COURSES,
  theme: 'light',
  adminAuthenticated: false,
};

// ─── Action Types ─────────────────────────────────────────────
type Action =
  | { type: 'HYDRATE'; payload: Partial<AppState> }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'COMPLETE_ONBOARDING'; payload: { name: string; grade: Grade; interests: Interest[]; goals: Goal[] } }
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

// ─── Reducer ──────────────────────────────────────────────────
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

// ─── Context ──────────────────────────────────────────────────
interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  // Computed helpers
  getCourseProgressPercent: (courseId: string) => number;
  isSaved: (opportunityId: string) => boolean;
  isEnrolled: (courseId: string) => boolean;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  getRecommendedOpportunities: () => Opportunity[];
  getRecommendedCourses: () => Course[];
}

const AppContext = createContext<AppContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────
const STORAGE_KEY = 'mentoria_hub_state_v2';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<AppState>;
        // Always use fresh mock data for opportunities/courses but restore user data
        dispatch({
          type: 'HYDRATE',
          payload: {
            profile: saved.profile ?? INITIAL_PROFILE,
            savedOpportunityIds: saved.savedOpportunityIds ?? [],
            courseProgress: saved.courseProgress ?? {},
            theme: saved.theme ?? 'light',
            // opportunities and courses always come from mock (admin additions get re-added separately)
            opportunities: saved.opportunities ?? MOCK_OPPORTUNITIES,
            courses: saved.courses ?? MOCK_COURSES,
          },
        });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to localStorage on every state change
  useEffect(() => {
    try {
      const toSave: Partial<AppState> = {
        profile: state.profile,
        savedOpportunityIds: state.savedOpportunityIds,
        courseProgress: state.courseProgress,
        theme: state.theme,
        opportunities: state.opportunities,
        courses: state.courses,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  // Apply theme to document
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // ── Computed helpers ──────────────────────────────────────
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
    const { interests, grade } = state.profile;
    if (!interests.length && !grade) return state.opportunities.slice(0, 6);
    return state.opportunities
      .filter((o) => {
        const tagMatch = interests.some((i) => o.tags.includes(i));
        const gradeMatch = grade ? o.grades.includes(grade) : true;
        return tagMatch || gradeMatch;
      })
      .slice(0, 6);
  }, [state.opportunities, state.profile]);

  const getRecommendedCourses = useCallback((): Course[] => {
    const { interests } = state.profile;
    if (!interests.length) return state.courses;
    return state.courses.filter((c) =>
      interests.some((i) => c.tags.includes(i))
    );
  }, [state.courses, state.profile]);

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