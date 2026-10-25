import React from 'react';
import { 
  Trophy, 
  Target, 
  Flame, 
  BookOpen, 
  Download, 
  Upload, 
  RotateCcw,
  CheckCircle,
  XCircle,
  Zap,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { Question, UserProgress } from '../types/physics';
import { VOLUMES_METADATA } from '../data/physicsQuestions';

interface DashboardViewProps {
  questions: Question[];
  progress: UserProgress;
  onResetProgress: () => void;
  onImportProgress: (imported: UserProgress) => void;
  onSelectVolumeFilter: (volumeId: number) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  questions,
  progress,
  onResetProgress,
  onImportProgress,
  onSelectVolumeFilter,
}) => {
  const answeredList = Object.values(progress.answers);
  const totalSolved = answeredList.length;
  const correctCount = answeredList.filter((a) => a.isCorrect).length;
  const wrongCount = totalSolved - correctCount;
  const accuracy = totalSolved > 0 ? Math.round((correctCount / totalSolved) * 100) : 0;

  // Level classification based on XP
  const getLevelInfo = (xp: number) => {
    if (xp < 50) return { title: 'Estudante Iniciante', level: 1, nextXp: 50 };
    if (xp < 150) return { title: 'Aprendiz Newtoniano', level: 2, nextXp: 150 };
    if (xp < 300) return { title: 'Bacharelando em Física', level: 3, nextXp: 300 };
    if (xp < 500) return { title: 'Mestre da Termodinâmica', level: 4, nextXp: 500 };
    if (xp < 800) return { title: 'Especialista em Eletromagnetismo', level: 5, nextXp: 800 };
    return { title: 'Físico Quântico Honorário', level: 6, nextXp: 1200 };
  };

  const levelInfo = getLevelInfo(progress.xp);

  // Stats by volume
  const volumeStats = VOLUMES_METADATA.map((vol) => {
    const volQuestions = questions.filter((q) => q.volume === vol.id);
    const volAnswered = volQuestions.filter((q) => progress.answers[q.id]);
    const volCorrect = volAnswered.filter((q) => progress.answers[q.id]?.isCorrect).length;
    const volAccuracy = volAnswered.length > 0 ? Math.round((volCorrect / volAnswered.length) * 100) : 0;
    const volProgressPercent = Math.round((volAnswered.length / volQuestions.length) * 100);

    return {
      ...vol,
      totalQuestions: volQuestions.length,
      answeredCount: volAnswered.length,
      correctCount: volCorrect,
      accuracy: volAccuracy,
      progressPercent: volProgressPercent,
    };
  });

  // Strengths and weaknesses by topic
  const topicStatsMap: Record<string, { total: number; correct: number }> = {};
  questions.forEach((q) => {
    if (progress.answers[q.id]) {
      if (!topicStatsMap[q.topic]) {
        topicStatsMap[q.topic] = { total: 0, correct: 0 };
      }
      topicStatsMap[q.topic].total += 1;
      if (progress.answers[q.id].isCorrect) {
        topicStatsMap[q.topic].correct += 1;
      }
    }
  });

  const topicList = Object.entries(topicStatsMap).map(([topic, data]) => ({
    topic,
    accuracy: Math.round((data.correct / data.total) * 100),
    total: data.total,
  }));

  const strengths = topicList.filter((t) => t.accuracy >= 75);
  const weaknesses = topicList.filter((t) => t.accuracy < 75);

  // Export progress as JSON file
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fundamentos_fisica_progresso_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON handler
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed.xp === 'number' && parsed.answers) {
          onImportProgress(parsed);
          alert('Progresso importado com sucesso!');
        } else {
          alert('Arquivo JSON inválido para restauração de progresso.');
        }
      } catch {
        alert('Falha ao processar o arquivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Top Banner & User Profile / Level */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Nível {levelInfo.level}</span>
              <span aria-hidden="true">·</span>
              <span className="text-sky-400 font-semibold">{levelInfo.title}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Painel Geral de Desempenho
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">
              Acompanhamento métrico do seu aprendizado nos 4 volumes dos Fundamentos de Física (Halliday & Resnick).
            </p>
          </div>

          <div className="flex items-center gap-6 bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 shrink-0">
            <div>
              <div className="text-xs text-slate-400 font-medium">Pontuação Total</div>
              <div className="text-2xl font-bold font-mono text-sky-400 tabular-nums">{progress.xp} XP</div>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div>
              <div className="text-xs text-slate-400 font-medium">Sequência Atual</div>
              <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums flex items-center gap-1">
                <Flame className="w-5 h-5 fill-amber-400" />
                {progress.streak}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Questões Resolvidas</span>
            <BookOpen className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {totalSolved} <span className="text-xs font-normal text-slate-400 font-sans">/ {questions.length}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {Math.round((totalSolved / questions.length) * 100)}% da base concluída
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Taxa de Acerto</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {accuracy}%
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
            <span className="text-emerald-600 font-medium">{correctCount} certas</span>
            <span aria-hidden="true">·</span>
            <span className="text-rose-600 font-medium">{wrongCount} erradas</span>
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Maior Sequência</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {progress.bestStreak}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Acertos consecutivos sem erro
          </div>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Itens em Revisão</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {progress.errorNotebookIds.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {progress.bookmarkedIds.length} questões salvas
          </div>
        </div>
      </div>

      {/* Progress Breakdown by Volume of Halliday & Resnick */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Domínio por Volume do Livro</h3>
            <p className="text-xs text-slate-500">Progresso detalhado por matéria dos Fundamentos de Física</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {volumeStats.map((vol) => (
            <div
              key={vol.id}
              className="p-5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{vol.title}</h4>
                    <p className="text-xs text-slate-500 leading-snug">{vol.subtitle}</p>
                  </div>
                  <button
                    onClick={() => onSelectVolumeFilter(vol.id)}
                    className="text-xs text-sky-700 hover:text-sky-800 font-semibold shrink-0 cursor-pointer"
                  >
                    Praticar →
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Progresso de estudo</span>
                    <span className="font-mono font-semibold tabular-nums">{vol.answeredCount} / {vol.totalQuestions}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-600 rounded-full transition-all duration-500"
                      style={{ width: `${vol.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Volume stats row */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{vol.correctCount} acertos</span>
                </div>
                <div className="font-mono font-semibold text-slate-800 tabular-nums">
                  Precisão: {vol.accuracy}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pedagogical Strengths & Weaknesses Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Pontos Fortes (Alta Precisão ≥ 75%)</span>
          </div>
          {strengths.length > 0 ? (
            <div className="space-y-2">
              {strengths.map((s) => (
                <div key={s.topic} className="flex items-center justify-between p-2 rounded bg-emerald-50/60 border border-emerald-100 text-xs">
                  <span className="font-medium text-emerald-950">{s.topic}</span>
                  <span className="font-mono font-bold text-emerald-700 tabular-nums">{s.accuracy}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic py-2">
              {totalSolved === 0
                ? 'Comece a resolver exercícios para gerar sua análise diagnóstica.'
                : 'Continue resolvendo exercícios para consolidar tópicos dominados com mais de 75% de acertos.'}
            </p>
          )}
        </div>

        {/* Needs Improvement */}
        <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Foco de Estudo Recomendado (&lt; 75%)</span>
          </div>
          {weaknesses.length > 0 ? (
            <div className="space-y-2">
              {weaknesses.map((w) => (
                <div key={w.topic} className="flex items-center justify-between p-2 rounded bg-rose-50/60 border border-rose-100 text-xs">
                  <span className="font-medium text-rose-950">{w.topic}</span>
                  <span className="font-mono font-bold text-rose-700 tabular-nums">{w.accuracy}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic py-2">
              {totalSolved === 0
                ? 'Nenhum tópico com deficiência identificado ainda.'
                : 'Parabéns! Você mantém uma alta taxa de acerto em todos os tópicos respondidos até agora.'}
            </p>
          )}
        </div>
      </div>

      {/* Backup and Data Management */}
      <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-slate-900">Gerenciamento de Dados & Backup</h4>
          <p className="text-[11px] text-slate-500">Seu progresso é gravado localmente no navegador. Exporte para manter seus dados seguros.</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar JSON</span>
          </button>

          <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Importar JSON</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            onClick={onResetProgress}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-700 bg-white border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Zerar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
