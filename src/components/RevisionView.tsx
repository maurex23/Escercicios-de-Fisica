import React, { useState } from 'react';
import { 
  AlertCircle, 
  Bookmark, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';
import { Question, UserProgress } from '../types/physics';
import { QuestionCard } from './QuestionCard';

interface RevisionViewProps {
  questions: Question[];
  progress: UserProgress;
  onAnswer: (questionId: string, optionId: string, isCorrect: boolean) => void;
  onToggleBookmark: (questionId: string) => void;
  onClearAnswer: (questionId: string) => void;
  onRemoveFromErrorNotebook: (questionId: string) => void;
}

export const RevisionView: React.FC<RevisionViewProps> = ({
  questions,
  progress,
  onAnswer,
  onToggleBookmark,
  onClearAnswer,
  onRemoveFromErrorNotebook,
}) => {
  const [revisionTab, setRevisionTab] = useState<'errors' | 'bookmarked' | 'flashcards'>('errors');
  const [searchTerm, setSearchTerm] = useState('');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);

  // Error notebook questions
  const errorQuestions = questions.filter((q) =>
    progress.errorNotebookIds.includes(q.id)
  );

  // Bookmarked questions
  const bookmarkedQuestions = questions.filter((q) =>
    progress.bookmarkedIds.includes(q.id)
  );

  // Active question list according to tab
  const activeQuestions = revisionTab === 'errors' ? errorQuestions : bookmarkedQuestions;
  const filteredQuestions = activeQuestions.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.chapterTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.statement.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Conceptual Flashcards for rapid spaced repetition
  const CONCEPT_FLASHCARDS = [
    {
      volume: 'Vol. 1: Mecânica',
      topic: 'Conservação do Momento',
      question: 'Em que circunstâncias o momento linear total de um sistema físico é rigorosamente conservado?',
      answer: 'Quando a resultante de todas as forças EXTERNAS que atuam sobre o sistema for nula (∑F_ext = 0). As forças internas mutuas (ação e reação) apenas trocam momento entre as partes.',
    },
    {
      volume: 'Vol. 1: Mecânica',
      topic: 'Energia Mecânica',
      question: 'Qual é o critério fundamental para que a energia mecânica total se conserve?',
      answer: 'O trabalho realizado por todas as forças não conservativas (como atrito e resistência do ar) deve ser nulo (W_nc = 0). Todas as forças atuantes no processo devem ser puramente conservativas (como peso e força elástica).',
    },
    {
      volume: 'Vol. 2: Termodinâmica',
      topic: 'Segunda Lei',
      question: 'É teoricamente possível construir uma máquina térmica que transforme integralmente calor em trabalho mecânico num ciclo contínuo?',
      answer: 'Não! Pelo enunciado de Kelvin-Planck da 2ª Lei da Termodinâmica, nenhuma máquina térmica operando em ciclo contínuo pode absorver calor de uma única fonte e convertê-lo integralmente em trabalho sem rejeitar parte à fonte fria.',
    },
    {
      volume: 'Vol. 3: Eletromagnetismo',
      topic: 'Lei de Gauss',
      question: 'Qual é o valor do campo elétrico E no interior da cavidade vazia de um condutor em equilíbrio eletrostático?',
      answer: 'É rigorosamente NULO (E = 0), independentemente da forma do condutor ou da presença de campos elétricos externos intensos. Esse é o princípio da Blindagem Eletrostática (Gaiola de Faraday).',
    },
    {
      volume: 'Vol. 3: Eletromagnetismo',
      topic: 'Lei de Lenz',
      question: 'O que dita fisicamente a Lei de Lenz na indução eletromagnética?',
      answer: 'O sentido da corrente induzida na espira é sempre tal que o campo magnético por ela gerado se opõe rigorosamente à VARIAÇÃO do fluxo magnético indutor original.',
    },
    {
      volume: 'Vol. 4: Óptica & Quântica',
      topic: 'Efeito Fotoelétrico',
      question: 'O que acontece ao aumentar a intensidade da luz incidente sobre o metal se a frequência estiver abaixo da frequência de corte (f < f₀)?',
      answer: 'Nenhum elétron será emitido, independentemente do quão intensa seja a luz! A emissão depende da energia individual de cada fóton (E = h·f > Φ), não da taxa total de energia (intensidade).',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Caderno de Revisão Inteligente
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Revisite exercícios com erros anteriores, questões salvas e cartões rápidos de fixação
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg shrink-0">
          <button
            onClick={() => setRevisionTab('errors')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              revisionTab === 'errors'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Caderno de Erros ({errorQuestions.length})</span>
          </button>

          <button
            onClick={() => setRevisionTab('bookmarked')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              revisionTab === 'bookmarked'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Favoritas ({bookmarkedQuestions.length})</span>
          </button>

          <button
            onClick={() => setRevisionTab('flashcards')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              revisionTab === 'flashcards'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Flashcards</span>
          </button>
        </div>
      </div>

      {/* Flashcards Mode */}
      {revisionTab === 'flashcards' ? (
        <div className="space-y-6">
          <div className="p-8 bg-white rounded-xl border border-slate-200 shadow-xs text-center space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-sky-700">{CONCEPT_FLASHCARDS[flashcardIndex].volume}</span>
              <span className="font-mono tabular-nums">Cartão {flashcardIndex + 1} de {CONCEPT_FLASHCARDS.length}</span>
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {CONCEPT_FLASHCARDS[flashcardIndex].topic}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {CONCEPT_FLASHCARDS[flashcardIndex].question}
              </h3>
            </div>

            {showFlashcardAnswer ? (
              <div className="p-5 bg-sky-50 rounded-xl border border-sky-100 text-left max-w-lg mx-auto text-xs sm:text-sm text-sky-950 leading-relaxed space-y-2 animate-in fade-in duration-200">
                <span className="font-bold block text-sky-900">Resposta Teórica Fundamental:</span>
                <p>{CONCEPT_FLASHCARDS[flashcardIndex].answer}</p>
              </div>
            ) : (
              <button
                onClick={() => setShowFlashcardAnswer(true)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                Revelar Resposta Conceitual
              </button>
            )}

            <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setShowFlashcardAnswer(false);
                  setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : CONCEPT_FLASHCARDS.length - 1));
                }}
                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                ← Anterior
              </button>
              <button
                onClick={() => {
                  setShowFlashcardAnswer(false);
                  setFlashcardIndex((prev) => (prev < CONCEPT_FLASHCARDS.length - 1 ? prev + 1 : 0));
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-medium"
              >
                Próximo Cartão →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Questions List (Errors or Bookmarked) */
        <div className="space-y-4">
          {/* Search bar */}
          {activeQuestions.length > 0 && (
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar por tema, capítulo ou palavra-chave..."
                className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:border-sky-500"
              />
            </div>
          )}

          {filteredQuestions.length > 0 ? (
            <div className="space-y-6">
              {filteredQuestions.map((q) => {
                const answer = progress.answers[q.id];
                return (
                  <div key={q.id} className="relative group">
                    <QuestionCard
                      question={q}
                      existingAnswer={answer}
                      isBookmarked={progress.bookmarkedIds.includes(q.id)}
                      onAnswer={onAnswer}
                      onToggleBookmark={onToggleBookmark}
                      onClearAnswer={onClearAnswer}
                    />

                    {/* Quick remove from error notebook button */}
                    {revisionTab === 'errors' && answer?.isCorrect && (
                      <div className="mt-2 flex items-center justify-end">
                        <button
                          onClick={() => onRemoveFromErrorNotebook(q.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Exercício superado! Remover do Caderno de Erros</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                {revisionTab === 'errors' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Bookmark className="w-6 h-6 text-amber-500" />
                )}
              </div>
              <h3 className="font-bold text-slate-800 text-sm">
                {revisionTab === 'errors'
                  ? 'Nenhum erro pendente no seu caderno!'
                  : 'Nenhuma questão salva nos favoritos ainda.'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {revisionTab === 'errors'
                  ? 'Quando você responder incorretamente a um exercício, ele virá automaticamente para esta área de estudo focado.'
                  : 'Você pode salvar qualquer exercício clicando no ícone de marcador na barra superior de cada questão.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
