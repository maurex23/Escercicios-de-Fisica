import React from 'react';
import { Calculator, Flame } from 'lucide-react';

export type ActiveTab = 'exercises' | 'revision' | 'dashboard' | 'simulado';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCalculator: () => void;
  onOpenFormulaSheet: () => void;
  streak: number;
  xp: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCalculator,
  onOpenFormulaSheet,
  streak,
  xp,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => setActiveTab('exercises')}
            className="flex items-center gap-2 text-left shrink-0 hover:opacity-90 transition-opacity"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              Fundamentos de Física
            </span>
            <span className="hidden sm:inline text-xs text-slate-400 font-medium whitespace-nowrap">
              · Halliday & Resnick
            </span>
          </button>

          {/* Zone 2: 4–5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('exercises')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-0.5 ${
                activeTab === 'exercises' ? 'text-sky-700 font-semibold border-b-2 border-sky-600' : ''
              }`}
            >
              Exercícios
            </button>
            <button
              onClick={() => setActiveTab('revision')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-0.5 ${
                activeTab === 'revision' ? 'text-sky-700 font-semibold border-b-2 border-sky-600' : ''
              }`}
            >
              Caderno de Revisão
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-0.5 ${
                activeTab === 'dashboard' ? 'text-sky-700 font-semibold border-b-2 border-sky-600' : ''
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('simulado')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap pb-0.5 ${
                activeTab === 'simulado' ? 'text-sky-700 font-semibold border-b-2 border-sky-600' : ''
              }`}
            >
              Modo Simulado
            </button>
            <button
              onClick={onOpenFormulaSheet}
              className="hover:text-slate-900 transition-colors whitespace-nowrap text-slate-600"
            >
              Formulário & Constantes
            </button>
          </nav>

          {/* Zone 3: 1 primary action + stats */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick score display */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 tabular-nums">
              <span className="font-semibold text-slate-800">{xp} XP</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-amber-600 font-semibold">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                {streak} {streak === 1 ? 'acerto' : 'acertos'}
              </span>
            </div>

            {/* Primary Action Button: Calculator */}
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculadora</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden border-t border-slate-100 px-4 py-2 flex items-center justify-between text-xs overflow-x-auto gap-2 bg-slate-50">
        <button
          onClick={() => setActiveTab('exercises')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'exercises' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Exercícios
        </button>
        <button
          onClick={() => setActiveTab('revision')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'revision' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Revisão
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'dashboard' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('simulado')}
          className={`px-2.5 py-1 rounded whitespace-nowrap ${
            activeTab === 'simulado' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600'
          }`}
        >
          Simulado
        </button>
        <button
          onClick={onOpenFormulaSheet}
          className="px-2.5 py-1 rounded whitespace-nowrap text-slate-600 border border-slate-200 bg-white"
        >
          Formulário
        </button>
      </div>
    </header>
  );
};
