export interface PhysicalConstant {
  symbol: string;
  name: string;
  value: string;
  unit: string;
}

export interface FormulaGroup {
  volume: number;
  volumeName: string;
  sections: Array<{
    title: string;
    formulas: Array<{
      name: string;
      equation: string;
      description: string;
    }>;
  }>;
}

export const PHYSICAL_CONSTANTS: PhysicalConstant[] = [
  { symbol: 'c', name: 'Velocidade da luz no vácuo', value: '2,998 × 10⁸', unit: 'm/s' },
  { symbol: 'g', name: 'Aceleração da gravidade (nível do mar)', value: '9,807', unit: 'm/s²' },
  { symbol: 'G', name: 'Constante gravitacional de Newton', value: '6,674 × 10⁻¹¹', unit: 'N·m²/kg²' },
  { symbol: 'e', name: 'Carga elementar', value: '1,602 × 10⁻¹⁹', unit: 'C' },
  { symbol: 'ε₀', name: 'Permissividade elétrica do vácuo', value: '8,854 × 10⁻¹²', unit: 'C²/(N·m²)' },
  { symbol: 'μ₀', name: 'Permeabilidade magnética do vácuo', value: '4π × 10⁻⁷ ≈ 1,257 × 10⁻⁶', unit: 'T·m/A' },
  { symbol: 'k_e', name: 'Constante de Coulomb (1/4πε₀)', value: '8,988 × 10⁹', unit: 'N·m²/C²' },
  { symbol: 'h', name: 'Constante de Planck', value: '6,626 × 10⁻³⁴', unit: 'J·s' },
  { symbol: 'ℏ', name: 'Constante reduzida de Planck (h/2π)', value: '1,055 × 10⁻³⁴', unit: 'J·s' },
  { symbol: 'k_B', name: 'Constante de Boltzmann', value: '1,381 × 10⁻²³', unit: 'J/K' },
  { symbol: 'R', name: 'Constante universal dos gases', value: '8,314', unit: 'J/(mol·K)' },
  { symbol: 'N_A', name: 'Número de Avogadro', value: '6,022 × 10²³', unit: 'mol⁻¹' },
  { symbol: 'm_e', name: 'Massa de repouso do elétron', value: '9,109 × 10⁻³¹', unit: 'kg' },
  { symbol: 'm_p', name: 'Massa de repouso do próton', value: '1,673 × 10⁻²⁷', unit: 'kg' },
  { symbol: 'm_n', name: 'Massa de repouso do nêutron', value: '1,675 × 10⁻²⁷', unit: 'kg' },
];

