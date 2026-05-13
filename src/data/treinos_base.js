/**
 * Base de treinos extraída das Fichas Personalizadas e Fichas de Treino.
 * Organizada por grupos musculares e divisões (ABC, ABCD).
 */

export const treinosBase = [
  // --- POR MÚSCULO (PEITO) ---
  {
    id: 'pdf-peito-1',
    name: 'Peito - Opção 1',
    category: 'Peito',
    type: 'muscle',
    description: 'Treino de peitoral focado em força e volume com exercícios básicos e isolados.',
    exercises: [
      { name: 'Alongamento de Peitoral', series: '2', reps: '30s', rest: '30s' },
      { name: 'Voador Máquina', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Cross Over Polia Alta', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Supino Reto com Barra', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Supino Inclinado com Barra', series: '3-4', reps: '10-12', rest: '1min' },
    ]
  },
  {
    id: 'pdf-peito-2',
    name: 'Peito - Opção 2',
    category: 'Peito',
    type: 'muscle',
    description: 'Variação de peitoral utilizando halteres para maior amplitude de movimento.',
    exercises: [
      { name: 'Alongamento de Peitoral', series: '2', reps: '30s', rest: '30s' },
      { name: 'Crucifixo com Halteres', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Cross Over Polia Baixa', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Supino Reto com Halteres', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Supino Inclinado com Halteres', series: '3-4', reps: '10-12', rest: '1min' },
    ]
  },

  // --- POR MÚSCULO (COSTAS) ---
  {
    id: 'pdf-costas-1',
    name: 'Costas - Opção 1',
    category: 'Costas',
    type: 'muscle',
    description: 'Foco em largura e densidade das costas com puxadas e remadas.',
    exercises: [
      { name: 'Alongamento de Costas', series: '2-3', reps: '30s', rest: '30s' },
      { name: 'Remada Unilateral', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Pulley Pegada Aberta', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Remada Baixa Pegada Aberta', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Remada Curvada com Barra', series: '3-4', reps: '10-12', rest: '1min' },
    ]
  },
  {
    id: 'pdf-costas-2',
    name: 'Costas - Opção 2',
    category: 'Costas',
    type: 'muscle',
    description: 'Treino de costas focado em detalhes e lombar.',
    exercises: [
      { name: 'Alongamento de Costas', series: '2-3', reps: '30s', rest: '30s' },
      { name: 'Hiperextensão Lombar', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Voador Invertido', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Remada Graviton', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Remada Cavalinho com Barra', series: '3-4', reps: '10-12', rest: '1min' },
    ]
  },

  // --- POR MÚSCULO (TRICEPS) ---
  {
    id: 'pdf-triceps-1',
    name: 'Tríceps - Opção 1',
    category: 'Tríceps',
    type: 'muscle',
    exercises: [
      { name: 'Alongamento de Tríceps', series: '2-3', reps: '30s', rest: '30s' },
      { name: 'Tríceps Paralelo no Banco', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Tríceps Francês na Polia', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Tríceps Testa com Barra', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Tríceps Barra na Polia', series: '3-4', reps: '10-12', rest: '1min' },
    ]
  },
  {
    id: 'pdf-triceps-2',
    name: 'Tríceps - Opção 2',
    category: 'Tríceps',
    type: 'muscle',
    exercises: [
      { name: 'Alongamento de Tríceps', series: '2-3', reps: '30s', rest: '30s' },
      { name: 'Tríceps na Paralela Máquina', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Tríceps Coice com Halteres', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Tríceps Pulley Corda', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Tríceps com Halteres', series: '3-4', reps: '10-12', rest: '1min' },
    ]
  },

  // --- POR MÚSCULO (BICEPS) ---
  {
    id: 'pdf-biceps-1',
    name: 'Bíceps - Opção 1',
    category: 'Bíceps',
    type: 'muscle',
    exercises: [
      { name: 'Alongamento de Bíceps', series: '2-3', reps: '30s', rest: '30s' },
      { name: 'Rosca Direta Pegada Invertida', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Rosca Martelo Alternada', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Rosca Direta Barra W', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Rosca Scott Máquina', series: '3-4', reps: '10-12', rest: '1min' },
    ]
  },

  // --- POR MÚSCULO (PERNAS) ---
  {
    id: 'pdf-quadriceps-1',
    name: 'Quadríceps - Opção 1',
    category: 'Pernas',
    type: 'muscle',
    exercises: [
      { name: 'Alongamento de Quadríceps', series: '2-3', reps: '30s', rest: '30s' },
      { name: 'Passada com Halteres', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Cadeira Extensora', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Leg Press 45', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Agachamento Livre com Barra', series: '3-4', reps: '10-12', rest: '1min' },
    ]
  },
  {
    id: 'pdf-posterior-1',
    name: 'Posterior - Opção 1',
    category: 'Pernas',
    type: 'muscle',
    exercises: [
      { name: 'Alongamento de Posterior', series: '2-3', reps: '30s', rest: '30s' },
      { name: 'Flexora em Pé Unilateral', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Stiff com Barra', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Cadeira Flexora', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Mesa Flexora', series: '3-4', reps: '10-12', rest: '1min' },
    ]
  },

  // --- POR MÚSCULO (OMBRO) ---
  {
    id: 'pdf-ombro-1',
    name: 'Ombro - Opção 1',
    category: 'Ombro',
    type: 'muscle',
    exercises: [
      { name: 'Alongamento de Ombro', series: '2-3', reps: '30s', rest: '30s' },
      { name: 'Voador Inverso', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Elevação Frontal com Barra', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Elevação Lateral', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Desenvolvimento com Halteres', series: '3-4', reps: '10-12', rest: '1min' },
    ]
  },

  // --- DIVISÕES (ABC) ---
  {
    id: 'pdf-abc-a',
    name: 'ABC - Treino A (Segunda)',
    category: 'Divisão ABC',
    type: 'division',
    description: 'Peito, Ombro e Tríceps. Foco em empurrar.',
    exercises: [
      { name: 'Supino Reto com Barra', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Supino Inclinado com Barra', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Voador Máquina', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Cross Over Polia Alta', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Desenvolvimento com Halteres', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Elevação Lateral', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Tríceps Barra na Polia', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Tríceps Testa com Barra', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Abdominal Supra', series: '3-4', reps: '10-12', rest: '1min' },
    ]
  },
  {
    id: 'pdf-abc-b',
    name: 'ABC - Treino B (Terça)',
    category: 'Divisão ABC',
    type: 'division',
    description: 'Costas, Bíceps e Antebraço. Foco em puxar.',
    exercises: [
      { name: 'Pulley Pegada Aberta', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Remada Baixa Pegada Aberta', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Remada Unilateral', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Voador Inverso', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Rosca Scott Máquina', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Rosca Direta Barra W', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Antebraço Barra Movimento Frente', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Antebraço Barra Apoiado no Banco', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Panturrilha no Leg Press 45', series: '3', reps: '12-15', rest: '1min' },
    ]
  },
  {
    id: 'pdf-abc-c',
    name: 'ABC - Treino C (Quarta)',
    category: 'Divisão ABC',
    type: 'division',
    description: 'Perna Completo. Foco em membros inferiores.',
    exercises: [
      { name: 'Agachamento Livre com Barra', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Leg Press 45', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Cadeira Extensora', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Mesa Flexora', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Stiff com Barra', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Cadeira Abdutora', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Elevação Pélvica com Barra', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Panturrilha Sentado', series: '3', reps: '12-15', rest: '1min' },
      { name: 'Panturrilha em Pé Máquina', series: '3', reps: '12-15', rest: '1min' },
    ]
  },

  // --- DIVISÕES (ABCD) ---
  {
    id: 'pdf-abcd-a',
    name: 'ABCD - Treino A',
    category: 'Divisão ABCD',
    type: 'division',
    description: 'Peito e Tríceps. Intensidade alta.',
    exercises: [
      { name: 'Supino Reto com Barra', series: '4', reps: '10-12', rest: '1min' },
      { name: 'Supino Inclinado com Halteres', series: '4', reps: '10-12', rest: '1min' },
      { name: 'Voador Máquina', series: '3', reps: '12-15', rest: '1min' },
      { name: 'Tríceps Barra na Polia', series: '4', reps: '10-12', rest: '1min' },
      { name: 'Tríceps Testa com Barra', series: '3', reps: '10-12', rest: '1min' },
    ]
  },
  {
    id: 'pdf-abcd-b',
    name: 'ABCD - Treino B',
    category: 'Divisão ABCD',
    type: 'division',
    description: 'Costas e Bíceps.',
    exercises: [
      { name: 'Pulley Pegada Aberta', series: '4', reps: '10-12', rest: '1min' },
      { name: 'Remada Curvada com Barra', series: '4', reps: '10-12', rest: '1min' },
      { name: 'Remada Unilateral', series: '3', reps: '12', rest: '1min' },
      { name: 'Rosca Direta Barra W', series: '4', reps: '10', rest: '1min' },
      { name: 'Rosca Martelo Alternada', series: '3', reps: '12', rest: '1min' },
    ]
  },

  // --- PLANOS MENSAIS (PERIODIZAÇÃO) ---
  {
    id: 'pdf-mes-1',
    name: 'Mês 1: Adaptação e Base',
    category: 'Mensal',
    type: 'monthly',
    description: 'Foco em técnica e resistência muscular. 4 semanas de progressão.',
    exercises: [
      { name: 'Agachamento Livre com Barra', series: '3', reps: '15', rest: '1min' },
      { name: 'Supino Reto com Barra', series: '3', reps: '15', rest: '1min' },
      { name: 'Pulley Pegada Aberta', series: '3', reps: '15', rest: '1min' },
      { name: 'Desenvolvimento com Halteres', series: '3', reps: '12', rest: '1min' },
      { name: 'Rosca Direta Barra W', series: '3', reps: '12', rest: '1min' },
      { name: 'Tríceps Barra na Polia', series: '3', reps: '12', rest: '1min' },
    ]
  },
  {
    id: 'pdf-mes-2',
    name: 'Mês 2: Hipertrofia I',
    category: 'Mensal',
    type: 'monthly',
    description: 'Aumento de carga e volume. Foco em ganho de massa.',
    exercises: [
      { name: 'Leg Press 45', series: '4', reps: '10-12', rest: '1min' },
      { name: 'Supino Inclinado com Barra', series: '4', reps: '10-12', rest: '1min' },
      { name: 'Remada Cavalinho com Barra', series: '4', reps: '10-12', rest: '1min' },
      { name: 'Elevação Lateral', series: '4', reps: '12', rest: '1min' },
      { name: 'Rosca Scott Máquina', series: '3', reps: '10', rest: '1min' },
      { name: 'Tríceps Francês na Polia', series: '3', reps: '10', rest: '1min' },
    ]
  },
  {
    id: 'pdf-mes-3',
    name: 'Mês 3: Força Máxima',
    category: 'Mensal',
    type: 'monthly',
    description: 'Baixas repetições e alta carga. Foco em força bruta.',
    exercises: [
      { name: 'Agachamento Livre com Barra', series: '5', reps: '5', rest: '2-3min' },
      { name: 'Supino Reto com Barra', series: '5', reps: '5', rest: '2-3min' },
      { name: 'Levantamento Terra com Barra', series: '3', reps: '5', rest: '3min' },
      { name: 'Desenvolvimento com Barra', series: '4', reps: '6', rest: '2min' },
    ]
  },
  {
    id: 'pdf-mes-4',
    name: 'Mês 4: Definição (Cutting)',
    category: 'Mensal',
    type: 'monthly',
    description: 'Alta densidade e pouco descanso para queima de gordura.',
    exercises: [
      { name: 'Supino Reto com Barra', series: '4', reps: '15', rest: '30s' },
      { name: 'Voador Máquina', series: '4', reps: '15', rest: '30s' },
      { name: 'Pulley Pegada Aberta', series: '4', reps: '15', rest: '30s' },
      { name: 'Remada Baixa Pegada Aberta', series: '4', reps: '15', rest: '30s' },
      { name: 'Cadeira Extensora', series: '4', reps: '20', rest: '30s' },
      { name: 'Mesa Flexora', series: '4', reps: '20', rest: '30s' },
    ]
  },

  // --- SEMANAL / ESPECIAL ---

  {
    id: 'pdf-fullbody-1',
    name: 'Full Body - Circuito',
    category: 'Especial',
    type: 'weekly',
    description: 'Treino de corpo inteiro para quem tem pouco tempo.',
    exercises: [
      { name: 'Agachamento Livre com Barra', series: '3', reps: '12', rest: '45s' },
      { name: 'Supino Reto com Barra', series: '3', reps: '12', rest: '45s' },
      { name: 'Remada Baixa Pegada Aberta', series: '3', reps: '12', rest: '45s' },
      { name: 'Desenvolvimento com Halteres', series: '3', reps: '12', rest: '45s' },
      { name: 'Rosca Martelo Alternada', series: '3', reps: '12', rest: '45s' },
      { name: 'Tríceps Pulley Corda', series: '3', reps: '12', rest: '45s' },
    ]
  },
  {
    id: 'pdf-emagrecimento-1',
    name: 'Foco Emagrecimento',
    category: 'Especial',
    type: 'weekly',
    description: 'Combinação de exercícios multiarticulares com pouco descanso.',
    exercises: [
      { name: 'Passada com Halteres', series: '4', reps: '20 passos', rest: '30s' },
      { name: 'Agachamento Sumo com Halteres', series: '4', reps: '15', rest: '30s' },
      { name: 'Puxada Máquina', series: '4', reps: '15', rest: '30s' },
      { name: 'Abdominal Supra', series: '4', reps: '20', rest: '30s' },
      { name: 'Esteira', series: '1', reps: '15min (HIT)', rest: '0' },
    ]
  },
  {
    id: 'pdf-cardio-1',
    name: 'Cardio e Core',
    category: 'Especial',
    type: 'weekly',
    description: 'Foco em queima calórica e fortalecimento abdominal.',
    exercises: [
      { name: 'Abdominal Prancha', series: '3', reps: '1min', rest: '1min' },
      { name: 'Abdominal Máquina', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Abdominal na Polia', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Abdominal Supra', series: '3-4', reps: '10-12', rest: '1min' },
      { name: 'Esteira', series: '1', reps: '20-60min', rest: '0' },
      { name: 'Bicicleta', series: '1', reps: '20min', rest: '0' },
    ]
  }
];

export default treinosBase;
