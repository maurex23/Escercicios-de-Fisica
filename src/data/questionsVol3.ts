import { Question } from '../types/physics';

const CHAPTERS_V3 = [
  { num: 21, title: 'Carga Elétrica e Lei de Coulomb', topic: 'Força Eletrostática e Quantização de Carga' },
  { num: 22, title: 'Campos Elétricos', topic: 'Campo de Cargas Puntiformes e Dipolos' },
  { num: 23, title: 'Lei de Gauss', topic: 'Fluxo Elétrico e Superfícies Gaussianas' },
  { num: 24, title: 'Potencial Elétrico', topic: 'Energia Potencial Elétrica e Superfícies Equipotenciais' },
  { num: 25, title: 'Capacitância e Dielétricos', topic: 'Capacitores Planos, Cilíndricos e Associação' },
  { num: 26, title: 'Corrente e Resistência', topic: 'Lei de Ohm, Resistividade e Efeito Joule' },
  { num: 27, title: 'Circuitos CC', topic: 'Regras de Kirchhoff e Circuitos RC' },
  { num: 28, title: 'Campos Magnéticos', topic: 'Força de Lorentz e Trajetória em Campo Magnético' },
  { num: 29, title: 'Campos Produzidos por Correntes', topic: 'Lei de Biot-Savart e Lei de Ampère' },
  { num: 30, title: 'Indução e Indutância', topic: 'Lei da Indução de Faraday e Lei de Lenz' },
  { num: 31, title: 'Oscilações Eletromagnéticas e CA', topic: 'Circuitos RLC e Ressonância' },
];

