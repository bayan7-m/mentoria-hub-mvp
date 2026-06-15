// ============================================================
// MENTORIA HUB — TYPE DEFINITIONS
// ============================================================

export type Grade = 8 | 9 | 10 | 11;
export type Interest = 'STEM' | 'Business' | 'Programming' | 'Languages' | 'Social' | 'Finance' | 'Science' | 'Arts';
export type Goal = 'University' | 'Olympiads' | 'Scholarships' | 'Career' | 'Research' | 'Entrepreneurship';
export type OpportunityCategory = 'STEM' | 'Business' | 'Programming' | 'Languages' | 'Social' | 'Finance' | 'Science' | 'Arts';
export type OpportunityFormat = 'Online' | 'Offline' | 'Hybrid';
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

// ─── Quiz ────────────────────────────────────────────────────
export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

// ─── Lesson ──────────────────────────────────────────────────
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  quiz: Quiz;
}

// ─── Course ──────────────────────────────────────────────────
export interface Course {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  category: OpportunityCategory;
  tags: Interest[];
  coverGradient: string;
  lessons: Lesson[];
  instructor: string;
  totalDuration: string;
}

// ─── Opportunity ─────────────────────────────────────────────
export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: OpportunityCategory;
  format: OpportunityFormat;
  deadline: string;        // ISO date string
  description: string;
  requirements: string[];
  tags: Interest[];
  grades: Grade[];
  applyUrl: string;
  prize?: string;
  location?: string;
  coverColor: string;
}

// ─── Student Profile ─────────────────────────────────────────
export interface StudentProfile {
  name: string;
  grade: Grade | null;
  interests: Interest[];
  goals: Goal[];
  avatar: string;
  onboardingCompleted: boolean;
}

// ─── Progress ────────────────────────────────────────────────
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  quizPassed: boolean;
  quizScore: number;      // 0–100
}

export interface CourseProgress {
  courseId: string;
  enrolled: boolean;
  enrolledAt: string;
  lessons: Record<string, LessonProgress>;
  certificateIssued: boolean;
}

// ─── App State ───────────────────────────────────────────────
export interface AppState {
  profile: StudentProfile;
  savedOpportunityIds: string[];
  courseProgress: Record<string, CourseProgress>;
  opportunities: Opportunity[];
  courses: Course[];
  theme: 'light' | 'dark';
  adminAuthenticated: boolean;
}

// ─── Admin ───────────────────────────────────────────────────
export interface AdminStats {
  totalOpportunities: number;
  totalCourses: number;
  totalLessons: number;
  savedByStudents: number;
  enrolledStudents: number;
}