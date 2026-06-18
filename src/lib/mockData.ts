import { Course, Opportunity } from '@/types';

export const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Қазақстандық STEM олимпиадасы',
    organization: 'ҚР Білім және ғылым министрлігі',
    category: 'STEM',
    format: 'Online',
    deadline: '2026-09-15',
    description:
      'Математика, физика және химия бойынша республикалық олимпиада. Жеңімпаздар халықаралық деңгейге қатыса алады.',
    requirements: ['9–11 сынып оқушылары', 'Мектеп ұсынысы'],
    tags: ['STEM'],
    grades: [9, 10, 11],
    applyUrl: 'https://example.com/stem-olympiad',
    prize: 'Грант және сертификат',
    coverColor: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'opp-2',
    title: 'Astana Hub Startup Weekend',
    organization: 'Astana Hub',
    category: 'Business',
    format: 'Offline',
    deadline: '2026-07-20',
    description:
      '48 сағаттық стартап хакатоны. Бизнес-идеаларды дамыту, питчинг және инвесторлармен кездесу.',
    requirements: ['16+ жас', 'Топ құру (3–5 адам)'],
    tags: ['Business'],
    grades: [10, 11],
    applyUrl: 'https://example.com/startup-weekend',
    location: 'Астана',
    coverColor: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'opp-3',
    title: 'Kazakhstan Code Challenge',
    organization: 'IT Community KZ',
    category: 'Programming',
    format: 'Online',
    deadline: '2026-08-01',
    description:
      'Алгоритмдер мен программалау бойынша онлайн хакатон. Python, Java және C++ тілдерінде шешімдер.',
    requirements: ['Программалау негіздері', 'GitHub аккаунты'],
    tags: ['Programming'],
    grades: [8, 9, 10, 11],
    applyUrl: 'https://example.com/code-challenge',
    prize: '10 000 000 ₸ грант',
    coverColor: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'opp-4',
    title: 'Жас зерттеуші — Ғылыми жоба конкурсы',
    organization: 'Ғылым Академиясы',
    category: 'Science',
    format: 'Hybrid',
    deadline: '2026-10-30',
    description:
      'Зерттеу жобалары бойынша республикалық конкурс. Биология, экология және физика бағыттары.',
    requirements: ['Зерттеу жобасы', 'Мектеп ғылыми жетекшісі'],
    tags: ['Science'],
    grades: [9, 10, 11],
    applyUrl: 'https://example.com/young-researcher',
    location: 'Алматы',
    coverColor: 'from-violet-500 to-purple-600',
  },
  {
    id: 'opp-5',
    title: 'Social Impact Youth Forum',
    organization: 'UNICEF Kazakhstan',
    category: 'Social Influence',
    format: 'Offline',
    deadline: '2026-06-25',
    description:
      'Қоғамдық өзгерістерге ықпал ететін жобалар конкурсы. Волонтерлік және әлеуметтік кәсіпкерлік.',
    requirements: ['Жас әлеуметтік жоба', '16+ жас'],
    tags: ['Social Influence'],
    grades: [10, 11],
    applyUrl: 'https://example.com/social-impact',
    location: 'Алматы',
    coverColor: 'from-pink-500 to-rose-600',
  },
  {
    id: 'opp-6',
    title: 'Finance Literacy Olympiad',
    organization: 'Қазақстан Банкі',
    category: 'Finance',
    format: 'Online',
    deadline: '2026-11-15',
    description:
      'Қаржылық сауаттылық, инвестиция және экономика бойынша олимпиада. Сертификат және стипендия.',
    requirements: ['10–11 сынып', 'Математика білімі'],
    tags: ['Finance'],
    grades: [10, 11],
    applyUrl: 'https://example.com/finance-olympiad',
    prize: 'Стипендия 500 000 ₸',
    coverColor: 'from-amber-500 to-orange-600',
  },
  {
    id: 'opp-7',
    title: 'IELTS Mock Marathon',
    organization: 'British Council KZ',
    category: 'ielts sat дайындықты',
    format: 'Online',
    deadline: '2026-07-10',
    description:
      'IELTS форматындағы тест марафоны. Listening, Reading, Writing және Speaking дағдыларын тексеру.',
    requirements: ['Ағылшын тілі B1+', 'Онлайн қатысу'],
    tags: ['ielts sat дайындықты'],
    grades: [9, 10, 11],
    applyUrl: 'https://example.com/ielts-marathon',
    coverColor: 'from-sky-500 to-blue-600',
  },
  {
    id: 'opp-8',
    title: 'SAT Prep Scholarship Program',
    organization: 'Education USA',
    category: 'ielts sat дайындықты',
    format: 'Online',
    deadline: '2026-08-20',
    description:
      'SAT емтиханына дайындық грант бағдарламасы. Америка университеттеріне түсуге көмек.',
    requirements: ['11 сынып', 'Ағылшын тілі', 'Математика'],
    tags: ['ielts sat дайындықты'],
    grades: [11],
    applyUrl: 'https://example.com/sat-scholarship',
    prize: 'Толық дайындық курсы',
    coverColor: 'from-indigo-600 to-blue-700',
  },
  {
    id: 'opp-9',
    title: 'Robotics Championship KZ',
    organization: 'RoboKZ Federation',
    category: 'STEM',
    format: 'Offline',
    deadline: '2026-09-01',
    description:
      'Робототехника чемпионаты. Arduino, LEGO Mindstorms және өз роботыңызды құру.',
    requirements: ['STEM қызығушылығы', 'Топ (2–4 адам)'],
    tags: ['STEM', 'Programming'],
    grades: [8, 9, 10, 11],
    applyUrl: 'https://example.com/robotics',
    location: 'Астана',
    prize: 'Робот жинағы',
    coverColor: 'from-slate-600 to-slate-800',
  },
  {
    id: 'opp-10',
    title: 'Summer Internship — IT Companies',
    organization: 'Kaspi Tech',
    category: 'Programming',
    format: 'Offline',
    deadline: '2026-05-30',
    description:
      'IT компаниялардағы жазғы стажировка. Backend, Frontend және Data Science бағыттары.',
    requirements: ['11 сынып', 'Программалау білімі', 'GitHub portfolio'],
    tags: ['Programming', 'Business'],
    grades: [11],
    applyUrl: 'https://example.com/it-internship',
    location: 'Алматы',
    coverColor: 'from-teal-500 to-emerald-600',
  },
];

