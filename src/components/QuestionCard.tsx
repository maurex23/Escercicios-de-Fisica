import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  BookOpen, 
  FileText 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, AnswerRecord } from '../types/physics';
import { PhysicsDiagram } from './PhysicsDiagram';

interface QuestionCardProps {
  question: Question;
  existingAnswer?: AnswerRecord;
  isBookmarked: boolean;
  onAnswer: (questionId: string, optionId: string, isCorrect: boolean) => void;
  onToggleBookmark: (questionId: string) => void;
  onClearAnswer?: (questionId: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  existingAnswer,
  isBookmarked,
  onAnswer,
  onToggleBookmark,
  onClearAnswer,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(
    existingAnswer?.selectedOptionId || null
  );
  const [showExplanation, setShowExplanation] = useState<boolean>(Boolean(existingAnswer));
  const [showHint, setShowHint] = useState<boolean>(false);

  // Sync state if existingAnswer changes
  React.useEffect(() => {
    if (existingAnswer) {
      setSelectedOptionId(existingAnswer.selectedOptionId);
      setShowExplanation(true);
    } else {
      setSelectedOptionId(null);
      setShowExplanation(false);
    }
  }, [existingAnswer]);

  const hasAnswered = Boolean(selectedOptionId);
  const selectedOption = question.options.find((opt) => opt.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  const handleSelectOption = (optionId: string) => {
    if (hasAnswered) return; // Prevent changing after answer has been submitted

    setSelectedOptionId(optionId);
    const chosen = question.options.find((o) => o.id === optionId);
    const correct = chosen?.isCorrect ?? false;

    if (correct) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }

    setShowExplanation(true);
    onAnswer(question.id, optionId, correct);
  };

  const handleRetry = () => {
    setSelectedOptionId(null);
    setShowExplanation(false);
    if (onClearAnswer) {
      onClearAnswer(question.id);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all overflow-hidden">
      {/* Question Header & Metadata */}
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-sky-700">Vol. {question.volume}</span>
              <span aria-hidden="true">·</span>
              <span>{question.chapterTitle}</span>
              <span aria-hidden="true">·</span>
              <span className={`font-medium ${
                question.difficulty === 'Fácil' 
                  ? 'text-emerald-700' 
                  : question.difficulty === 'Médio' 
                  ? 'text-amber-700' 
                  : 'text-rose-700'
              }`}>
                {question.difficulty}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {question.title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleBookmark(question.id)}
              title={isBookmarked ? 'Remover dos favoritos' : 'Salvar para revisão posterior'}
              className={`p-2 rounded-lg transition-colors border ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-600 border-amber-200'
                  : 'bg-white text-slate-400 border-slate-200 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Question Statement */}
      <div className="p-5 sm:p-6 space-y-4">
        <div className="text-slate-800 text-sm sm:text-base leading-relaxed">
          {question.statement}
        </div>

        {/* Diagram if present */}
        {question.diagramType && (
          <div className="pt-2">
            <PhysicsDiagram type={question.diagramType} />
          </div>
        )}

        {/* Hint toggle (available before answering) */}
        {!hasAnswered && (
          <div className="pt-1">
            <button
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-800 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{showHint ? 'Ocultar dica teórica' : 'Precisa de ajuda? Ver dica'}</span>
            </button>
            {showHint && (
              <div className="mt-2 p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
                <span className="font-semibold">Dica teórica: </span>
                {question.hint}
              </div>
            )}
          </div>
        )}

        {/* Alternatives Selection (4-5 options) */}
        <div className="space-y-2.5 pt-2">
          {question.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            let optionStyles = 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/30 text-slate-800';
            let badgeStyles = 'bg-slate-100 text-slate-600 border-slate-200';

            if (hasAnswered) {
              if (option.isCorrect) {
                // Correct answer always highlighted in green
                optionStyles = 'border-emerald-300 bg-emerald-50/80 text-emerald-950 font-medium';
                badgeStyles = 'bg-emerald-600 text-white border-emerald-600';
              } else if (isSelected && !option.isCorrect) {
                // Selected wrong answer highlighted in red
                optionStyles = 'border-rose-300 bg-rose-50/80 text-rose-950 font-medium';
                badgeStyles = 'bg-rose-600 text-white border-rose-600';
              } else {
                optionStyles = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(option.id)}
                className={`w-full p-3.5 rounded-lg border text-left flex items-start gap-3 transition-all ${optionStyles} ${
                  !hasAnswered ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 border ${badgeStyles}`}
                >
                  {option.label}
                </span>
                <span className="text-xs sm:text-sm pt-0.5 leading-snug flex-1">
                  {option.text}
                </span>

                {hasAnswered && option.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {hasAnswered && isSelected && !option.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Banner after answering */}
        {hasAnswered && (
          <div
            className={`p-4 rounded-lg flex items-center justify-between border ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <div>
                <p className="font-bold text-sm">
                  {isCorrect ? 'Resposta Correta! (+25 XP)' : 'Resposta Incorreta'}
                </p>
                <p className="text-xs opacity-90">
                  {isCorrect
                    ? 'Excelente aplicação dos conceitos e fórmulas de física.'
                    : 'Não desanime! Revise o passo a passo da resolução abaixo.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isCorrect && (
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-white border border-rose-300 text-rose-700 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tentar Novamente</span>
                </button>
              )}
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span>{showExplanation ? 'Ocultar Resolução' : 'Ver Resolução'}</span>
                {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        {/* Step-by-Step Complete Physics Resolution */}
        {showExplanation && (
          <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Resolução Comentada Passo a Passo</span>
            </div>

            {/* Key Formula Box */}
            <div className="bg-slate-900 text-slate-100 p-3.5 rounded-lg">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                FÓRMULA FUNDAMENTAL:
              </span>
              <div className="font-mono text-sm sm:text-base font-bold text-sky-400">
                {question.explanation.keyFormula}
              </div>
            </div>

            {/* Principles & Laws */}
            <div className="space-y-1.5">
              <h4 className="font-semibold text-xs text-slate-900">Princípios Físicos Aplicados:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                {question.explanation.principles.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>

            {/* Given Data Grid */}
            <div className="space-y-1.5">
              <h4 className="font-semibold text-xs text-slate-900">Dados do Enunciado:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                {Object.entries(question.explanation.givenData).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span className="text-slate-500">{key}:</span>
                    <span className="font-mono font-medium text-slate-900">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Algebraic & Numerical Development */}
            <div className="space-y-2">
              <h4 className="font-semibold text-xs text-slate-900">Desenvolvimento Matemático:</h4>
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
                {question.explanation.algebraicSteps.map((step, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-slate-400 mr-2">{idx + 1}.</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion & Book reference */}
            <div className="p-3 bg-sky-50/70 border border-sky-100 rounded-lg text-slate-800 space-y-1">
              <span className="font-bold text-sky-950 text-xs block">Conclusão:</span>
              <p className="text-xs leading-relaxed">{question.explanation.conclusion}</p>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 italic pt-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Referência: {question.bookRef}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
