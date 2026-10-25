import { Question } from '../types/physics';

const CHAPTERS_V2 = [
  { num: 14, title: 'Fluidos', topic: 'Pressão Hidrostática, Bernoulli e Empuxo' },
  { num: 15, title: 'Oscilações', topic: 'MHS, Frequência Angular e Oscilações Amortecidas' },
  { num: 16, title: 'Ondas I', topic: 'Ondas Mecânicas Transversais e Cordas Vibrantes' },
  { num: 17, title: 'Ondas II', topic: 'Ondas Sonoras, Nível de Intensidade (dB) e Efeito Doppler' },
  { num: 18, title: 'Temperatura, Calor e a 1ª Lei', topic: 'Calorimetria, Dilatação Térmica e 1ª Lei' },
  { num: 19, title: 'Teoria Cinética dos Gases', topic: 'Gases Ideais, Energia Cinética Molecular e Adiabática' },
  { num: 20, title: 'Entropia e a 2ª Lei', topic: 'Ciclos Térmicos, Eficiência de Carnot e Entropia' },
];

export const generateQuestionsVol2 = (): Question[] => {
  const list: Question[] = [];

  for (let i = 1; i <= 105; i++) {
    const chIndex = (i - 1) % CHAPTERS_V2.length;
    const ch = CHAPTERS_V2[chIndex];
    const n = Math.floor((i - 1) / CHAPTERS_V2.length) + 1;

    let title = '';
    let statement = '';
    let keyFormula = '';
    let givenData: Record<string, string> = {};
    let algebraicSteps: string[] = [];
    let numericalCalc = '';
    let correctVal = '';
    let alt1 = '';
    let alt2 = '';
    let alt3 = '';
    let alt4 = '';
    let hint = '';

    if (ch.num === 14) {
      // Hydrostatic or Buoyancy
      const h = (5 + (n * 3)).toFixed(1);
      const rho = '1000'; // water kg/m³
      const pMan = (parseFloat(rho) * 9.8 * parseFloat(h)).toFixed(0);
      title = `Pressão Hidrostática com a Profundidade (${n})`;
      statement = `Um mergulhador submerge em um lago de água doce (densidade ρ = 1000 kg/m³) até uma profundidade de h = ${h} m. Adotando g = 9,80 m/s², qual é a pressão manométrica (devida exclusivamente à coluna de água) suportada pelo mergulhador?`;
      keyFormula = 'P_man = ρ · g · h';
      givenData = { 'Profundidade h': `${h} m`, 'Densidade ρ': '1000 kg/m³', 'g': '9,80 m/s²' };
      algebraicSteps = [
        `P_man = 1000 · 9,80 · ${h}`,
        `P_man = ${pMan} Pa = ${(parseFloat(pMan) / 1000).toFixed(1)} kPa`,
      ];
      numericalCalc = `1000 × 9,80 × ${h} = ${pMan} Pa`;
      correctVal = `${(parseFloat(pMan) / 1000).toFixed(1)} kPa`;
      alt1 = `${(parseFloat(pMan) * 1.5 / 1000).toFixed(1)} kPa`;
      alt2 = `${(parseFloat(pMan) * 0.5 / 1000).toFixed(1)} kPa`;
      alt3 = `${(parseFloat(pMan) * 2.0 / 1000).toFixed(1)} kPa`;
      alt4 = `${(parseFloat(pMan) * 0.8 / 1000).toFixed(1)} kPa`;
      hint = 'A pressão manométrica é dada pela lei de Stevin: P = ρ·g·h.';
    } else if (ch.num === 15) {
      // Harmonic oscillator
      const k = (100 + (n * 20)).toFixed(0);
      const m = (0.2 + (n * 0.05)).toFixed(2);
      const omega = Math.sqrt(parseFloat(k) / parseFloat(m)).toFixed(2);
      title = `Frequência Angular do Oscilador Harmônico Simples (${n})`;
      statement = `Um bloco de massa m = ${m} kg oscila acoplado a uma mola ideal de constante k = ${k} N/m sem atrito. Qual é a frequência angular ω do movimento?`;
      keyFormula = 'ω = √(k / m)';
      givenData = { 'Massa m': `${m} kg`, 'Constante elástica k': `${k} N/m` };
      algebraicSteps = [
        `ω = √(${k} / ${m})`,
        `ω = √(${(parseFloat(k)/parseFloat(m)).toFixed(2)}) ≈ ${omega} rad/s`,
      ];
      numericalCalc = `√(${k} / ${m}) = ${omega} rad/s`;
      correctVal = `${omega} rad/s`;
      alt1 = `${(parseFloat(omega) * 1.4).toFixed(2)} rad/s`;
      alt2 = `${(parseFloat(omega) * 0.6).toFixed(2)} rad/s`;
      alt3 = `${(parseFloat(omega) * 2.0).toFixed(2)} rad/s`;
      alt4 = `${(parseFloat(omega) + 5.0).toFixed(2)} rad/s`;
      hint = 'A frequência angular no MHS massa-mola é dada por ω = √(k/m).';
    } else if (ch.num === 16) {
      // Wave on string
      const T = (50 + (n * 10)).toFixed(0);
      const mu = (0.005 + (n * 0.001)).toFixed(4);
      const v = Math.sqrt(parseFloat(T) / parseFloat(mu)).toFixed(1);
      title = `Velocidade de Propagação de Onda Transversal em Corda (${n})`;
      statement = `Uma corda esticada está sob uma tração T = ${T} N e possui densidade linear de massa μ = ${mu} kg/m. Qual é a velocidade de propagação v das ondas transversais nessa corda?`;
      keyFormula = 'v = √(T / μ)';
      givenData = { 'Tração T': `${T} N`, 'Densidade linear μ': `${mu} kg/m` };
      algebraicSteps = [
        `v = √(${T} / ${mu}) = ${v} m/s`,
      ];
      numericalCalc = `√(${T} / ${mu}) = ${v} m/s`;
      correctVal = `${v} m/s`;
      alt1 = `${(parseFloat(v) * 1.3).toFixed(1)} m/s`;
      alt2 = `${(parseFloat(v) * 0.7).toFixed(1)} m/s`;
      alt3 = `${(parseFloat(v) * 2.0).toFixed(1)} m/s`;
      alt4 = `${(parseFloat(v) * 0.5).toFixed(1)} m/s`;
      hint = 'A velocidade de onda numa corda tensa é calculada por v = √(T/μ).';
    } else if (ch.num === 17) {
      // Sound Intensity level in dB
      const I_ratio = Math.pow(10, (n % 6) + 3); // between 10³ and 10⁸
      const dB = (10 * Math.log10(I_ratio)).toFixed(0);
      title = `Nível de Intensidade Sonora em Decibéis (${n})`;
      statement = `Uma fonte sonora produz uma intensidade de onda I igual a ${I_ratio} vezes o limiar da audição humana (I₀ = 1,0 × 10⁻¹² W/m²). Qual é o nível de intensidade sonora β em decibéis (dB)?`;
      keyFormula = 'β = (10 dB) · log₁₀(I / I₀)';
      givenData = { 'Razão I / I₀': `${I_ratio}` };
      algebraicSteps = [
        `β = 10 · log₁₀(${I_ratio})`,
        `β = 10 · ${Math.log10(I_ratio).toFixed(0)} = ${dB} dB`,
      ];
      numericalCalc = `10 × log10(${I_ratio}) = ${dB} dB`;
      correctVal = `${dB} dB`;
      alt1 = `${(parseInt(dB) + 20)} dB`;
      alt2 = `${Math.max(10, parseInt(dB) - 20)} dB`;
      alt3 = `${(parseInt(dB) * 2)} dB`;
      alt4 = `${(parseInt(dB) + 10)} dB`;
      hint = 'A escala em decibéis é logarítmica: β = 10·log10(I/I₀).';
    } else if (ch.num === 18) {
      // Heat & First Law
      const m = (0.5 + (n * 0.2)).toFixed(2);
      const c = '4186'; // J/(kg·K) water
      const deltaT = (10 + (n * 5)).toFixed(0);
      const Q = (parseFloat(m) * 4186 * parseFloat(deltaT)).toFixed(0);
      title = `Calor Sensível para Aquecimento de Água (${n})`;
      statement = `Qual é a quantidade de calor necessária para aquecer m = ${m} kg de água de calor específico c = 4186 J/(kg·°C) provocando uma elevação de temperatura de ΔT = ${deltaT} °C?`;
      keyFormula = 'Q = m · c · ΔT';
      givenData = { 'Massa m': `${m} kg`, 'Calor específico c': '4186 J/(kg·°C)', 'ΔT': `${deltaT} °C` };
      algebraicSteps = [
        `Q = ${m} · 4186 · ${deltaT}`,
        `Q = ${Q} J = ${(parseFloat(Q)/1000).toFixed(1)} kJ`,
      ];
      numericalCalc = `${m} × 4186 × ${deltaT} = ${Q} J`;
      correctVal = `${(parseFloat(Q)/1000).toFixed(1)} kJ`;
      alt1 = `${(parseFloat(Q) * 1.5 / 1000).toFixed(1)} kJ`;
      alt2 = `${(parseFloat(Q) * 0.5 / 1000).toFixed(1)} kJ`;
      alt3 = `${(parseFloat(Q) * 2.0 / 1000).toFixed(1)} kJ`;
      alt4 = `${(parseFloat(Q) * 0.8 / 1000).toFixed(1)} kJ`;
      hint = 'Equação fundamental da calorimetria: Q = m · c · ΔT.';
    } else if (ch.num === 19) {
      // Kinetic theory of ideal gases
      const T = (300 + (n * 50)).toFixed(0);
      const R = 8.314;
      const M = 0.028; // N2 molar mass (kg/mol)
      const vrms = Math.sqrt((3 * R * parseFloat(T)) / M).toFixed(0);
      title = `Velocidade Média Quadrática (v_rms) em Gás Ideal (${n})`;
      statement = `Calcule a velocidade média quadrática v_rms das moléculas de gás nitrogênio (massa molar M = 0,028 kg/mol) à temperatura absoluta de T = ${T} K. (Dado: R = 8,314 J/(mol·K))`;
      keyFormula = 'v_rms = √(3 · R · T / M)';
      givenData = { 'Temperatura T': `${T} K`, 'Massa molar M': '0,028 kg/mol', 'Constante R': '8,314 J/(mol·K)' };
      algebraicSteps = [
        `v_rms = √( 3 · 8,314 · ${T} / 0,028 )`,
        `v_rms = ${vrms} m/s`,
      ];
      numericalCalc = `√(3 × 8,314 × ${T} / 0,028) ≈ ${vrms} m/s`;
      correctVal = `${vrms} m/s`;
      alt1 = `${(parseInt(vrms) * 1.3).toFixed(0)} m/s`;
      alt2 = `${(parseInt(vrms) * 0.7).toFixed(0)} m/s`;
      alt3 = `${(parseInt(vrms) + 200)} m/s`;
      alt4 = `${(parseInt(vrms) - 150)} m/s`;
      hint = 'Pela teoria cinética dos gases ideais: v_rms = √(3·R·T / M).';
    } else {
      // Carnot Cycle
      const Tq = (500 + (n * 50)).toFixed(0);
      const Tf = (250 + (n * 10)).toFixed(0);
      const eta = ((1 - (parseFloat(Tf) / parseFloat(Tq))) * 100).toFixed(1);
      title = `Rendimento Térmico Máximo de Carnot (${n})`;
      statement = `Uma máquina de Carnot opera entre dois reservatórios térmicos a temperaturas T_quente = ${Tq} K e T_fria = ${Tf} K. Qual é o rendimento teórico máximo η dessa máquina?`;
      keyFormula = 'η = 1 - (T_fria / T_quente)';
      givenData = { 'T_quente': `${Tq} K`, 'T_fria': `${Tf} K` };
      algebraicSteps = [
        `η = 1 - (${Tf} / ${Tq})`,
        `η = ${eta}%`,
      ];
      numericalCalc = `1 - (${Tf} / ${Tq}) = ${(parseFloat(eta)/100).toFixed(3)} = ${eta}%`;
      correctVal = `${eta}%`;
      alt1 = `${(parseFloat(eta) * 1.3).toFixed(1)}%`;
      alt2 = `${(parseFloat(eta) * 0.7).toFixed(1)}%`;
      alt3 = '100%';
      alt4 = `${(parseFloat(eta) + 15).toFixed(1)}%`;
      hint = 'O rendimento de Carnot depende unicamente da razão entre as temperaturas absolutas: η = 1 - Tf/Tq.';
    }

    list.push({
      id: `hr-v2-${String(i).padStart(3, '0')}`,
      volume: 2,
      chapterNumber: ch.num,
      chapterTitle: ch.title,
      topic: ch.topic,
      difficulty: n % 3 === 0 ? 'Difícil' : n % 2 === 0 ? 'Médio' : 'Fácil',
      bookRef: `Fundamentos de Física - Halliday & Resnick, Vol. 2, Cap. ${ch.num}`,
      title,
      statement,
      options: [
        { id: `opt-v2-${i}-a`, label: 'A', text: alt1, isCorrect: false },
        { id: `opt-v2-${i}-b`, label: 'B', text: correctVal, isCorrect: true },
        { id: `opt-v2-${i}-c`, label: 'C', text: alt2, isCorrect: false },
        { id: `opt-v2-${i}-d`, label: 'D', text: alt3, isCorrect: false },
        { id: `opt-v2-${i}-e`, label: 'E', text: alt4, isCorrect: false },
      ],
      hint,
      explanation: {
        keyFormula,
        principles: ['Fundamentos de termodinâmica e física ondulatória de Halliday & Resnick.'],
        givenData,
        algebraicSteps,
        numericalCalculation: numericalCalc,
        conclusion: `O resultado calculado é ${correctVal}. Alternativa B correta.`,
      },
    });
  }

  return list;
};

export const ALL_QUESTIONS_VOL_2 = generateQuestionsVol2();