function makeQuiz(
  id: string,
  question: string,
  options: string[],
  correctIndex: number,
  explanation: string
) {
  return {
    questions: [
      {
        id,
        question,
        options: options.map((text, i) => ({ id: `opt-${i}`, text })),
        correctOptionId: `opt-${correctIndex}`,
        explanation,
      },
    ],
  };
}

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Академиялық жетістікке арналған ағылшын тілі',
    description:
      'Академиялық мәтіндерді оқу, эссе жазу және презентация дағдыларын дамыту. Университетке түсуге дайындық.',
    level: 'Intermediate',
    category: 'ielts sat дайындықты',
    tags: ['ielts sat дайындықты'],
    coverGradient: 'from-indigo-500 to-purple-600',
    instructor: 'Айгүл Нұрланова',
    totalDuration: '6 сағат',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Академиялық ағылшын тілінің негіздері',
        duration: '15 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description:
          'Академиялық мәтіндердің құрылымы, формальный стиль және негізгі грамматика ережелері.',
        quiz: makeQuiz(
          'q1-1',
          'Академиялық мәтінде қандай стиль қолданылады?',
          ['Формальный (Formal)', 'Кәдімгі (Casual)', 'Юмористік', 'Поэтикалық'],
          0,
          'Академиялық мәтіндерде формальный стиль қолданылады.'
        ),
      },
      {
        id: 'lesson-1-2',
        title: 'Эссе жазу техникасы',
        duration: '20 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Introduction, body paragraphs және conclusion құрылымы. Thesis statement жазу.',
        quiz: makeQuiz(
          'q1-2',
          'Эссенің негізгі бөлігі қандай?',
          ['Introduction', 'Body paragraphs', 'Conclusion', 'References'],
          1,
          'Body paragraphs — эссенің негізгі аргументтер бөлімі.'
        ),
      },
      {
        id: 'lesson-1-3',
        title: 'Презентация дағдылары',
        duration: '18 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Публичное выступление, слайд дизайні және audience engagement техникалары.',
        quiz: makeQuiz(
          'q1-3',
          'Жақсы презентацияда не маңызды?',
          ['Көп мәтін', 'Визуалды материал', 'Ұзақ монолог', 'Техникалық терминдер'],
          1,
          'Визуалды материал аудиторияны тартады.'
        ),
      },
      {
        id: 'lesson-1-4',
        title: 'Академиялық оқу стратегиялары',
        duration: '22 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Active reading, note-taking және critical thinking дағдыларын дамыту.',
        quiz: makeQuiz(
          'q1-4',
          'Active reading деген не?',
          ['Жылдам оқу', 'Белсенді оқу және талдау', 'Қайта оқу', 'Аудио тыңдау'],
          1,
          'Active reading — мәтінді талдау және белсенді оқу.'
        ),
      },
    ],
  },
  {
    id: 'course-2',
    title: 'IELTS/SAT дайындық курсы',
    description:
      'IELTS және SAT емтихандарына жүйелі дайындық. Тест стратегиялары, уақыт басқару және практикалық тапсырмалар.',
    level: 'Advanced',
    category: 'ielts sat дайындықты',
    tags: ['ielts sat дайындықты'],
    coverGradient: 'from-sky-500 to-blue-600',
    instructor: 'Марат Бекенов',
    totalDuration: '8 сағат',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'IELTS Listening стратегиялары',
        duration: '25 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Listening тестінің құрылымы, prediction техникасы және common traps.',
        quiz: makeQuiz(
          'q2-1',
          'IELTS Listening неше бөлімден тұрады?',
          ['2', '3', '4', '5'],
          2,
          'IELTS Listening 4 бөлімден тұрады.'
        ),
      },
      {
        id: 'lesson-2-2',
        title: 'IELTS Reading техникалары',
        duration: '30 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Skimming, scanning және matching headings стратегиялары.',
        quiz: makeQuiz(
          'q2-2',
          'Scanning деген не?',
          ['Жылдам оқу', 'Нақты ақпарат іздеу', 'Қайта оқу', 'Жазу'],
          1,
          'Scanning — нақты ақпаратты жылдам іздеу.'
        ),
      },
      {
        id: 'lesson-2-3',
        title: 'SAT Math негіздері',
        duration: '35 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Algebra, geometry және data analysis. SAT Math форматындағы тапсырмалар.',
        quiz: makeQuiz(
          'q2-3',
          'SAT Math неше сұрақтан тұрады?',
          ['40', '44', '58', '60'],
          2,
          'SAT Math 58 сұрақтан тұрады.'
        ),
      },
      {
        id: 'lesson-2-4',
        title: 'Writing & Essay дағдылары',
        duration: '28 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'IELTS Writing Task 1 & 2, SAT Essay структурасы және scoring criteria.',
        quiz: makeQuiz(
          'q2-4',
          'IELTS Writing Task 2 неге арналған?',
          ['Graph сипаттау', 'Эссе жазу', 'Letter жазу', 'Summary'],
          1,
          'Task 2 — эссе жазуға арналған.'
        ),
      },
    ],
  },
  {
    id: 'course-3',
    title: 'Программалау негіздері',
    description:
      'Python тілінде программалау негіздері. Алгоритмдер, деректер құрылымдары және жоба жасау.',
    level: 'Beginner',
    category: 'Programming',
    tags: ['Programming', 'STEM'],
    coverGradient: 'from-emerald-500 to-teal-600',
    instructor: 'Ерлан Сәтбаев',
    totalDuration: '7 сағат',
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'Python кіріспе',
        duration: '20 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Python орнату, variables, data types және basic operations.',
        quiz: makeQuiz(
          'q3-1',
          'Python-да мәтінді көрсету функциясы?',
          ['print()', 'echo()', 'write()', 'show()'],
          0,
          'print() функциясы мәтінді көрсетеді.'
        ),
      },
      {
        id: 'lesson-3-2',
        title: 'Шарттар және циклдар',
        duration: '25 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'if/else, for және while циклдары. Логикалық операторлар.',
        quiz: makeQuiz(
          'q3-2',
          'for циклы не үшін қолданылады?',
          ['Шарт тексеру', 'Қайталау', 'Функция жазу', 'Деректер сақтау'],
          1,
          'for циклы қайталау үшін қолданылады.'
        ),
      },
      {
        id: 'lesson-3-3',
        title: 'Функциялар және модульдер',
        duration: '22 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Функциялар жазу, parameters, return values және import модули.',
        quiz: makeQuiz(
          'q3-3',
          'Функция не қайтарады?',
          ['Variable', 'Return value', 'Loop', 'Class'],
          1,
          'Функция return value қайтарады.'
        ),
      },
      {
        id: 'lesson-3-4',
        title: 'Жоба: Калькулятор жасау',
        duration: '30 мин',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Практикалық жоба — Python калькулятор. Барлық білімді біріктіру.',
        quiz: makeQuiz(
          'q3-4',
          'Калькулятор жобасында не қажет?',
          ['Тек print()', 'Input және операциялар', 'Тек цикл', 'Тек функция'],
          1,
          'Input және математикалық операциялар қажет.'
        ),
      },
    ],
  },
];
