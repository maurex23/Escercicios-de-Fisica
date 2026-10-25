import React from 'react';
import { DiagramType } from '../types/physics';

interface PhysicsDiagramProps {
  type: DiagramType;
  className?: string;
}

export const PhysicsDiagram: React.FC<PhysicsDiagramProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'projectile_motion':
      return (
        <div className={`bg-slate-900 rounded-lg p-4 text-slate-100 flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 180" className="w-full max-w-md h-auto overflow-visible">
            {/* Ground */}
            <line x1="20" y1="150" x2="380" y2="150" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="20" y1="150" x2="380" y2="150" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Trajectory parabola */}
            <path d="M 40 150 Q 200 10 360 150" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 3" />
            
            {/* Origin & Vector */}
            <circle cx="40" cy="150" r="5" fill="#38bdf8" />
            <line x1="40" y1="150" x2="90" y2="112" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-red)" />
            <text x="96" y="110" fill="#f43f5e" fontSize="11" fontWeight="bold">v₀ = 50 m/s</text>
            
            {/* Angle θ */}
            <path d="M 65 150 A 25 25 0 0 0 60 135" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="70" y="142" fill="#fbbf24" fontSize="10">θ = 37°</text>
            
            {/* Top point */}
            <circle cx="200" cy="80" r="4" fill="#38bdf8" />
            <line x1="200" y1="80" x2="240" y2="80" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow-blue)" />
            <text x="245" y="84" fill="#38bdf8" fontSize="10">v_x = v₀x</text>
            <line x1="200" y1="80" x2="200" y2="150" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
            <text x="175" y="118" fill="#94a3b8" fontSize="10">h_max</text>

            {/* Range */}
            <line x1="40" y1="165" x2="360" y2="165" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="40" y1="160" x2="40" y2="170" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="360" y1="160" x2="360" y2="170" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="180" y="177" fill="#38bdf8" fontSize="11" fontWeight="bold">Alcance R</text>

            <defs>
              <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
              </marker>
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
            </defs>
          </svg>
          <span className="text-xs text-slate-400 mt-2">Diagrama cinemático: Lançamento oblíquo em terreno plano</span>
        </div>
      );

    case 'incline_plane':
      return (
        <div className={`bg-slate-900 rounded-lg p-4 text-slate-100 flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 380 200" className="w-full max-w-md h-auto overflow-visible">
            {/* Incline triangle */}
            <polygon points="40,160 340,160 340,40" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            
            {/* Angle θ */}
            <path d="M 90 160 A 50 50 0 0 0 85 140" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="100" y="155" fill="#fbbf24" fontSize="12">θ = 30°</text>

            {/* Block on incline (rotated) */}
            <g transform="translate(190, 100) rotate(-22)">
              <rect x="-25" y="-20" width="50" height="40" fill="#38bdf8" rx="2" stroke="#0284c7" strokeWidth="1.5" />
              <text x="-10" y="5" fill="#0f172a" fontSize="11" fontWeight="bold">m</text>
              
              {/* Normal force N */}
              <line x1="0" y1="-20" x2="0" y2="-65" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />
              <text x="5" y="-55" fill="#10b981" fontSize="10" fontWeight="bold">N</text>

              {/* Friction force fat (upwards along plane) */}
              <line x1="-25" y1="0" x2="-65" y2="0" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber)" />
              <text x="-65" y="-8" fill="#f59e0b" fontSize="10" fontWeight="bold">f_at</text>
            </g>

            {/* Gravity Force P pointing straight down */}
            <line x1="190" y1="100" x2="190" y2="165" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow-red)" />
            <text x="195" y="145" fill="#f43f5e" fontSize="10" fontWeight="bold">P = m·g</text>

            <defs>
              <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
              <marker id="arrow-amber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>
          </svg>
          <span className="text-xs text-slate-400 mt-2">Diagrama de corpo livre: Bloco em repouso sobre rampa inclinada</span>
        </div>
      );

    case 'harmonic_oscillator':
      return (
        <div className={`bg-slate-900 rounded-lg p-4 text-slate-100 flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 380 140" className="w-full max-w-md h-auto">
            {/* Wall */}
            <rect x="20" y="20" width="15" height="90" fill="#334155" />
            <line x1="35" y1="20" x2="35" y2="110" stroke="#94a3b8" strokeWidth="2" />
            {/* Ground */}
            <line x1="20" y1="110" x2="360" y2="110" stroke="#475569" strokeWidth="2" />
            
            {/* Spring */}
            <path d="M 35 65 L 70 65 L 85 45 L 105 85 L 125 45 L 145 85 L 165 45 L 185 85 L 205 65 L 220 65" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
            <text x="115" y="38" fill="#cbd5e1" fontSize="11">k = 200 N/m</text>

            {/* Mass Block */}
            <rect x="220" y="40" width="55" height="70" fill="#38bdf8" rx="3" stroke="#0284c7" strokeWidth="1.5" />
            <text x="238" y="78" fill="#0f172a" fontSize="12" fontWeight="bold">m</text>

            {/* Equilibrium line and Amplitude */}
            <line x1="220" y1="30" x2="220" y2="110" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="210" y="24" fill="#f59e0b" fontSize="10">x = 0</text>

            <line x1="220" y1="125" x2="275" y2="125" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="240" y="136" fill="#38bdf8" fontSize="10">Amplitude A</text>
          </svg>
          <span className="text-xs text-slate-400 mt-2">Oscilador Harmônico Simples (Massa-Mola horizontal)</span>
        </div>
      );

    case 'heat_engine':
      return (
        <div className={`bg-slate-900 rounded-lg p-4 text-slate-100 flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 340 180" className="w-full max-w-sm h-auto">
            {/* Hot Reservoir */}
            <rect x="70" y="15" width="200" height="35" rx="4" fill="#dc2626" />
            <text x="120" y="37" fill="#ffffff" fontSize="11" fontWeight="bold">Fonte Quente (T_q = 600 K)</text>
            
            {/* Heat Q_q down */}
            <line x1="170" y1="50" x2="170" y2="75" stroke="#f87171" strokeWidth="3" markerEnd="url(#arrow-red)" />
            <text x="180" y="66" fill="#f87171" fontSize="10" fontWeight="bold">Q_q</text>

            {/* Engine Cycle Circle */}
            <circle cx="170" cy="95" r="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="156" y="99" fill="#38bdf8" fontSize="10" fontWeight="bold">Ciclo</text>

            {/* Work W to the right */}
            <line x1="192" y1="95" x2="245" y2="95" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-green)" />
            <text x="250" y="99" fill="#10b981" fontSize="11" fontWeight="bold">Trabalho W</text>

            {/* Heat Q_f down */}
            <line x1="170" y1="117" x2="170" y2="140" stroke="#60a5fa" strokeWidth="3" markerEnd="url(#arrow-blue)" />
            <text x="180" y="132" fill="#60a5fa" fontSize="10" fontWeight="bold">Q_f</text>

            {/* Cold Reservoir */}
            <rect x="70" y="140" width="200" height="35" rx="4" fill="#2563eb" />
            <text x="125" y="162" fill="#ffffff" fontSize="11" fontWeight="bold">Fonte Fria (T_f = 300 K)</text>
          </svg>
          <span className="text-xs text-slate-400 mt-2">Máquina Térmica Reversível de Carnot</span>
        </div>
      );

    case 'charge_field':
      return (
        <div className={`bg-slate-900 rounded-lg p-4 text-slate-100 flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 360 140" className="w-full max-w-sm h-auto">
            {/* Charge 1 */}
            <circle cx="100" cy="70" r="18" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2" />
            <text x="94" y="75" fill="#ffffff" fontSize="14" fontWeight="bold">+</text>
            <text x="80" y="105" fill="#93c5fd" fontSize="10">q₁ = +2,0 μC</text>

            {/* Distance line */}
            <line x1="120" y1="70" x2="240" y2="70" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="170" y="62" fill="#cbd5e1" fontSize="10">r = 0,30 m</text>

            {/* Force vectors at each charge */}
            <line x1="118" y1="70" x2="150" y2="70" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-red)" />
            <text x="125" y="85" fill="#f43f5e" fontSize="9" fontWeight="bold">F₁₂</text>

            <line x1="242" y1="70" x2="210" y2="70" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-red)" />
            <text x="215" y="85" fill="#f43f5e" fontSize="9" fontWeight="bold">F₂₁</text>

            {/* Charge 2 */}
            <circle cx="260" cy="70" r="18" fill="#ef4444" stroke="#f87171" strokeWidth="2" />
            <text x="256" y="74" fill="#ffffff" fontSize="14" fontWeight="bold">-</text>
            <text x="240" y="105" fill="#fca5a5" fontSize="10">q₂ = -6,0 μC</text>
          </svg>
          <span className="text-xs text-slate-400 mt-2">Interação Eletrostática mútua atrativa (Lei de Coulomb)</span>
        </div>
      );

    case 'rc_circuit':
      return (
        <div className={`bg-slate-900 rounded-lg p-4 text-slate-100 flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 340 160" className="w-full max-w-sm h-auto">
            {/* Rectangular circuit wire */}
            <rect x="50" y="30" width="240" height="100" fill="none" stroke="#64748b" strokeWidth="2" rx="4" />
            
            {/* Battery on left */}
            <rect x="42" y="65" width="16" height="30" fill="#0f172a" />
            <line x1="40" y1="72" x2="60" y2="72" stroke="#10b981" strokeWidth="3" />
            <line x1="45" y1="88" x2="55" y2="88" stroke="#ef4444" strokeWidth="2" />
            <text x="15" y="82" fill="#10b981" fontSize="10" fontWeight="bold">ε = 24V</text>

            {/* Resistor R1 on top */}
            <rect x="100" y="24" width="40" height="12" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
            <text x="105" y="18" fill="#38bdf8" fontSize="10">R₁ = 4Ω</text>

            {/* Parallel branches on right */}
            <line x1="200" y1="30" x2="200" y2="130" stroke="#64748b" strokeWidth="2" />
            <rect x="230" y="45" width="35" height="12" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            <text x="232" y="40" fill="#fbbf24" fontSize="9">R₂ = 12Ω</text>
            <rect x="230" y="95" width="35" height="12" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            <text x="234" y="90" fill="#fbbf24" fontSize="9">R₃ = 6Ω</text>
          </svg>
          <span className="text-xs text-slate-400 mt-2">Circuito CC misto com resistor em série e paralelo</span>
        </div>
      );

    case 'prism_refraction':
      return (
        <div className={`bg-slate-900 rounded-lg p-4 text-slate-100 flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 340 160" className="w-full max-w-sm h-auto">
            {/* Core / Cladding Boundary */}
            <rect x="30" y="20" width="280" height="60" fill="#1e293b" stroke="#334155" />
            <text x="40" y="40" fill="#94a3b8" fontSize="10">Casca (n₂ = 1,20)</text>
            
            <rect x="30" y="80" width="280" height="60" fill="#0f172a" stroke="#334155" />
            <text x="40" y="100" fill="#38bdf8" fontSize="10">Núcleo (n₁ = 1,50)</text>

            {/* Boundary line */}
            <line x1="30" y1="80" x2="310" y2="80" stroke="#0284c7" strokeWidth="2" />

            {/* Normal dashed line */}
            <line x1="170" y1="40" x2="170" y2="120" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Incident Light Ray */}
            <line x1="90" y1="130" x2="170" y2="80" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#arrow-amber)" />
            <text x="135" y="115" fill="#fbbf24" fontSize="10">θ_c = 53,1°</text>

            {/* Refracted at 90 deg */}
            <line x1="170" y1="80" x2="270" y2="80" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrow-red)" />
            <text x="210" y="72" fill="#f43f5e" fontSize="9">Refração a 90° (Crítico)</text>
          </svg>
          <span className="text-xs text-slate-400 mt-2">Reflexão interna total e ângulo limite na fibra óptica</span>
        </div>
      );

    case 'photoelectric':
      return (
        <div className={`bg-slate-900 rounded-lg p-4 text-slate-100 flex flex-col items-center justify-center ${className}`}>
          <svg viewBox="0 0 340 160" className="w-full max-w-sm h-auto">
            {/* Metal Plate */}
            <rect x="50" y="100" width="240" height="25" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" rx="2" />
            <text x="110" y="117" fill="#ffffff" fontSize="11">Placa Metálica (Φ = 2,30 eV)</text>

            {/* Incident Photon */}
            <path d="M 80 20 Q 95 35 80 50 Q 95 65 80 80 L 80 98" fill="none" stroke="#a855f7" strokeWidth="2.5" markerEnd="url(#arrow-purple)" />
            <text x="95" y="45" fill="#c084fc" fontSize="10" fontWeight="bold">Fóton UV (E = 4,97 eV)</text>

            {/* Ejected Photoelectron */}
            <circle cx="160" cy="85" r="5" fill="#38bdf8" />
            <line x1="160" y1="85" x2="210" y2="40" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-blue)" />
            <text x="200" y="30" fill="#38bdf8" fontSize="10">e⁻ (K_max = 2,67 eV)</text>

            <defs>
              <marker id="arrow-purple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
              </marker>
            </defs>
          </svg>
          <span className="text-xs text-slate-400 mt-2">Efeito Fotoelétrico de Einstein: Conservação Quântica de Energia</span>
        </div>
      );

    default:
      return null;
  }
};