export const FORMULA_CATALOG: FormulaGroup[] = [
  {
    volume: 1,
    volumeName: 'Volume 1: Mecânica Newtoniana',
    sections: [
      {
        title: 'Cinemática e Movimento em 1D e 2D',
        formulas: [
          { name: 'Equação horária do MRUV', equation: 'x(t) = x₀ + v₀·t + ½·a·t²', description: 'Posição em função do tempo' },
          { name: 'Equação de Torricelli', equation: 'v² = v₀² + 2·a·Δx', description: 'Velocidade independente do tempo' },
          { name: 'Alcance do Projétil', equation: 'R = (v₀² · sen 2θ) / g', description: 'Alcance horizontal em terreno plano' },
          { name: 'Aceleração centrípeta', equation: 'a_c = v² / R = ω² · R', description: 'Aceleração normal ao movimento circular' },
        ],
      },
      {
        title: 'Dinâmica e Leis de Newton',
        formulas: [
          { name: 'Segunda Lei de Newton', equation: '∑F = m · a = dp/dt', description: 'Força resultante e taxa de momento' },
          { name: 'Força de Atrito Estático Máxima', equation: 'f_at,max = μₛ · N', description: 'Limite de atrito estático' },
          { name: 'Força de Atrito Cinético', equation: 'f_at,k = μₖ · N', description: 'Atrito em deslizamento' },
        ],
      },
      {
        title: 'Trabalho, Energia e Rotação',
        formulas: [
          { name: 'Teorema do Trabalho e Energia', equation: 'W_total = ΔK = ½·m·v_f² - ½·m·v_i²', description: 'Trabalho da resultante' },
          { name: 'Energia Potencial Gravitacional', equation: 'U_g = m · g · y', description: 'Campo uniforme próximo à Terra' },
          { name: 'Energia Potencial Elástica', equation: 'U_e = ½ · k · x²', description: 'Lei de Hooke' },
          { name: 'Torque e Segunda Lei Angular', equation: 'τ = r × F,   ∑τ = I · α', description: 'Dinâmica rotacional' },
          { name: 'Velocidade de Escape', equation: 'v_esc = √(2·G·M / R)', description: 'Energia mecânica nula no infinito' },
        ],
      },
    ],
  },
  {
    volume: 2,
    volumeName: 'Volume 2: Gravitação, Ondas e Termodinâmica',
    sections: [
      {
        title: 'Mecânica dos Fluidos',
        formulas: [
          { name: 'Pressão Hidrostática (Stevin)', equation: 'P = P₀ + ρ · g · h', description: 'Variação de pressão com a profundidade' },
          { name: 'Princípio de Arquimedes (Empuxo)', equation: 'E = ρ_fluido · V_sub · g', description: 'Peso do volume deslocado' },
          { name: 'Equação de Bernoulli', equation: 'P + ½·ρ·v² + ρ·g·y = constante', description: 'Conservação de energia em fluidos ideais' },
        ],
      },
      {
        title: 'Oscilações e Ondas Mecânicas',
        formulas: [
          { name: 'MHS Massa-Mola', equation: 'ω = √(k / m),   T = 2π√(m / k)', description: 'Frequência angular e período' },
          { name: 'Pêndulo Simples', equation: 'ω = √(g / L),   T = 2π√(L / g)', description: 'Oscilações de pequenas amplitudes' },
          { name: 'Velocidade de Onda em Corda', equation: 'v = √(T / μ)', description: 'Tração e densidade linear' },
          { name: 'Efeito Doppler', equation: 'f\' = f₀ · [(v ± v_obs) / (v ∓ v_fonte)]', description: 'Frequência percebida com movimento relativo' },
        ],
      },
      {
        title: 'Termodinâmica e Teoria Cinética',
        formulas: [
          { name: 'Primeira Lei da Termodinâmica', equation: 'ΔE_int = Q - W', description: 'Conservação de energia térmica e mecânica' },
          { name: 'Gás Ideal', equation: 'P · V = n · R · T = N · k_B · T', description: 'Equação de estado' },
          { name: 'Rendimento de Carnot', equation: 'η_Carnot = 1 - (T_f / T_q)', description: 'Rendimento máximo teórico reversível' },
          { name: 'Variação de Entropia', equation: 'ΔS = ∫ dQ_rev / T', description: 'Segunda Lei da Termodinâmica' },
        ],
      },
    ],
  },
  {
    volume: 3,
    volumeName: 'Volume 3: Eletromagnetismo',
    sections: [
      {
        title: 'Eletrostática e Lei de Gauss',
        formulas: [
          { name: 'Lei de Coulomb', equation: 'F = (1 / 4πε₀) · (|q₁·q₂| / r²)', description: 'Força entre cargas puntiformes' },
          { name: 'Campo Elétrico de Carga Puntiforme', equation: 'E = k_e · q / r²', description: 'Força elétrica por unidade de carga' },
          { name: 'Lei de Gauss', equation: '∮ E · dA = q_env / ε₀', description: 'Fluxo elétrico e carga interna' },
          { name: 'Potencial Elétrico', equation: 'V = k_e · q / r,   E = -∇V', description: 'Gradiente de potencial elétrico' },
        ],
      },
      {
        title: 'Capacitância e Circuitos',
        formulas: [
          { name: 'Capacitância e Dielétrico', equation: 'C = q / V = κ · ε₀ · A / d', description: 'Capacitor de placas planas' },
          { name: 'Energia no Capacitor', equation: 'U = ½·C·V² = q² / (2C)', description: 'Energia potencial eletrostática' },
          { name: 'Lei de Ohm', equation: 'V = R · I,   P = V · I = I² · R', description: 'Dissipação por Efeito Joule' },
        ],
      },
      {
        title: 'Magnetismo e Indução',
        formulas: [
          { name: 'Força Magnética de Lorentz', equation: 'F_B = q(v × B),   r = mv / qB', description: 'Trajetória circular em campo B' },
          { name: 'Força Magnética em Fio', equation: 'F = I(L × B)', description: 'Condutor percorrido por corrente' },
          { name: 'Lei da Indução de Faraday', equation: 'ε = - dΦ_B / dt', description: 'F.e.m. induzida pela variação do fluxo' },
          { name: 'Autoindutância', equation: 'ε_L = - L · (di / dt)', description: 'Tensão induzida em indutor' },
        ],
      },
    ],
  },
  {
    volume: 4,
    volumeName: 'Volume 4: Óptica e Física Moderna',
    sections: [
      {
        title: 'Óptica e Fenômenos Ondulatórios',
        formulas: [
          { name: 'Lei de Snell-Descartes', equation: 'n₁ · sen θ₁ = n₂ · sen θ₂', description: 'Refração da luz' },
          { name: 'Ângulo Crítico (Reflexão Total)', equation: 'sen θ_c = n₂ / n₁   (n₁ > n₂)', description: 'Confinamento óptico em fibras' },
          { name: 'Interferência de Young', equation: 'd · sen θ = m · λ  ⟹  y_m = m · (λ·L / d)', description: 'Franjas claras de interferência' },
          { name: 'Rede de Difração', equation: 'd · sen θ = m · λ', description: 'Máximos principais de difração' },
        ],
      },
      {
        title: 'Relatividade Especial',
        formulas: [
          { name: 'Fator de Lorentz', equation: 'γ = 1 / √(1 - v²/c²)', description: 'Fator relativístico de dilatação/contração' },
          { name: 'Dilatação do Tempo', equation: 'Δt = γ · Δt₀', description: 'Tempo medido no referencial do observador' },
          { name: 'Contração do Comprimento', equation: 'L = L₀ / γ', description: 'Comprimento na direção do movimento' },
          { name: 'Energia Relativística Total', equation: 'E = γ · m · c² = √(p²c² + m²c⁴)', description: 'Equivalência massa-energia' },
        ],
      },
      {
        title: 'Física Quântica e Nuclear',
        formulas: [
          { name: 'Energia do Fóton', equation: 'E = h · f = h · c / λ', description: 'Quantização da luz' },
          { name: 'Efeito Fotoelétrico de Einstein', equation: 'K_max = h · f - Φ = e · V_stop', description: 'Equação fotoelétrica e corte' },
          { name: 'Comprimento de Onda de De Broglie', equation: 'λ = h / p = h / (m · v)', description: 'Dualidade onda-partícula' },
          { name: 'Lei do Decaimento Radioativo', equation: 'N(t) = N₀ · e^(-λ·t) = N₀ · (½)^(t / T½)', description: 'Meia-vida e desintegração nuclear' },
        ],
      },
    ],
  },
];
