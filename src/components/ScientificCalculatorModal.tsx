import React, { useState } from 'react';
import { X, Delete, RotateCcw } from 'lucide-react';

interface ScientificCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScientificCalculatorModal: React.FC<ScientificCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [scratchNotes, setScratchNotes] = useState<string>('');
  const [isRad, setIsRad] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleAppend = (token: string) => {
    setExpression((prev) => prev + token);
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleBackspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleEvaluate = () => {
    try {
      if (!expression.trim()) return;
      // Sanitize and replace math functions
      let expr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e\b/g, 'Math.E')
        .replace(/\^/g, '**');

      // Handle trig
      if (!isRad) {
        // Degree conversion
        expr = expr
          .replace(/sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 180)')
          .replace(/cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 180)')
          .replace(/tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');
      } else {
        expr = expr
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(');
      }

      expr = expr
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/log\(/g, 'Math.log10(');

      // Safe evaluation with Function constructor limited to Math
      // eslint-disable-next-line no-new-func
      const calcResult = Function(`'use strict'; return (${expr})`)();
      
      if (typeof calcResult === 'number' && !isNaN(calcResult)) {
        // Format if scientific notation is needed
        if (Math.abs(calcResult) < 1e-4 || Math.abs(calcResult) >= 1e6) {
          setResult(calcResult.toExponential(4));
        } else {
          setResult(Number(calcResult.toFixed(5)).toString());
        }
      } else {
        setResult('Inválido');
      }
    } catch {
      setResult('Erro de Sintaxe');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-slate-800 text-sm">Calculadora Científica & Rascunho</h3>
            <span className="text-xs text-slate-400">·</span>
            <button
              onClick={() => setIsRad(!isRad)}
              className="text-xs px-2 py-0.5 rounded border border-slate-200 bg-white text-slate-700 font-mono hover:bg-slate-50"
            >
              {isRad ? 'RAD (Radianos)' : 'DEG (Graus)'}
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Calculator Display */}
        <div className="p-4 bg-slate-900 text-white font-mono">
          <div className="text-right text-xs text-slate-400 h-5 overflow-x-auto whitespace-nowrap">
            {expression || '0'}
          </div>
          <div className="text-right text-2xl font-bold tracking-tight text-sky-400 h-8 mt-1 overflow-x-auto">
            {result || '= 0'}
          </div>
        </div>

        {/* Button Grid */}
        <div className="p-4 grid grid-cols-5 gap-2 bg-slate-50 border-b border-slate-100 text-sm font-medium">
          <button onClick={() => handleAppend('sin(')} className="p-2 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-700">sin</button>
          <button onClick={() => handleAppend('cos(')} className="p-2 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-700">cos</button>
          <button onClick={() => handleAppend('tan(')} className="p-2 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-700">tan</button>
          <button onClick={() => handleAppend('sqrt(')} className="p-2 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-700">√</button>
          <button onClick={handleClear} className="p-2 bg-rose-50 text-rose-700 rounded border border-rose-200 hover:bg-rose-100 flex items-center justify-center">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button onClick={() => handleAppend('π')} className="p-2 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-700">π</button>
          <button onClick={() => handleAppend('e')} className="p-2 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-700">e</button>
          <button onClick={() => handleAppend('^')} className="p-2 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-700">xʸ</button>
          <button onClick={() => handleAppend('(')} className="p-2 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-700">(</button>
          <button onClick={() => handleAppend(')')} className="p-2 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-700">)</button>

          <button onClick={() => handleAppend('7')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 font-semibold text-slate-800">7</button>
          <button onClick={() => handleAppend('8')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 font-semibold text-slate-800">8</button>
          <button onClick={() => handleAppend('9')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 font-semibold text-slate-800">9</button>
          <button onClick={() => handleAppend('÷')} className="p-2.5 bg-slate-100 rounded border border-slate-200 hover:bg-slate-200 font-bold text-sky-700">÷</button>
          <button onClick={handleBackspace} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center justify-center">
            <Delete className="w-4 h-4" />
          </button>

          <button onClick={() => handleAppend('4')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 font-semibold text-slate-800">4</button>
          <button onClick={() => handleAppend('5')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 font-semibold text-slate-800">5</button>
          <button onClick={() => handleAppend('6')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 font-semibold text-slate-800">6</button>
          <button onClick={() => handleAppend('×')} className="p-2.5 bg-slate-100 rounded border border-slate-200 hover:bg-slate-200 font-bold text-sky-700">×</button>
          <button onClick={() => handleAppend('1e')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono text-xs">EXP</button>

          <button onClick={() => handleAppend('1')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 font-semibold text-slate-800">1</button>
          <button onClick={() => handleAppend('2')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 font-semibold text-slate-800">2</button>
          <button onClick={() => handleAppend('3')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 font-semibold text-slate-800">3</button>
          <button onClick={() => handleAppend('-')} className="p-2.5 bg-slate-100 rounded border border-slate-200 hover:bg-slate-200 font-bold text-sky-700">−</button>
          <button onClick={() => handleAppend('ln(')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs">ln</button>

          <button onClick={() => handleAppend('0')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 font-semibold text-slate-800">0</button>
          <button onClick={() => handleAppend('.')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 font-semibold text-slate-800">.</button>
          <button onClick={() => handleAppend('00')} className="p-2.5 bg-white rounded border border-slate-200 hover:bg-slate-100 text-slate-700">00</button>
          <button onClick={() => handleAppend('+')} className="p-2.5 bg-slate-100 rounded border border-slate-200 hover:bg-slate-200 font-bold text-sky-700">+</button>
          <button onClick={handleEvaluate} className="p-2.5 bg-sky-600 text-white rounded font-bold hover:bg-sky-500 shadow-sm">=</button>
        </div>

        {/* Scratchpad note area */}
        <div className="p-4 bg-white flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-semibold text-slate-600">Bloco de Rascunho Rápido</label>
          <textarea
            value={scratchNotes}
            onChange={(e) => setScratchNotes(e.target.value)}
            placeholder="Anote dados, equações ou raciocínios intermediários do problema aqui..."
            rows={3}
            className="w-full text-xs font-mono p-2.5 border border-slate-200 rounded-lg focus:outline-hidden focus:border-sky-500 bg-slate-50 text-slate-800 resize-none"
          />
        </div>
      </div>
    </div>
  );
};
