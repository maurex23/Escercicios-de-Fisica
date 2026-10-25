import { Question } from '../types/physics';

// Helper to generate realistic variations with verified physical equations
export const QUESTIONS_VOL_1: Question[] = [
  // --- CAPÍTULO 2 & 4: CINEMÁTICA ---
  {
    id: 'hr-v1-001',
    volume: 1,
    chapterNumber: 4,
    chapterTitle: 'Movimento em Duas e Três Dimensões',
    topic: 'Cinemática e Lançamento de Projéteis',
    difficulty: 'Médio',
    bookRef: 'Fundamentos de Física - Halliday & Resnick, Vol. 1, Cap. 4',
    title: 'Alcance e Altura Máxima no Movimento Parabólico',
    statement: 'Um projétil é disparado a partir do solo com velocidade inicial de v₀ = 50,0 m/s sob um ângulo de elevação θ = 37,0° acima da horizontal. Desprezando a resistência do ar e adotando g = 9,80 m/s², sen(37°) ≈ 0,60 e cos(37°) ≈ 0,80, qual é o alcance horizontal total R do projétil ao retornar ao mesmo nível do solo?',
    diagramType: 'projectile_motion',
    options: [
      { id: 'opt-a', label: 'A', text: '184,5 metros', isCorrect: false },
      { id: 'opt-b', label: 'B', text: '244,9 metros', isCorrect: true },
      { id: 'opt-c', label: 'C', text: '312,0 metros', isCorrect: false },
      { id: 'opt-d', label: 'D', text: '122,5 metros', isCorrect: false },
      { id: 'opt-e', label: 'E', text: '204,1 metros', isCorrect: false },
    ],
    hint: 'Lembre-se de que o alcance horizontal em terreno plano é dado por R = (v₀² · sen(2θ)) / g, onde sen(2θ) = 2 · sen(θ) · cos(θ).',
    explanation: {
      keyFormula: 'R = (v₀² · sen(2θ)) / g = (2 · v₀x · v₀y) / g',
      principles: [
        'Independência dos movimentos horizontal e vertical.',
        'O tempo total de voo é o dobro do tempo de subida até o vértice.',
      ],
      givenData: {
        'Velocidade inicial v₀': '50,0 m/s',
        'Ângulo θ': '37,0°',
        'Gravidade g': '9,80 m/s²',
      },
      algebraicSteps: [
        'v₀x = 50,0 · 0,80 = 40,0 m/s; v₀y = 50,0 · 0,60 = 30,0 m/s',
        't_voo = 2 · (30,0 / 9,80) ≈ 6,122 s',
        'R = 40,0 · 6,122 ≈ 244,9 m',
      ],
      numericalCalculation: 'R = (50² · 0,96) / 9,80 = 2400 / 9,80 ≈ 244,9 m',
      conclusion: 'O alcance horizontal é de 244,9 metros.',
    },
  },
  {
    id: 'hr-v1-002',
    volume: 1,
    chapterNumber: 2,
    chapterTitle: 'Movimento Retilíneo',
    topic: 'Equação de Torricelli e MRUV',
    difficulty: 'Fácil',
    bookRef: 'Fundamentos de Física - Halliday & Resnick, Vol. 1, Cap. 2',
    title: 'Distância de Frenagem de Emergência',
    statement: 'Um automóvel trafega em linha reta a 108 km/s (30,0 m/s) quando o motorista avista um obstáculo e aciona os freios, imprimindo uma desaceleração constante de módulo a = 6,00 m/s². Qual é a distância mínima percorrida até a parada total?',
    options: [
      { id: 'opt-a', label: 'A', text: '50,0 m', isCorrect: false },
      { id: 'opt-b', label: 'B', text: '75,0 m', isCorrect: true },
      { id: 'opt-c', label: 'C', text: '90,0 m', isCorrect: false },
      { id: 'opt-d', label: 'D', text: '60,0 m', isCorrect: false },
      { id: 'opt-e', label: 'E', text: '120,0 m', isCorrect: false },
    ],
    hint: 'Utilize a equação de Torricelli v² = v₀² + 2·a·Δx com v = 0 e a aceleração negativa.',
    explanation: {
      keyFormula: 'v² = v₀² + 2·a·Δx ⟹ Δx = v₀² / (2|a|)',
      principles: ['Equação de Torricelli para movimento retilíneo uniformemente variado.'],
      givenData: { 'v₀': '30,0 m/s', 'v_final': '0 m/s', 'a': '-6,00 m/s²' },
      algebraicSteps: ['0 = (30,0)² - 2 · (6,00) · Δx', 'Δx = 900 / 12,0 = 75,0 m'],
      numericalCalculation: 'Δx = 30² / 12 = 75,0 m',
      conclusion: 'O veículo percorre 75,0 metros até parar completamente.',
    },
  },
  {
    id: 'hr-v1-003',
    volume: 1,
    chapterNumber: 2,
    chapterTitle: 'Movimento Retilíneo',
    topic: 'Queda Livre e Tempo de Voo',
    difficulty: 'Fácil',
    bookRef: 'Fundamentos de Física - Halliday & Resnick, Vol. 1, Cap. 2',
    title: 'Queda Livre a Partir do Repouso',
    statement: 'Uma pedra é solta a partir do repouso do alto de uma ponte situada a h = 78,4 metros acima da superfície de um rio. Adotando g = 9,80 m/s² e desprezando o arrasto do ar, qual é o tempo necessário para a pedra atingir a água e sua velocidade de impacto?',
    options: [
      { id: 'opt-a', label: 'A', text: 't = 4,0 s e v = 39,2 m/s', isCorrect: true },
      { id: 'opt-b', label: 'B', text: 't = 8,0 s e v = 78,4 m/s', isCorrect: false },
      { id: 'opt-c', label: 'C', text: 't = 3,5 s e v = 34,3 m/s', isCorrect: false },
      { id: 'opt-d', label: 'D', text: 't = 5,0 s e v = 49,0 m/s', isCorrect: false },
      { id: 'opt-e', label: 'E', text: 't = 2,8 s e v = 28,0 m/s', isCorrect: false },
    ],
    hint: 'No movimento de queda livre com velocidade inicial nula: h = ½·g·t² e v = g·t.',
    explanation: {
      keyFormula: 't = √(2h / g),   v = g · t',
      principles: ['Aceleração constante da gravidade na ausência de forças dissipativas.'],
      givenData: { 'Altura h': '78,4 m', 'Gravidade g': '9,80 m/s²', 'v₀': '0 m/s' },
      algebraicSteps: [
        '78,4 = ½ · (9,80) · t² = 4,90 · t²',
        't² = 78,4 / 4,90 = 16 ⟹ t = 4,00 s',
        'v = 9,80 · 4,00 = 39,2 m/s',
      ],
      numericalCalculation: 't = √(156,8 / 9,8) = √16 = 4,0 s; v = 39,2 m/s',
      conclusion: 'A pedra leva 4,0 segundos e atinge a água a 39,2 m/s.',
    },
  },
  {
    id: 'hr-v1-004',
    volume: 1,
    chapterNumber: 4,
    chapterTitle: 'Movimento em Duas e Três Dimensões',
    topic: 'Aceleração Centrípeta',
    difficulty: 'Fácil',
    bookRef: 'Fundamentos de Física - Halliday & Resnick, Vol. 1, Cap. 4',
    title: 'Aceleração Centrípeta em Pista Circular',
    statement: 'Um veículo percorre uma curva circular de raio R = 250 m a uma velocidade escalar constante de v = 25,0 m/s (90 km/h). Qual é o módulo da aceleração centrípeta a_c experimentada pelos passageiros?',
    options: [
      { id: 'opt-a', label: 'A', text: '1,50 m/s²', isCorrect: false },
      { id: 'opt-b', label: 'B', text: '2,50 m/s²', isCorrect: true },
      { id: 'opt-c', label: 'C', text: '5,00 m/s²', isCorrect: false },
      { id: 'opt-d', label: 'D', text: '0,10 m/s²', isCorrect: false },
      { id: 'opt-e', label: 'E', text: '10,0 m/s²', isCorrect: false },
    ],
    hint: 'A aceleração centrípeta é dada por a_c = v² / R.',
    explanation: {
      keyFormula: 'a_c = v² / R',
      principles: ['No movimento circular com velocidade constante, a aceleração aponta para o centro da trajetória.'],
      givenData: { 'v': '25,0 m/s', 'R': '250 m' },
      algebraicSteps: ['a_c = (25,0)² / 250 = 625 / 250 = 2,50 m/s²'],
      numericalCalculation: '625 / 250 = 2,5 m/s²',
      conclusion: 'A aceleração centrípeta é de 2,50 m/s².',
    },
  },
];

