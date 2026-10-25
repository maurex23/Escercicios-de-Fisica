import { Question } from '../types/physics';

const CHAPTERS_V4 = [
  { num: 33, title: 'Ondas Eletromagnéticas', topic: 'Reflexão Total, Polarização e Vetor de Poynting' },
  { num: 34, title: 'Imagens e Óptica Geométrica', topic: 'Lentes Esféricas Delgadas e Espelhos Convexos/Côncavos' },
  { num: 35, title: 'Interferência', topic: 'Fenda Dupla de Young e Interferência em Filmes Finos' },
  { num: 36, title: 'Difração', topic: 'Difração de Fenda Única e Redes de Difração' },
  { num: 37, title: 'Relatividade Especial', topic: 'Fator de Lorentz, Dilatação Temporal e Energia Relativística' },
  { num: 38, title: 'Fótons e Ondas de Matéria', topic: 'Efeito Fotoelétrico de Einstein e Espalhamento Compton' },
  { num: 39, title: 'Mais sobre Ondas de Matéria', topic: 'Comprimento de Onda de De Broglie e Incerteza de Heisenberg' },
  { num: 40, title: 'Tudo sobre os Átomos', topic: 'Modelo de Bohr e Níveis de Energia do Hidrogênio' },
  { num: 42, title: 'Física Nuclear', topic: 'Decaimento Radioativo, Meia-Vida e Atividade' },
  { num: 43, title: 'Energia Nuclear', topic: 'Defeito de Massa e Energia de Ligação Nuclear' },
];

