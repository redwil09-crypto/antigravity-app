// Auto-generated exercise database from GIF files
const categories = [
  { id: 'abdominal', name: 'Abdominal', icon: '🔥', folder: 'abdominal' },
  { id: 'antebraco', name: 'Antebraço', icon: '💪', folder: 'antebraco' },
  { id: 'biceps', name: 'Bíceps', icon: '💪', folder: 'biceps' },
  { id: 'costas', name: 'Costas', icon: '🔙', folder: 'costas' },
  { id: 'membros-inferiores', name: 'Membros Inferiores', icon: '🦵', folder: 'membros-inferiores' },
  { id: 'ombro', name: 'Ombro', icon: '🏋️', folder: 'ombro' },
  { id: 'peito', name: 'Peito', icon: '🫁', folder: 'peito' },
  { id: 'trapezio', name: 'Trapézio', icon: '🔺', folder: 'trapezio' },
  { id: 'triceps', name: 'Tríceps', icon: '💎', folder: 'triceps' },
];

function cleanName(filename) {
  return filename
    .replace('.gif', '')
    .replace(/\s*\(\d+\)\s*/g, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

function assignLevel(name) {
  const lower = name.toLowerCase();
  if (lower.includes('livre') || lower.includes('corporal') || lower.includes('sem peso') || lower.includes('joelhos')) return 'Iniciante';
  if (lower.includes('smith') || lower.includes('unilateral') || lower.includes('inclinado') || lower.includes('declinado')) return 'Avançado';
  return 'Intermediário';
}

function generateTips(category, name) {
  const tips = {
    'abdominal': 'Mantenha a lombar apoiada e expire na fase de contração.',
    'antebraco': 'Movimentos controlados. Não use impulso para levantar o peso.',
    'biceps': 'Mantenha os cotovelos fixos ao lado do corpo. Controle a descida.',
    'costas': 'Puxe com os cotovelos, não com as mãos. Contraia as escápulas.',
    'membros-inferiores': 'Joelhos alinhados com a ponta dos pés. Mantenha o core ativado.',
    'ombro': 'Não eleve os ombros em direção às orelhas. Controle o movimento.',
    'peito': 'Escápulas retraídas e deprimidas durante todo o movimento.',
    'trapezio': 'Mantenha os braços estendidos. Eleve apenas os ombros.',
    'triceps': 'Cotovelos apontando para frente. Estenda completamente os braços.',
  };
  return tips[category] || 'Mantenha a postura correta e respire adequadamente.';
}

const exerciseFiles = {
  abdominal: [
    'Abd Concentrado Braços estendidos.gif',
    'Abdominal Concentrado.gif',
    'Abdominal com Carga.gif',
  ],
  antebraco: [
    'Flexão de punho com barra.gif',
    'Flexão de punho com halteres.gif',
    'Hiperextensão de punho com barra.gif',
    'Hiperextensão de punho com halteres.gif',
    'desvio radial.gif',
  ],
  biceps: [
    'Rosca Concentrada 2.gif','Rosca Concentrada.gif','Rosca Scott Unil com Halteres.gif',
    'biceps concentrado unilateral no cross.gif','biceps polia alta dupla.gif',
    'biceps unilateral com banco scort no cross.gif','biceps unilateral cross.gif',
    'biceps unilateral polia alta cross.gif','rosca  direta no banco scort.gif',
    'rosca alternada aparelho biarticular.gif','rosca alternada com giro.gif',
    'rosca alternada pegada neutra sentado no banco.gif','rosca alternada pegada neutra.gif',
    'rosca consentrada unilateral  no banco declinado.gif','rosca dierata pegada invertida barra W.gif',
    'rosca dierta pegada aberta.gif','rosca dierta pegada fechada.gif',
    'rosca direta apaiada no banco barra W.gif','rosca direta barra W sentado banco.gif',
    'rosca direta barra W.gif','rosca direta barra pegada fechada sentado no banco.gif',
    'rosca direta deitado no banco reto no cross.gif','rosca direta no cross barra W.gif',
    'rosca direta pegada fechada barra W.gif','rosca neutra  unilateral no banco scort.gif',
    'rosca neutra com halteres sentado no banco.gif','rosca neutra com halteres.gif',
    'rosca neutra no banco scort aparelho.gif','rosca no banco scort barra W.gif',
    'rosca no scort.gif','rosca unilateral com halteres sentado no banco.gif',
    'rosca unilateral com halteres.gif','rosca unilateral pegada neutra com halteres.gif',
  ],
  costas: [
    'Barra Livre pegada aberta.gif','Extensão de tronco máquina.gif',
    'Hiperextensão do tronco.gif','Hiperextensões sem dispositivo (banco).gif',
    'Pull Over com Barra.gif','Pull Over na polia com corda.gif',
    'Puxador Costas por trás Máquina.gif','Remanda Curvada Barra.gif',
    'Remanda unil com apoio banco.gif','Remo com barra no punho.gif',
    'banco romano sem peso.gif','banco romano.gif',
    'barra livre com peso.gif','barra livre pegada aberta joelhos flexionados.gif',
    'barra livre pegada aberta no cross.gif','barra livre pegada fechada pronada.gif',
    'barra livre pegada pronada.gif','barra no gravitan.gif','barra no graviton em pé.gif',
    'crucifixo inverso.gif','enge_klimmzuege_obergriff.gif',
    'levantamento terra no smith.gif','pulley costa maquina.gif','pulley costa unilateral.gif',
    'pulley frente pegada supinada.gif','pulley frente pegaga fechda pronada.gif',
    'pulley pegada aberta atras da nuca.gif','pulley pegada aberta pronada.gif',
    'pulley pegada aberta.gif','puxada maquina pegada supinada.gif','puxada maquina.gif',
    'remada aberta no banco inclinada pega supinada.gif','remada aberta no banco inclinado com halteres.gif',
    'remada articulada pegada supinada.gif','remada articulada.gif',
    'remada baixa no pulley pegada aberta supinada.gif','remada baixa unilateral no cross.gif',
    'remada baixa unilateral pegada neutra.gif','remada beixa no pulley triangulo.gif',
    'remada cavalinha pegada aberta.gif','remada cavalinho unilateral.gif',
    'remada cavalino com barra.gif','remada com banco inclinado com haltres.gif',
    'remada com barra.gif','remada inclinada no smith.gif',
    'remada inclinda no banco pegada supinda puxada fechada.gif','remada livre  com halteres.gif',
    'remada maquina pronada.gif','remada no banco inclinado pegada pronada com barra.gif',
    'remada serrote.gif','remada unilateral cavalindo barra puxada fechada.gif',
    'superman.gif','voador invertido.gif',
  ],
  'membros-inferiores': [
    'Abduçao de quadril em pé.gif','Adução na polia.gif','Agachamento Sumo Peso Corporal.gif',
    'Agachamento com halteres com uma perna.gif','Agachamento livre com barra.gif',
    'Agachamento sumo com halteres (2).gif','Agachamento terra com halteres do lado.gif',
    'Extensão de Quadril em pé.gif','Extensão de quadril em pé com joelhos flexionados.gif',
    'Extensão de quadril em pé na polia.gif','Flexão Plantar com peso corporal.gif',
    'Levantamento terrra com halteres frente.gif','Retrocesso com Barra.gif',
    'Retrocesso com halteres.gif','Stiff com Halteres.gif','Stiff unil com medball.gif',
    'adutora na tração do cabo cross.gif','afundo livre.gif','agachamento barra.gif',
    'agachamento bulgaro com barra.gif','agachamento bulgaro.gif',
    'agachamento livre pés juntos.gif','agachamento na maquina.gif','agachamento no banco.gif',
    'agachamento no cross.gif','agachamento pés afastados.gif',
    'agachamento sumo com halteres.gif','agachamento sumo livre.gif',
    'cadeira adutora.gif','cadeira extensora.gif','cadeira flex.gif',
    'elevação pelvica livre.gif','flex de joelho  em pé no cabo cross.gif',
    'leg press pés afastados.gif','leg press.gif','levantamento tarra com halteres.gif',
    'levantamento terra com barra.gif','mesa flex unilateral.gif','mesa flex.gif',
    'máquina adutora.gif','panturrinha no leg press.gif','passada a frente com barra.gif',
    'passada a frente com halteres.gif','passada com halteres.gif','passada para tras com barra.gif',
    'seitlicher_ausfallschritt_mit_langhantel.gif','stiff com barra.gif',
    'stiff no smth unilateral.gif','stiff no smth.gif','stiff unilateral com kettibel.gif',
    'stiff unilateral.gif','stiff.gif','tiefe_langhantel_kniebeuge.gif',
  ],
  ombro: [
    'Crucifixo I_nvertido Polia Alta.gif','Crucifixo Invertido com Halteres.gif',
    'Desenvolmento Frontal com Elastico.gif','Desenvolmento Máquina.gif',
    'Desenvolmento com Halteres.gif','Desenvolvimento Sentado Smith.gif',
    'Desenvolvimento Sentado com Halteres.gif','Desenvolvimento Smith.gif',
    'Desenvolvimento com Barra sentado.gif','Desenvolvimento com Barra.gif',
    'Desenvolvimento com Halteres.gif','Desenvolvimento por tras com barra.gif',
    'Desenvolvimento por trás com barra.gif','Elevação Frontal Crossover.gif',
    'Elevação Frontal com Barra.gif','Remanda Alta com Barra.gif',
    'crucifixo inverso no banco inclinado.gif','crucifixo inverso no cross em pé .gif',
    'crucifixo inverso no cross no banco reto .gif','desenvolvimento barra atras da nuca.gif',
    'desenvolvimento barra sentado atras nuca.gif','desenvolvimento cabo cross.gif',
    'desenvolvimento com rotação.gif','desenvolvimento na barra.gif',
    'desenvolvimento no smith barra na nuca.gif','desenvolvimento unilateral.gif',
    'desnvolvimento barra frente sentado.gif','elevação bilateral na maquina.gif',
    'elevação do cotovelo unilateral.gif','elevação frontal com halteres.gif',
    'elevação lateral inclinado sentado.gif','elevação lateral pegda neutra inversa.gif',
    'elevação lateral sentado no banco.gif','elevação letaral com haltrers.gif',
    'elevação leteral cruzada no cross.gif','elevação unilateral frontal.gif',
    'elevação unilateral no cross.gif','elevação unilateral.gif',
    'remada alta com barra W.gif','remada alta com barra no cross.gif',
    'remada alta com barra pegada aberta.gif','remada alta com halteres bilateral.gif',
    'remada alta com halteres.gif','remada alta no cross.gif',
    'remada livre com barra.gif','voador inverso.gif',
  ],
  peito: [
    'Apoio de frente com medball.gif','Apoio de frente com step.gif',
    'Apoio de frente de joelhos.gif','Crucifixo Maquina.gif',
    'Dumbbell covers com braços estendidos.gif','Dumbbell covers com halteres.gif',
    'Dumbbell covers na bola suiça.gif','Dumbbell fly • uitvoering en uitleg • Men_sPower.gif',
    'Supino Incliado Maquina.gif','Supino inclinado com halteres.gif',
    'Supino reto com halteres (2).gif','crucifixo beixo no croos em pe.gif',
    'crucifixo inclinado banco com halteres.gif','crucifixo no cross banco reto.gif',
    'crucifixo no cross em pé.gif','crucifixo no cross polia alta.gif',
    'flex de cotovelo braços aberto.gif','flex de cotovelo completa.gif',
    'flex de cotovelo declinado utilizando o banco.gif','flex de cotovelo declinado.gif',
    'peito na paralela.gif','supindo reto barra.gif','supino articulado maquina.gif',
    'supino crucifixo com halteres.gif','supino declinado barra.gif',
    'supino declinado barrapegada aberta.gif','supino declinado com halteres.gif',
    'supino declinado no smit.gif','supino horizontal maquina.gif',
    'supino inclinado  aparelho articulado.gif','supino inclinado banco cross.gif',
    'supino inclinado banco no smith.gif','supino inclinado banco.gif',
    'supino inclinado no smith.gif','supino reto  no cross.gif',
    'supino reto com halteres.gif','supino reto pegada aberta.gif',
    'supino vertical pegada neutra maquina.gif','voador maquina.gif',
  ],
  trapezio: [
    'encolhimento livre com halteres.gif','encolhimento maquina.gif',
    'encolhimento na barra livre.gif','encolhimento no smith.gif',
    'encolhimento pegada fechada barra no cross.gif',
    'encolhimento sentado no banco com halteres.gif',
    'encolhimento sentado no banco inlinado com halteres.gif',
    'remada alta com halteres.gif','remada alta pegada abeta com barra.gif',
  ],
  triceps: [
    'Apoio de frente pegada fechada parede.gif','Kick back sentado com halteres.gif',
    'Kick back.gif','Supino declinado pegada fechada.gif','Supino pegada fechada.gif',
    'Triceps frances barra W.gif','Triceps testa com halteres.gif',
    'arnold_dips-maschine.gif','flex de cotovelo fechado com halteres.gif',
    'flex de cotovelo fechado livre.gif','flex de cotovelo fechado.gif',
    'supino declinado no smit.gif','triceps afundo no banco.gif',
    'triceps apoaiado na pareda.gif','triceps com halteres no banco reto.gif',
    'triceps extenção de cotovelo unilateral.gif','triceps françes bilateral no cross.gif',
    'triceps françes unilateral deitado no banco.gif','triceps françes unilateral no corss.gif',
    'triceps inclinado no cross bilateral.gif','triceps na paralela maquiba.gif',
    'triceps no aparelho scort.gif','triceps no cross barra triangulo.gif',
    'triceps no cross deitado no banco reto.gif','triceps paralelo no banco.gif',
    'triceps patada blateral com halteres.gif','triceps patada unilateral com halteres.gif',
    'triceps pateda com alteres.gif','triceps pegada pronada uniatres no cross.gif',
    'triceps testa com barra.gif','triceps testa pegada neutra deitado no banco.gif',
    'triceps tresta com halteres.gif','triceps unilateral 90G deitado.gif',
    'triceps unilateral deitado no banco.gif','triceps unilateral pegada supinada.gif',
    'triceps.gif',
  ],
};

let idCounter = 1;
const exercises = [];

Object.entries(exerciseFiles).forEach(([categoryId, files]) => {
  files.forEach(file => {
    const name = cleanName(file);
    const level = assignLevel(name);
    const tips = generateTips(categoryId, name);
    const id = idCounter++;
    // Deterministic values based on id (avoids hydration mismatch from Math.random)
    const duration = 30 + (id * 7 % 20);
    const reps = 10 + (id * 3 % 6);
    exercises.push({
      id,
      name,
      gif: `/exercises/${categoryId}/${file}`,
      description: `Execute o movimento de ${name.toLowerCase()} com controle e amplitude adequada. Mantenha a respiração coordenada com as fases do exercício.`,
      level,
      category: categoryId,
      duration,
      reps,
      tips,
    });
  });
});

export { categories, exercises };
export default exercises;