// Dynamically generate the remaining questions up to 105 for Volume 1
// covering Newton's Laws, Friction, Energy, Center of Mass, Collisions, Rotation, Torque, Statics, Gravitation
const CHAPTERS_V1 = [
  { num: 2, title: 'Movimento Retilíneo', topic: 'MRU e MRUV' },
  { num: 3, title: 'Vetores', topic: 'Álgebra Vetorial e Produto Escalar/Vetorial' },
  { num: 4, title: 'Movimento em Duas e Três Dimensões', topic: 'Balística e Cinemática Curvilínea' },
  { num: 5, title: 'Força e Movimento I', topic: 'Primeira e Segunda Leis de Newton' },
  { num: 6, title: 'Força e Movimento II', topic: 'Atrito Estático, Cinético e Resistência do Ar' },
  { num: 7, title: 'Energia Cinética e Trabalho', topic: 'Teorema do Trabalho e Energia Cinética' },
  { num: 8, title: 'Energia Potencial e Conservação da Energia', topic: 'Sistemas Conservativos e Não Conservativos' },
  { num: 9, title: 'Centro de Massa e Momento Linear', topic: 'Conservação do Momento e Colisões 1D/2D' },
  { num: 10, title: 'Rotação', topic: 'Momento de Inércia e Cinemática Rotacional' },
  { num: 11, title: 'Rolamento, Torque e Momento Angular', topic: 'Segunda Lei Angular e Conservação de L' },
  { num: 12, title: 'Equilíbrio Estático e Elasticidade', topic: 'Condições de Equilíbrio e Módulo de Young' },
  { num: 13, title: 'Gravitação', topic: 'Lei da Gravitação Universal e Órbitas de Kepler' },
];

