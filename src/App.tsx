/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Layers, 
  BookOpen, 
  Sparkles, 
  Compass, 
  Flame, 
  Zap, 
  Atom,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { PHYSICS_QUESTIONS, VOLUMES_METADATA } from './data/physicsQuestions';
import { UserProgress, ExamRecord, VolumeId } from './types/physics';
import { Header, ActiveTab } from './components/Header';
import { QuestionCard } from './components/QuestionCard';
import { DashboardView } from './components/DashboardView';
import { RevisionView } from './components/RevisionView';
import { SimuladoView } from './components/SimuladoView';
import { ScientificCalculatorModal } from './components/ScientificCalculatorModal';
import { FormulaSheetModal } from './components/FormulaSheetModal';

const STORAGE_KEY = 'fundamentos_fisica_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  xp: 0,
  streak: 0,
  bestStreak: 0,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  answers: {},
  bookmarkedIds: [],
  errorNotebookIds: [],
  examHistory: [],
};

export default function App() {
  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<ActiveTab>('exercises');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isFormulaSheetOpen, setIsFormulaSheetOpen] = useState(false);

  // Filter & Pagination states
  const [selectedVolume, setSelectedVolume] = useState<number>(0); // 0 = all
  const [selectedChapter, setSelectedChapter] = useState<number>(0); // 0 = all
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unsolved' | 'solved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 10;

  // Persistent Progress state
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return INITIAL_PROGRESS;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      console.error('Failed to save progress to localStorage', err);
    }
  }, [progress]);

  // Handle answering a question
  const handleAnswer = (questionId: string, optionId: string, isCorrect: boolean) => {
    setProgress((prev) => {
      const existing = prev.answers[questionId];
      const attempts = (existing?.attempts || 0) + 1;
      
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newBestStreak = Math.max(prev.bestStreak, newStreak);
      const earnedXp = isCorrect ? 25 : 5;

      const newAnswers = {
        ...prev.answers,
        [questionId]: {
          questionId,
          selectedOptionId: optionId,
          isCorrect,
          timestamp: Date.now(),
          attempts,
        },
      };

      // Error notebook management: add if incorrect, keep until successfully retried
      let newErrors = [...prev.errorNotebookIds];
      if (!isCorrect && !newErrors.includes(questionId)) {
        newErrors.push(questionId);
      } else if (isCorrect && newErrors.includes(questionId)) {
        // Can be cleared manually or marked as resolved
      }

      return {
        ...prev,
        xp: prev.xp + earnedXp,
        streak: newStreak,
        bestStreak: newBestStreak,
        answers: newAnswers,
        errorNotebookIds: newErrors,
      };
    });
  };

  // Toggle bookmark / saved question
  const handleToggleBookmark = (questionId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedIds.includes(questionId);
      return {
        ...prev,
        bookmarkedIds: exists
          ? prev.bookmarkedIds.filter((id) => id !== questionId)
          : [...prev.bookmarkedIds, questionId],
      };
    });
  };

  // Clear answer (Retry question)
  const handleClearAnswer = (questionId: string) => {
    setProgress((prev) => {
      const newAnswers = { ...prev.answers };
      delete newAnswers[questionId];
      return {
        ...prev,
        answers: newAnswers,
      };
    });
  };

  // Remove from error notebook
  const handleRemoveFromErrorNotebook = (questionId: string) => {
    setProgress((prev) => ({
      ...prev,
      errorNotebookIds: prev.errorNotebookIds.filter((id) => id !== questionId),
    }));
  };

  // Complete exam session
  const handleCompleteSimulado = (record: ExamRecord) => {
    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + record.correctAnswers * 30 + 50, // Bonus for exam
      examHistory: [record, ...prev.examHistory],
    }));
  };

  // Reset progress
  const handleResetProgress = () => {
    if (confirm('Tem certeza de que deseja resetar todo o seu histórico de exercícios e pontuação? Esta ação não pode ser desfeita.')) {
      setProgress(INITIAL_PROGRESS);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Import external progress JSON
  const handleImportProgress = (imported: UserProgress) => {
    setProgress(imported);
  };

  // Filter questions
  const filteredQuestions = PHYSICS_QUESTIONS.filter((q) => {
    if (selectedVolume !== 0 && q.volume !== selectedVolume) return false;
    if (selectedChapter !== 0 && q.chapterNumber !== selectedChapter) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    
    const isAnswered = Boolean(progress.answers[q.id]);
    if (statusFilter === 'solved' && !isAnswered) return false;
    if (statusFilter === 'unsolved' && isAnswered) return false;

    if (searchQuery.trim()) {
      const term = searchQuery.toLowerCase();
      const matchTitle = q.title.toLowerCase().includes(term);
      const matchStatement = q.statement.toLowerCase().includes(term);
      const matchChapter = q.chapterTitle.toLowerCase().includes(term);
      const matchTopic = q.topic.toLowerCase().includes(term);
      if (!matchTitle && !matchStatement && !matchChapter && !matchTopic) {
        return false;
      }
    }

    return true;
  });

  // Available chapters in currently selected volume (for dropdown)
  const availableChapters = React.useMemo(() => {
    const subset = selectedVolume === 0 ? PHYSICS_QUESTIONS : PHYSICS_QUESTIONS.filter(q => q.volume === selectedVolume);
    const map = new Map<number, string>();
    subset.forEach(q => {
      if (!map.has(q.chapterNumber)) {
        map.set(q.chapterNumber, `Cap. ${q.chapterNumber}: ${q.chapterTitle}`);
      }
    });
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, [selectedVolume]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * PAGE_SIZE;
  const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation Header following Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenFormulaSheet={() => setIsFormulaSheetOpen(true)}
        streak={progress.streak}
        xp={progress.xp}
      />

      {/* Main App Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'exercises' && (
          <div className="space-y-8">
            {/* Academic Hero Section with generated physics illustration */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 text-white overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-sky-400 font-semibold">Física Clássica & Moderna</span>
                      <span aria-hidden="true">·</span>
                      <span>Coleção Halliday & Resnick</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      Fundamentos de Física Interativo
                    </h1>

                    <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                      Pratique exercícios com alternativas, validação imediata, resolução detalhada passo a passo com equações e fórmulas, caderno de revisão de erros e estatísticas de aprendizagem.
                    </p>
                  </div>

                  {/* Volume Selector Buttons */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-400">SELECIONE O VOLUME PARA ESTUDAR:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 1, label: 'Vol 1', sub: 'Mecânica', icon: Compass },
                        { id: 2, label: 'Vol 2', sub: 'Ondas & Termo', icon: Flame },
                        { id: 3, label: 'Vol 3', sub: 'Eletromag.', icon: Zap },
                        { id: 4, label: 'Vol 4', sub: 'Óptica & Quânt.', icon: Atom },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = selectedVolume === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setSelectedVolume(isSelected ? 0 : item.id)}
                            className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-sky-600 border-sky-500 text-white shadow-xs'
                                : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-xs font-bold">{item.label}</span>
                              <Icon className="w-3.5 h-3.5 opacity-80" />
                            </div>
                            <div className="text-[11px] truncate opacity-80">{item.sub}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Hero Illustration */}
                <div className="lg:col-span-5 relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[220px] lg:min-h-full">
                  <img
                    src="/src/assets/images/physics_hero_illustration_1792791185007.jpg"
                    alt="Diagramas e equações fundamentais de física clássica e moderna: pêndulo harmônico, dispersão óptica por prisma, gravitação de Kepler e ondas eletromagnéticas"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none lg:bg-gradient-to-r lg:from-slate-900/90 lg:to-transparent" />
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar exercícios por palavra-chave, capítulo, fórmula ou conceito..."
                    className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-hidden focus:border-sky-500 text-slate-800"
                  />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {/* Volume filter */}
                  <select
                    value={selectedVolume}
                    onChange={(e) => setSelectedVolume(Number(e.target.value))}
                    className="p-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-slate-700 font-medium cursor-pointer"
                  >
                    <option value={0}>Todos os Volumes</option>
                    <option value={1}>Volume 1: Mecânica</option>
                    <option value={2}>Volume 2: Ondas & Termo</option>
                    <option value={3}>Volume 3: Eletromagnetismo</option>
                    <option value={4}>Volume 4: Óptica & Quântica</option>
                  </select>

                  {/* Chapter Filter */}
                  <select
                    value={selectedChapter}
                    onChange={(e) => {
                      setSelectedChapter(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="p-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-slate-700 font-medium cursor-pointer max-w-[200px] truncate"
                  >
                    <option value={0}>Todos os Capítulos</option>
                    {availableChapters.map(([chNum, label]) => (
                      <option key={chNum} value={chNum}>
                        {label}
                      </option>
                    ))}
                  </select>

                  {/* Difficulty */}
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => {
                      setSelectedDifficulty(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="p-2 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-slate-700 font-medium cursor-pointer"
                  >
                    <option value="all">Todas Dificuldades</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Médio">Médio</option>
                    <option value="Difícil">Difícil</option>
                  </select>

                  {/* Status */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                    <button
                      onClick={() => {
                        setStatusFilter('all');
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        statusFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('unsolved');
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        statusFilter === 'unsolved' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Pendentes
                    </button>
                    <button
                      onClick={() => {
                        setStatusFilter('solved');
                        setCurrentPage(1);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        statusFilter === 'solved' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Resolvidos
                    </button>
                  </div>
                </div>
              </div>

              {/* Status summary counter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 gap-2">
                <span>
                  Exibindo questões <strong>{filteredQuestions.length > 0 ? startIndex + 1 : 0}</strong> a <strong>{Math.min(startIndex + PAGE_SIZE, filteredQuestions.length)}</strong> de <strong>{filteredQuestions.length}</strong> encontradas (Total da base: <strong>{PHYSICS_QUESTIONS.length}</strong> exercícios, 105 por volume)
                </span>
                {(selectedVolume !== 0 || selectedChapter !== 0 || selectedDifficulty !== 'all' || statusFilter !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedVolume(0);
                      setSelectedChapter(0);
                      setSelectedDifficulty('all');
                      setStatusFilter('all');
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="text-sky-700 hover:text-sky-800 font-semibold cursor-pointer"
                  >
                    Limpar todos os filtros
                  </button>
                )}
              </div>
            </div>

            {/* Questions List (Paginated) */}
            {filteredQuestions.length > 0 ? (
              <div className="space-y-6">
                <div className="space-y-6">
                  {paginatedQuestions.map((q) => (
                    <QuestionCard
                      key={q.id}
                      question={q}
                      existingAnswer={progress.answers[q.id]}
                      isBookmarked={progress.bookmarkedIds.includes(q.id)}
                      onAnswer={handleAnswer}
                      onToggleBookmark={handleToggleBookmark}
                      onClearAnswer={handleClearAnswer}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <span className="text-slate-500 font-mono">
                      Página <strong>{validCurrentPage}</strong> de <strong>{totalPages}</strong>
                    </span>

                    <div className="flex items-center gap-1.5 flex-wrap justify-center">
                      <button
                        disabled={validCurrentPage === 1}
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 320, behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        ← Anterior
                      </button>

                      {Array.from({ length: Math.min(7, totalPages) }).map((_, i) => {
                        let pageNum: number;
                        if (totalPages <= 7) {
                          pageNum = i + 1;
                        } else if (validCurrentPage <= 4) {
                          pageNum = i + 1;
                        } else if (validCurrentPage >= totalPages - 3) {
                          pageNum = totalPages - 6 + i;
                        } else {
                          pageNum = validCurrentPage - 3 + i;
                        }

                        const isActive = validCurrentPage === pageNum;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 320, behavior: 'smooth' });
                            }}
                            className={`w-8 h-8 rounded-lg font-mono font-bold text-xs transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-sky-600 text-white shadow-2xs'
                                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        disabled={validCurrentPage === totalPages}
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 320, behavior: 'smooth' });
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Próxima →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-xl border border-slate-200 space-y-3">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-800 text-sm">Nenhum exercício encontrado</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Tente alterar seus filtros de volume, dificuldade ou termos de pesquisa para encontrar questões.
                </p>
                <button
                  onClick={() => {
                    setSelectedVolume(0);
                    setSelectedDifficulty('all');
                    setStatusFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
                >
                  Restaurar Todos os Filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Revision */}
        {activeTab === 'revision' && (
          <RevisionView
            questions={PHYSICS_QUESTIONS}
            progress={progress}
            onAnswer={handleAnswer}
            onToggleBookmark={handleToggleBookmark}
            onClearAnswer={handleClearAnswer}
            onRemoveFromErrorNotebook={handleRemoveFromErrorNotebook}
          />
        )}

        {/* Tab 3: Dashboard */}
        {activeTab === 'dashboard' && (
          <DashboardView
            questions={PHYSICS_QUESTIONS}
            progress={progress}
            onResetProgress={handleResetProgress}
            onImportProgress={handleImportProgress}
            onSelectVolumeFilter={(volId) => {
              setSelectedVolume(volId);
              setActiveTab('exercises');
            }}
          />
        )}

        {/* Tab 4: Simulado */}
        {activeTab === 'simulado' && (
          <SimuladoView
            allQuestions={PHYSICS_QUESTIONS}
            onCompleteSimulado={handleCompleteSimulado}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>Fundamentos de Física · Halliday, Resnick & Walker</span>
            <span className="mx-2">·</span>
            <span>Edição Interativa para Ensino Superior e Engenharia</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFormulaSheetOpen(true)}
              className="hover:text-slate-800 transition-colors font-medium text-sky-700"
            >
              Constantes e Equações
            </button>
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="hover:text-slate-800 transition-colors font-medium text-slate-600"
            >
              Calculadora
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ScientificCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <FormulaSheetModal
        isOpen={isFormulaSheetOpen}
        onClose={() => setIsFormulaSheetOpen(false)}
      />
    </div>
  );
}
