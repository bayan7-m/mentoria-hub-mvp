import type { Course, Opportunity } from '../types';

export const mockOpportunities: Opportunity[] = [
  {
    id: 'olympiad-01',
    title: 'Халықаралық математика олимпиадасы',
    organization: 'EduGlobal',
    category: 'STEM',
    format: 'Online',
    deadline: '2026-09-10',
    description: 'Жоғары деңгейдегі математика тапсырмалары, халықаралық талқылаулар және жеңімпаздарға арнайы шәкіртақы.',
    requirements: ['Алдын ала дайындық', 'Жоғары сынып оқушысы'],
    tags: ['STEM', 'Science'],
    grades: [9, 10, 11, 12],
    applyUrl: 'https://example.com/apply/olympiad-01',
    coverColor: '#6366f1',
  },
  {
    id: 'competition-01',
    title: 'Жас программистер байқауы',
    organization: 'CodeArena',
    category: 'Programming',
    format: 'Offline',
    deadline: '2026-07-20',
    description: 'Командалық және жеке жобалар бойынша үздік шыққан қатысушыларға сыйлықтар беріледі.',
    requirements: ['Python немесе JavaScript білімі', 'Топтық жұмысқа дайындық'],
    tags: ['Programming', 'STEM'],
    grades: [8, 9, 10, 11, 12],
    applyUrl: 'https://example.com/apply/competition-01',
    coverColor: '#8b5cf6',
  },
  {
    id: 'scholarship-01',
    title: 'Халықаралық шәкіртақы бағдарламасы',
    organization: 'GlobalFuture',
    category: 'Business',
    format: 'Hybrid',
    deadline: '2026-08-15',
    description: 'Жас көшбасшыларға арналған толық шәкіртақы және менторлық қолдау.',
    requirements: ['Жеке эссе', 'Топтық сұхбат'],
    tags: ['Business', 'Social'],
    grades: [10, 11, 12],
    applyUrl: 'https://example.com/apply/scholarship-01',
    coverColor: '#ec4899',
  },
  {
    id: 'program-01',
    title: 'IELTS дайындық курсы',
    organization: 'LearnPro',
    category: 'Languages',
    format: 'Online',
    deadline: '2026-07-05',
    description: 'IELTS емтиханын жақсы бағамен тапсыруға арналған интерактивті сабақтар мен тапсырмалар.',
    requirements: ['Ағылшын тілінің орта деңгейі'],
    tags: ['Languages'],
    grades: [11, 12],
    applyUrl: 'https://example.com/apply/program-01',
    coverColor: '#10b981',
  },
];

export const mockCourses: Course[] = [
  {
    id: 'math-01',
    title: 'Mathematics Basics',
    description: 'Алгебра және геометрия бойынша маңызды тақырыптарды үйреніңіз.',
    level: 'Beginner',
    category: 'STEM',
    tags: ['STEM', 'Science'],
    coverGradient: 'from-indigo-500 to-violet-500',
    lessons: [
      {
        id: 'math-lesson-1',
        title: 'Алгебра негіздері',
        duration: '20 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Сандық өрнектер және теңдеулер.',
        quiz: {
          questions: [
            {
              id: 'q1',
              question: '2 + 2 = ?',
              options: [
                { id: 'a', text: '3' },
                { id: 'b', text: '4' },
                { id: 'c', text: '5' },
              ],
              correctOptionId: 'b',
              explanation: '2 және 2 қосқанда 4 болады.',
            },
          ],
        },
      },
    ],
    instructor: 'Aida Bek',
    totalDuration: '3 сағат',
  },
  {
    id: 'physics-01',
    title: 'Physics Fundamentals',
    description: 'Ньютон заңдары және энергия туралы түсінік.',
    level: 'Intermediate',
    category: 'STEM',
    tags: ['Science'],
    coverGradient: 'from-sky-500 to-cyan-500',
    lessons: [
      {
        id: 'physics-lesson-1',
        title: 'Ньютон қозғалысы',
        duration: '25 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Қозғалыс заңдары және мысалдар.',
        quiz: {
          questions: [
            {
              id: 'q2',
              question: 'Ньютонның бірінші заңы қандай?',
              options: [
                { id: 'a', text: 'Барлық денелер тыныштықта қалады' },
                { id: 'b', text: 'Әрекет және қарсы әсер' },
                { id: 'c', text: 'Жылдамдық тұрақты қалады' },
              ],
              correctOptionId: 'a',
              explanation: 'Дене сыртқы күш әсер етпесе, тыныштықта қалады.',
            },
          ],
        },
      },
    ],
    instructor: 'Bekzat Nur',
    totalDuration: '4 сағат',
  },
  {
    id: 'programming-01',
    title: 'Programming Essentials',
    description: 'Python және JavaScript негіздері.',
    level: 'Beginner',
    category: 'Programming',
    tags: ['Programming'],
    coverGradient: 'from-fuchsia-500 to-pink-500',
    lessons: [
      {
        id: 'prog-lesson-1',
        title: 'Бағдарламалау логикасы',
        duration: '30 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Негізгі программалау ұғымдары.',
        quiz: {
          questions: [
            {
              id: 'q3',
              question: 'print() функциясы не үшін қажет?',
              options: [
                { id: 'a', text: 'Кіріс алу' },
                { id: 'b', text: 'Шығуды көрсету' },
                { id: 'c', text: 'Өзгермелі құру' },
              ],
              correctOptionId: 'b',
              explanation: 'print функциясы экранға мәтін немесе мән шығару үшін қолданылады.',
            },
          ],
        },
      },
    ],
    instructor: 'Dinara S.',
    totalDuration: '5 сағат',
  },
  {
    id: 'english-01',
    title: 'English Conversation',
    description: 'IELTS және коммуникацияға дайындық.',
    level: 'Intermediate',
    category: 'Languages',
    tags: ['Languages'],
    coverGradient: 'from-emerald-500 to-green-500',
    lessons: [
      {
        id: 'eng-lesson-1',
        title: 'Speaking практикасы',
        duration: '20 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Тыңдау және сөйлеу дағдыларын дамыту.',
        quiz: {
          questions: [
            {
              id: 'q4',
              question: 'How do you say «сәлем» in English?',
              options: [
                { id: 'a', text: 'Hello' },
                { id: 'b', text: 'Goodbye' },
                { id: 'c', text: 'Thank you' },
              ],
              correctOptionId: 'a',
              explanation: '«Сәлем» ағылшын тілінде «Hello» деп аударылады.',
            },
          ],
        },
      },
    ],
    instructor: 'Zhanna D.',
    totalDuration: '6 сағат',
  },
];