export const generateQuestionsVol3 = (): Question[] => {
  const list: Question[] = [];

  for (let i = 1; i <= 105; i++) {
    const chIndex = (i - 1) % CHAPTERS_V3.length;
    const ch = CHAPTERS_V3[chIndex];
    const n = Math.floor((i - 1) / CHAPTERS_V3.length) + 1;

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

    if (ch.num === 21) {
      // Coulomb law
      const q1 = (1 + n).toFixed(1);
      const q2 = (2 + n).toFixed(1);
      const r = (0.2 + (n * 0.05)).toFixed(2);
      const ke = 8.99e9;
      const F = (ke * parseFloat(q1) * 1e-6 * parseFloat(q2) * 1e-6 / Math.pow(parseFloat(r), 2)).toFixed(3);
      title = `Lei de Coulomb entre Cargas Puntiformes (${n})`;
      statement = `Duas cargas pontuais no vácuo de valores q₁ = +${q1} μC e q₂ = +${q2} μC estão separadas por uma distância r = ${r} m. Sendo a constante eletrostática k_e = 8,99 × 10⁹ N·m²/C², qual é o módulo da força de repulsão eletrostática mútua?`;
      keyFormula = 'F = k_e · (|q₁ · q₂|) / r²';
      givenData = { 'q₁': `${q1} μC`, 'q₂': `${q2} μC`, 'r': `${r} m`, 'k_e': '8,99 × 10⁹ N·m²/C²' };
      algebraicSteps = [
        `F = (8,99 × 10⁹ · ${q1}×10⁻⁶ · ${q2}×10⁻⁶) / (${r})²`,
        `F = ${F} N`,
      ];
      numericalCalc = `(8,99e9 × ${q1}e-6 × ${q2}e-6) / ${r}² = ${F} N`;
      correctVal = `${F} N`;
      alt1 = `${(parseFloat(F) * 1.5).toFixed(3)} N`;
      alt2 = `${(parseFloat(F) * 0.5).toFixed(3)} N`;
      alt3 = `${(parseFloat(F) * 2.0).toFixed(3)} N`;
      alt4 = `${(parseFloat(F) + 1.0).toFixed(3)} N`;
      hint = 'Aplique a Lei de Coulomb: F = k_e · |q₁·q₂| / r².';
    } else if (ch.num === 22) {
      // Electric field
      const q = (2 + n).toFixed(1);
      const r = (0.3 + (n * 0.05)).toFixed(2);
      const ke = 8.99e9;
      const E = (ke * parseFloat(q) * 1e-6 / Math.pow(parseFloat(r), 2)).toFixed(0);
      title = `Módulo do Campo Elétrico de Carga Puntiforme (${n})`;
      statement = `Qual é a intensidade do campo elétrico E a uma distância radial de r = ${r} m de uma carga pontual isolada q = +${q} μC no vácuo? (Dado: k_e = 8,99 × 10⁹ N·m²/C²)`;
      keyFormula = 'E = k_e · |q| / r²';
      givenData = { 'Carga q': `${q} μC`, 'Distância r': `${r} m` };
      algebraicSteps = [
        `E = (8,99 × 10⁹ · ${q}×10⁻⁶) / (${r})²`,
        `E = ${E} N/C`,
      ];
      numericalCalc = `8,99e9 × ${q}e-6 / ${r}² = ${E} N/C`;
      correctVal = `${E} N/C`;
      alt1 = `${(parseInt(E) * 1.4).toFixed(0)} N/C`;
      alt2 = `${(parseInt(E) * 0.6).toFixed(0)} N/C`;
      alt3 = `${(parseInt(E) * 2.0).toFixed(0)} N/C`;
      alt4 = `${(parseInt(E) + 15000)} N/C`;
      hint = 'O campo elétrico gerado por uma carga puntiforme é E = k_e · q / r².';
    } else if (ch.num === 25) {
      // Capacitance
      const C = (5 + (n * 2)).toFixed(1); // uF
      const V = (20 + (n * 10)).toFixed(0); // V
      const Q = (parseFloat(C) * parseFloat(V)).toFixed(0); // uC
      const U = (0.5 * parseFloat(C) * 1e-6 * Math.pow(parseFloat(V), 2) * 1000).toFixed(2); // mJ
      title = `Armazenamento de Carga e Energia em Capacitor (${n})`;
      statement = `Um capacitor de capacitância C = ${C} μF é submetido a uma ddp de V = ${V} V. Qual é a quantidade de carga elétrica acumulada em suas placas e a energia potencial eletrostática armazenada?`;
      keyFormula = 'q = C · V,   U = ½ · C · V²';
      givenData = { 'Capacitância C': `${C} μF`, 'Tensão V': `${V} V` };
      algebraicSteps = [
        `q = ${C} μF · ${V} V = ${Q} μC`,
        `U = 0,5 · (${C} × 10⁻⁶) · (${V})² = ${U} mJ`,
      ];
      numericalCalc = `q = ${C}×${V} = ${Q} μC; U = 0,5×${C}e-6×${V}² = ${U} mJ`;
      correctVal = `q = ${Q} μC e U = ${U} mJ`;
      alt1 = `q = ${(parseInt(Q)*2)} μC e U = ${(parseFloat(U)*2).toFixed(2)} mJ`;
      alt2 = `q = ${(parseInt(Q)/2).toFixed(0)} μC e U = ${(parseFloat(U)/2).toFixed(2)} mJ`;
      alt3 = `q = ${Q} μC e U = ${(parseFloat(U)*4).toFixed(2)} mJ`;
      alt4 = `q = ${(parseInt(Q)*1.5).toFixed(0)} μC e U = ${U} mJ`;
      hint = 'A carga é q = C · V e a energia é U = ½ · C · V².';
    } else if (ch.num === 26 || ch.num === 27) {
      // Ohm & DC circuits
      const R = (10 + (n * 5)).toFixed(0);
      const V = (12 + (n * 6)).toFixed(0);
      const I = (parseFloat(V) / parseFloat(R)).toFixed(2);
      const P = (parseFloat(V) * parseFloat(I)).toFixed(2);
      title = `Corrente e Potência Dissipada em Resistor (${n})`;
      statement = `Um resistor ôhmico de resistência R = ${R} Ω é ligado aos terminais de uma fonte de tensão constante V = ${V} V. Qual é a corrente elétrica I que o atravessa e a potência dissipada por efeito Joule?`;
      keyFormula = 'I = V / R,   P = V · I = V² / R';
      givenData = { 'Resistência R': `${R} Ω`, 'Tensão V': `${V} V` };
      algebraicSteps = [
        `I = ${V} V / ${R} Ω = ${I} A`,
        `P = ${V} · ${I} = ${P} W`,
      ];
      numericalCalc = `I = ${V} / ${R} = ${I} A; P = ${V} × ${I} = ${P} W`;
      correctVal = `I = ${I} A e P = ${P} W`;
      alt1 = `I = ${(parseFloat(I)*1.5).toFixed(2)} A e P = ${(parseFloat(P)*1.5).toFixed(2)} W`;
      alt2 = `I = ${(parseFloat(I)*0.5).toFixed(2)} A e P = ${(parseFloat(P)*0.5).toFixed(2)} W`;
      alt3 = `I = ${I} A e P = ${(parseFloat(P)*2).toFixed(2)} W`;
      alt4 = `I = ${(parseFloat(I)*2).toFixed(2)} A e P = ${P} W`;
      hint = 'Primeira Lei de Ohm: I = V / R; Potência elétrica: P = V · I.';
    } else if (ch.num === 28) {
      // Magnetic force on moving charge
      const q = 1.6e-19; // electron or proton
      const v = (2 + n).toFixed(1); // x 10^6 m/s
      const B = (0.1 + (n * 0.05)).toFixed(2); // T
      const F = (q * parseFloat(v) * 1e6 * parseFloat(B)).toExponential(2);
      title = `Força Magnética de Lorentz sobre Partícula Carregada (${n})`;
      statement = `Um próton (carga q = 1,60 × 10⁻¹⁹ C) entra perpendicularmente a um campo magnético uniforme de módulo B = ${B} T com velocidade v = ${v} × 10⁶ m/s. Qual é o módulo da força magnética que atua sobre ele?`;
      keyFormula = 'F_B = |q| · v · B · sen(θ) (com θ = 90°)';
      givenData = { 'q': '1,60 × 10⁻¹⁹ C', 'v': `${v} × 10⁶ m/s`, 'B': `${B} T` };
      algebraicSteps = [
        `F_B = (1,60 × 10⁻¹⁹) · (${v} × 10⁶) · ${B} · 1`,
        `F_B = ${F} N`,
      ];
      numericalCalc = `1,60e-19 × ${v}e6 × ${B} = ${F} N`;
      correctVal = `${F} N`;
      alt1 = `${(parseFloat(F) * 1.5).toExponential(2)} N`;
      alt2 = `${(parseFloat(F) * 0.5).toExponential(2)} N`;
      alt3 = `${(parseFloat(F) * 2.0).toExponential(2)} N`;
      alt4 = `${(parseFloat(F) * 10).toExponential(2)} N`;
      hint = 'A força magnética sobre uma carga pontual móvel é F_B = q · v · B · sen(θ).';
    } else if (ch.num === 30) {
      // Faraday's law
      const N = (50 + (n * 25)).toFixed(0);
      const dPhi = (0.02 + (n * 0.01)).toFixed(3);
      const dt = '0.05';
      const fem = (parseInt(N) * (parseFloat(dPhi) / parseFloat(dt))).toFixed(1);
      title = `F.E.M. Induzida pela Lei de Faraday em Bobina (${n})`;
      statement = `Uma bobina contendo N = ${N} espiras é atravessada por um fluxo magnético que varia de ΔΦ_B = ${dPhi} Wb em um intervalo de tempo de Δt = 0,05 s. Qual é o módulo da força eletromotriz induzida média?`;
      keyFormula = '|ε| = N · |ΔΦ_B / Δt|';
      givenData = { 'N': `${N} espiras`, 'ΔΦ_B': `${dPhi} Wb`, 'Δt': '0,05 s' };
      algebraicSteps = [
        `|ε| = ${N} · (${dPhi} / 0,05)`,
        `|ε| = ${N} · ${(parseFloat(dPhi)/0.05).toFixed(2)} = ${fem} V`,
      ];
      numericalCalc = `${N} × (${dPhi} / 0,05) = ${fem} V`;
      correctVal = `${fem} V`;
      alt1 = `${(parseFloat(fem) * 1.5).toFixed(1)} V`;
      alt2 = `${(parseFloat(fem) * 0.5).toFixed(1)} V`;
      alt3 = `${(parseFloat(fem) * 2.0).toFixed(1)} V`;
      alt4 = `${(parseFloat(fem) + 10).toFixed(1)} V`;
      hint = 'Lei da Indução de Faraday: a f.e.m. é proporcional ao número de espiras e à taxa de variação temporal do fluxo magnético.';
    } else {
      // Ampere's Law / Long wire
      const I = (5 + (n * 2)).toFixed(1);
      const r = (0.05 + (n * 0.01)).toFixed(3);
      const mu0 = 4 * Math.PI * 1e-7;
      const B = ((mu0 * parseFloat(I)) / (2 * Math.PI * parseFloat(r))).toExponential(2);
      title = `Campo Magnético de um Fio Retilíneo Longo (${n})`;
      statement = `Qual é o módulo do campo magnético B a uma distância r = ${r} m de um fio reto longo conduzindo uma corrente elétrica I = ${I} A no vácuo? (Dado: μ₀ = 4π × 10⁻⁷ T·m/A)`;
      keyFormula = 'B = (μ₀ · I) / (2π · r)';
      givenData = { 'Corrente I': `${I} A`, 'Distância r': `${r} m`, 'μ₀': '4π × 10⁻⁷ T·m/A' };
      algebraicSteps = [
        `B = (4π × 10⁻⁷ · ${I}) / (2π · ${r}) = (2 × 10⁻⁷ · ${I}) / ${r}`,
        `B = ${B} T`,
      ];
      numericalCalc = `(2e-7 × ${I}) / ${r} = ${B} T`;
      correctVal = `${B} T`;
      alt1 = `${(parseFloat(B) * 1.4).toExponential(2)} T`;
      alt2 = `${(parseFloat(B) * 0.7).toExponential(2)} T`;
      alt3 = `${(parseFloat(B) * 2.0).toExponential(2)} T`;
      alt4 = `${(parseFloat(B) * 0.5).toExponential(2)} T`;
      hint = 'Pela Lei de Ampère, o campo magnético a uma distância r de um fio longo é B = μ₀·I / (2π·r).';
    }

    list.push({
      id: `hr-v3-${String(i).padStart(3, '0')}`,
      volume: 3,
      chapterNumber: ch.num,
      chapterTitle: ch.title,
      topic: ch.topic,
      difficulty: n % 3 === 0 ? 'Difícil' : n % 2 === 0 ? 'Médio' : 'Fácil',
      bookRef: `Fundamentos de Física - Halliday & Resnick, Vol. 3, Cap. ${ch.num}`,
      title,
      statement,
      options: [
        { id: `opt-v3-${i}-a`, label: 'A', text: alt1, isCorrect: false },
        { id: `opt-v3-${i}-b`, label: 'B', text: correctVal, isCorrect: true },
        { id: `opt-v3-${i}-c`, label: 'C', text: alt2, isCorrect: false },
        { id: `opt-v3-${i}-d`, label: 'D', text: alt3, isCorrect: false },
        { id: `opt-v3-${i}-e`, label: 'E', text: alt4, isCorrect: false },
      ],
      hint,
      explanation: {
        keyFormula,
        principles: ['Eletromagnetismo Clássico e Equações de Maxwell de Halliday & Resnick.'],
        givenData,
        algebraicSteps,
        numericalCalculation: numericalCalc,
        conclusion: `O valor obtido é ${correctVal}. Alternativa B correta.`,
      },
    });
  }

  return list;
};

export const ALL_QUESTIONS_VOL_3 = generateQuestionsVol3();
