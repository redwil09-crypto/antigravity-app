// ============================================
// BIBLIOTECA ELITE — Dados Expandidos
// Baseado na curadoria de Laércio Refundini
// Filosofia: máquinas estáveis, boa curva de resistência,
// alto estímulo muscular e menor risco articular
// ============================================

// --- BANCO DE SINÔNIMOS ---
export const synonyms = {
  'Peck Deck': 'Crucifixo Máquina',
  'Crucifixo Máquina': 'Peck Deck',
  'Pulley Frente': 'Puxada Frontal',
  'Puxada Frontal': 'Pulley Frente',
  'Hack Machine': 'Agachamento Hack',
  'Agachamento Hack': 'Hack Machine',
  'Mesa Flexora': 'Flexora Deitada',
  'Flexora Deitada': 'Mesa Flexora',
  'Panturrilha em Pé': 'Standing Calf Raise',
  'Standing Calf Raise': 'Panturrilha em Pé',
  'Rosca Scott': 'Preacher Curl',
  'Preacher Curl': 'Rosca Scott',
  'Tríceps Francês': 'Skull Crusher / Overhead Extension',
  'Tríceps Testa': 'Lying Tricep Extension',
  'Crossover na Polia': 'Cable Crossover',
  'Leg Press 45°': 'Leg Press Inclinado',
  'Stiff': 'Romanian Deadlift',
  'Afundo': 'Lunge',
  'Elevação Lateral': 'Lateral Raise',
  'Desenvolvimento Máquina': 'Shoulder Press Machine',
  'Rosca Direta': 'Barbell Curl',
  'Rosca 45°': 'Incline Dumbbell Curl',
  'Tríceps Pulley': 'Cable Pushdown',
  'Cadeira Extensora': 'Leg Extension',
  'Cadeira Flexora': 'Seated Leg Curl',
  'Agachamento': 'Squat',
  'Supino Inclinado com Halteres': 'Incline Dumbbell Press',
  'Supino Máquina Articulado': 'Machine Chest Press',
  'Remada Baixa': 'Seated Cable Row',
  'Remada Máquina Articulada': 'Machine Row',
  'Puxada Neutra': 'Neutral Grip Pulldown',
  'Crucifixo Invertido Máquina': 'Reverse Pec Deck',
  'Glúteo Máquina': 'Glute Machine',
  'Abdominal Máquina': 'Ab Machine',
  'Crunch Máquina': 'Machine Crunch',
};

// --- TIPOS DE EQUIPAMENTO ---
export const equipmentTypes = {
  MACHINE: { id: 'machine', label: 'Máquina', icon: '🏗️' },
  CABLE: { id: 'cable', label: 'Cabo', icon: '🔗' },
  DUMBBELL: { id: 'dumbbell', label: 'Halteres', icon: '🏋️' },
  BARBELL: { id: 'barbell', label: 'Barra', icon: '🔩' },
  BODYWEIGHT: { id: 'bodyweight', label: 'Peso Corporal', icon: '🤸' },
};

