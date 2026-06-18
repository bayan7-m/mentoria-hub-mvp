'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Grade, Interest, Language } from '@/types';

const GRADES: Grade[] = [8, 9, 10, 11];
const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'kz', label: 'kz' },
  { value: 'ru', label: 'ru' },
  { value: 'eng', label: 'eng' },
];

const INTEREST_OPTIONS: Interest[] = [
  'UI',
  'STEM',
  'Business',
  'Programming',
  'Science',
  'Social Influence',
  'Finance',
  'ielts sat дайындықты',
];

const inputClass =
  'w-full rounded-full border border-slate-900 dark:border-slate-600 px-4 py-2.5 text-sm bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useApp();
  const [lang, setLang] = useState<Language>('kz');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [iin, setIin] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [grade, setGrade] = useState<Grade | ''>('');
  const [language, setLanguage] = useState<Language>('kz');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [school, setSchool] = useState('');
  const [city, setCity] = useState('');
  const [interests, setInterests] = useState<Interest[]>([]);

  const toggleInterest = (interest: Interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Аты-жөнін енгізіңіз';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Дұрыс email енгізіңіз';
    }
    if (!/^\d{12}$/.test(iin)) newErrors.iin = 'ЖСН 12 сан болуы керек';
    if (!phone.trim()) newErrors.phone = 'Байланыс нөмірін енгізіңіз';
    if (!password) newErrors.password = 'Құпия сөз енгізіңіз';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Құпия сөздер сәйкес келмейді';
    if (!grade) newErrors.grade = 'Сыныпты таңдаңыз';
    if (!dateOfBirth) newErrors.dateOfBirth = 'Туған күнін енгізіңіз';
    if (!school.trim()) newErrors.school = 'Мектеп енгізіңіз';
    if (!city.trim()) newErrors.city = 'Қала енгізіңіз';
    if (!parentName.trim()) newErrors.parentName = 'Ата-ананың аты-жөнін енгізіңіз';
    if (!parentPhone.trim()) newErrors.parentPhone = 'Ата-ананың нөмірін енгізіңіз';
    if (interests.length === 0) newErrors.interests = 'Кемінде бір қызығушылық таңдаңыз';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result = register({
      name: name.trim(),
      email: email.trim(),
      password,
      iin,
      phone: phone.trim(),
      school: school.trim(),
      city: city.trim(),
      language,
      dateOfBirth,
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      grade: grade as Grade,
      interests,
    });

    if (!result.success) {
      setErrors({ email: result.error || 'Тіркелу қатесі' });
      return;
    }
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-10 relative">
          <div className="absolute top-6 right-6 flex gap-2 text-xs font-semibold">
            {LANGUAGES.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setLang(l.value)}
                className={`px-2 py-1 rounded ${
                  lang === l.value ? 'text-indigo-600 font-bold' : 'text-slate-400'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 mt-4">
            Талапкерлерді тіркеу
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Аты-жөні:"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value ? Number(e.target.value) as Grade : '')}
                  className={inputClass}
                >
                  <option value="">Сынып 8/9/10/11</option>
                  {GRADES.map((g) => (
                    <option key={g} value={g}>{g} сынып</option>
                  ))}
                </select>
                {errors.grade && <p className="text-xs text-red-500 mt-1">{errors.grade}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Электрондық пошта:"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className={inputClass}
                  title="Туған күні (кк.аа.жжжж)"
                />
                {errors.dateOfBirth && <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="ЖСН (12 сан болу керек!):"
                  value={iin}
                  onChange={(e) => setIin(e.target.value.replace(/\D/g, '').slice(0, 12))}
                  maxLength={12}
                  className={inputClass}
                />
                {errors.iin && <p className="text-xs text-red-500 mt-1">{errors.iin}</p>}
              </div>
              <div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className={inputClass}
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>Тіл: {l.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Байланыс нөмері:"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Мектеп:"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className={inputClass}
                />
                {errors.school && <p className="text-xs text-red-500 mt-1">{errors.school}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Құпия сөз:"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Қала:"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={inputClass}
                />
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Ата-ананың аты-жөні:"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className={inputClass}
                />
                {errors.parentName && <p className="text-xs text-red-500 mt-1">{errors.parentName}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Құпия сөз растаңыз:"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputClass}
                />
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>

              <div className="sm:col-span-2">
                <input
                  type="tel"
                  placeholder="Ата-ата байланыс нөмері:"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className={inputClass}
                />
                {errors.parentPhone && <p className="text-xs text-red-500 mt-1">{errors.parentPhone}</p>}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3 text-center">Қызығушылық:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {INTEREST_OPTIONS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      interests.includes(interest)
                        ? 'bg-indigo-500 border-indigo-500 text-white'
                        : 'border-slate-900 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              {errors.interests && <p className="text-xs text-red-500 mt-2 text-center">{errors.interests}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#6366F1] hover:bg-indigo-600 text-white font-bold rounded-full transition-all text-lg"
            >
              ТІРКЕЛУ
            </button>

            <div className="text-center">
              <Link href="/login" className="text-sm font-semibold text-indigo-600 hover:underline">
                КІРУ
              </Link>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          @Copyright All Rights Reserved 2024 | 404itu | MENTORIAHUB
        </p>
      </div>
    </div>
  );
}
