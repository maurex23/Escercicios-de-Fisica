import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Play, 
  CheckCircle2, 
  RotateCcw, 
  AlertCircle, 
  Trophy, 
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, ExamRecord } from '../types/physics';
import { QuestionCard } from './QuestionCard';

interface SimuladoViewProps {
  allQuestions: Question[];
  onCompleteSimulado: (record: ExamRecord) => void;
}

export const SimuladoView: React.FC<SimuladoViewProps> = ({
  allQuestions,
  onCompleteSimulado,
}) => {
  const [examState, setExamState] = useState<'config' | 'in_progress' | 'completed'>('config');
  const [selectedVolume, setSelectedVolume] = useState<number>(0); // 0 = all
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(15);

  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  // Timer countdown during exam
  useEffect(() => {
    if (examState !== 'in_progress') return;

    if (secondsRemaining <= 0) {
      // Time is up! Auto submit
      handleFinishExam();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [examState, secondsRemaining]);

  const handleStartExam = () => {
    // Filter questions by volume
    let pool = allQuestions;
    if (selectedVolume !== 0) {
      pool = pool.filter((q) => q.volume === selectedVolume);
    }

    // Shuffle
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setExamQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setSecondsRemaining(timeLimitMinutes * 60);
    setExamState('in_progress');
  };

  const handleSelectAnswer = (optionId: string) => {
    const currentQ = examQuestions[currentIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleFinishExam = () => {
    let correct = 0;
    examQuestions.forEach((q) => {
      const selected = answers[q.id];
      const correctOption = q.options.find((o) => o.isCorrect);
      if (selected && correctOption && selected === correctOption.id) {
        correct += 1;
      }
    });

    const total = examQuestions.length;
    const scorePercent = Math.round((correct / total) * 100);
    const timeSpent = timeLimitMinutes * 60 - Math.max(0, secondsRemaining);

    const record: ExamRecord = {
      id: 'exam-' + Date.now(),
      date: Date.now(),
      title: selectedVolume === 0 ? 'Simulado Geral (Todos os Volumes)' : `Simulado Volume ${selectedVolume}`,
      volumeFilter: selectedVolume === 0 ? 'Geral' : `Volume ${selectedVolume}`,
      totalQuestions: total,
      correctAnswers: correct,
      scorePercent,
      timeSpentSeconds: timeSpent,
    };

    if (scorePercent >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
      });
    }

    onCompleteSimulado(record);
    setExamState('completed');
  };

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Completed results calculations
  let correctTotal = 0;
  if (examState === 'completed') {
    examQuestions.forEach((q) => {
      const selected = answers[q.id];
      const correctOption = q.options.find((o) => o.isCorrect);
      if (selected && correctOption && selected === correctOption.id) {
        correctTotal += 1;
      }
    });
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Config state */}
      {examState === 'config' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Modo Simulado Cronometrado
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Teste seus conhecimentos sob pressão de tempo, como em uma prova universitária de Física 1, 2, 3 ou 4.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Scope */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Abrangência da Prova</label>
              <select
                value={selectedVolume}
                onChange={(e) => setSelectedVolume(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-hidden focus:border-sky-500 font-medium"
              >
                <option value={0}>Todos os Volumes (Geral)</option>
                <option value={1}>Volume 1: Mecânica</option>
                <option value={2}>Volume 2: Gravitação, Ondas & Termo</option>
                <option value={3}>Volume 3: Eletromagnetismo</option>
                <option value={4}>Volume 4: Óptica & Física Moderna</option>
              </select>
            </div>

            {/* Questions count */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Quantidade de Questões</label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-hidden focus:border-sky-500 font-medium"
              >
                <option value={3}>3 Questões (Rápido)</option>
                <option value={5}>5 Questões (Padrão)</option>
                <option value={8}>8 Questões (Desafio)</option>
                <option value={10}>10 Questões (Simulado Completo)</option>
              </select>
            </div>

            {/* Timer limit */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Tempo Limite</label>
              <select
                value={timeLimitMinutes}
                onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-hidden focus:border-sky-500 font-medium"
              >
                <option value={10}>10 Minutos</option>
                <option value={15}>15 Minutos</option>
                <option value={25}>25 Minutos</option>
                <option value={40}>40 Minutos</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-semibold text-slate-800">Regras do Simulado:</span>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-500">
              <li>As resoluções completas só são reveladas após o término da prova.</li>
              <li>Você pode navegar livremente entre as questões e alterar suas opções até finalizar.</li>
              <li>O cronômetro encerra a prova automaticamente ao zerar.</li>
            </ul>
          </div>

          <button
            onClick={handleStartExam}
            className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Iniciar Simulado Agora</span>
          </button>
        </div>
      )}

      {/* In Progress State */}
      {examState === 'in_progress' && examQuestions.length > 0 && (
        <div className="space-y-4">
          {/* Top Bar with Timer and Progress */}
          <div className="bg-slate-900 text-white px-5 py-3 rounded-xl flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-300">
                Questão {currentIndex + 1} de {examQuestions.length}
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-sky-400 font-medium">
                {Object.keys(answers).length} respondidas
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                {formatTimer(secondsRemaining)}
              </span>
            </div>

            <button
              onClick={handleFinishExam}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Finalizar Prova
            </button>
          </div>

          {/* Current Question Display (without immediate feedback until exam completion) */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
            <div className="space-y-1 border-b border-slate-100 pb-3">
              <div className="text-xs text-slate-500">
                <span className="font-semibold text-sky-700">Vol. {examQuestions[currentIndex].volume}</span>
                <span className="mx-1.5">·</span>
                <span>{examQuestions[currentIndex].chapterTitle}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {examQuestions[currentIndex].title}
              </h3>
            </div>

            <div className="text-sm text-slate-800 leading-relaxed">
              {examQuestions[currentIndex].statement}
            </div>

            {/* Alternatives */}
            <div className="space-y-2.5 pt-2">
              {examQuestions[currentIndex].options.map((option) => {
                const isSelected = answers[examQuestions[currentIndex].id] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectAnswer(option.id)}
                    className={`w-full p-3.5 rounded-lg border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/70 text-sky-950 font-medium'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 border ${
                        isSelected
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="text-xs sm:text-sm pt-0.5 leading-snug">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="flex items-center gap-1 px-4 py-2 text-xs font-semibold border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                {examQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-7 h-7 rounded text-xs font-bold font-mono transition-colors ${
                      currentIndex === idx
                        ? 'bg-slate-900 text-white'
                        : answers[q.id]
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {currentIndex < examQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-500"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinishExam}
                  className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-500"
                >
                  Concluir Prova
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Completed State */}
      {examState === 'completed' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-slate-900">Simulado Concluído!</h2>
              <p className="text-xs text-slate-500">Veja seu boletim de pontuação e o gabarito comentado abaixo</p>
            </div>

            <div className="flex items-center justify-center gap-6 py-4 max-w-sm mx-auto bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <div className="text-xs text-slate-500">Nota Final</div>
                <div className="text-3xl font-extrabold font-mono text-sky-700 tabular-nums">
                  {Math.round((correctTotal / examQuestions.length) * 100)}%
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <div className="text-xs text-slate-500">Acertos</div>
                <div className="text-3xl font-extrabold font-mono text-emerald-700 tabular-nums">
                  {correctTotal} <span className="text-xs font-normal text-slate-400">/ {examQuestions.length}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setExamState('config')}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Configurar Novo Simulado</span>
              </button>
            </div>
          </div>

          {/* Gabarito e Resoluções Comentadas */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Gabarito & Resoluções do Simulado</h3>
            <div className="space-y-6">
              {examQuestions.map((q) => {
                const chosenOptionId = answers[q.id];
                const isCorrect = q.options.find((o) => o.id === chosenOptionId)?.isCorrect ?? false;
                return (
                  <div key={q.id}>
                    <QuestionCard
                      question={q}
                      existingAnswer={{
                        questionId: q.id,
                        selectedOptionId: chosenOptionId || '',
                        isCorrect,
                        timestamp: Date.now(),
                        attempts: 1,
                      }}
                      isBookmarked={false}
                      onAnswer={() => {}}
                      onToggleBookmark={() => {}}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