// --- DADOS ELITE COMPLETOS ---
export const eliteData = {
  source: {
    name: 'Laércio Refundini',
    channel: 'Canal Laércio Refundini',
    philosophy: 'Máquinas estáveis, boa curva de resistência, alto estímulo muscular e menor risco articular.',
  },
  muscleGroups: [
    {
      id: 'peito',
      name: 'Peitoral',
      icon: '🫁',
      color: '#f43f5e',
      bannerTitle: 'Peitoral Completo',
      bannerSubtitle: 'Exercícios de Alta Eficiência',
      exercises: [
        {
          name: 'Supino Inclinado com Halteres (30°)',
          focus: 'Peitoral superior',
          highlight: true,
          equipment: 'dumbbell',
          ratings: { stability: 7, safety: 8, hypertrophy: 10, ease: 7, overall: 9.2 },
          substitutions: [
            { name: 'Supino Inclinado Máquina', equivalence: 96 },
            { name: 'Smith Inclinado', equivalence: 91 },
            { name: 'Supino Inclinado Barra', equivalence: 89 },
            { name: 'Chest Press Inclinado', equivalence: 85 },
          ],
        },
        {
          name: 'Crucifixo Máquina (Peck Deck)',
          focus: 'Hipertrofia geral — superior ao crucifixo livre',
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 9, ease: 9, overall: 9.5 },
          substitutions: [
            { name: 'Crossover', equivalence: 88 },
            { name: 'Crucifixo Inclinado com Halteres', equivalence: 82 },
            { name: 'Crucifixo com Halteres', equivalence: 78 },
          ],
        },
        {
          name: 'Supino Máquina Articulado',
          focus: 'Estabilidade e menor desgaste articular',
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 9, ease: 10, overall: 9.4 },
          substitutions: [
            { name: 'Supino Reto Barra', equivalence: 85 },
            { name: 'Supino Reto Halteres', equivalence: 83 },
            { name: 'Smith Reto', equivalence: 88 },
          ],
        },
        {
          name: 'Crossover na Polia',
          focus: 'Porção inferior do peitoral',
          equipment: 'cable',
          ratings: { stability: 8, safety: 9, hypertrophy: 8, ease: 7, overall: 8.5 },
          substitutions: [
            { name: 'Crucifixo Declinado com Halteres', equivalence: 80 },
            { name: 'Peck Deck', equivalence: 85 },
            { name: 'Supino Declinado', equivalence: 78 },
          ],
        },
      ],
    },
    {
      id: 'costas',
      name: 'Costas',
      icon: '🔙',
      color: '#3b82f6',
      bannerTitle: 'Costas Mais Largas',
      bannerSubtitle: 'Exercícios Selecionados',
      exercises: [
        {
          name: 'Pulley Frente',
          focus: 'Largura dorsal',
          highlight: true,
          equipment: 'cable',
          ratings: { stability: 9, safety: 9, hypertrophy: 10, ease: 8, overall: 9.3 },
          substitutions: [
            { name: 'Puxada Máquina', equivalence: 93 },
            { name: 'Barra Fixa', equivalence: 85 },
            { name: 'Puxada Neutra', equivalence: 90 },
          ],
        },
        {
          name: 'Remada Baixa',
          focus: 'Espessura dorsal',
          equipment: 'cable',
          ratings: { stability: 8, safety: 9, hypertrophy: 9, ease: 8, overall: 9.0 },
          substitutions: [
            { name: 'Remada Máquina', equivalence: 92 },
            { name: 'Remada com Barra', equivalence: 83 },
            { name: 'Remada Unilateral Halteres', equivalence: 80 },
          ],
        },
        {
          name: 'Remada Máquina Articulada',
          focus: 'Segurança e ativação muscular constante',
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 9, ease: 10, overall: 9.5 },
          substitutions: [
            { name: 'Remada Baixa', equivalence: 88 },
            { name: 'Remada Cavalinho', equivalence: 86 },
            { name: 'Remada com Barra', equivalence: 80 },
          ],
        },
        {
          name: 'Remada Unilateral Máquina',
          focus: 'Correção de assimetria',
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 8, ease: 9, overall: 9.0 },
          substitutions: [
            { name: 'Remada Serrote', equivalence: 85 },
            { name: 'Remada Unilateral no Cabo', equivalence: 88 },
            { name: 'Remada Cavalinho Unilateral', equivalence: 83 },
          ],
        },
        {
          name: 'Puxada Neutra (Triângulo)',
          focus: 'Bíceps + dorsal simultâneo',
          equipment: 'cable',
          ratings: { stability: 9, safety: 9, hypertrophy: 9, ease: 9, overall: 9.1 },
          substitutions: [
            { name: 'Pulley Frente Pegada Supinada', equivalence: 90 },
            { name: 'Barra Fixa Pegada Neutra', equivalence: 83 },
            { name: 'Puxada Máquina Supinada', equivalence: 88 },
          ],
        },
      ],
    },
    {
      id: 'ombro',
      name: 'Ombros',
      icon: '🏋️',
      color: '#f59e0b',
      bannerTitle: 'Ombros Definidos',
      bannerSubtitle: 'Exercícios Estratégicos',
      exercises: [
        {
          name: 'Elevação Lateral',
          focus: 'Deltóide lateral — ícone da hipertrofia',
          highlight: true,
          equipment: 'dumbbell',
          ratings: { stability: 7, safety: 8, hypertrophy: 10, ease: 7, overall: 9.0 },
          substitutions: [
            { name: 'Elevação Lateral no Cabo', equivalence: 93 },
            { name: 'Elevação Lateral Máquina', equivalence: 95 },
            { name: 'Elevação Lateral Inclinado', equivalence: 85 },
          ],
        },
        {
          name: 'Desenvolvimento Máquina',
          focus: 'Deltóide anterior com segurança',
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 9, ease: 10, overall: 9.5 },
          substitutions: [
            { name: 'Desenvolvimento com Halteres', equivalence: 88 },
            { name: 'Desenvolvimento Smith', equivalence: 90 },
            { name: 'Desenvolvimento com Barra', equivalence: 82 },
          ],
        },
        {
          name: 'Elevação Lateral no Cabo',
          focus: 'Tensão constante em toda a amplitude',
          equipment: 'cable',
          ratings: { stability: 9, safety: 9, hypertrophy: 9, ease: 8, overall: 9.2 },
          substitutions: [
            { name: 'Elevação Lateral com Halteres', equivalence: 90 },
            { name: 'Elevação Lateral Máquina', equivalence: 93 },
          ],
        },
        {
          name: 'Crucifixo Invertido Máquina',
          focus: 'Deltóide posterior isolado',
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 9, ease: 9, overall: 9.4 },
          substitutions: [
            { name: 'Crucifixo Invertido no Cabo', equivalence: 88 },
            { name: 'Crucifixo Invertido com Halteres', equivalence: 80 },
            { name: 'Face Pull no Cabo', equivalence: 82 },
          ],
        },
      ],
    },
    {
      id: 'biceps',
      name: 'Bíceps',
      icon: '💪',
      color: '#8b5cf6',
      bannerTitle: 'Bíceps Gigantes',
      bannerSubtitle: 'Exercícios Elite para Bíceps',
      exercises: [
        {
          name: 'Rosca Scott Máquina',
          focus: 'Isolamento máximo do bíceps',
          highlight: true,
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 10, ease: 9, overall: 9.7 },
          substitutions: [
            { name: 'Rosca Scott com Barra W', equivalence: 90 },
            { name: 'Rosca Scott com Halteres', equivalence: 85 },
            { name: 'Rosca Concentrada', equivalence: 80 },
          ],
        },
        {
          name: 'Rosca 45°',
          focus: 'Alongamento do bíceps sob carga',
          equipment: 'dumbbell',
          ratings: { stability: 7, safety: 8, hypertrophy: 9, ease: 7, overall: 8.8 },
          substitutions: [
            { name: 'Rosca Inclinada', equivalence: 95 },
            { name: 'Rosca Deitado no Banco no Cabo', equivalence: 85 },
            { name: 'Rosca Concentrada', equivalence: 78 },
          ],
        },
        {
          name: 'Rosca Direta',
          focus: 'Exercício base — construção de força',
          equipment: 'barbell',
          ratings: { stability: 7, safety: 8, hypertrophy: 9, ease: 8, overall: 8.7 },
          substitutions: [
            { name: 'Rosca Direta no Cabo', equivalence: 90 },
            { name: 'Rosca Direta Barra W', equivalence: 95 },
            { name: 'Rosca Alternada com Halteres', equivalence: 85 },
          ],
        },
        {
          name: 'Rosca no Cabo',
          focus: 'Tensão constante durante todo o arco',
          equipment: 'cable',
          ratings: { stability: 9, safety: 9, hypertrophy: 8, ease: 8, overall: 8.8 },
          substitutions: [
            { name: 'Rosca Direta', equivalence: 88 },
            { name: 'Rosca Alternada no Cabo', equivalence: 92 },
            { name: 'Rosca na Polia Alta', equivalence: 85 },
          ],
        },
      ],
    },
    {
      id: 'triceps',
      name: 'Tríceps',
      icon: '💎',
      color: '#06b6d4',
      bannerTitle: 'Tríceps Poderoso',
      bannerSubtitle: 'Máxima Eficiência',
      exercises: [
        {
          name: 'Tríceps Francês',
          focus: 'Cabeça longa — máximo alongamento',
          highlight: true,
          equipment: 'barbell',
          ratings: { stability: 7, safety: 7, hypertrophy: 10, ease: 6, overall: 8.8 },
          substitutions: [
            { name: 'Tríceps Francês no Cabo', equivalence: 92 },
            { name: 'Tríceps Francês com Halteres', equivalence: 88 },
            { name: 'Tríceps Testa', equivalence: 85 },
          ],
        },
        {
          name: 'Tríceps Pulley',
          focus: 'Cabeça lateral — tensão constante',
          equipment: 'cable',
          ratings: { stability: 9, safety: 9, hypertrophy: 9, ease: 9, overall: 9.2 },
          substitutions: [
            { name: 'Tríceps na Corda', equivalence: 95 },
            { name: 'Tríceps Barra Reta', equivalence: 90 },
            { name: 'Tríceps Supinado', equivalence: 85 },
          ],
        },
        {
          name: 'Tríceps Testa',
          focus: 'Máximo estímulo mecânico',
          equipment: 'barbell',
          ratings: { stability: 7, safety: 7, hypertrophy: 9, ease: 6, overall: 8.5 },
          substitutions: [
            { name: 'Tríceps Testa com Halteres', equivalence: 92 },
            { name: 'Tríceps Francês', equivalence: 88 },
            { name: 'Tríceps no Cabo Deitado', equivalence: 85 },
          ],
        },
        {
          name: 'Paralelas / Mergulho',
          focus: 'Exercício composto pesado',
          equipment: 'bodyweight',
          ratings: { stability: 6, safety: 6, hypertrophy: 9, ease: 5, overall: 8.0 },
          substitutions: [
            { name: 'Paralelas na Máquina', equivalence: 95 },
            { name: 'Supino Pegada Fechada', equivalence: 85 },
            { name: 'Tríceps no Banco', equivalence: 75 },
          ],
        },
      ],
    },
    {
      id: 'quadriceps',
      name: 'Quadríceps',
      icon: '🦵',
      color: '#22c55e',
      bannerTitle: 'Pernas de Elite',
      bannerSubtitle: 'Máquinas e Exercícios Mais Eficientes',
      exercises: [
        {
          name: 'Leg Press 45°',
          focus: 'Volume alto com segurança',
          highlight: true,
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 10, ease: 9, overall: 9.7 },
          substitutions: [
            { name: 'Leg Press Horizontal', equivalence: 90 },
            { name: 'Hack Machine', equivalence: 88 },
            { name: 'Agachamento Smith', equivalence: 82 },
          ],
        },
        {
          name: 'Agachamento',
          focus: 'Exercício rei — recrutamento máximo',
          equipment: 'barbell',
          ratings: { stability: 6, safety: 6, hypertrophy: 10, ease: 5, overall: 8.5 },
          substitutions: [
            { name: 'Agachamento Smith', equivalence: 88 },
            { name: 'Leg Press 45°', equivalence: 90 },
            { name: 'Hack Machine', equivalence: 85 },
          ],
        },
        {
          name: 'Hack Machine',
          focus: 'Estabilidade completa para quadríceps',
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 9, ease: 9, overall: 9.4 },
          substitutions: [
            { name: 'Leg Press 45°', equivalence: 90 },
            { name: 'Agachamento Smith', equivalence: 85 },
            { name: 'Agachamento com Barra', equivalence: 80 },
          ],
        },
        {
          name: 'Cadeira Extensora',
          focus: 'Isolamento puro do quadríceps',
          equipment: 'machine',
          ratings: { stability: 10, safety: 8, hypertrophy: 8, ease: 10, overall: 8.8 },
          substitutions: [
            { name: 'Extensora Unilateral', equivalence: 95 },
            { name: 'Sissy Squat', equivalence: 70 },
            { name: 'Leg Press Pés Baixos', equivalence: 75 },
          ],
        },
      ],
    },
    {
      id: 'posterior',
      name: 'Posterior de Coxa',
      icon: '🦿',
      color: '#ec4899',
      bannerTitle: 'Posteriores Fortes',
      bannerSubtitle: 'Equilíbrio e Proteção',
      exercises: [
        {
          name: 'Mesa Flexora',
          focus: 'Principal exercício de isolamento',
          highlight: true,
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 10, ease: 9, overall: 9.7 },
          substitutions: [
            { name: 'Cadeira Flexora', equivalence: 90 },
            { name: 'Flexora Unilateral', equivalence: 88 },
            { name: 'Flexão de Joelho no Cabo', equivalence: 78 },
          ],
        },
        {
          name: 'Cadeira Flexora',
          focus: 'Isolamento sentado — pico de contração',
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 9, ease: 9, overall: 9.4 },
          substitutions: [
            { name: 'Mesa Flexora', equivalence: 92 },
            { name: 'Flexora Unilateral', equivalence: 88 },
            { name: 'Stiff', equivalence: 75 },
          ],
        },
        {
          name: 'Stiff',
          focus: 'Alongamento sob carga — romenos',
          equipment: 'barbell',
          ratings: { stability: 6, safety: 7, hypertrophy: 9, ease: 6, overall: 8.2 },
          substitutions: [
            { name: 'Stiff com Halteres', equivalence: 95 },
            { name: 'Stiff Unilateral', equivalence: 85 },
            { name: 'Levantamento Terra Romeno', equivalence: 92 },
          ],
        },
        {
          name: 'Flexora Unilateral',
          focus: 'Correção de assimetria entre pernas',
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 8, ease: 8, overall: 9.0 },
          substitutions: [
            { name: 'Mesa Flexora', equivalence: 88 },
            { name: 'Cadeira Flexora', equivalence: 85 },
            { name: 'Stiff Unilateral', equivalence: 78 },
          ],
        },
      ],
    },
    {
      id: 'gluteos',
      name: 'Glúteos',
      icon: '🍑',
      color: '#f97316',
      bannerTitle: 'Glúteos Poderosos',
      bannerSubtitle: 'Ativação Máxima',
      exercises: [
        {
          name: 'Agachamento',
          focus: 'Exercício composto completo',
          highlight: true,
          equipment: 'barbell',
          ratings: { stability: 6, safety: 6, hypertrophy: 10, ease: 5, overall: 8.5 },
          substitutions: [
            { name: 'Agachamento Smith', equivalence: 88 },
            { name: 'Leg Press Profundo', equivalence: 90 },
            { name: 'Agachamento Búlgaro', equivalence: 85 },
          ],
        },
        {
          name: 'Leg Press Profundo',
          focus: 'Amplitude máxima para glúteos',
          equipment: 'machine',
          ratings: { stability: 10, safety: 9, hypertrophy: 9, ease: 9, overall: 9.3 },
          substitutions: [
            { name: 'Agachamento', equivalence: 88 },
            { name: 'Hack Machine Profundo', equivalence: 85 },
            { name: 'Agachamento Smith', equivalence: 82 },
          ],
        },
        {
          name: 'Afundo',
          focus: 'Estabilidade + ativação de glúteos',
          equipment: 'dumbbell',
          ratings: { stability: 5, safety: 7, hypertrophy: 9, ease: 6, overall: 8.0 },
          substitutions: [
            { name: 'Afundo com Barra', equivalence: 95 },
            { name: 'Afundo no Smith', equivalence: 90 },
            { name: 'Agachamento Búlgaro', equivalence: 88 },
          ],
        },
        {
          name: 'Glúteo Máquina',
          focus: 'Isolamento de glúteos',
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 8, ease: 10, overall: 9.2 },
          substitutions: [
            { name: 'Extensão de Quadril no Cabo', equivalence: 88 },
            { name: 'Elevação Pélvica', equivalence: 85 },
            { name: 'Kickback no Cabo', equivalence: 82 },
          ],
        },
      ],
    },
    {
      id: 'panturrilha',
      name: 'Panturrilhas',
      icon: '🦶',
      color: '#14b8a6',
      bannerTitle: 'Panturrilhas de Aço',
      bannerSubtitle: 'Desenvolvimento Completo',
      exercises: [
        {
          name: 'Panturrilha em Pé',
          focus: 'Gastrocnêmio — fibra predominante',
          highlight: true,
          equipment: 'machine',
          ratings: { stability: 9, safety: 9, hypertrophy: 10, ease: 8, overall: 9.2 },
          substitutions: [
            { name: 'Panturrilha no Smith', equivalence: 90 },
            { name: 'Panturrilha Unilateral em Pé', equivalence: 88 },
            { name: 'Panturrilha no Leg Press', equivalence: 85 },
          ],
        },
        {
          name: 'Panturrilha Sentado',
          focus: 'Sóleo — fibra profunda',
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 9, ease: 9, overall: 9.3 },
          substitutions: [
            { name: 'Panturrilha Sentado com Halteres', equivalence: 80 },
            { name: 'Panturrilha no Leg Press Joelhos Flexionados', equivalence: 78 },
          ],
        },
        {
          name: 'Panturrilha no Leg Press',
          focus: 'Carga elevada com segurança',
          equipment: 'machine',
          ratings: { stability: 10, safety: 9, hypertrophy: 8, ease: 8, overall: 8.8 },
          substitutions: [
            { name: 'Panturrilha em Pé', equivalence: 90 },
            { name: 'Panturrilha no Smith', equivalence: 88 },
          ],
        },
      ],
    },
    {
      id: 'abdomen',
      name: 'Abdômen',
      icon: '🔥',
      color: '#eab308',
      bannerTitle: 'Core Blindado',
      bannerSubtitle: 'Abdômen com Carga Progressiva',
      exercises: [
        {
          name: 'Abdominal Máquina',
          focus: 'Carga progressiva para hipertrofia do reto',
          highlight: true,
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 10, ease: 9, overall: 9.7 },
          substitutions: [
            { name: 'Crunch Máquina', equivalence: 92 },
            { name: 'Crunch no Cabo', equivalence: 85 },
            { name: 'Abdominal com Carga', equivalence: 80 },
          ],
        },
        {
          name: 'Crunch Máquina',
          focus: 'Isolamento do reto abdominal',
          equipment: 'machine',
          ratings: { stability: 10, safety: 10, hypertrophy: 9, ease: 9, overall: 9.3 },
          substitutions: [
            { name: 'Abdominal Máquina', equivalence: 93 },
            { name: 'Crunch no Cabo', equivalence: 88 },
            { name: 'Abdominal Concentrado', equivalence: 78 },
          ],
        },
        {
          name: 'Elevação de Pernas',
          focus: 'Porção inferior do reto abdominal',
          equipment: 'bodyweight',
          ratings: { stability: 6, safety: 8, hypertrophy: 8, ease: 6, overall: 8.0 },
          substitutions: [
            { name: 'Elevação de Pernas na Máquina', equivalence: 92 },
            { name: 'Elevação de Joelhos Suspenso', equivalence: 85 },
            { name: 'Leg Raise no Banco', equivalence: 82 },
          ],
        },
      ],
    },
  ],
};

// --- HELPERS ---
export function getEliteExerciseByName(name) {
  for (const group of eliteData.muscleGroups) {
    const found = group.exercises.find(e => e.name === name);
    if (found) return { ...found, muscleGroup: group };
  }
  return null;
}

export function isEliteExercise(name) {
  return eliteData.muscleGroups.some(g =>
    g.exercises.some(e => e.name.toLowerCase().includes(name.toLowerCase()))
  );
}

export function getSynonym(name) {
  return synonyms[name] || null;
}

export function getEquipmentLabel(equipmentId) {
  return equipmentTypes[equipmentId.toUpperCase()]?.label || equipmentId;
}

export function getEquipmentIcon(equipmentId) {
  return equipmentTypes[equipmentId.toUpperCase()]?.icon || '🏋️';
}

export default eliteData;