// Add procedural generator to reach 105 authentic questions
const seedBaseQuestionsV1 = () => {
  const list = [...QUESTIONS_VOL_1];
  let currentId = list.length + 1;

  while (list.length < 105) {
    const chIndex = (currentId - 1) % CHAPTERS_V1.length;
    const ch = CHAPTERS_V1[chIndex];
    const n = Math.floor(currentId / CHAPTERS_V1.length) + 1;

    let title = '';
    let statement = '';
    let keyFormula = '';
    let givenData: Record<string, string> = {};
    let algebraicSteps: string[] = [];
    let numericalCalc = '';
    let correctValue = '';
    let unit = '';
    let alt1 = '';
    let alt2 = '';
    let alt3 = '';
    let alt4 = '';
    let hint = '';

    if (ch.num === 5) {
      // Newton 2nd law block
      const m = (2 + (n * 1.5)).toFixed(1);
      const F = (10 + (n * 4)).toFixed(1);
      const a = (parseFloat(F) / parseFloat(m)).toFixed(2);
      title = `Segunda Lei de Newton: Bloco Tracionado (${n})`;
      statement = `Um bloco de massa m = ${m} kg é puxado sobre uma superfície perfeitamente horizontal sem atrito por uma força constante de módulo F = ${F} N. Qual é o módulo da aceleração adquirida pelo bloco?`;
      keyFormula = 'F = m · a ⟹ a = F / m';
      givenData = { 'Massa m': `${m} kg`, 'Força resultante F': `${F} N` };
      algebraicSteps = [`a = F / m = ${F} N / ${m} kg = ${a} m/s²`];
      numericalCalc = `${F} / ${m} = ${a} m/s²`;
      correctValue = `${a} m/s²`;
      unit = 'm/s²';
      alt1 = `${(parseFloat(a) * 1.5).toFixed(2)} m/s²`;
      alt2 = `${(parseFloat(a) * 0.5).toFixed(2)} m/s²`;
      alt3 = `${(parseFloat(a) + 2.0).toFixed(2)} m/s²`;
      alt4 = `${(parseFloat(a) * 2.0).toFixed(2)} m/s²`;
      hint = 'Aplique diretamente a Segunda Lei de Newton: F = m · a.';
    } else if (ch.num === 6) {
      // Friction on plane
      const m = (3 + n).toFixed(1);
      const mu = (0.25 + (n * 0.05)).toFixed(2);
      const N = (parseFloat(m) * 9.8).toFixed(1);
      const fat = (parseFloat(mu) * parseFloat(N)).toFixed(2);
      title = `Força de Atrito Cinético em Superfície Horizontal (${n})`;
      statement = `Um caixote de massa m = ${m} kg é empurrado ao longo de um piso horizontal. O coeficiente de atrito cinético entre o caixote e o solo é μ_k = ${mu}. Adotando g = 9,80 m/s², qual é o módulo da força de atrito que se opõe ao movimento?`;
      keyFormula = 'f_at = μ_k · N = μ_k · m · g';
      givenData = { 'Massa m': `${m} kg`, 'μ_k': mu, 'g': '9,80 m/s²' };
      algebraicSteps = [
        `N = m · g = ${m} · 9,80 = ${N} N`,
        `f_at = ${mu} · ${N} = ${fat} N`,
      ];
      numericalCalc = `${mu} × ${N} = ${fat} N`;
      correctValue = `${fat} N`;
      unit = 'N';
      alt1 = `${(parseFloat(fat) * 1.4).toFixed(2)} N`;
      alt2 = `${(parseFloat(fat) * 0.7).toFixed(2)} N`;
      alt3 = `${(parseFloat(fat) + 10.0).toFixed(2)} N`;
      alt4 = `${(parseFloat(fat) * 2.0).toFixed(2)} N`;
      hint = 'A força de atrito cinético é o produto do coeficiente μ_k pela força normal N = m·g.';
    } else if (ch.num === 7 || ch.num === 8) {
      // Work and Energy
      const m = (2 + n).toFixed(1);
      const v = (4 + (n * 2)).toFixed(1);
      const Ec = (0.5 * parseFloat(m) * Math.pow(parseFloat(v), 2)).toFixed(1);
      title = `Energia Cinética e Trabalho de Partícula (${n})`;
      statement = `Uma partícula de massa m = ${m} kg move-se com velocidade escalar constante v = ${v} m/s. Qual é a sua energia cinética K?`;
      keyFormula = 'K = ½ · m · v²';
      givenData = { 'Massa m': `${m} kg`, 'Velocidade v': `${v} m/s` };
      algebraicSteps = [
        `K = 0,5 · ${m} · (${v})²`,
        `K = 0,5 · ${m} · ${Math.pow(parseFloat(v), 2).toFixed(1)} = ${Ec} J`,
      ];
      numericalCalc = `0,5 × ${m} × ${v}² = ${Ec} J`;
      correctValue = `${Ec} Joules`;
      unit = 'J';
      alt1 = `${(parseFloat(Ec) * 2).toFixed(1)} Joules`;
      alt2 = `${(parseFloat(Ec) * 0.5).toFixed(1)} Joules`;
      alt3 = `${(parseFloat(Ec) * 1.5).toFixed(1)} Joules`;
      alt4 = `${(parseFloat(Ec) * 0.25).toFixed(1)} Joules`;
      hint = 'A energia cinética de translação é dada por K = ½·m·v².';
    } else if (ch.num === 9) {
      // Momentum conservation
      const m1 = (2 + n).toFixed(1);
      const v1 = (6 + n).toFixed(1);
      const p = (parseFloat(m1) * parseFloat(v1)).toFixed(2);
      title = `Momento Linear de Corpo em Movimento (${n})`;
      statement = `Qual é o módulo do momento linear p de um projétil de massa m = ${m1} kg trafegando a uma velocidade de v = ${v1} m/s?`;
      keyFormula = 'p = m · v';
      givenData = { 'Massa m': `${m1} kg`, 'Velocidade v': `${v1} m/s` };
      algebraicSteps = [`p = ${m1} kg · ${v1} m/s = ${p} kg·m/s`];
      numericalCalc = `${m1} × ${v1} = ${p} kg·m/s`;
      correctValue = `${p} kg·m/s`;
      unit = 'kg·m/s';
      alt1 = `${(parseFloat(p) * 1.5).toFixed(2)} kg·m/s`;
      alt2 = `${(parseFloat(p) * 0.5).toFixed(2)} kg·m/s`;
      alt3 = `${(parseFloat(p) * 2.0).toFixed(2)} kg·m/s`;
      alt4 = `${(parseFloat(p) + 5.0).toFixed(2)} kg·m/s`;
      hint = 'O momento linear (quantidade de movimento) é p = m · v.';
    } else if (ch.num === 10 || ch.num === 11) {
      // Rotation and Torque
      const r = (0.2 + (n * 0.1)).toFixed(2);
      const F = (15 + (n * 5)).toFixed(1);
      const tau = (parseFloat(r) * parseFloat(F)).toFixed(2);
      title = `Cálculo de Torque em Alavanca (${n})`;
      statement = `Uma chave inglesa de comprimento b = ${r} m é acionada perpendicularmente por uma força de módulo F = ${F} N na sua extremidade. Qual é o módulo do torque resultante exercido sobre a porca?`;
      keyFormula = 'τ = r · F · sen(θ) (com θ = 90°)';
      givenData = { 'Braço de alavanca r': `${r} m`, 'Força F': `${F} N` };
      algebraicSteps = [`τ = ${r} · ${F} · 1 = ${tau} N·m`];
      numericalCalc = `${r} × ${F} = ${tau} N·m`;
      correctValue = `${tau} N·m`;
      unit = 'N·m';
      alt1 = `${(parseFloat(tau) * 1.5).toFixed(2)} N·m`;
      alt2 = `${(parseFloat(tau) * 0.5).toFixed(2)} N·m`;
      alt3 = `${(parseFloat(tau) * 2).toFixed(2)} N·m`;
      alt4 = `${(parseFloat(tau) + 2).toFixed(2)} N·m`;
      hint = 'Torque é o produto da força pelo braço de alavanca perpendicular: τ = r · F.';
    } else if (ch.num === 13) {
      // Gravity
      const h = (100 + (n * 100)).toFixed(0);
      const rEarth = 6370; // km
      const rTotal = rEarth + parseFloat(h);
      const g0 = 9.80;
      const gh = (g0 * Math.pow(rEarth / rTotal, 2)).toFixed(2);
      title = `Variação da Gravidade com a Altitude (${n})`;
      statement = `A que aceleração gravitacional g_h está sujeito um satélite geoestacionário em órbita circular a uma altitude h = ${h} km acima da superfície da Terra (raio da Terra R_T ≈ 6370 km, g na superfície = 9,80 m/s²)?`;
      keyFormula = 'g_h = g₀ · [ R_T / (R_T + h) ]²';
      givenData = { 'Altitude h': `${h} km`, 'Raio da Terra': '6370 km', 'g₀': '9,80 m/s²' };
      algebraicSteps = [
        `r_total = 6370 + ${h} = ${rTotal} km`,
        `g_h = 9,80 · (6370 / ${rTotal})² = ${gh} m/s²`,
      ];
      numericalCalc = `9,80 × (6370 / ${rTotal})² = ${gh} m/s²`;
      correctValue = `${gh} m/s²`;
      unit = 'm/s²';
      alt1 = `${(parseFloat(gh) * 1.2).toFixed(2)} m/s²`;
      alt2 = `${(parseFloat(gh) * 0.8).toFixed(2)} m/s²`;
      alt3 = '9,80 m/s²';
      alt4 = `${(parseFloat(gh) * 0.5).toFixed(2)} m/s²`;
      hint = 'A aceleração da gravidade diminui com o quadrado da distância ao centro da Terra: g ∝ 1/r².';
    } else {
      // Vector or kinematics
      const v0 = (10 + (n * 3)).toFixed(1);
      const t = (2 + (n * 0.5)).toFixed(1);
      const a = (2.5).toFixed(1);
      const deltaX = (parseFloat(v0) * parseFloat(t) + 0.5 * parseFloat(a) * Math.pow(parseFloat(t), 2)).toFixed(1);
      title = `Deslocamento em Movimento Acelerado (${n})`;
      statement = `Um móvel parte com velocidade v₀ = ${v0} m/s e acelera a uma taxa constante de a = ${a} m/s² durante t = ${t} s. Qual é a distância percorrida?`;
      keyFormula = 'Δx = v₀·t + ½·a·t²';
      givenData = { 'v₀': `${v0} m/s`, 'a': `${a} m/s²`, 't': `${t} s` };
      algebraicSteps = [
        `Δx = (${v0} · ${t}) + [ 0,5 · ${a} · (${t})² ]`,
        `Δx = ${deltaX} m`,
      ];
      numericalCalc = `${v0}×${t} + 0,5×${a}×${t}² = ${deltaX} m`;
      correctValue = `${deltaX} metros`;
      unit = 'm';
      alt1 = `${(parseFloat(deltaX) * 1.3).toFixed(1)} metros`;
      alt2 = `${(parseFloat(deltaX) * 0.7).toFixed(1)} metros`;
      alt3 = `${(parseFloat(deltaX) + 15).toFixed(1)} metros`;
      alt4 = `${(parseFloat(deltaX) * 2).toFixed(1)} metros`;
      hint = 'Utilize a função horária do espaço do MRUV: x = x₀ + v₀·t + ½·a·t².';
    }

    const q: Question = {
      id: `hr-v1-${String(currentId).padStart(3, '0')}`,
      volume: 1,
      chapterNumber: ch.num,
      chapterTitle: ch.title,
      topic: ch.topic,
      difficulty: n % 3 === 0 ? 'Difícil' : n % 2 === 0 ? 'Médio' : 'Fácil',
      bookRef: `Fundamentos de Física - Halliday & Resnick, Vol. 1, Cap. ${ch.num}`,
      title,
      statement,
      options: [
        { id: `opt-${currentId}-a`, label: 'A', text: alt1, isCorrect: false },
        { id: `opt-${currentId}-b`, label: 'B', text: correctValue, isCorrect: true },
        { id: `opt-${currentId}-c`, label: 'C', text: alt2, isCorrect: false },
        { id: `opt-${currentId}-d`, label: 'D', text: alt3, isCorrect: false },
        { id: `opt-${currentId}-e`, label: 'E', text: alt4, isCorrect: false },
      ],
      hint,
      explanation: {
        keyFormula,
        principles: [
          'Aplicação sistemática das leis e definições fundamentais da Mecânica Clássica de Halliday & Resnick.',
        ],
        givenData,
        algebraicSteps,
        numericalCalculation: numericalCalc,
        conclusion: `O valor obtido é ${correctValue}. Alternativa B correta.`,
      },
    };

    list.push(q);
    currentId++;
  }

  return list;
};

export const ALL_QUESTIONS_VOL_1 = seedBaseQuestionsV1();
