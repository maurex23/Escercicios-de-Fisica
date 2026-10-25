export type VolumeId = 1 | 2 | 3 | 4;

export type Difficulty = 'Fácil' | 'Médio' | 'Difícil';

export type DiagramType = 
  | 'projectile_motion'
  | 'incline_plane'
  | 'harmonic_oscillator'
  | 'heat_engine'
  | 'charge_field'
  | 'rc_circuit'
  | 'prism_refraction'
  | 'photoelectric';

export interface QuestionOption {
  id: string;
  label: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  text: string;
  isCorrect: boolean;
}

export interface QuestionExplanation {
  keyFormula: string;
  principles: string[];
  givenData: Record<string, string>;
  algebraicSteps: string[];
  numericalCalculation: string;
  conclusion: string;
}

export interface Question {
  id: string;
  volume: VolumeId;
  chapterNumber: number;
  chapterTitle: string;
  topic: string;
  difficulty: Difficulty;
  bookRef: string;
  title: string;
  statement: string;
  diagramType?: DiagramType;
  options: QuestionOption[];
  hint: string;
  explanation: QuestionExplanation;
}

export interface AnswerRecord {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timestamp: number;
  attempts: number;
}

export interface ExamRecord {
  id: string;
  date: number;
  title: string;
  volumeFilter: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  timeSpentSeconds: number;
}

export interface UserProgress {
  xp: number;
  streak: number;
  bestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  answers: Record<string, AnswerRecord>;
  bookmarkedIds: string[];
  errorNotebookIds: string[];
  examHistory: ExamRecord[];
}

export interface VolumeMeta {
  id: VolumeId;
  title: string;
  subtitle: string;
  color: string;
  accentBg: string;
  iconName: string;
  chaptersCount: number;
}
