import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { PHYSICAL_CONSTANTS, FORMULA_CATALOG } from '../data/formulaSheet';

interface FormulaSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaSheetModal: React.FC<FormulaSheetModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'formulas' | 'constants'>('formulas');
  const [selectedVolume, setSelectedVolume] = useState<number>(0); // 0 = all

  if (!isOpen) return null;

  const filteredConstants = PHYSICAL_CONSTANTS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFormulas = FORMULA_CATALOG.filter(
    (group) => selectedVolume === 0 || group.volume === selectedVolume
  ).map((group) => ({
    ...group,
    sections: group.sections
      .map((sec) => ({
        ...sec,
        formulas: sec.formulas.filter(
          (f) =>
            f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.equation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.description.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((sec) => sec.formulas.length > 0),
  })).filter((group) => group.sections.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Formulário & Constantes Físicas</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Referência rápida das equações fundamentais de Halliday & Resnick
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Tabs Controls */}
        <div className="px-6 py-3 border-b border-slate-100 bg-white flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar equação, lei ou constante (ex: Lorentz, Torricelli, Planck)..."
              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-hidden focus:bg-white focus:border-sky-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('formulas')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'formulas'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fórmulas Teóricas
            </button>
            <button
              onClick={() => setActiveTab('constants')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'constants'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Constantes Físicas
            </button>
          </div>
        </div>

        {/* Volume selector if on formulas tab */}
        {activeTab === 'formulas' && (
          <div className="px-6 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 text-xs shrink-0">Filtrar:</span>
            {[
              { id: 0, label: 'Todos os Volumes' },
              { id: 1, label: 'Vol 1: Mecânica' },
              { id: 2, label: 'Vol 2: Ondas & Termo' },
              { id: 3, label: 'Vol 3: Eletromagnetismo' },
              { id: 4, label: 'Vol 4: Óptica & Quântica' },
            ].map((vol) => (
              <button
                key={vol.id}
                onClick={() => setSelectedVolume(vol.id)}
                className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedVolume === vol.id
                    ? 'bg-sky-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {vol.label}
              </button>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'constants' ? (
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 px-4 py-2.5 grid grid-cols-12 text-xs font-semibold text-slate-600">
                <span className="col-span-2">Símbolo</span>
                <span className="col-span-4">Constante</span>
                <span className="col-span-4">Valor Numérico</span>
                <span className="col-span-2">Unidade SI</span>
              </div>
              {filteredConstants.map((item) => (
                <div key={item.symbol} className="px-4 py-2.5 grid grid-cols-12 text-xs items-center hover:bg-slate-50 transition-colors">
                  <span className="col-span-2 font-serif-math font-bold text-sky-700 text-sm">{item.symbol}</span>
                  <span className="col-span-4 font-medium text-slate-800">{item.name}</span>
                  <span className="col-span-4 font-mono font-medium text-slate-900 tabular-nums">{item.value}</span>
                  <span className="col-span-2 font-mono text-slate-500 text-[11px]">{item.unit}</span>
                </div>
              ))}
              {filteredConstants.length === 0 && (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Nenhuma constante encontrada para "{searchTerm}".
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredFormulas.map((group) => (
                <div key={group.volume} className="space-y-4">
                  <div className="border-b border-slate-200 pb-1">
                    <h4 className="text-sm font-bold text-slate-900">{group.volumeName}</h4>
                  </div>
                  {group.sections.map((section) => (
                    <div key={section.title} className="space-y-2">
                      <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {section.title}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.formulas.map((form) => (
                          <div
                            key={form.name}
                            className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-sky-300 transition-colors"
                          >
                            <div className="text-xs font-semibold text-slate-800 mb-1">{form.name}</div>
                            <div className="font-mono text-xs font-bold text-sky-800 bg-sky-50/70 p-2 rounded border border-sky-100 mb-1.5">
                              {form.equation}
                            </div>
                            <div className="text-[11px] text-slate-500">{form.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {filteredFormulas.length === 0 && (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Nenhuma equação encontrada para "{searchTerm}".
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
