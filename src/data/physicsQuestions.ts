import { Question, VolumeMeta } from '../types/physics';
import { ALL_QUESTIONS_VOL_1 } from './questionsVol1';
import { ALL_QUESTIONS_VOL_2 } from './questionsVol2';
import { ALL_QUESTIONS_VOL_3 } from './questionsVol3';
import { ALL_QUESTIONS_VOL_4 } from './questionsVol4';

export const VOLUMES_METADATA: VolumeMeta[] = [
  {
    id: 1,
    title: 'Volume 1: Mecânica',
    subtitle: 'Cinemática, Dinâmica, Energia, Momento, Rotação e Gravitação',
    color: 'text-sky-700 dark:text-sky-400',
    accentBg: 'bg-sky-50 border-sky-200 text-sky-800',
    iconName: 'Compass',
    chaptersCount: 13,
  },
  {
    id: 2,
    title: 'Volume 2: Gravitação, Ondas e Termodinâmica',
    subtitle: 'Fluidos, Oscilações, Ondas Mecânicas, Calor e Entropia',
    color: 'text-amber-700 dark:text-amber-400',
    accentBg: 'bg-amber-50 border-amber-200 text-amber-800',
    iconName: 'Flame',
    chaptersCount: 8,
  },
  {
    id: 3,
    title: 'Volume 3: Eletromagnetismo',
    subtitle: 'Campos Elétricos, Gauss, Circuitos, Magnetismo e Indução de Faraday',
    color: 'text-indigo-700 dark:text-indigo-400',
    accentBg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    iconName: 'Zap',
    chaptersCount: 12,
  },
  {
    id: 4,
    title: 'Volume 4: Óptica e Física Moderna',
    subtitle: 'Óptica Geométrica e Física, Relatividade, Fótons e Física Quântica',
    color: 'text-emerald-700 dark:text-emerald-400',
    accentBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    iconName: 'Atom',
    chaptersCount: 11,
  },
];

// Unified database of 420+ physics exercises (105 per session/volume)
export const PHYSICS_QUESTIONS: Question[] = [
  ...ALL_QUESTIONS_VOL_1,
  ...ALL_QUESTIONS_VOL_2,
  ...ALL_QUESTIONS_VOL_3,
  ...ALL_QUESTIONS_VOL_4,
];