export const generateQuestionsVol4 = (): Question[] => {
  const list: Question[] = [];

  for (let i = 1; i <= 105; i++) {
    const chIndex = (i - 1) % CHAPTERS_V4.length;
    const ch = CHAPTERS_V4[chIndex];
    const n = Math.floor((i - 1) / CHAPTERS_V4.length) + 1;

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

    if (ch.num === 34) {
      // Thin lenses (Gauss)
      const f = (10 + (n * 2)).toFixed(0); // cm
      const p = (20 + (n * 5)).toFixed(0); // cm
      // 1/f = 1/p + 1/p' => 1/p' = 1/f - 1/p = (p - f) / (f*p) => p' = (f*p)/(p - f)
      const pPrime = ((parseFloat(f) * parseFloat(p)) / (parseFloat(p) - parseFloat(f))).toFixed(1);
      title = `Equação de Gauss para Lente Delgada Convergente (${n})`;
      statement = `Um objeto real é colocado a uma distância p = ${p} cm de uma lente delgada biconvexa convergente com distância focal f = +${f} cm. A que distância p' da lente a imagem real é conjugada?`;
      keyFormula = '1 / f = 1 / p + 1 / p\' ⟹ p\' = (f · p) / (p - f)';
      givenData = { 'Distância focal f': `+${f} cm`, 'Posição do objeto p': `${p} cm` };
      algebraicSteps = [
        `1 / p' = 1 / ${f} - 1 / ${p}`,
        `p' = (${f} · ${p}) / (${p} - ${f}) = ${pPrime} cm`,
      ];
      numericalCalc = `(${f} × ${p}) / (${p} - ${f}) = ${pPrime} cm`;
      correctVal = `${pPrime} cm`;
      alt1 = `${(parseFloat(pPrime) * 1.5).toFixed(1)} cm`;
      alt2 = `${(parseFloat(pPrime) * 0.5).toFixed(1)} cm`;
      alt3 = `${(parseFloat(pPrime) * 2.0).toFixed(1)} cm`;
      alt4 = `${(parseFloat(pPrime) - 5).toFixed(1)} cm`;
      hint = 'Aplique a Equação dos Pontos Conjugados de Gauss: 1/f = 1/p + 1/p\'.';
    } else if (ch.num === 35) {
      // Young double slit
      const lambda = (500 + (n * 20)).toFixed(0); // nm
      const d = (0.2 + (n * 0.02)).toFixed(2); // mm
      const L = (1.5 + (n * 0.1)).toFixed(1); // m
      // deltaY = lambda * L / d
      const deltaY = ((parseFloat(lambda) * 1e-9 * parseFloat(L)) / (parseFloat(d) * 1e-3) * 1000).toFixed(2); // mm
      title = `Distância Interfranjas na Dupla Fenda de Young (${n})`;
      statement = `Luz monocromática de comprimento de onda λ = ${lambda} nm incide sobre duas fendas separadas por d = ${d} mm. As franjas de interferência são observadas em uma tela a uma distância L = ${L} m. Qual é a separação Δy entre franjas brilhantes adjacentes?`;
      keyFormula = 'Δy = (λ · L) / d';
      givenData = { 'λ': `${lambda} nm`, 'd': `${d} mm`, 'L': `${L} m` };
      algebraicSteps = [
        `Δy = (${lambda}×10⁻⁹ · ${L}) / (${d}×10⁻³)`,
        `Δy = ${deltaY} mm`,
      ];
      numericalCalc = `(${lambda}e-9 × ${L}) / (${d}e-3) = ${deltaY} mm`;
      correctVal = `${deltaY} mm`;
      alt1 = `${(parseFloat(deltaY) * 1.5).toFixed(2)} mm`;
      alt2 = `${(parseFloat(deltaY) * 0.5).toFixed(2)} mm`;
      alt3 = `${(parseFloat(deltaY) * 2.0).toFixed(2)} mm`;
      alt4 = `${(parseFloat(deltaY) + 1.0).toFixed(2)} mm`;
      hint = 'Para pequenos ângulos, a distância entre franjas sucessivas é dada por Δy = (λ · L) / d.';
    } else if (ch.num === 37) {
      // Relativity - Lorentz factor
      const vRatio = (0.5 + ((n % 5) * 0.08)).toFixed(2); // 0.5 to 0.82
      const gamma = (1 / Math.sqrt(1 - Math.pow(parseFloat(vRatio), 2))).toFixed(3);
      title = `Fator de Lorentz Relativístico (γ) (${n})`;
      statement = `Uma nave espacial viaja a uma velocidade de v = ${vRatio} c (onde c é a velocidade da luz). Qual é o fator de Lorentz γ correspondente para um observador na Terra?`;
      keyFormula = 'γ = 1 / √(1 - (v/c)²) = 1 / √(1 - β²)';
      givenData = { 'v / c (β)': `${vRatio}` };
      algebraicSteps = [
        `γ = 1 / √(1 - (${vRatio})²) = 1 / √(1 - ${(Math.pow(parseFloat(vRatio), 2)).toFixed(4)})`,
        `γ = ${gamma}`,
      ];
      numericalCalc = `1 / √(1 - ${vRatio}²) = ${gamma}`;
      correctVal = `${gamma}`;
      alt1 = `${(parseFloat(gamma) * 1.4).toFixed(3)}`;
      alt2 = `${(parseFloat(gamma) * 0.7).toFixed(3)}`;
      alt3 = '1,000';
      alt4 = `${(parseFloat(gamma) * 2.0).toFixed(3)}`;
      hint = 'O fator de dilatação relativística de Lorentz é dado por γ = 1 / √(1 - β²).';
    } else if (ch.num === 38) {
      // Photoelectric effect
      const lambda = (300 + (n * 20)).toFixed(0); // nm
      const hc_eV_nm = 1240;
      const E_photon = (hc_eV_nm / parseFloat(lambda)).toFixed(2);
      const phi = '2.20'; // eV
      const Kmax = (parseFloat(E_photon) - parseFloat(phi)).toFixed(2);
      title = `Energia Cinética Máxima no Efeito Fotoelétrico (${n})`;
      statement = `Fótons de comprimento de onda λ = ${lambda} nm incidem sobre uma placa de metal cuja função trabalho é Φ = ${phi} eV. Adotando h·c ≈ 1240 eV·nm, qual é a energia cinética máxima K_max dos fotoelétrons emitidos?`;
      keyFormula = 'K_max = E_fóton - Φ = (h · c / λ) - Φ';
      givenData = { 'λ': `${lambda} nm`, 'Φ': `${phi} eV`, 'h·c': '1240 eV·nm' };
      algebraicSteps = [
        `E_fóton = 1240 / ${lambda} = ${E_photon} eV`,
        `K_max = ${E_photon} eV - ${phi} eV = ${Kmax} eV`,
      ];
      numericalCalc = `(1240 / ${lambda}) - ${phi} = ${Kmax} eV`;
      correctVal = `${Kmax} eV`;
      alt1 = `${(parseFloat(Kmax) * 1.5).toFixed(2)} eV`;
      alt2 = `${(parseFloat(Kmax) * 0.5).toFixed(2)} eV`;
      alt3 = `${E_photon} eV`;
      alt4 = `${(parseFloat(Kmax) + 2).toFixed(2)} eV`;
      hint = 'Equação do efeito fotoelétrico de Einstein: K_max = h·f - Φ = (h·c/λ) - Φ.';
    } else if (ch.num === 39) {
      // De Broglie wavelength
      const V = (50 + (n * 25)).toFixed(0); // Volts
      // lambda = 1.226 / sqrt(V) nm
      const lambda_nm = (1.226 / Math.sqrt(parseFloat(V))).toFixed(3);
      title = `Comprimento de Onda de De Broglie para Elétrons (${n})`;
      statement = `Qual é o comprimento de onda de De Broglie de um elétron acelerado a partir do repouso através de uma diferença de potencial de V = ${V} V? (Fórmula prática para elétron: λ ≈ 1,226 / √V em nm)`;
      keyFormula = 'λ = h / p = 1,226 / √V (nm)';
      givenData = { 'Potencial acelerador V': `${V} V` };
      algebraicSteps = [
        `λ = 1,226 / √(${V}) = 1,226 / ${Math.sqrt(parseFloat(V)).toFixed(2)}`,
        `λ = ${lambda_nm} nm`,
      ];
      numericalCalc = `1,226 / √${V} = ${lambda_nm} nm`;
      correctVal = `${lambda_nm} nm`;
      alt1 = `${(parseFloat(lambda_nm) * 1.5).toFixed(3)} nm`;
      alt2 = `${(parseFloat(lambda_nm) * 0.5).toFixed(3)} nm`;
      alt3 = `${(parseFloat(lambda_nm) * 2.0).toFixed(3)} nm`;
      alt4 = `${(parseFloat(lambda_nm) + 0.5).toFixed(3)} nm`;
      hint = 'Para elétrons acelerados por uma voltagem V, a hipótese de De Broglie fornece λ ≈ 1,226 / √V em nanômetros.';
    } else if (ch.num === 40) {
      // Bohr atom energy levels
      const level = (1 + (n % 4));
      const En = (-13.6 / Math.pow(level, 2)).toFixed(2);
      title = `Nível de Energia no Modelo Atômico de Bohr (${n})`;
      statement = `De acordo com o modelo atômico de Niels Bohr para o átomo de hidrogênio, qual é a energia do nível eletrônico n = ${level}? (Dado: energia do estado fundamental E₁ = -13,6 eV)`;
      keyFormula = 'E_n = - 13,6 eV / n²';
      givenData = { 'Nível principal n': `${level}`, 'E₁': '-13,6 eV' };
      algebraicSteps = [
        `E_${level} = -13,6 / (${level})² = -13,6 / ${Math.pow(level, 2)}`,
        `E_${level} = ${En} eV`,
      ];
      numericalCalc = `-13,6 / ${level}² = ${En} eV`;
      correctVal = `${En} eV`;
      alt1 = `${(parseFloat(En) * 2).toFixed(2)} eV`;
      alt2 = `${(parseFloat(En) * 0.5).toFixed(2)} eV`;
      alt3 = '-13,60 eV';
      alt4 = `${(parseFloat(En) * 4).toFixed(2)} eV`;
      hint = 'A energia dos orbitais de Bohr é inversamente proporcional ao quadrado do número quântico principal: E_n = -13,6 / n² eV.';
    } else {
      // Radioactive decay
      const T12 = (2 + (n % 5)).toFixed(1); // hours
      const halfLives = (2 + (n % 3));
      const totalTime = (parseFloat(T12) * halfLives).toFixed(1);
      const fracPercent = (100 / Math.pow(2, halfLives)).toFixed(1);
      title = `Decaimento Radioativo Exponencial e Meia-Vida (${n})`;
      statement = `Um isótopo radioativo possui meia-vida T₁/₂ = ${T12} horas. Após um intervalo de tempo decorrido de t = ${totalTime} horas, qual porcentagem do material radioativo original ainda permanece sem decair?`;
      keyFormula = 'N(t) = N₀ · (½)^(t / T₁/₂)';
      givenData = { 'Meia-vida T₁/₂': `${T12} h`, 'Tempo total t': `${totalTime} h` };
      algebraicSteps = [
        `Número de meias-vidas: n = ${totalTime} / ${T12} = ${halfLives}`,
        `Fração restante: (½)^${halfLives} = 1 / ${Math.pow(2, halfLives)} = ${fracPercent}%`,
      ];
      numericalCalc = `100 / 2^${halfLives} = ${fracPercent}%`;
      correctVal = `${fracPercent}%`;
      alt1 = `${(parseFloat(fracPercent) * 2).toFixed(1)}%`;
      alt2 = `${(parseFloat(fracPercent) * 0.5).toFixed(1)}%`;
      alt3 = '50,0%';
      alt4 = `${(parseFloat(fracPercent) + 15).toFixed(1)}%`;
      hint = 'A cada intervalo igual à meia-vida T₁/₂, a quantidade de núcleos ativos remanescentes cai pela metade: N = N₀ / 2^n.';
    }

    list.push({
      id: `hr-v4-${String(i).padStart(3, '0')}`,
      volume: 4,
      chapterNumber: ch.num,
      chapterTitle: ch.title,
      topic: ch.topic,
      difficulty: n % 3 === 0 ? 'Difícil' : n % 2 === 0 ? 'Médio' : 'Fácil',
      bookRef: `Fundamentos de Física - Halliday & Resnick, Vol. 4, Cap. ${ch.num}`,
      title,
      statement,
      options: [
        { id: `opt-v4-${i}-a`, label: 'A', text: alt1, isCorrect: false },
        { id: `opt-v4-${i}-b`, label: 'B', text: correctVal, isCorrect: true },
        { id: `opt-v4-${i}-c`, label: 'C', text: alt2, isCorrect: false },
        { id: `opt-v4-${i}-d`, label: 'D', text: alt3, isCorrect: false },
        { id: `opt-v4-${i}-e`, label: 'E', text: alt4, isCorrect: false },
      ],
      hint,
      explanation: {
        keyFormula,
        principles: ['Óptica Física, Relatividade Especial e Teoria Quântica de Halliday & Resnick.'],
        givenData,
        algebraicSteps,
        numericalCalculation: numericalCalc,
        conclusion: `O resultado é ${correctVal}. Alternativa B correta.`,
      },
    });
  }

  return list;
};

export const ALL_QUESTIONS_VOL_4 = generateQuestionsVol4();
